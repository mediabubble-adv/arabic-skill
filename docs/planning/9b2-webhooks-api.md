# Phase 9B-2: Webhooks API Integration

**Status:** Planning  
**Effort:** 2-3 weeks  
**Target:** 20+ active webhook integrations (3-month goal)

---

## Webhooks API Specification

### Overview

Allow CI/CD pipelines and external services to trigger Arabic Skill audits via HTTP webhooks. Support GitHub, GitLab, Jenkins, and custom integrations.

### Webhook Types

#### GitHub PR Comments
```
Event: PR comment mentioning @arabic-skill
Trigger: "@arabic-skill audit"
Action: Audit Arabic content in PR files
Response: Post audit results as PR comment
```

#### GitLab Merge Requests
```
Event: MR created or updated
Trigger: Auto-audit on MR creation
Action: Check Arabic content for quality
Response: Post findings in MR notes
```

#### CI/CD Pipeline (Jenkins, CircleCI)
```
Event: Manual webhook trigger
Trigger: HTTP POST with file list
Action: Batch audit uploaded content
Response: JSON results + S3/GCS upload
```

#### Custom Webhooks
```
Event: Any HTTP POST
Trigger: User-defined payload
Action: Flexible audit based on payload
Response: JSON response to webhook URL
```

---

## Technical Architecture

### Database Schema

**Webhooks**
```sql
CREATE TABLE webhooks (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  platform TEXT, -- 'github' | 'gitlab' | 'custom'
  url TEXT,
  events TEXT[], -- ['pr_comment', 'mr_update']
  secret TEXT, -- HMAC for signing
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE webhook_logs (
  id TEXT PRIMARY KEY,
  webhook_id TEXT,
  event_type TEXT,
  payload JSONB,
  status INT,
  response TEXT,
  created_at TIMESTAMP
);

CREATE TABLE audit_jobs (
  id TEXT PRIMARY KEY,
  webhook_id TEXT,
  user_id TEXT,
  files TEXT[],
  status ENUM('pending', 'running', 'complete', 'failed'),
  results JSONB,
  created_at TIMESTAMP,
  completed_at TIMESTAMP
);
```

**Quota Tracking**
```sql
CREATE TABLE webhook_quota (
  webhook_id TEXT PRIMARY KEY,
  plan TEXT, -- 'free' | 'pro' | 'enterprise'
  calls_used INT,
  calls_limit INT,
  period_start TIMESTAMP,
  period_end TIMESTAMP
);
```

### API Endpoints

```
POST /api/webhooks
  - Create new webhook subscription
  - Requires: platform, events, url, secret
  - Returns: webhook_id, signing key

DELETE /api/webhooks/{id}
  - Remove webhook subscription
  - Requires: owner verification

GET /api/webhooks
  - List all webhooks for authenticated user
  - Returns: [{id, platform, url, events, active, created_at}]

POST /api/webhooks/github/callback
  - Receive GitHub webhook events
  - Signature verification via X-Hub-Signature-256
  - Auto-detect PR comment mentions

POST /api/webhooks/gitlab/callback
  - Receive GitLab webhook events
  - Signature verification via X-Gitlab-Token

POST /api/webhooks/trigger
  - Manual webhook trigger (for testing)
  - Payload: {files, dialect, tone, webhook_id}
  - Returns: {job_id, status, estimated_time}

GET /api/webhooks/{id}/logs
  - View webhook execution logs
  - Pagination & filtering by date/status
  - Returns: [{event, status, timestamp, response}]
```

### Webhook Payload Format

**GitHub PR Comment Audit**
```json
{
  "event": "github_pr_comment",
  "platform": "github",
  "repository": "user/repo",
  "pr": 42,
  "comment_id": "c123456",
  "comment_body": "@arabic-skill audit",
  "files_changed": [
    {
      "filename": "src/copy/banner.md",
      "type": "modified",
      "content": "مرحبا بك في تطبيقنا"
    }
  ],
  "dialect": "masri",
  "tone": "casual",
  "webhook_id": "wh_abc123",
  "timestamp": "2026-07-15T10:30:00Z"
}
```

**Response Format**
```json
{
  "success": true,
  "job_id": "job_xyz789",
  "audit_results": [
    {
      "file": "src/copy/banner.md",
      "status": "pass",
      "issues": [],
      "score": 95,
      "suggestions": []
    }
  ],
  "summary": {
    "total_files": 1,
    "passed": 1,
    "issues": 0,
    "score": 95
  },
  "github_comment": "https://github.com/user/repo/pull/42#issuecomment-123456789"
}
```

---

## Integration Examples

### GitHub Actions Workflow

```yaml
name: Arabic Content Audit

on:
  pull_request:
    paths:
      - 'src/copy/**'

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Audit Arabic Content
        run: |
          curl -X POST https://api.awesome-arabic-skill.vercel.app/api/webhooks/trigger \
            -H "Content-Type: application/json" \
            -d '{
              "webhook_id": "${{ secrets.ARABIC_SKILL_WEBHOOK_ID }}",
              "files": ["src/copy/banner.md"],
              "dialect": "masri"
            }'
```

### GitLab CI Pipeline

```yaml
audit_arabic:
  stage: test
  image: alpine:latest
  only:
    - merge_requests
  script:
    - |
      curl -X POST https://api.awesome-arabic-skill.vercel.app/api/webhooks/gitlab/callback \
        -H "X-Gitlab-Token: $GITLAB_TOKEN" \
        -d @- <<EOF
      {
        "object_kind": "merge_request",
        "project": {"path": "my/project"},
        "object_attributes": {
          "iid": $CI_MERGE_REQUEST_IID,
          "source_branch": "$CI_COMMIT_REF_NAME"
        }
      }
      EOF
```

### JavaScript/Node.js Example

```javascript
import crypto from 'crypto';

async function auditWithWebhook(files, dialect = 'masri') {
  const webhookId = process.env.WEBHOOK_ID;
  const secret = process.env.WEBHOOK_SECRET;
  
  const payload = { webhookId, files, dialect };
  const signature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  const response = await fetch(
    'https://api.awesome-arabic-skill.vercel.app/api/webhooks/trigger',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
      },
      body: JSON.stringify(payload),
    }
  );
  
  return response.json();
}
```

---

## Implementation Phases

### Phase 1: Core Webhook Infrastructure (Week 1)
- [ ] Design webhook database schema
- [ ] Implement `POST /api/webhooks` (create/delete)
- [ ] Implement `GET /api/webhooks` (list)
- [ ] Build HMAC signature verification
- [ ] Deploy webhook callback infrastructure
- [ ] Set up webhook logging & monitoring

### Phase 2: GitHub Integration (Week 1-2)
- [ ] Implement GitHub webhook receiver
- [ ] Parse PR comment mentions
- [ ] Extract file content from PR
- [ ] Call `/arabic audit` CLI
- [ ] Post results as PR comment
- [ ] Handle GitHub GraphQL API
- [ ] Test with public repo

### Phase 3: GitLab Integration (Week 2)
- [ ] Implement GitLab webhook receiver
- [ ] Parse MR creation events
- [ ] Fetch MR file changes via API
- [ ] Run audit & collect results
- [ ] Post findings in MR notes
- [ ] Handle GitLab API rate limiting

### Phase 4: Custom Webhooks (Week 2-3)
- [ ] Implement flexible webhook trigger
- [ ] Build manual trigger endpoint
- [ ] Async job queue for batch audits
- [ ] Implement polling/retry logic
- [ ] Build webhook logs dashboard
- [ ] Rate limiting & quota enforcement

### Phase 5: Testing & Documentation (Week 3)
- [ ] Integration tests for all platforms
- [ ] Example CI/CD workflows (GitHub, GitLab, Jenkins)
- [ ] Webhook signature verification tests
- [ ] Rate limiting edge cases
- [ ] Error handling & retry logic
- [ ] Launch examples repo with templates

---

## Success Criteria

- ✅ GitHub PR comment audits working
- ✅ GitLab MR audits working
- ✅ Custom webhook trigger API live
- ✅ Webhook logs & monitoring visible
- ✅ 20+ active integrations (3-month goal)
- ✅ <5s audit response time (p95)
- ✅ 99%+ delivery success rate
- ✅ Webhook signature verification working

---

## Monitoring & Observability

### Metrics to Track

**Webhook Metrics**
- Total webhooks created
- Active webhooks (used in last 30 days)
- Webhook success rate (%)
- Avg response time (ms)
- Quota usage by plan

**Integration Metrics**
- GitHub PRs audited
- GitLab MRs audited
- Custom webhook calls
- Platform breakdown (%)

**Error Tracking**
- Failed deliveries (reason: timeout, signature mismatch, etc.)
- Retry success rate
- Platform-specific errors

### Logging & Debugging

```
/api/webhooks/{id}/logs
├── Last 100 events
├── Filter by: status, platform, date range
├── Export: CSV, JSON
└── Debug: view exact payload, response, timing
```

---

## Documentation & Launch

**Developer Guides**
- Webhook setup guide (per-platform)
- Signature verification guide
- Rate limiting & quota docs
- Error handling best practices
- Example workflows (GitHub, GitLab, Jenkins, custom)

**Blog Post**
- "Automate Arabic Content Quality with Webhooks"
- Step-by-step GitHub Actions example
- ROI: reduce manual audits, catch errors early

**Announcement Channels**
- Twitter/LinkedIn: "Arabic Skill now integrates with your CI/CD pipeline!"
- Dev community Slack/Discord
- Product Hunt (if launching feature update)

---

**Next:** Proceed to Phase 9B-3 (Custom Skill Templates) after webhook testing complete
