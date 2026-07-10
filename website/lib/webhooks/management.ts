import { db } from "@/lib/db";
import { WebhookEventType, WebhookSubscription } from "./types";
import { randomBytes, createHmac } from "crypto";
import { assertSafeWebhookUrl } from "./url-validation";

/**
 * Webhook Management API
 * Create, read, update, delete webhook subscriptions
 */

/** Strip the HMAC secret before a webhook subscription is returned to a client. */
export function omitSecret(webhook: WebhookSubscription): Omit<WebhookSubscription, "secret"> {
  const rest: Partial<WebhookSubscription> = { ...webhook };
  delete rest.secret;
  return rest as Omit<WebhookSubscription, "secret">;
}

/**
 * Create webhook subscription
 */
export async function createWebhook(
  workspaceId: string,
  url: string,
  events: WebhookEventType[]
): Promise<WebhookSubscription> {
  try {
    await assertSafeWebhookUrl(url);

    // Generate secret for HMAC verification
    const secret = randomBytes(32).toString("hex");

    const result = await db.query(
      `
      INSERT INTO webhook_subscriptions (id, workspace_id, url, events, secret, is_active)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, true)
      RETURNING id, workspace_id, url, events, secret, is_active, created_at, updated_at
      `,
      [workspaceId, url, events, secret]
    );

    const row = result.rows[0];
    return {
      id: row.id,
      workspace_id: row.workspace_id,
      url: row.url,
      events: row.events,
      secret: row.secret,
      is_active: row.is_active,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
      failure_count: 0,
    };
  } catch (error) {
    console.error("Error creating webhook:", error);
    throw error;
  }
}

/**
 * Get webhook subscription
 */
export async function getWebhook(
  webhookId: string
): Promise<WebhookSubscription | null> {
  try {
    const result = await db.query(
      `
      SELECT id, workspace_id, url, events, secret, is_active, failure_count, last_triggered_at, created_at, updated_at
      FROM webhook_subscriptions
      WHERE id = $1
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
      events: row.events,
      secret: row.secret,
      is_active: row.is_active,
      failure_count: row.failure_count,
      last_triggered_at: row.last_triggered_at ? new Date(row.last_triggered_at) : undefined,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  } catch (error) {
    console.error("Error fetching webhook:", error);
    return null;
  }
}

/**
 * List webhooks for workspace
 */
export async function listWebhooks(workspaceId: string): Promise<WebhookSubscription[]> {
  try {
    const result = await db.query(
      `
      SELECT id, workspace_id, url, events, secret, is_active, failure_count, last_triggered_at, created_at, updated_at
      FROM webhook_subscriptions
      WHERE workspace_id = $1
      ORDER BY created_at DESC
      `,
      [workspaceId]
    );

    return result.rows.map((row) => ({
      id: row.id,
      workspace_id: row.workspace_id,
      url: row.url,
      events: row.events,
      secret: row.secret,
      is_active: row.is_active,
      failure_count: row.failure_count,
      last_triggered_at: row.last_triggered_at ? new Date(row.last_triggered_at) : undefined,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    }));
  } catch (error) {
    console.error("Error listing webhooks:", error);
    return [];
  }
}

/**
 * Update webhook subscription
 */
export async function updateWebhook(
  webhookId: string,
  updates: {
    url?: string;
    events?: WebhookEventType[];
    is_active?: boolean;
  }
): Promise<WebhookSubscription | null> {
  try {
    const fields: string[] = [];
    const values: unknown[] = [webhookId];
    let paramIndex = 2;

    if (updates.url !== undefined) {
      await assertSafeWebhookUrl(updates.url);
      fields.push(`url = $${paramIndex}`);
      values.push(updates.url);
      paramIndex++;
    }

    if (updates.events !== undefined) {
      fields.push(`events = $${paramIndex}`);
      values.push(updates.events);
      paramIndex++;
    }

    if (updates.is_active !== undefined) {
      fields.push(`is_active = $${paramIndex}`);
      values.push(updates.is_active);
      paramIndex++;
    }

    if (fields.length === 0) {
      return getWebhook(webhookId);
    }

    const query = `
      UPDATE webhook_subscriptions
      SET ${fields.join(", ")}, updated_at = NOW()
      WHERE id = $1
      RETURNING id, workspace_id, url, events, secret, is_active, failure_count, last_triggered_at, created_at, updated_at
    `;

    const result = await db.query(query, values);

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      id: row.id,
      workspace_id: row.workspace_id,
      url: row.url,
      events: row.events,
      secret: row.secret,
      is_active: row.is_active,
      failure_count: row.failure_count,
      last_triggered_at: row.last_triggered_at ? new Date(row.last_triggered_at) : undefined,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  } catch (error) {
    console.error("Error updating webhook:", error);
    return null;
  }
}

/**
 * Delete webhook subscription
 */
export async function deleteWebhook(webhookId: string): Promise<boolean> {
  try {
    const result = await db.query(
      `
      DELETE FROM webhook_subscriptions
      WHERE id = $1
      `,
      [webhookId]
    );

    return (result.rowCount ?? 0) > 0;
  } catch (error) {
    console.error("Error deleting webhook:", error);
    return false;
  }
}

/**
 * Test webhook delivery
 * Send a test payload to verify the webhook works
 */
export async function testWebhook(webhookId: string): Promise<{
  status: string;
  status_code?: number;
  response?: string;
  error?: string;
}> {
  try {
    const webhook = await getWebhook(webhookId);
    if (!webhook) {
      return { status: "error", error: "Webhook not found" };
    }

    const testPayload = {
      id: `test_${Date.now()}`,
      event: "test",
      timestamp: Date.now(),
      workspace_id: webhook.workspace_id,
      data: {
        message: "This is a test webhook delivery",
      },
    };

    const hmac = createHmac("sha256", webhook.secret);
    hmac.update(JSON.stringify(testPayload));
    const signature = `sha256=${hmac.digest("hex")}`;

    const response = await fetch(webhook.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Signature": signature,
        "X-Webhook-ID": webhookId,
      },
      body: JSON.stringify(testPayload),
      signal: AbortSignal.timeout(10000),
    });

    return {
      status: response.ok ? "success" : "failed",
      status_code: response.status,
      response: await response.text(),
    };
  } catch (error) {
    return {
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get webhook statistics
 */
export async function getWebhookStats(webhookId: string) {
  try {
    const result = await db.query(
      `
      SELECT
        COUNT(*) as total_deliveries,
        COUNT(*) FILTER (WHERE status = 'delivered') as successful_deliveries,
        COUNT(*) FILTER (WHERE status = 'failed') as failed_deliveries,
        COUNT(*) FILTER (WHERE status = 'pending') as pending_deliveries,
        MAX(created_at) as last_delivery_at
      FROM webhook_deliveries
      WHERE subscription_id = $1
      `,
      [webhookId]
    );

    if (result.rows.length === 0) {
      return {
        total_deliveries: 0,
        successful_deliveries: 0,
        failed_deliveries: 0,
        pending_deliveries: 0,
      };
    }

    const row = result.rows[0];
    return {
      total_deliveries: parseInt(row.total_deliveries),
      successful_deliveries: parseInt(row.successful_deliveries),
      failed_deliveries: parseInt(row.failed_deliveries),
      pending_deliveries: parseInt(row.pending_deliveries),
      last_delivery_at: row.last_delivery_at ? new Date(row.last_delivery_at) : null,
    };
  } catch (error) {
    console.error("Error getting webhook stats:", error);
    return null;
  }
}
