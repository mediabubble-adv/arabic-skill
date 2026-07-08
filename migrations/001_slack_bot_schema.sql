-- Slack Bot Infrastructure Schema
-- Phase 9B-1: Slack Bot Integration
-- Version: 1.0

CREATE TABLE IF NOT EXISTS workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id VARCHAR(20) NOT NULL UNIQUE,
  team_name VARCHAR(255) NOT NULL,
  bot_token TEXT NOT NULL,
  bot_user_id VARCHAR(20),
  app_id VARCHAR(20),
  user_id VARCHAR(20),
  refresh_token TEXT,
  plan VARCHAR(50) DEFAULT 'free',
  daily_limit INTEGER DEFAULT 10,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  uninstalled_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_workspaces_team_id ON workspaces (team_id);
CREATE INDEX IF NOT EXISTS idx_workspaces_is_active ON workspaces (is_active);

CREATE TABLE IF NOT EXISTS workspace_quotas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL,
  plan VARCHAR(50) DEFAULT 'free',
  daily_limit INTEGER DEFAULT 10,
  requests_today INTEGER DEFAULT 0,
  reset_at TIMESTAMP DEFAULT (NOW() + INTERVAL '1 day'),
  archived_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(workspace_id),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_workspace_quotas_workspace_id ON workspace_quotas (workspace_id);
CREATE INDEX IF NOT EXISTS idx_workspace_quotas_reset_at ON workspace_quotas (reset_at);

CREATE TABLE IF NOT EXISTS workspace_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL,
  default_dialect VARCHAR(50) DEFAULT 'masri',
  default_tone VARCHAR(100) DEFAULT 'professional',
  rtl_validation BOOLEAN DEFAULT true,
  dialect_purity_check BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(workspace_id),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_workspace_settings_workspace_id ON workspace_settings (workspace_id);

CREATE TABLE IF NOT EXISTS slack_command_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL,
  user_id VARCHAR(20) NOT NULL,
  command VARCHAR(50) NOT NULL,
  dialect VARCHAR(50),
  duration_ms INTEGER,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),

  FOREIGN KEY (workspace_id) REFERENCES workspaces(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_slack_command_logs_workspace_id ON slack_command_logs (workspace_id);
CREATE INDEX IF NOT EXISTS idx_slack_command_logs_user_id ON slack_command_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_slack_command_logs_command ON slack_command_logs (command);
CREATE INDEX IF NOT EXISTS idx_slack_command_logs_created_at ON slack_command_logs (created_at);

COMMENT ON TABLE workspaces IS 'Slack workspace installations with OAuth tokens and configuration';
COMMENT ON TABLE workspace_quotas IS 'Daily request quotas per workspace (free: 10/day, pro: 100/day)';
COMMENT ON TABLE workspace_settings IS 'Workspace-level feature flags and default preferences';
COMMENT ON TABLE slack_command_logs IS 'Command execution logs for analytics and debugging';

COMMENT ON COLUMN workspaces.team_id IS 'Slack workspace team ID (T...)';
COMMENT ON COLUMN workspaces.bot_token IS 'Slack bot access token (encrypted in production)';
COMMENT ON COLUMN workspaces.refresh_token IS 'OAuth refresh token for long-lived tokens';
COMMENT ON COLUMN workspace_quotas.reset_at IS 'When the daily quota resets (UTC)';
COMMENT ON COLUMN slack_command_logs.duration_ms IS 'Command execution time in milliseconds';
