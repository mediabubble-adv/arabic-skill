/**
 * Webhook Event Types and Payloads
 * Phase 9B-2: Webhooks Integration
 */

/**
 * Supported webhook event types
 */
export type WebhookEventType =
  | "content.generate"
  | "content.audit"
  | "content.research"
  | "batch.process"
  | "template.create"
  | "template.publish"
  | "workflow.complete"
  | "workspace.configure";

/**
 * Base webhook payload
 */
export interface WebhookPayload {
  id: string;
  event: WebhookEventType;
  timestamp: number;
  workspace_id: string;
  user_id?: string;
  data: Record<string, unknown>;
  metadata?: {
    source?: "slack" | "github" | "api" | "automation";
    correlation_id?: string;
    retry_count?: number;
  };
}

/**
 * Content generation webhook
 */
export interface ContentGeneratePayload extends WebhookPayload {
  event: "content.generate";
  data: {
    type: "caption" | "ad" | "ui-copy" | "blog" | "script" | "email" | "social" | "landing-page";
    dialect: string;
    tone?: string;
    count?: number;
    brief?: string;
    context?: string;
  };
}

/**
 * Content audit webhook
 */
export interface ContentAuditPayload extends WebhookPayload {
  event: "content.audit";
  data: {
    content: string;
    dialect: string;
    check_types?: ("quality" | "translationese" | "tone" | "rtl" | "encoding")[];
  };
}

/**
 * Content research webhook
 */
export interface ContentResearchPayload extends WebhookPayload {
  event: "content.research";
  data: {
    topic: string;
    dialect: string;
    context?: string;
    language?: string;
  };
}

/**
 * Batch processing webhook (multiple operations)
 */
export interface BatchProcessPayload extends WebhookPayload {
  event: "batch.process";
  data: {
    operations: Array<{
      id: string;
      type: "generate" | "audit" | "research";
      config: Record<string, unknown>;
    }>;
    parallel?: boolean;
    callback_url?: string;
  };
}

/**
 * Template creation webhook
 */
export interface TemplateCreatePayload extends WebhookPayload {
  event: "template.create";
  data: {
    name: string;
    description: string;
    dialect: string;
    prompt_template: string;
    output_schema?: Record<string, unknown>;
    tags?: string[];
  };
}

/**
 * Template publish webhook
 */
export interface TemplatePublishPayload extends WebhookPayload {
  event: "template.publish";
  data: {
    template_id: string;
    version: string;
    publish_to?: ("marketplace" | "community" | "private")[];
  };
}

/**
 * Workflow completion webhook
 */
export interface WorkflowCompletePayload extends WebhookPayload {
  event: "workflow.complete";
  data: {
    workflow_id: string;
    workflow_name: string;
    status: "success" | "failed" | "partial";
    results: Array<{
      step_id: string;
      status: "success" | "failed" | "skipped";
      output?: unknown;
      error?: string;
    }>;
    duration_ms: number;
  };
}

/**
 * Workspace configuration webhook
 */
export interface WorkspaceConfigurePayload extends WebhookPayload {
  event: "workspace.configure";
  data: {
    setting_key: string;
    old_value?: unknown;
    new_value: unknown;
    changed_by: string;
  };
}

/**
 * Union type for all webhook payloads
 */
export type AnyWebhookPayload =
  | ContentGeneratePayload
  | ContentAuditPayload
  | ContentResearchPayload
  | BatchProcessPayload
  | TemplateCreatePayload
  | TemplatePublishPayload
  | WorkflowCompletePayload
  | WorkspaceConfigurePayload;

/**
 * Webhook registration
 */
export interface WebhookSubscription {
  id: string;
  workspace_id: string;
  url: string;
  events: WebhookEventType[];
  secret: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  last_triggered_at?: Date;
  failure_count: number;
}

/**
 * Webhook delivery attempt
 */
export interface WebhookDelivery {
  id: string;
  subscription_id: string;
  payload: AnyWebhookPayload;
  status: "pending" | "delivered" | "failed" | "retrying";
  status_code?: number;
  response?: string;
  error?: string;
  attempt_count: number;
  next_retry_at?: Date;
  created_at: Date;
  completed_at?: Date;
}

/**
 * Async queue job
 */
export interface QueueJob {
  id: string;
  type: "webhook" | "batch" | "workflow" | "cleanup";
  payload: AnyWebhookPayload | Record<string, unknown>;
  status: "pending" | "processing" | "completed" | "failed";
  priority: "low" | "normal" | "high";
  attempt_count: number;
  max_attempts: number;
  error?: string;
  result?: unknown;
  created_at: Date;
  started_at?: Date;
  completed_at?: Date;
  next_retry_at?: Date;
}
