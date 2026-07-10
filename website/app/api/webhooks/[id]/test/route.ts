import { NextRequest, NextResponse } from "next/server";
import { authenticateWorkspace } from "@/lib/webhooks/auth";
import { getWebhook, testWebhook } from "@/lib/webhooks/management";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * Send a test delivery to a webhook subscription.
 * POST /api/webhooks/[id]/test
 */
export async function POST(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const { id } = await params;

  const auth = await authenticateWorkspace(req);
  if (!auth) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const webhook = await getWebhook(id);
  if (!webhook || webhook.workspace_id !== auth.workspaceId) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const result = await testWebhook(id);
  return NextResponse.json(result);
}
