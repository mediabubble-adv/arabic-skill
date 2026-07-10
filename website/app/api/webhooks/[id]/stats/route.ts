import { NextRequest, NextResponse } from "next/server";
import { loadOwnedWebhook } from "@/lib/webhooks/auth";
import { getWebhookStats } from "@/lib/webhooks/management";

type RouteParams = { params: Promise<{ id: string }> };

/**
 * Delivery statistics for a webhook subscription.
 * GET /api/webhooks/[id]/stats
 */
export async function GET(req: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const { id } = await params;
  const result = await loadOwnedWebhook(req, id);
  if (!result.ok) return result.error;

  const stats = await getWebhookStats(id);
  return NextResponse.json(stats);
}
