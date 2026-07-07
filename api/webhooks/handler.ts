import { VercelRequest, VercelResponse } from "@vercel/node";
import { createHmac, timingSafeEqual } from "crypto";
import { db } from "@/lib/db";
import { AnyWebhookPayload, WebhookEventType } from "./types";

/**
 * Verify webhook signature (HMAC-SHA256)
 * Prevents unauthorized webhook requests
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
 * Handle incoming webhook request
 * POST /api/webhooks/receive
 */
export async function handleWebhookReceive(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only accept POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Get webhook ID from path or header
    const webhookId = (req.query.id as string) || req.headers["x-webhook-id"] as string;
    if (!webhookId) {
      return res.status(400).json({ error: "Missing webhook ID" });
    }

    // Get signature from header
    const signature = req.headers["x-webhook-signature"] as string;
    if (!signature) {
      return res.status(401).json({ error: "Missing signature" });
    }

    // Get webhook subscription from database
    const subscription = await getWebhookSubscription(webhookId);
    if (!subscription) {
      console.warn(`Webhook not found: ${webhookId}`);
      return res.status(404).json({ error: "Webhook not found" });
    }

    // Verify signature
    const payload = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    if (!verifyWebhookSignature(payload, signature, subscription.secret)) {
      console.warn(`Invalid signature for webhook: ${webhookId}`);
      return res.status(401).json({ error: "Invalid signature" });
    }

    // Parse payload
    const data: AnyWebhookPayload = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    // Verify event type is subscribed
    if (!subscription.events.includes(data.event)) {
      console.log(`Webhook not subscribed to event: ${data.event}`);
      return res.status(202).json({ received: true });
    }

    // Queue webhook for processing
    await queueWebhookJob(subscription.id, data);

    // Record successful receipt
    await recordWebhookDelivery(subscription.id, data, "pending", null);

    // Return immediately (async processing)
    return res.status(202).json({
      received: true,
      job_id: data.id
    });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Get webhook subscription from database
 */
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

/**
 * Queue webhook for async processing
 */
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
        `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        "webhook",
        JSON.stringify({ subscription_id: subscriptionId, ...payload }),
        "pending",
        "normal",
      ]
    );
  } catch (error) {
    console.error("Error queuing webhook job:", error);
    throw error;
  }
}

/**
 * Record webhook delivery attempt
 */
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
      INSERT INTO webhook_deliveries (id, subscription_id, payload, status, response, error, attempt_count, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, 1, NOW())
      `,
      [
        `delivery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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
 * Webhook health check
 * GET /api/webhooks/health
 */
export async function handleWebhookHealth(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Check database connection
    const result = await db.query("SELECT 1");

    // Get queue stats
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

    return res.status(200).json({
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
    return res.status(503).json({
      status: "unhealthy",
      error: "Database connection failed",
    });
  }
}
