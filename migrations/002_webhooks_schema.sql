-- Webhooks & Async Queue Schema
-- Phase 9B-2: Webhooks Integration
-- Version: 1.0

-- Webhook Subscriptions table
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

  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE,
  INDEX idx_workspace_id (workspace_id),
  INDEX idx_is_active (is_active)
);

-- Webhook Deliveries table: Track all webhook delivery attempts
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

  FOREIGN KEY (subscription_id) REFERENCES webhook_subscriptions(id) ON DELETE CASCADE,
  INDEX idx_subscription_id (subscription_id),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);

-- Async Queue Jobs table: Track all queued jobs (webhooks, batch, workflows)
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
  updated_at TIMESTAMP DEFAULT NOW(),

  INDEX idx_status (status),
  INDEX idx_type (type),
  INDEX idx_priority (priority),
  INDEX idx_next_retry (next_retry_at),
  INDEX idx_created_at (created_at)
);

-- Webhook Events Catalog table: Log all webhook events for analytics
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
  FOREIGN KEY (subscription_id) REFERENCES webhook_subscriptions(id) ON DELETE SET NULL,
  INDEX idx_workspace_id (workspace_id),
  INDEX idx_event_type (event_type),
  INDEX idx_created_at (created_at)
);

-- Comments for documentation
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

-- Create indexes for performance
CREATE INDEX idx_queue_jobs_pending ON queue_jobs (status, next_retry_at, priority, created_at)
  WHERE status = 'pending';

CREATE INDEX idx_webhook_events_by_type_and_time ON webhook_events_log (workspace_id, event_type, created_at DESC);
