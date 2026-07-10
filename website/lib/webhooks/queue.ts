import { createHmac } from "crypto";
import { db } from "@/lib/db";
import { QueueJob } from "./types";

/**
 * Queue Job Processor
 * Handles async processing of webhooks and batch jobs
 */

/**
 * Process next job from queue
 * Called by cron job or continuous worker
 */
export async function processNextJob(): Promise<QueueJob | null> {
  try {
    const job = await claimNextPendingJob();
    if (!job) {
      return null;
    }

    try {
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

      await updateJobStatus(job.id, "completed", undefined, job.attempt_count);
      return job;
    } catch (error) {
      const nextAttempt = job.attempt_count + 1;
      const message =
        error instanceof Error ? error.message : "Unknown error";

      if (nextAttempt >= job.max_attempts) {
        await updateJobStatus(job.id, "failed", message, nextAttempt);
        console.error(`Job failed after ${job.max_attempts} attempts:`, job.id);
      } else {
        const backoffMs = Math.pow(2, nextAttempt) * 1000;
        await scheduleRetry(job.id, backoffMs, message, nextAttempt);
        console.log(`Job ${job.id} scheduled for retry in ${backoffMs}ms`);
      }

      return { ...job, attempt_count: nextAttempt };
    }
  } catch (error) {
    console.error("Error processing queue job:", error);
    return null;
  }
}

/**
 * Atomically claim the next pending job.
 */
async function claimNextPendingJob(): Promise<QueueJob | null> {
  try {
    const result = await db.query(
      `
      UPDATE queue_jobs
      SET status = 'processing', started_at = NOW(), updated_at = NOW()
      WHERE id = (
        SELECT id
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
      )
      RETURNING id, type, payload, status, priority, attempt_count, max_attempts, error, created_at
      `,
      []
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return {
      id: row.id,
      type: row.type,
      payload:
        typeof row.payload === "string"
          ? JSON.parse(row.payload)
          : row.payload,
      status: row.status,
      priority: row.priority,
      attempt_count: row.attempt_count,
      max_attempts: row.max_attempts,
      error: row.error,
      created_at: new Date(row.created_at),
    };
  } catch (error) {
    console.error("Error claiming next job:", error);
    return null;
  }
}

async function updateJobStatus(
  jobId: string,
  status: string,
  error?: string,
  attemptCount?: number
) {
  try {
    await db.query(
      `
      UPDATE queue_jobs
      SET status = $1,
          error = $2,
          attempt_count = COALESCE($4, attempt_count),
          updated_at = NOW(),
          completed_at = CASE WHEN $1 IN ('completed', 'failed') THEN NOW() ELSE completed_at END
      WHERE id = $3
      `,
      [status, error ?? null, jobId, attemptCount ?? null]
    );
  } catch (error) {
    console.error("Error updating job status:", error);
  }
}

async function scheduleRetry(
  jobId: string,
  backoffMs: number,
  error: string,
  attemptCount: number
) {
  try {
    await db.query(
      `
      UPDATE queue_jobs
      SET status = 'pending',
          attempt_count = $2,
          next_retry_at = NOW() + ($3::double precision * INTERVAL '1 millisecond'),
          error = $4,
          updated_at = NOW()
      WHERE id = $1
      `,
      [jobId, attemptCount, Math.round(backoffMs), error]
    );
  } catch (error) {
    console.error("Error scheduling retry:", error);
  }
}

async function processWebhookJob(job: QueueJob) {
  const { subscription_id, ...payload } = job.payload as { subscription_id: string; [key: string]: unknown };

  const subscription = await db.query(
    "SELECT url, secret FROM webhook_subscriptions WHERE id = $1",
    [subscription_id]
  );

  if (subscription.rows.length === 0) {
    throw new Error(`Subscription not found: ${subscription_id}`);
  }

  const { url, secret } = subscription.rows[0];

  const hmac = createHmac("sha256", secret);
  hmac.update(JSON.stringify(payload));
  const signature = `sha256=${hmac.digest("hex")}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-Webhook-Signature": signature,
      "X-Webhook-ID": subscription_id,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30000),
  });

  if (!response.ok) {
    throw new Error(`Webhook delivery failed: ${response.status}`);
  }

  console.log(`Webhook delivered to ${url}`);
}

async function processBatchJob(job: QueueJob) {
  const { operations, callback_url } = job.payload as {
    operations: Array<{ id: string; type: string; config: Record<string, unknown> }>;
    callback_url?: string;
  };
  const results = [];

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

  if (callback_url) {
    try {
      await fetch(callback_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: job.id,
          status: results.every((r) => r.status === "completed") ? "success" : "partial",
          results,
        }),
      });
    } catch (error) {
      console.error("Error sending batch callback:", error);
    }
  }
}

async function processOperation(operation: { type: string }) {
  const { type } = operation;

  switch (type) {
    case "generate":
      return { type: "generate", status: "processed" };
    case "audit":
      return { type: "audit", status: "processed" };
    case "research":
      return { type: "research", status: "processed" };
    default:
      throw new Error(`Unknown operation type: ${type}`);
  }
}

async function processWorkflowJob(job: QueueJob) {
  const { workflow_id, steps } = job.payload as { workflow_id: string; steps?: unknown[] };
  console.log(`Processing workflow ${workflow_id} with ${steps?.length || 0} steps`);
}

async function processCleanupJob(job: QueueJob) {
  const rawDays = (job.payload as { retention_days?: unknown })?.retention_days ?? 30;
  const retentionDays = Number.parseInt(String(rawDays), 10);

  if (!Number.isFinite(retentionDays) || retentionDays < 1 || retentionDays > 3650) {
    throw new Error("Invalid retention_days for cleanup job");
  }

  const result = await db.query(
    `
    DELETE FROM webhook_deliveries
    WHERE created_at < NOW() - ($1::int * INTERVAL '1 day')
    `,
    [retentionDays]
  );

  console.log(`Deleted ${result.rowCount ?? 0} old webhook deliveries`);
}

export async function workerLoop(
  intervalMs: number = 5000,
  maxDuration: number = 290000
) {
  const startTime = Date.now();

  console.log("Queue worker started");

  while (Date.now() - startTime < maxDuration) {
    const job = await processNextJob();

    if (!job) {
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
      continue;
    }

    console.log(`Processed job: ${job.id} (attempt ${job.attempt_count})`);
  }

  console.log("Queue worker completed");
}
