import axios from "axios";
import { db } from "@/lib/db";
import { AnyWebhookPayload } from "./types";

/**
 * Queue Job Processor
 * Handles async processing of webhooks and batch jobs
 *
 * In production, use:
 * - Vercel Queues: https://vercel.com/docs/queues
 * - Bull/Redis: https://github.com/OptimalBits/bull
 * - RabbitMQ: https://www.rabbitmq.com
 */

export interface QueueJob {
  id: string;
  type: "webhook" | "batch" | "workflow" | "cleanup";
  payload: Record<string, any>;
  status: "pending" | "processing" | "completed" | "failed";
  attempt_count: number;
  max_attempts: number;
  error?: string;
  created_at: Date;
}

/**
 * Process next job from queue
 * Called by cron job or continuous worker
 */
export async function processNextJob(): Promise<QueueJob | null> {
  try {
    // Get next pending job
    const job = await getNextPendingJob();
    if (!job) {
      return null;
    }

    // Mark as processing
    await updateJobStatus(job.id, "processing");

    try {
      // Process based on job type
      switch (job.type) {
        case "webhook":
          await processWebhookJob(job);
          break;
        case "batch":
          await processBatchJob(job);
          break;
        case "workflow":
          await processWorkflowJob(job);
          break;
        case "cleanup":
          await processCleanupJob(job);
          break;
        default:
          console.warn(`Unknown job type: ${job.type}`);
      }

      // Mark as completed
      await updateJobStatus(job.id, "completed");
      return job;
    } catch (error) {
      // Handle retry
      job.attempt_count++;
      if (job.attempt_count >= job.max_attempts) {
        await updateJobStatus(
          job.id,
          "failed",
          error instanceof Error ? error.message : "Unknown error"
        );
        console.error(`Job failed after ${job.max_attempts} attempts:`, job.id);
      } else {
        // Retry with exponential backoff
        const backoffMs = Math.pow(2, job.attempt_count) * 1000;
        await scheduleRetry(job.id, backoffMs);
        console.log(`Job ${job.id} scheduled for retry in ${backoffMs}ms`);
      }
      return job;
    }
  } catch (error) {
    console.error("Error processing queue job:", error);
    return null;
  }
}

/**
 * Get next pending job
 */
async function getNextPendingJob(): Promise<QueueJob | null> {
  try {
    const result = await db.query(
      `
      SELECT id, type, payload, status, attempt_count, max_attempts, error, created_at
      FROM queue_jobs
      WHERE status = 'pending'
      AND (next_retry_at IS NULL OR next_retry_at <= NOW())
      ORDER BY
        CASE priority
          WHEN 'high' THEN 1
          WHEN 'normal' THEN 2
          WHEN 'low' THEN 3
        END ASC,
        created_at ASC
      LIMIT 1
      FOR UPDATE SKIP LOCKED
      `,
      []
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      id: row.id,
      type: row.type,
      payload: JSON.parse(row.payload),
      status: row.status,
      attempt_count: row.attempt_count,
      max_attempts: row.max_attempts,
      error: row.error,
      created_at: new Date(row.created_at),
    };
  } catch (error) {
    console.error("Error fetching next job:", error);
    return null;
  }
}

/**
 * Update job status
 */
async function updateJobStatus(
  jobId: string,
  status: string,
  error?: string
) {
  try {
    await db.query(
      `
      UPDATE queue_jobs
      SET status = $1, error = $2, updated_at = NOW()
      WHERE id = $3
      `,
      [status, error || null, jobId]
    );
  } catch (error) {
    console.error("Error updating job status:", error);
  }
}

/**
 * Schedule job for retry
 */
async function scheduleRetry(jobId: string, backoffMs: number) {
  try {
    await db.query(
      `
      UPDATE queue_jobs
      SET next_retry_at = NOW() + INTERVAL '${Math.round(backoffMs)}ms'
      WHERE id = $1
      `,
      [jobId]
    );
  } catch (error) {
    console.error("Error scheduling retry:", error);
  }
}

/**
 * Process webhook job (deliver to external URL)
 */
async function processWebhookJob(job: QueueJob) {
  const { subscription_id, ...payload } = job.payload;

  // Get subscription
  const subscription = await db.query(
    "SELECT url, secret FROM webhook_subscriptions WHERE id = $1",
    [subscription_id]
  );

  if (subscription.rows.length === 0) {
    throw new Error(`Subscription not found: ${subscription_id}`);
  }

  const { url, secret } = subscription.rows[0];

  // Create signature
  const { createHmac } = require("crypto");
  const hmac = createHmac("sha256", secret);
  hmac.update(JSON.stringify(payload));
  const signature = `sha256=${hmac.digest("hex")}`;

  // Deliver webhook
  const response = await axios.post(url, payload, {
    headers: {
      "X-Webhook-Signature": signature,
      "X-Webhook-ID": subscription_id,
      "Content-Type": "application/json",
    },
    timeout: 30000, // 30 second timeout
  });

  if (response.status >= 400) {
    throw new Error(`Webhook delivery failed: ${response.status}`);
  }

  console.log(`Webhook delivered to ${url}`);
}

/**
 * Process batch job (multiple operations)
 */
async function processBatchJob(job: QueueJob) {
  const { operations, callback_url } = job.payload;

  const results = [];

  // Process operations sequentially or in parallel
  for (const operation of operations) {
    try {
      const result = await processOperation(operation);
      results.push({
        id: operation.id,
        status: "completed",
        output: result,
      });
    } catch (error) {
      results.push({
        id: operation.id,
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // Callback if provided
  if (callback_url) {
    try {
      await axios.post(callback_url, {
        job_id: job.id,
        status: results.every((r) => r.status === "completed") ? "success" : "partial",
        results,
      });
    } catch (error) {
      console.error("Error sending batch callback:", error);
    }
  }
}

/**
 * Process single operation (generate, audit, research)
 */
async function processOperation(operation: Record<string, any>) {
  const { type, config } = operation;

  switch (type) {
    case "generate":
      // TODO: Call content generation API
      return { type: "generate", status: "processed" };

    case "audit":
      // TODO: Call content audit API
      return { type: "audit", status: "processed" };

    case "research":
      // TODO: Call content research API
      return { type: "research", status: "processed" };

    default:
      throw new Error(`Unknown operation type: ${type}`);
  }
}

/**
 * Process workflow job (execute workflow steps)
 */
async function processWorkflowJob(job: QueueJob) {
  const { workflow_id, steps } = job.payload;

  console.log(`Processing workflow ${workflow_id} with ${steps?.length || 0} steps`);

  // TODO: Implement workflow execution
  // Steps could be: generate → audit → publish → notify
}

/**
 * Process cleanup job (delete old records)
 */
async function processCleanupJob(job: QueueJob) {
  const { retention_days = 30 } = job.payload;

  // Clean up old webhook deliveries
  const result = await db.query(
    `
    DELETE FROM webhook_deliveries
    WHERE created_at < NOW() - INTERVAL '${retention_days} days'
    `,
    []
  );

  console.log(`Deleted ${result.rowCount} old webhook deliveries`);
}

/**
 * Worker loop - continuously process jobs
 * Run as a background worker or cron job
 *
 * For Vercel, use:
 * - Cron job: `vercel.json` with cron config
 * - Vercel Queues: Native queue service
 * - External worker: Node.js process with interval loop
 */
export async function workerLoop(
  intervalMs: number = 5000,
  maxDuration: number = 290000 // 4m50s (under 300s function timeout)
) {
  const startTime = Date.now();

  console.log("Queue worker started");

  while (Date.now() - startTime < maxDuration) {
    const job = await processNextJob();

    if (!job) {
      // No jobs, wait before next check
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
      continue;
    }

    console.log(`Processed job: ${job.id} (attempt ${job.attempt_count})`);
  }

  console.log("Queue worker completed");
}
