# Phase 9B-2: Webhooks API Design Specification

**Status:** Design Phase (Weeks 1-2)  
**Version:** v1.0  
**Last Updated:** 2026-07-07

---

## Overview

Allow CI/CD pipelines and external services to trigger Arabic Skill audits, research, and content generation via HTTP webhooks.

**Use Cases:**
- GitHub Actions: Run audit on PR with `@arabic-skill audit` comment
- GitLab CI: Auto-validate Arabic content before merge
- Jenkins/CircleCI: Batch audit on deployment
- Custom tools: Any service that can send HTTP POST

---

## API Endpoints

### 1. Register Webhook

**Endpoint:** `POST /api/webhooks`

**Request:**
```json
{
  "event_type": "github_pr_comment",
  "url": "https://github.com/my-org/my-repo/issues/42",
  "dialect": "masri",
  "auto_comment": true,
  "rate_limit": 100
}
```

**Response:**
```json
{
  "success": true,
  "webhook_id": "wh_abc123xyz789",
  "auth_token": "sk_test_abc123xyz789",
  "created_at": "2026-07-07T10:30:00Z",
  "status": "active",
  "next_webhook": "/api/webhooks/wh_abc123xyz789"
}
```

**Status Codes:**
- `201` Created — Webhook registered
- `400` Bad Request — Invalid event_type or url
- `401` Unauthorized — Missing or invalid API key
- `429` Too Many Requests — Rate limit exceeded

---

### 2. List Webhooks

**Endpoint:** `GET /api/webhooks`

**Query Parameters:**
- `status` (optional) — active, inactive, error
- `event_type` (optional) — github_pr_comment, gitlab_mr, manual, custom
- `limit` (optional, default 20) — Max results
- `offset` (optional, default 0) — Pagination offset

**Response:**
```json
{
  "success": true,
  "webhooks": [
    {
      "webhook_id": "wh_abc123xyz789",
      "event_type": "github_pr_comment",
      "status": "active",
      "created_at": "2026-07-07T10:30:00Z",
      "last_triggered": "2026-07-07T15:45:00Z",
      "success_count": 5,
      "failure_count": 0,
      "next_link": "/api/webhooks/wh_abc123xyz789"
    }
  ],
  "total": 3,
  "has_more": false
}
```

---

### 3. Get Webhook Details

**Endpoint:** `GET /api/webhooks/{webhook_id}`

**Response:**
```json
{
  "success": true,
  "webhook": {
    "webhook_id": "wh_abc123xyz789",
    "event_type": "github_pr_comment",
    "url": "https://github.com/my-org/my-repo/issues/42",
    "dialect": "masri",
    "status": "active",
    "auto_comment": true,
    "created_at": "2026-07-07T10:30:00Z",
    "last_triggered": "2026-07-07T15:45:00Z",
    "success_count": 5,
    "failure_count": 0,
    "next_run": "2026-07-08T10:00:00Z",
    "auth_token": "sk_test_abc123xyz789",
    "rate_limit": 100
  }
}
```

---

### 4. Update Webhook

**Endpoint:** `PUT /api/webhooks/{webhook_id}`

**Request:**
```json
{
  "dialect": "khaliji",
  "auto_comment": false,
  "rate_limit": 200,
  "status": "active"
}
```

**Response:** Same as Get Webhook

---

### 5. Delete Webhook

**Endpoint:** `DELETE /api/webhooks/{webhook_id}`

**Response:**
```json
{
  "success": true,
  "webhook_id": "wh_abc123xyz789",
  "deleted_at": "2026-07-07T16:00:00Z"
}
```

---

### 6. Trigger Webhook Manually

**Endpoint:** `POST /api/webhooks/{webhook_id}/trigger`

**Request:**
```json
{
  "files": ["src/content/ar.md", "src/content/ui-copy.md"],
  "action": "audit",
  "priority": "normal"
}
```

**Response:**
```json
{
  "success": true,
  "webhook_id": "wh_abc123xyz789",
  "job_id": "job_xyz789abc123",
  "status": "queued",
  "estimated_wait": "5s",
  "check_status_at": "/api/webhooks/{webhook_id}/jobs/job_xyz789abc123"
}
```

---

### 7. Get Job Status

**Endpoint:** `GET /api/webhooks/{webhook_id}/jobs/{job_id}`

**Response:**
```json
{
  "success": true,
  "job": {
    "job_id": "job_xyz789abc123",
    "webhook_id": "wh_abc123xyz789",
    "status": "completed",
    "started_at": "2026-07-07T16:05:00Z",
    "completed_at": "2026-07-07T16:05:03Z",
    "duration_ms": 3200,
    "result": {
      "audit_results": [
        {
          "file": "src/content/ar.md",
          "quality_score": 85,
          "issues": [
            {
              "type": "translationese",
              "line": 5,
              "suggestion": "Replace 'التطبيق' with 'التطبيقة' for Masri"
            }
          ],
          "status": "needs_review"
        }
      ],
      "github_comment_url": "https://github.com/.../issues/42#issuecomment-123456789"
    }
  }
}
```

---

## Webhook Payload Formats

### GitHub PR Comment Trigger

**Incoming Webhook Payload (from GitHub Actions):**
```json
{
  "event": "github_pr_comment",
  "repository": "mediabubble-adv/my-content",
  "owner": "mediabubble-adv",
  "repo": "my-content",
  "pull_request": {
    "number": 42,
    "title": "Add Arabic landing page",
    "author": "john-dev",
    "branch": "feat/landing-page-ar",
    "url": "https://github.com/mediabubble-adv/my-content/pull/42"
  },
  "comment": {
    "author": "jane-content",
    "text": "@arabic-skill audit src/copy/landing.md",
    "timestamp": "2026-07-07T16:00:00Z",
    "url": "https://github.com/.../issues/42#issuecomment-123456789"
  },
  "files": [
    {
      "name": "src/copy/landing.md",
      "url": "https://raw.githubusercontent.com/.../feat/landing-page-ar/src/copy/landing.md",
      "status": "added"
    },
    {
      "name": "src/copy/about.md",
      "url": "https://raw.githubusercontent.com/.../feat/landing-page-ar/src/copy/about.md",
      "status": "modified"
    }
  ],
  "webhook_id": "wh_abc123xyz789",
  "timestamp": "2026-07-07T16:00:00Z"
}
```

**Processing:**
1. Extract dialect from webhook config (or detect from PR context)
2. Download files from GitHub
3. Run audit on each file
4. Post results as GitHub comment (if auto_comment enabled)
5. Return status in job response

---

### GitLab Merge Request Trigger

**Incoming Webhook Payload (from GitLab CI):**
```json
{
  "event": "gitlab_mr_comment",
  "repository": "my-group/my-content",
  "merge_request": {
    "iid": 15,
    "title": "Add Arabic product docs",
    "state": "opened",
    "author": {
      "username": "alex-dev",
      "email": "alex@example.com"
    },
    "web_url": "https://gitlab.com/my-group/my-content/-/merge_requests/15"
  },
  "comment": {
    "author": "sarah-reviewer",
    "text": "/arabic-skill audit docs/ar/**/*.md",
    "timestamp": "2026-07-07T16:05:00Z",
    "url": "https://gitlab.com/.../merge_requests/15#note_123456"
  },
  "files": [
    {
      "path": "docs/ar/product.md",
      "url": "https://gitlab.com/my-group/my-content/-/raw/feat/docs-ar/docs/ar/product.md"
    },
    {
      "path": "docs/ar/pricing.md",
      "url": "https://gitlab.com/my-group/my-content/-/raw/feat/docs-ar/docs/ar/pricing.md"
    }
  ],
  "webhook_id": "wh_abc123xyz789",
  "timestamp": "2026-07-07T16:05:00Z"
}
```

---

### Manual Trigger Payload

**Request (from custom service):**
```json
{
  "action": "audit",
  "dialect": "masri",
  "content": "هذا نص عربي يحتاج تدقيق",
  "metadata": {
    "source": "marketing-campaign",
    "campaign_id": "summer-2026",
    "content_type": "ad-copy"
  }
}
```

**Response:**
```json
{
  "success": true,
  "job_id": "job_123abc456",
  "audit_result": {
    "quality_score": 92,
    "issues": [
      {
        "type": "tone",
        "suggestion": "More casual greeting would work better"
      }
    ]
  }
}
```

---

## Authentication & Security

### API Key Header
```
Authorization: Bearer sk_test_abc123xyz789
```

### Webhook Signing (HMAC-SHA256)

**Slack verifies requests using:**
```
Slack-Request-Timestamp: 1234567890
Slack-Request-Signature: v0=abcd1234...
```

**Calculation:**
```
basestring = f"{timestamp}:{json_body}"
signature = HMAC-SHA256(signing_secret, basestring)
```

**Verification:**
```javascript
const crypto = require('crypto');
const basestring = `${req.headers['X-Request-Timestamp']}:${rawBody}`;
const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
hmac.update(basestring);
const signature = `v0=${hmac.digest('hex')}`;
const isValid = crypto.timingSafeEqual(signature, req.headers['X-Signature']);
```

---

## Rate Limiting & Quotas

### Free Tier
- **Limit:** 10 webhooks per workspace
- **Requests/day:** 100 total
- **Job timeout:** 30 seconds
- **Retry attempts:** 2

### Pro Tier
- **Limit:** 50 webhooks per workspace
- **Requests/day:** 1000 total
- **Job timeout:** 60 seconds
- **Retry attempts:** 3

### Enterprise
- **Limit:** Unlimited webhooks
- **Requests/day:** Unlimited
- **Job timeout:** 120 seconds
- **Retry attempts:** 5

---

## Retry Logic

**Exponential Backoff Strategy:**

```
Attempt 1: Immediate
Attempt 2: 5 seconds later (if failed)
Attempt 3: 25 seconds later (if failed)
Attempt 4+: Give up, log as failed

Max retry attempts:
- Free: 2
- Pro: 3
- Enterprise: 5
```

**Failure Conditions:**
- Timeout (no response after 30s)
- 5xx errors
- Rate limit (429)
- Network errors

**Success Conditions:**
- 2xx response status
- Valid JSON response
- Job status "completed"

---

## Database Schema

### webhooks table
```sql
CREATE TABLE webhooks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  workspace_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  url TEXT NOT NULL,
  dialect TEXT DEFAULT 'masri',
  auto_comment BOOLEAN DEFAULT true,
  auth_token TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active',
  rate_limit INT DEFAULT 100,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  deleted_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (workspace_id) REFERENCES workspaces(id)
);

CREATE INDEX idx_webhook_user ON webhooks(user_id);
CREATE INDEX idx_webhook_workspace ON webhooks(workspace_id);
CREATE INDEX idx_webhook_status ON webhooks(status);
```

### webhook_jobs table
```sql
CREATE TABLE webhook_jobs (
  id TEXT PRIMARY KEY,
  webhook_id TEXT NOT NULL,
  status TEXT NOT NULL,
  action TEXT NOT NULL,
  files JSON,
  result JSON,
  error_message TEXT,
  retry_count INT DEFAULT 0,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (webhook_id) REFERENCES webhooks(id),
  INDEX idx_webhook_jobs(webhook_id),
  INDEX idx_webhook_jobs_status(status)
);

### webhook_logs table
```sql
CREATE TABLE webhook_logs (
  id TEXT PRIMARY KEY,
  webhook_id TEXT NOT NULL,
  job_id TEXT,
  event TEXT NOT NULL,
  status TEXT NOT NULL,
  request_body JSON,
  response_body JSON,
  duration_ms INT,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (webhook_id) REFERENCES webhooks(id),
  FOREIGN KEY (job_id) REFERENCES webhook_jobs(id)
);
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "invalid_event_type",
  "message": "Event type 'github_pr' is not supported. Use 'github_pr_comment', 'gitlab_mr', 'manual', or 'custom'."
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "unauthorized",
  "message": "Invalid or missing API key"
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "error": "rate_limited",
  "message": "You've exceeded your rate limit of 100 webhooks/day",
  "retry_after": "86400s"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "internal_error",
  "message": "An unexpected error occurred. Please try again later.",
  "request_id": "req_abc123xyz789"
}
```

---

## Implementation Notes

### Queue System
- Use Vercel Queues or Bull (Redis)
- Store job metadata in database
- Poll database for completed jobs (no websockets initially)
- Retry failed jobs with exponential backoff

### GitHub Integration
- Fetch file content via GitHub API (authenticated)
- Post audit results as PR comment
- Use GitHub API rate limiting (5000 req/hour)
- Handle draft PRs (skip automatic audit)

### Monitoring
- Log all webhook events (success + failures)
- Track delivery rates per webhook
- Alert on high failure rates (>10%)
- Dashboard showing webhook status + recent jobs

---

## Next Steps

1. ✅ **Review this spec** with backend team
2. **Design database schema** with DBA
3. **Build API endpoints** (Week 2-3)
4. **Create example integrations** (GitHub, GitLab, Jenkins)

---

**Owner:** Backend + DevOps  
**Timeline:** Week 1 (design), Week 3-5 (implementation)
