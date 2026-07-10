import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";
import { db } from "@/lib/db";
import {
  createOAuthState,
  isAllowedRedirectUrl,
  validateOAuthState,
} from "./oauth-state";

const DEFAULT_REDIRECT = "https://arabic-skill.vercel.app";
const OAUTH_CALLBACK_URL = "https://arabic-skill.vercel.app/api/slack/oauth/callback";

/**
 * Generates the Slack OAuth installation URL.
 * GET /api/slack/oauth/start
 */
export async function handleOAuthStart(req: NextRequest): Promise<NextResponse> {
  const requestedRedirect =
    req.nextUrl.searchParams.get("redirect_uri") || DEFAULT_REDIRECT;
  const redirectUrl = isAllowedRedirectUrl(requestedRedirect)
    ? requestedRedirect
    : DEFAULT_REDIRECT;

  let state: string;
  try {
    state = createOAuthState(redirectUrl);
  } catch (error) {
    return NextResponse.json(
      {
        error: "oauth_state_unavailable",
        message:
          error instanceof Error ? error.message : "Failed to create OAuth state",
      },
      { status: 500 }
    );
  }

  const clientId = process.env.SLACK_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      {
        error: "slack_client_id_missing",
        message: "SLACK_CLIENT_ID is not configured",
      },
      { status: 500 }
    );
  }

  const scope = [
    "chat:write",
    "commands",
    "users:read",
    "team:read",
    "files:read",
    "reactions:read",
    "app_mentions:read",
  ].join(",");

  const oauthUrl = new URL("https://slack.com/oauth/v2/authorize");
  oauthUrl.searchParams.append("client_id", clientId);
  oauthUrl.searchParams.append("scope", scope);
  oauthUrl.searchParams.append("state", state);
  oauthUrl.searchParams.append("redirect_uri", OAUTH_CALLBACK_URL);

  return NextResponse.json({
    oauth_url: oauthUrl.toString(),
    state,
  });
}

/**
 * OAuth callback handler.
 * GET /api/slack/oauth/callback?code=...&state=...
 */
export async function handleOAuthCallback(req: NextRequest): Promise<NextResponse> {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const error = req.nextUrl.searchParams.get("error");

  if (error) {
    return NextResponse.json(
      { error: "slack_oauth_denied", message: `User denied OAuth: ${error}` },
      { status: 400 }
    );
  }

  if (!state) {
    return NextResponse.json(
      { error: "invalid_state", message: "Missing or invalid state parameter" },
      { status: 400 }
    );
  }

  const stateData = validateOAuthState(state);
  if (!stateData) {
    return NextResponse.json(
      { error: "invalid_state", message: "State expired or invalid" },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json(
      { error: "invalid_code", message: "Missing or invalid authorization code" },
      { status: 400 }
    );
  }

  try {
    const tokenParams = new URLSearchParams({
      client_id: process.env.SLACK_CLIENT_ID ?? "",
      client_secret: process.env.SLACK_CLIENT_SECRET ?? "",
      code,
      redirect_uri: OAUTH_CALLBACK_URL,
    });

    const tokenResponse = await fetch("https://slack.com/api/oauth.v2.access", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams.toString(),
    });
    const tokenData = await tokenResponse.json();

    if (!tokenData.ok) {
      console.error("Slack OAuth error:", tokenData);
      return NextResponse.json(
        {
          error: "oauth_exchange_failed",
          message: tokenData.error || "Unknown OAuth error",
        },
        { status: 400 }
      );
    }

    const {
      access_token,
      refresh_token,
      bot_user_id,
      app_id,
      team: { id: team_id, name: team_name },
      authed_user: { id: user_id },
    } = tokenData;

    const rawWebhookApiKey = randomBytes(32).toString("hex");
    const webhookApiKeyHash = createHash("sha256").update(rawWebhookApiKey).digest("hex");

    const workspaceResult = await db.query(
      `
      INSERT INTO workspaces (team_id, team_name, bot_token, refresh_token, bot_user_id, app_id, user_id, webhook_api_key_hash, is_active, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, true, NOW())
      ON CONFLICT (team_id) DO UPDATE SET
        bot_token = EXCLUDED.bot_token,
        refresh_token = EXCLUDED.refresh_token,
        bot_user_id = EXCLUDED.bot_user_id,
        webhook_api_key_hash = COALESCE(workspaces.webhook_api_key_hash, EXCLUDED.webhook_api_key_hash),
        is_active = true,
        uninstalled_at = NULL,
        updated_at = NOW()
      RETURNING id, webhook_api_key_hash
      `,
      [team_id, team_name, access_token, refresh_token ?? null, bot_user_id, app_id, user_id, webhookApiKeyHash]
    );

    const workspaceId = workspaceResult.rows[0].id;
    const issuedNewWebhookApiKey = workspaceResult.rows[0].webhook_api_key_hash === webhookApiKeyHash;

    await db.query(
      `
      INSERT INTO workspace_quotas (workspace_id, plan, daily_limit, requests_today, reset_at)
      VALUES ($1, $2, $3, 0, NOW() + INTERVAL '1 day')
      ON CONFLICT (workspace_id) DO NOTHING
      `,
      [workspaceId, "free", 10]
    );

    console.log(`Workspace installed: ${team_name} (${team_id})`);

    const redirectUrl = stateData.redirect || DEFAULT_REDIRECT;
    const successUrl = new URL(redirectUrl);
    successUrl.searchParams.append("oauth_success", "true");
    successUrl.searchParams.append("workspace", team_name);
    successUrl.searchParams.append("workspace_id", workspaceId);
    successUrl.searchParams.append("team_id", team_id);
    if (issuedNewWebhookApiKey) {
      successUrl.searchParams.append("webhook_api_key", rawWebhookApiKey);
    }

    return NextResponse.redirect(successUrl.toString(), 302);
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.json(
      { error: "oauth_callback_failed", message: "Failed to process OAuth callback" },
      { status: 500 }
    );
  }
}

/**
 * Refresh a workspace's Slack bot token.
 * POST /api/slack/oauth/refresh
 */
export async function handleTokenRefresh(req: NextRequest): Promise<NextResponse> {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "unauthorized", message: "Valid authorization required" },
      { status: 401 }
    );
  }

  const { workspace_id } = await req.json();

  if (!workspace_id) {
    return NextResponse.json(
      { error: "missing_parameters", message: "workspace_id required" },
      { status: 400 }
    );
  }

  try {
    const workspaceResult = await db.query(
      "SELECT team_id, refresh_token FROM workspaces WHERE id = $1",
      [workspace_id]
    );

    if (workspaceResult.rows.length === 0) {
      return NextResponse.json(
        { error: "workspace_not_found", message: `Workspace ${workspace_id} not found` },
        { status: 404 }
      );
    }

    const { team_id, refresh_token } = workspaceResult.rows[0];

    if (!refresh_token) {
      return NextResponse.json(
        {
          error: "no_refresh_token",
          message: `Workspace ${workspace_id} has no refresh token on file; reinstall the app to obtain one`,
        },
        { status: 400 }
      );
    }

    const tokenParams = new URLSearchParams({
      client_id: process.env.SLACK_CLIENT_ID ?? "",
      client_secret: process.env.SLACK_CLIENT_SECRET ?? "",
      grant_type: "refresh_token",
      refresh_token,
    });

    const tokenResponse = await fetch("https://slack.com/api/oauth.v2.access", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams.toString(),
    });
    const tokenData = await tokenResponse.json();

    if (!tokenData.ok) {
      console.error("Token refresh failed:", tokenData);
      return NextResponse.json(
        { error: "token_refresh_failed", message: tokenData.error || "Unknown error" },
        { status: 400 }
      );
    }

    const { access_token, refresh_token: new_refresh_token } = tokenData;

    await db.query(
      `
      UPDATE workspaces
      SET bot_token = $1, refresh_token = $2, updated_at = NOW()
      WHERE id = $3
      `,
      [access_token, new_refresh_token, workspace_id]
    );

    console.log(`Token refreshed for workspace: ${team_id}`);

    return NextResponse.json({
      success: true,
      message: "Token refreshed successfully",
      expires_in: tokenData.expires_in,
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json(
      { error: "token_refresh_error", message: "Failed to refresh token" },
      { status: 500 }
    );
  }
}

/**
 * Mark a workspace as uninstalled. Cron/internal use only.
 * POST /api/slack/oauth/uninstall
 */
export async function handleUninstall(req: NextRequest): Promise<NextResponse> {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "unauthorized", message: "Valid authorization required" },
      { status: 401 }
    );
  }

  const workspaceId = req.nextUrl.searchParams.get("workspace_id");
  if (!workspaceId) {
    return NextResponse.json(
      { error: "missing_workspace_id", message: "workspace_id required" },
      { status: 400 }
    );
  }

  try {
    await db.query(
      `
      UPDATE workspaces
      SET is_active = false, uninstalled_at = NOW()
      WHERE id = $1
      `,
      [workspaceId]
    );

    await db.query(
      `
      UPDATE workspace_quotas
      SET archived_at = NOW()
      WHERE workspace_id = $1 AND archived_at IS NULL
      `,
      [workspaceId]
    );

    console.log(`Workspace uninstalled: ${workspaceId}`);

    return NextResponse.json({ success: true, message: "Workspace uninstalled successfully" });
  } catch (error) {
    console.error("Uninstall error:", error);
    return NextResponse.json(
      { error: "uninstall_failed", message: "Failed to process uninstall" },
      { status: 500 }
    );
  }
}
