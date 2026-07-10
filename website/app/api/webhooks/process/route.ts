import { NextRequest, NextResponse } from "next/server";
import { processNextJob } from "@/lib/webhooks/queue";

const MAX_JOBS_PER_INVOCATION = 10;

/**
 * Cron-triggered queue worker. Configured in vercel.json to run every minute.
 * GET /api/webhooks/process
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let processed = 0;
  try {
    for (let i = 0; i < MAX_JOBS_PER_INVOCATION; i++) {
      const job = await processNextJob();
      if (!job) break;
      processed++;
    }
  } catch (error) {
    console.error("Queue worker cron run failed:", error);
    return NextResponse.json({ error: "worker_failed", processed }, { status: 500 });
  }

  console.log(`Queue worker cron run processed ${processed} job(s)`);
  return NextResponse.json({ processed });
}
