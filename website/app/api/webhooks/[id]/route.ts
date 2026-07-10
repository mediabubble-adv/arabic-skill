import { NextRequest, NextResponse } from "next/server";
import { authenticateWorkspace } from "@/lib/webhooks/auth";
import { deleteWebhook, getWebhook, omitSecret, updateWebhook } from "@/lib/webhooks/management";
import { WebhookEventType, WebhookSubscription } from "@/lib/webhooks/types";

type RouteParams = { params: Promise<{ id: string }> };

type LoadResult =
  | { ok: true; webhook: WebhookSubscription }
  | { ok: false; error: NextResponse };

async function loadOwnedWebhook(req: NextRequest, id: string): Promise<LoadResult> {
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

/**
 * Get a single webhook subscription.
 * GET /api/webhooks/[id]
 */
export async function GET(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const { id } = await params;
  const result = await loadOwnedWebhook(req, id);
  if (!result.ok) return result.error;

  return NextResponse.json(omitSecret(result.webhook));
}

/**
 * Update a webhook subscription (URL, events, active state).
 * PATCH /api/webhooks/[id]
 */
export async function PATCH(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const { id } = await params;
  const result = await loadOwnedWebhook(req, id);
  if (!result.ok) return result.error;

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  try {
    const updated = await updateWebhook(id, {
      url: typeof body.url === "string" ? body.url : undefined,
      events: Array.isArray(body.events) ? (body.events as WebhookEventType[]) : undefined,
      is_active: typeof body.is_active === "boolean" ? body.is_active : undefined,
    });

    if (!updated) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }

    return NextResponse.json(omitSecret(updated));
  } catch (error) {
    return NextResponse.json(
      { error: "update_failed", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}

/**
 * Delete a webhook subscription.
 * DELETE /api/webhooks/[id]
 */
export async function DELETE(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const { id } = await params;
  const result = await loadOwnedWebhook(req, id);
  if (!result.ok) return result.error;

  const deleted = await deleteWebhook(id);
  return NextResponse.json({ success: deleted });
}
