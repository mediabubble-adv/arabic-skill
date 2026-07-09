import { VercelRequest, VercelResponse } from "@vercel/node";
import { createHmac, timingSafeEqual } from "crypto";
import { db } from "@/lib/db";

/**
 * Verify Slack request signature
 * https://api.slack.com/authentication/verifying-requests-from-slack
 */
export const verifySlackRequest = (req: VercelRequest): boolean => {
  const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
  if (!slackSigningSecret) {
    console.error("Missing SLACK_SIGNING_SECRET");
    return false;
  }

  const timestamp = req.headers["x-slack-request-timestamp"] as string;
  const slackSignature = req.headers["x-slack-signature"] as string;

  if (!timestamp || !slackSignature) {
    console.warn("Missing Slack signature headers");
    return false;
  }

  // Prevent replay attacks (request must be within 5 minutes)
  const requestTime = parseInt(timestamp, 10);
  const currentTime = Math.floor(Date.now() / 1000);
  if (Math.abs(currentTime - requestTime) > 300) {
    console.warn("Request timestamp outside 5-minute window");
    return false;
  }

  // Reconstruct the signing base string
  const body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
  const baseString = `v0:${timestamp}:${body}`;

  // Generate the signature
  const hmac = createHmac("sha256", slackSigningSecret);
  hmac.update(baseString);
  const computedSignature = `v0=${hmac.digest("hex")}`;

  // Compare signatures (timing-safe comparison)
  try {
    return timingSafeEqual(
      Buffer.from(slackSignature),
      Buffer.from(computedSignature)
    );
  } catch {
    console.warn("Signature comparison failed");
    return false;
  }
};

/**
 * Get workspace from Slack team ID
 */
export const getWorkspaceByTeamId = async (
  teamId: string
): Promise<SlackWorkspace | null> => {
  try {
    const result = await db.query(
      `
      SELECT id, team_id, team_name, bot_token, bot_user_id,
             plan, daily_limit, is_active
      FROM workspaces
      WHERE team_id = $1 AND is_active = true
      LIMIT 1
      `,
      [teamId]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching workspace:", error);
    return null;
  }
};

/**
 * Get workspace quota and check if request is allowed
 */
export const checkWorkspaceQuota = async (
  workspaceId: string
): Promise<{ allowed: boolean; remaining: number; limit: number }> => {
  try {
    const result = await db.query(
      `
      SELECT daily_limit, requests_today, reset_at
      FROM workspace_quotas
      WHERE workspace_id = $1
      LIMIT 1
      `,
      [workspaceId]
    );

    if (result.rows.length === 0) {
      return { allowed: false, remaining: 0, limit: 0 };
    }

    const { daily_limit, requests_today, reset_at } = result.rows[0];
    const now = new Date();
    const resetTime = new Date(reset_at);

    // If quota resets today, check current count
    if (resetTime > now) {
      const remaining = daily_limit - requests_today;
      return {
        allowed: remaining > 0,
        remaining: Math.max(0, remaining),
        limit: daily_limit,
      };
    }

    // Reset quota if reset time has passed
    await db.query(
      `
      UPDATE workspace_quotas
      SET requests_today = 0, reset_at = NOW() + INTERVAL '1 day'
      WHERE workspace_id = $1
      `,
      [workspaceId]
    );

    return { allowed: true, remaining: daily_limit, limit: daily_limit };
  } catch (error) {
    console.error("Error checking quota:", error);
    return { allowed: false, remaining: 0, limit: 0 };
  }
};

/**
 * Increment workspace request count
 */
export const incrementQuotaUsage = async (workspaceId: string): Promise<void> => {
  try {
    await db.query(
      `
      UPDATE workspace_quotas
      SET requests_today = requests_today + 1
      WHERE workspace_id = $1
      `,
      [workspaceId]
    );
  } catch (error) {
    console.error("Error incrementing quota:", error);
  }
};

/**
 * Log command execution for analytics
 */
export const logCommandExecution = async (
  workspaceId: string,
  userId: string,
  command: string,
  dialect: string,
  durationMs: number,
  success: boolean,
  errorMessage?: string
): Promise<void> => {
  try {
    await db.query(
      `
      INSERT INTO slack_command_logs
      (workspace_id, user_id, command, dialect, duration_ms, success, error_message, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      `,
      [workspaceId, userId, command, dialect, durationMs, success, errorMessage || null]
    );
  } catch (error) {
    console.error("Error logging command:", error);
  }
};

/**
 * Get workspace settings (dialect, tone preferences)
 */
export const getWorkspaceSettings = async (
  workspaceId: string
): Promise<WorkspaceSettings | null> => {
  try {
    const result = await db.query(
      `
      SELECT default_dialect, default_tone, rtl_validation, dialect_purity_check
      FROM workspace_settings
      WHERE workspace_id = $1
      LIMIT 1
      `,
      [workspaceId]
    );

    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching workspace settings:", error);
    return null;
  }
};

/**
 * Update workspace settings
 */
export const updateWorkspaceSettings = async (
  workspaceId: string,
  settings: Partial<WorkspaceSettings>
): Promise<boolean> => {
  try {
    const updates: string[] = [];
    const values: any[] = [workspaceId];
    let paramIndex = 2;

    if (settings.default_dialect) {
      updates.push(`default_dialect = $${paramIndex}`);
      values.push(settings.default_dialect);
      paramIndex++;
    }

    if (settings.default_tone) {
      updates.push(`default_tone = $${paramIndex}`);
      values.push(settings.default_tone);
      paramIndex++;
    }

    if (typeof settings.rtl_validation === "boolean") {
      updates.push(`rtl_validation = $${paramIndex}`);
      values.push(settings.rtl_validation);
      paramIndex++;
    }

    if (typeof settings.dialect_purity_check === "boolean") {
      updates.push(`dialect_purity_check = $${paramIndex}`);
      values.push(settings.dialect_purity_check);
      paramIndex++;
    }

    if (updates.length === 0) {
      return true;
    }

    const query = `
      UPDATE workspace_settings
      SET ${updates.join(", ")}, updated_at = NOW()
      WHERE workspace_id = $1
    `;

    await db.query(query, values);
    return true;
  } catch (error) {
    console.error("Error updating workspace settings:", error);
    return false;
  }
};

/**
 * Type definitions
 */
export interface SlackWorkspace {
  id: string;
  team_id: string;
  team_name: string;
  bot_token: string;
  bot_user_id: string;
  plan: "free" | "pro" | "enterprise";
  daily_limit: number;
  is_active: boolean;
}

export interface WorkspaceSettings {
  default_dialect: string;
  default_tone: string;
  rtl_validation: boolean;
  dialect_purity_check: boolean;
}

export interface SlackCommand {
  token: string;
  team_id: string;
  team_domain: string;
  channel_id: string;
  channel_name: string;
  user_id: string;
  user_name: string;
  command: string;
  text: string;
  api_app_id: string;
  response_url: string;
  trigger_id: string;
}

export interface SlackInteractive {
  type: "block_actions" | "view_submission" | "view_closed";
  trigger_id: string;
  team: { id: string; domain: string };
  user: { id: string; username: string };
  view?: {
    id: string;
    hash: string;
    state: { values: Record<string, any> };
    previous_view_id: string | null;
  };
  actions?: Array<{
    type: string;
    action_id: string;
    value?: string;
    selected_option?: { value: string; text: { type: string; text: string } };
  }>;
  response_url?: string;
}
