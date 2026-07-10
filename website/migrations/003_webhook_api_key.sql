-- Webhook API Key
-- Phase 9B-2 follow-up: dedicated credential for the webhook management API
-- Version: 1.0

ALTER TABLE workspaces ADD COLUMN IF NOT EXISTS webhook_api_key_hash TEXT;

CREATE INDEX IF NOT EXISTS idx_workspaces_webhook_api_key_hash ON workspaces (webhook_api_key_hash);

COMMENT ON COLUMN workspaces.webhook_api_key_hash IS 'SHA-256 hash of the dedicated bearer credential for the webhook management API (register/list/delete/test), separate from bot_token; raw key is shown once at install time';
