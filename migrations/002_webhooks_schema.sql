-- Webhooks & Async Queue Schema
-- Phase 9B-2: Webhooks Integration
-- Version: 1.0

CREATE TABLE IF NOT EXISTS webhook_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL,
  url VARCHAR(2048) NOT NULL,
  events TEXT[] NOT NULL DEFAULT '{}',
  secret VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  failure_count INTEGER DEFAULT 0,
  last_triggered_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_webhook_subscriptions_workspace_id ON webhook_subscriptions (workspace_id);
CREATE INDEX IF NOT EXISTS idx_webhook_subscriptions_is_active ON webhook_subscriptions (is_active);

CREATE TABLE IF NOT EXISTS webhook_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL,
  payload JSONB NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  status_code INTEGER,
  response TEXT,
  error TEXT,
  attempt_count INTEGER DEFAULT 1,
  next_retry_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,

  FOREIGN KEY (subscription_id) REFERENCES webhook_subscriptions(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_webhook_deliveries_subscription_id ON webhook_deliveries (subscription_id);
CREATE INDEX IF NOT EXISTS idx_webhook_deliveries_status ON webhook_deliveries (status);
CREATE INDEX IF NOT EXISTS idx_webhook_deliveries_created_at ON webhook_deliveries (created_at);

CREATE TABLE IF NOT EXISTS queue_jobs (
  id VARCHAR(100) PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  payload JSONB NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  priority VARCHAR(50) DEFAULT 'normal',
  attempt_count INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  error TEXT,
  result JSONB,
  next_retry_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_queue_jobs_status ON queue_jobs (status);
CREATE INDEX IF NOT EXISTS idx_queue_jobs_type ON queue_jobs (type);
CREATE INDEX IF NOT EXISTS idx_queue_jobs_priority ON queue_jobs (priority);
CREATE INDEX IF NOT EXISTS idx_queue_jobs_next_retry ON queue_jobs (next_retry_at);
CREATE INDEX IF NOT EXISTS idx_queue_jobs_created_at ON queue_jobs (created_at);

CREATE TABLE IF NOT EXISTS webhook_events_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  subscription_id UUID,
  job_id VARCHAR(100),
  payload JSONB,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),

  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE,
  FOREIGN KEY (subscription_id) REFERENCES webhook_subscriptions(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_webhook_events_log_workspace_id ON webhook_events_log (workspace_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_log_event_type ON webhook_events_log (event_type);
CREATE INDEX IF NOT EXISTS idx_webhook_events_log_created_at ON webhook_events_log (created_at);

COMMENT ON TABLE webhook_subscriptions IS 'Webhook endpoint registrations per workspace';
COMMENT ON TABLE webhook_deliveries IS 'Webhook delivery attempts and retries';
COMMENT ON TABLE queue_jobs IS 'Async job queue for webhooks, batch, workflow processing';
COMMENT ON TABLE webhook_events_log IS 'Analytics log of all webhook events';

COMMENT ON COLUMN webhook_subscriptions.events IS 'Array of event types to subscribe to';
COMMENT ON COLUMN webhook_subscriptions.secret IS 'HMAC secret for request signature verification';
COMMENT ON COLUMN webhook_deliveries.status_code IS 'HTTP response status code from delivery attempt';
COMMENT ON COLUMN queue_jobs.priority IS 'Job priority for queue ordering (high/normal/low)';
COMMENT ON COLUMN queue_jobs.max_attempts IS 'Maximum number of retry attempts before failure';
COMMENT ON COLUMN queue_jobs.next_retry_at IS 'Scheduled time for next retry (exponential backoff)';

CREATE INDEX IF NOT EXISTS idx_queue_jobs_pending ON queue_jobs (status, next_retry_at, priority, created_at)
  WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_webhook_events_by_type_and_time ON webhook_events_log (workspace_id, event_type, created_at DESC);
