# Webhooks Setup Guide

**Phase 9B-2** — Register HTTP webhooks to trigger Arabic content generation, audits, and research from CI/CD or external automation.

Companion guides: [github-actions-integration.md](./github-actions-integration.md), [slack-api.md](./slack-api.md).

## Overview

Webhooks let external systems POST structured events to Awesome Arabic Skill. Requests are verified with HMAC-SHA256, queued for async processing, and retried with exponential backoff.

**Prerequisites:**

- Deployed Vercel app with database migrations applied
- `migrations/002_webhooks_schema.sql` applied
- `CRON_SECRET` set for the queue worker

## Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/webhooks/receive?id={webhook_id}` | Ingest signed webhook payloads |
| `GET` | `/api/webhooks/health` | Health + queue statistics |
| `GET` | `/api/webhooks/process` | Cron worker (processes pending jobs) |

Implementation: `website/lib/webhooks/handler.ts`, `website/lib/webhooks/queue.ts`, `website/lib/webhooks/management.ts`.

## Register a webhook

Subscriptions are stored in `webhook_subscriptions` (see `website/lib/webhooks/management.ts`):

```typescript
createWebhook(workspaceId, url, events)
```

Each subscription receives:

- `id` — pass as `?id=` on receive URL
- `secret` — used to sign/verify payloads (store securely; shown once at creation)

### Supported event types

From `website/lib/webhooks/types.ts`:

| Event | Purpose |
|-------|---------|
| `content.generate` | Write captions, ads, UI copy, etc. |
| `content.audit` | Quality / RTL / tone audit |
| `content.research` | Research-mode topic run |
| `batch.process` | Multiple operations in one job |
| `template.create` | Create a custom template record |
| `template.publish` | Publish template version |
| `workflow.complete` | Report multi-step workflow results |
| `workspace.configure` | Workspace setting change |

## Send a webhook

### URL

```
POST https://YOUR_DOMAIN/api/webhooks/receive?id=WH_WEBHOOK_ID
Content-Type: application/json
X-Webhook-Signature: sha256=<hmac_hex>
X-Webhook-Id: WH_WEBHOOK_ID   (optional alternative to query param)
```

### Signature

Compute HMAC-SHA256 over the **raw JSON body** using the subscription secret:

```
sha256=HMAC_SHA256(secret, body)
```

Send the result in `X-Webhook-Signature`. Mismatched signatures return `401`.

### Example: content audit

```json
{
  "id": "evt_20260708_001",
  "event": "content.audit",
  "timestamp": 1720440000,
  "workspace_id": "ws_abc123",
  "data": {
    "content": "اكتشف تطبيقنا الجديد اليوم!",
    "dialect": "masri",
    "check_types": ["quality", "translationese", "rtl"]
  },
  "metadata": {
    "source": "github",
    "correlation_id": "pr-80"
  }
}
```

### Example: content generate

```json
{
  "id": "evt_20260708_002",
  "event": "content.generate",
  "timestamp": 1720440000,
  "workspace_id": "ws_abc123",
  "data": {
    "type": "caption",
    "dialect": "masri",
    "count": 3,
    "brief": "Ramadan promo for fintech app"
  }
}
```

### Responses

| Status | Meaning |
|--------|---------|
| `202` | Accepted and queued (`received: true`, `job_id`) |
| `400` | Missing webhook ID |
| `401` | Missing or invalid signature |
| `404` | Unknown or inactive webhook |
| `202` (alternate) | Event type not subscribed (still acknowledged) |

Processing is async — poll delivery logs or wire a `callback_url` in `batch.process` payloads.

## Health check

```
GET https://YOUR_DOMAIN/api/webhooks/health
```

Example response:

```json
{
  "status": "healthy",
  "timestamp": "2026-07-08T12:00:00.000Z",
  "database": "connected",
  "queue": {
    "pending": 2,
    "processing": 1,
    "failed": 0
  }
}
```

## Queue worker (cron)

Configure Vercel Cron to hit `/api/webhooks/process` with header:

```
Authorization: Bearer ${CRON_SECRET}
```

`website/vercel.json` schedules this at `0 0 * * *` (once daily) — the Vercel Hobby plan
rejects the deployment outright if a cron schedule runs more than once a day. Upgrade to
Pro to raise the frequency (down to once a minute) for lower webhook-delivery latency.

Vercel Cron only fires on Production deployments — a preview deployment (PR branch) will
never run this worker, so queued jobs sit `pending` until promoted to production. To
verify queue processing on a preview, call `GET /api/webhooks/process` directly with the
`CRON_SECRET` header instead of waiting for the schedule.

The worker drains `queue_jobs` (max attempts: 3, exponential backoff). Failed jobs increment `failure_count` on the subscription.

## GitHub Actions integration

Use the reusable workflows in `.github/workflows/` or follow [github-actions-integration.md](./github-actions-integration.md) to:

1. Detect changed Arabic content files
2. POST audit events or notify Slack on failure
3. Upload artifacts from audit results

For Slack-only notifications (no Arabic Skill webhook), use `SLACK_WEBHOOK_URL` with `slackapi/slack-github-action`.

## Database tables

`migrations/002_webhooks_schema.sql`:

- `webhook_subscriptions` — registered endpoints + secrets
- `webhook_deliveries` — delivery attempts and status codes
- `queue_jobs` — async processing queue
- `webhook_events_log` — analytics / audit trail

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `401 Invalid signature` | Sign the exact raw body bytes; check secret rotation |
| `404 Webhook not found` | Verify `?id=` matches `webhook_subscriptions.id` and `is_active = true` |
| Jobs stay `pending` | Confirm cron calls `/api/webhooks/process` with `CRON_SECRET` |
| `503` on health | Database unreachable — check `DATABASE_URL` / Neon status |

## Related

- [slack-api.md](./slack-api.md) — Slack Events API (separate integration)
- [template-author-guide.md](./template-author-guide.md) — `template.create` / `template.publish` payloads
