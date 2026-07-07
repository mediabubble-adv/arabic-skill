import { processNextJob } from "@/api/webhooks/queue";

/**
 * Cron-triggered queue worker
 * Called by vercel.json cron every 1 minute
 *
 * Configuration in vercel.json:
 * {
 *   "crons": [
 *     {
 *       "path": "/api/webhooks/process",
 *       "schedule": "* * * * *"
 *     }
 *   ]
 * }
 */
export async function GET(req: Request) {
  // Verify this is a cron request from Vercel
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let processedCount = 0;

    // Process up to 10 jobs per cron invocation
    for (let i = 0; i < 10; i++) {
      const job = await processNextJob();
      if (!job) break;
      processedCount++;
    }

    return Response.json({
      status: "ok",
      processed_jobs: processedCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Queue worker error:", error);
    return Response.json(
      { error: "Worker failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
