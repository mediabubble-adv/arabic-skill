import { NextRequest, NextResponse } from "next/server";
import { authenticateWorkspace } from "@/lib/webhooks/auth";
import { createWebhook, listWebhooks, omitSecret } from "@/lib/webhooks/management";
import { isWebhookEventType, WEBHOOK_EVENT_TYPES, WebhookEventType } from "@/lib/webhooks/types";

/**
 * List webhook subscriptions for the authenticated workspace.
 * GET /api/webhooks
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const auth = await authenticateWorkspace(req);
  if (!auth) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const webhooks = await listWebhooks(auth.workspaceId);
    return NextResponse.json({ webhooks: webhooks.map(omitSecret) });
  } catch {
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}

/**
 * Register a new webhook subscription.
 * POST /api/webhooks
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const auth = await authenticateWorkspace(req);
  if (!auth) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const url = body?.url;
  const events = body?.events;

  if (
    typeof url !== "string" ||
    !Array.isArray(events) ||
    events.length === 0 ||
    !events.every(isWebhookEventType)
  ) {
    return NextResponse.json(
      {
        error: "invalid_request",
        message: `url (string) and events (non-empty array of valid event types: ${WEBHOOK_EVENT_TYPES.join(", ")}) are required`,
      },
      { status: 400 }
    );
  }

  try {
    const webhook = await createWebhook(auth.workspaceId, url, events as WebhookEventType[]);
    return NextResponse.json(webhook, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "create_failed", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
