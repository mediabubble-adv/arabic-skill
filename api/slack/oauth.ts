import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { createHash, randomBytes } from "crypto";
import { db } from "@/lib/db";

// State validation
const OAUTH_STATES = new Map<string, { timestamp: number; redirect: string }>();
const STATE_TIMEOUT = 10 * 60 * 1000; // 10 minutes

/**
 * Generates OAuth installation URL
 * GET /api/slack/oauth/start
 */
export const handleOAuthStart = (req: VercelRequest, res: VercelResponse) => {
  const redirectUrl = req.query.redirect_uri as string || "https://arabic-skill.vercel.app";
  const state = randomBytes(16).toString("hex");

  // Store state with expiration
  OAUTH_STATES.set(state, {
    timestamp: Date.now(),
    redirect: redirectUrl,
  });

  // Clean old states
  Array.from(OAUTH_STATES.entries()).forEach(([key, value]) => {
    if (Date.now() - value.timestamp > STATE_TIMEOUT) {
      OAUTH_STATES.delete(key);
    }
  });

  const clientId = process.env.SLACK_CLIENT_ID;
  const scope = [
    "chat:write",
    "commands",
    "users:read",
    "team:info",
    "files:read",
    "reactions:read",
  ].join(",");

  const oauthUrl = new URL("https://slack.com/oauth/v2/authorize");
  oauthUrl.searchParams.append("client_id", clientId!);
  oauthUrl.searchParams.append("scope", scope);
  oauthUrl.searchParams.append("state", state);
  oauthUrl.searchParams.append("redirect_uri", "https://arabic-skill.vercel.app/api/slack/oauth/callback");

  res.status(200).json({
    oauth_url: oauthUrl.toString(),
    state,
  });
};

/**
 * OAuth callback handler
 * GET /api/slack/oauth/callback?code=...&state=...
 */
export const handleOAuthCallback = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const { code, state, error } = req.query;

  if (error) {
    return res.status(400).json({
      error: "slack_oauth_denied",
      message: `User denied OAuth: ${error}`,
    });
  }

  // Validate state
  if (!state || typeof state !== "string") {
    return res.status(400).json({
      error: "invalid_state",
      message: "Missing or invalid state parameter",
    });
  }

  const stateData = OAUTH_STATES.get(state);
  if (!stateData) {
    return res.status(400).json({
      error: "invalid_state",
      message: "State expired or invalid",
    });
  }

  OAUTH_STATES.delete(state);

  if (!code || typeof code !== "string") {
    return res.status(400).json({
      error: "invalid_code",
      message: "Missing or invalid authorization code",
    });
  }

  try {
    // Exchange code for token
    const tokenResponse = await axios.post("https://slack.com/api/oauth.v2.access", null, {
      params: {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        code,
        redirect_uri: "https://arabic-skill.vercel.app/api/slack/oauth/callback",
      },
    });

    if (!tokenResponse.data.ok) {
      console.error("Slack OAuth error:", tokenResponse.data);
      return res.status(400).json({
        error: "oauth_exchange_failed",
        message: tokenResponse.data.error || "Unknown OAuth error",
      });
    }

    const {
      access_token,
      token_type,
      scope,
      bot_user_id,
      app_id,
      team: { id: team_id, name: team_name },
      authed_user: { id: user_id },
    } = tokenResponse.data;

    // Store workspace configuration
    const workspaceId = `ws_${team_id}`;
    await db.query(
      `
      INSERT INTO workspaces (id, team_id, team_name, bot_token, bot_user_id, app_id, user_id, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      ON CONFLICT (team_id) DO UPDATE SET
        bot_token = EXCLUDED.bot_token,
        bot_user_id = EXCLUDED.bot_user_id,
        updated_at = NOW()
      `,
      [workspaceId, team_id, team_name, access_token, bot_user_id, app_id, user_id]
    );

    // Initialize workspace quota
    await db.query(
      `
      INSERT INTO workspace_quotas (workspace_id, plan, daily_limit, requests_today, reset_at)
      VALUES ($1, $2, $3, 0, NOW() + INTERVAL '1 day')
      ON CONFLICT (workspace_id) DO NOTHING
      `,
      [workspaceId, "free", 10]
    );

    // Log successful installation
    console.log(`✅ Workspace installed: ${team_name} (${team_id})`);

    // Redirect to success page or workspace
    const redirectUrl = stateData.redirect || "https://arabic-skill.vercel.app";
    const successUrl = new URL(redirectUrl);
    successUrl.searchParams.append("oauth_success", "true");
    successUrl.searchParams.append("workspace", team_name);
    successUrl.searchParams.append("workspace_id", team_id);

    res.redirect(302, successUrl.toString());
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.status(500).json({
      error: "oauth_callback_failed",
      message: "Failed to process OAuth callback",
    });
  }
};

/**
 * Token refresh handler
 * POST /api/slack/oauth/refresh
 */
export const handleTokenRefresh = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const { workspace_id, refresh_token } = req.body;

  if (!workspace_id || !refresh_token) {
    return res.status(400).json({
      error: "missing_parameters",
      message: "workspace_id and refresh_token required",
    });
  }

  try {
    // Get workspace to find team_id
    const workspaceResult = await db.query(
      "SELECT team_id FROM workspaces WHERE id = $1",
      [workspace_id]
    );

    if (workspaceResult.rows.length === 0) {
      return res.status(404).json({
        error: "workspace_not_found",
        message: `Workspace ${workspace_id} not found`,
      });
    }

    const { team_id } = workspaceResult.rows[0];

    // Exchange refresh token for new access token
    const tokenResponse = await axios.post("https://slack.com/api/oauth.v2.access", null, {
      params: {
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token,
      },
    });

    if (!tokenResponse.data.ok) {
      console.error("Token refresh failed:", tokenResponse.data);
      return res.status(400).json({
        error: "token_refresh_failed",
        message: tokenResponse.data.error || "Unknown error",
      });
    }

    const { access_token, refresh_token: new_refresh_token } = tokenResponse.data;

    // Update tokens in database
    await db.query(
      `
      UPDATE workspaces
      SET bot_token = $1, refresh_token = $2, updated_at = NOW()
      WHERE id = $3
      `,
      [access_token, new_refresh_token, workspace_id]
    );

    console.log(`✅ Token refreshed for workspace: ${team_id}`);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      expires_in: tokenResponse.data.expires_in,
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({
      error: "token_refresh_error",
      message: "Failed to refresh token",
    });
  }
};

/**
 * Workspace uninstall handler
 * DELETE /api/slack/oauth/uninstall
 */
export const handleUninstall = async (
  req: VercelRequest,
  res: VercelResponse
) => {
  const { workspace_id } = req.query;

  if (!workspace_id || typeof workspace_id !== "string") {
    return res.status(400).json({
      error: "missing_workspace_id",
      message: "workspace_id required",
    });
  }

  try {
    // Mark workspace as inactive
    await db.query(
      `
      UPDATE workspaces
      SET is_active = false, uninstalled_at = NOW()
      WHERE id = $1
      `,
      [workspace_id]
    );

    // Archive quota data (don't delete, keep for analytics)
    await db.query(
      `
      UPDATE workspace_quotas
      SET archived_at = NOW()
      WHERE workspace_id = $1 AND archived_at IS NULL
      `,
      [workspace_id]
    );

    console.log(`⚠️  Workspace uninstalled: ${workspace_id}`);

    res.status(200).json({
      success: true,
      message: "Workspace uninstalled successfully",
    });
  } catch (error) {
    console.error("Uninstall error:", error);
    res.status(500).json({
      error: "uninstall_failed",
      message: "Failed to process uninstall",
    });
  }
};
