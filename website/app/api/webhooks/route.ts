import { NextRequest, NextResponse } from "next/server";
import { authenticateWorkspace } from "@/lib/webhooks/auth";
import { createWebhook, listWebhooks, omitSecret } from "@/lib/webhooks/management";
import { WebhookEventType } from "@/lib/webhooks/types";

/**
 * List webhook subscriptions for the authenticated workspace.
 * GET /api/webhooks
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const auth = await authenticateWorkspace(req);
  if (!auth) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const webhooks = await listWebhooks(auth.workspaceId);
  return NextResponse.json({ webhooks: webhooks.map(omitSecret) });
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
  const events = body?.events as WebhookEventType[] | undefined;

  if (typeof url !== "string" || !Array.isArray(events) || events.length === 0) {
    return NextResponse.json(
      { error: "invalid_request", message: "url (string) and events (non-empty array) are required" },
      { status: 400 }
    );
  }

  try {
    const webhook = await createWebhook(auth.workspaceId, url, events);
    return NextResponse.json(webhook, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "create_failed", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
