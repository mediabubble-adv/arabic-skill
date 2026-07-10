import { NextRequest, NextResponse } from "next/server";
import { authenticateWorkspace } from "@/lib/webhooks/auth";
import { getWebhook, getWebhookStats } from "@/lib/webhooks/management";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * Delivery statistics for a webhook subscription.
 * GET /api/webhooks/[id]/stats
 */
export async function GET(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const { id } = await params;

  const auth = await authenticateWorkspace(req);
  if (!auth) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const webhook = await getWebhook(id);
  if (!webhook || webhook.workspace_id !== auth.workspaceId) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const stats = await getWebhookStats(id);
  return NextResponse.json(stats);
}
