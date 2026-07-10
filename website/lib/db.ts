import { Pool, neonConfig, type QueryResultRow } from "@neondatabase/serverless";
import ws from "ws";

// Node 20/21 (including local `next dev`) have no global WebSocket; Node 22+
// and Vercel's edge/serverless runtimes do. Without this, Pool.query() fails
// with "All attempts to open a WebSocket to connect to the database failed."
neonConfig.webSocketConstructor = ws;

/**
 * Shared Postgres connection pool (Neon, via Vercel Marketplace).
 * Module-level singleton so Fluid Compute can reuse it across warm invocations.
 */
let pool: Pool | null = null;

function getPool(): Pool {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "Missing DATABASE_URL. Provision a Postgres database (Vercel Marketplace → Neon) " +
        "and run `vercel env pull .env.local`."
    );
  }

  pool = new Pool({ connectionString });
  return pool;
}

export const db = {
  query: <T extends QueryResultRow = QueryResultRow>(
    text: string,
    params: unknown[] = []
  ) => getPool().query<T>(text, params),
};
