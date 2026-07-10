import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { db } from "@/lib/db";
import { AnyWebhookPayload, WebhookEventType } from "./types";

/**
 * Verify webhook signature (HMAC-SHA256)
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  try {
    const hmac = createHmac("sha256", secret);
    hmac.update(payload);
    const computed = `sha256=${hmac.digest("hex")}`;

    return timingSafeEqual(Buffer.from(signature), Buffer.from(computed));
  } catch {
    return false;
  }
}

/**
 * Handle incoming webhook request.
 * POST /api/webhooks/receive?id=<webhook_id>
 */
export async function handleWebhookReceive(req: NextRequest): Promise<NextResponse> {
  try {
    const webhookId =
      req.nextUrl.searchParams.get("id") || req.headers.get("x-webhook-id");
    if (!webhookId) {
      return NextResponse.json({ error: "Missing webhook ID" }, { status: 400 });
    }

    const signature = req.headers.get("x-webhook-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    const subscription = await getWebhookSubscription(webhookId);
    if (!subscription) {
      console.warn(`Webhook not found: ${webhookId}`);
      return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
    }

    const rawPayload = await req.text();

    if (!verifyWebhookSignature(rawPayload, signature, subscription.secret)) {
      console.warn(`Invalid signature for webhook: ${webhookId}`);
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    let data: AnyWebhookPayload;
    try {
      data = JSON.parse(rawPayload);
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    if (!subscription.events.includes(data.event)) {
      console.log(`Webhook not subscribed to event: ${data.event}`);
      return NextResponse.json({ received: true }, { status: 202 });
    }

    await queueWebhookJob(subscription.id, data);
    await recordWebhookDelivery(subscription.id, data, "pending", null);

    return NextResponse.json({ received: true, job_id: data.id }, { status: 202 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

async function getWebhookSubscription(webhookId: string) {
  try {
    const result = await db.query(
      `
      SELECT id, workspace_id, url, events, secret, is_active
      FROM webhook_subscriptions
      WHERE id = $1 AND is_active = true
      LIMIT 1
      `,
      [webhookId]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      id: row.id,
      workspace_id: row.workspace_id,
      url: row.url,
      events: row.events as WebhookEventType[],
      secret: row.secret,
      is_active: row.is_active,
    };
  } catch (error) {
    console.error("Error fetching webhook subscription:", error);
    return null;
  }
}

async function queueWebhookJob(
  subscriptionId: string,
  payload: AnyWebhookPayload
) {
  try {
    await db.query(
      `
      INSERT INTO queue_jobs (id, type, payload, status, priority, attempt_count, max_attempts, created_at)
      VALUES ($1, $2, $3, $4, $5, 0, 3, NOW())
      `,
      [
        `job_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
        "webhook",
        JSON.stringify({ ...payload, subscription_id: subscriptionId }),
        "pending",
        "normal",
      ]
    );
  } catch (error) {
    console.error("Error queuing webhook job:", error);
    throw error;
  }
}

async function recordWebhookDelivery(
  subscriptionId: string,
  payload: AnyWebhookPayload,
  status: string,
  response?: string | null,
  error?: string
) {
  try {
    await db.query(
      `
      INSERT INTO webhook_deliveries (subscription_id, payload, status, response, error, attempt_count, created_at)
      VALUES ($1, $2, $3, $4, $5, 1, NOW())
      `,
      [
        subscriptionId,
        JSON.stringify(payload),
        status,
        response || null,
        error || null,
      ]
    );
  } catch (error) {
    console.error("Error recording webhook delivery:", error);
  }
}

/**
 * Webhook infra health check.
 * GET /api/webhooks/health
 */
export async function handleWebhookHealth(): Promise<NextResponse> {
  try {
    await db.query("SELECT 1");

    const queueStats = await db.query(
      `
      SELECT
        COUNT(*) FILTER (WHERE status = 'pending') as pending_count,
        COUNT(*) FILTER (WHERE status = 'processing') as processing_count,
        COUNT(*) FILTER (WHERE status = 'failed') as failed_count
      FROM queue_jobs
      `
    );

    const stats = queueStats.rows[0];

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      queue: {
        pending: stats.pending_count,
        processing: stats.processing_count,
        failed: stats.failed_count,
      },
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      { status: "unhealthy", error: "Database connection failed" },
      { status: 503 }
    );
  }
}
