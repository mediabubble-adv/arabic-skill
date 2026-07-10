import { NextRequest, NextResponse } from "next/server";
import { loadOwnedWebhook } from "@/lib/webhooks/auth";
import { testWebhook } from "@/lib/webhooks/management";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * Send a test delivery to a webhook subscription.
 * POST /api/webhooks/[id]/test
 */
export async function POST(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const { id } = await params;
  const result = await loadOwnedWebhook(req, id);
  if (!result.ok) return result.error;

  const testResult = await testWebhook(id);
  return NextResponse.json(testResult);
}
