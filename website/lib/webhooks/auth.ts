import { NextRequest } from "next/server";
import { db } from "@/lib/db";

/**
 * Resolve the workspace that owns the given Slack bot token.
 *
 * There's no user-session system in this app yet, so the workspace's own
 * bot_token (issued during Slack OAuth) doubles as the bearer credential
 * for its webhook management API. Replace with a dedicated API-key table
 * if/when a proper session or key-management system lands.
 */
export async function authenticateWorkspace(
  req: NextRequest
): Promise<{ workspaceId: string } | null> {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;

  const result = await db.query(
    `SELECT id FROM workspaces WHERE bot_token = $1 AND is_active = true LIMIT 1`,
    [token]
  );

  if (result.rows.length === 0) return null;
  return { workspaceId: result.rows[0].id };
}
