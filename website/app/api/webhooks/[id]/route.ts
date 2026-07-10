import { NextRequest, NextResponse } from "next/server";
import { loadOwnedWebhook } from "@/lib/webhooks/auth";
import { deleteWebhook, omitSecret, updateWebhook } from "@/lib/webhooks/management";
import { isWebhookEventType, WebhookEventType } from "@/lib/webhooks/types";

type RouteParams = { params: Promise<{ id: string }> };

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

  if (
    body.events !== undefined &&
    (!Array.isArray(body.events) || body.events.length === 0 || !body.events.every(isWebhookEventType))
  ) {
    return NextResponse.json(
      {
        error: "invalid_request",
        message: "events, if provided, must be a non-empty array of valid event types",
      },
      { status: 400 }
    );
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
