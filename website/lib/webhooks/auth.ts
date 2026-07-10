import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/lib/db";
import { getWebhook } from "./management";
import { WebhookSubscription } from "./types";

/**
 * Resolve the workspace that owns the given webhook API key.
 *
 * Webhook management (register/list/delete/test) is authenticated with a
 * dedicated bearer credential (workspaces.webhook_api_key_hash), issued once
 * at Slack install time and stored only as a SHA-256 hash. This is separate
 * from the workspace's bot_token, so a leak of one credential doesn't also
 * compromise the other surface.
 */
export async function authenticateWorkspace(
  req: NextRequest
): Promise<{ workspaceId: string } | null> {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;

  const tokenHash = createHash("sha256").update(token).digest("hex");

  const result = await db.query(
    `SELECT id FROM workspaces WHERE webhook_api_key_hash = $1 AND is_active = true LIMIT 1`,
    [tokenHash]
  );

  if (result.rows.length === 0) return null;
  return { workspaceId: result.rows[0].id };
}

export type LoadResult =
  | { ok: true; webhook: WebhookSubscription }
  | { ok: false; error: NextResponse };

/**
 * Authenticate the request and load a webhook, rejecting if it doesn't
 * belong to the authenticated workspace. Shared by the [id] routes.
 */
export async function loadOwnedWebhook(req: NextRequest, id: string): Promise<LoadResult> {
  const auth = await authenticateWorkspace(req);
  if (!auth) {
    return { ok: false, error: NextResponse.json({ error: "unauthorized" }, { status: 401 }) };
  }

  const webhook = await getWebhook(id);
  if (!webhook || webhook.workspace_id !== auth.workspaceId) {
    return { ok: false, error: NextResponse.json({ error: "not_found" }, { status: 404 }) };
  }

  return { ok: true, webhook };
}
