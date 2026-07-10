# Phase 9B: Infrastructure & Monitoring Design

**Status:** Design Phase (Weeks 1-2)  
**Version:** v1.0  
**Last Updated:** 2026-07-07

---

## Overview

Design comprehensive monitoring, logging, and analytics infrastructure to support Phase 9B (Slack bot, webhooks, templates, enterprise tier).

**Goals:**
- Real-time visibility into system health & performance
- Usage analytics for billing & product insights
- SLA monitoring for enterprise tier
- Cost optimization across Vercel, database, queue services

---

## Monitoring Stack

### Components

| Component | Service | Purpose |
|-----------|---------|---------|
| **Logging** | Vercel Functions logs | Raw request/response logs |
| **Error tracking** | Sentry | Exception monitoring & alerting |
| **Analytics** | PostHog / custom | Product usage & feature adoption |
| **Metrics** | Datadog / Prometheus | System performance (latency, CPU, memory) |
| **Uptime** | StatusPage.io | Public status page & SLA tracking |
| **Cost tracking** | Custom dashboard | Vercel, database, queue costs |
| **Dashboards** | Grafana | Unified monitoring dashboard |

---

## Vercel Functions Logging

### Log Locations

**Real-time Logs:**
```
Vercel Dashboard → Project → Functions → Logs
vercel logs --project arabic-skill --follow
```

**Persistent Logs (7 days):**
- Stored in Vercel project logs
- Queryable via Vercel API
- Integration with Datadog for long-term storage

### Log Levels

```
DEBUG   - Detailed flow info (only in dev)
INFO    - Command execution, job start/end
WARN    - Rate limit approaching, quota exceeded
ERROR   - Failed request, exception caught
FATAL   - Service degradation, data loss risk
```

### Example Log Format

```
[2026-07-07T16:05:23Z] INFO
{
  "function": "slack/commands",
  "event_id": "evt_abc123xyz789",
  "workspace_id": "ws_acme-corp",
  "command": "/arabic write caption",
  "duration_ms": 2340,
  "status": "success",
  "quota_remaining": 47,
  "user_id": "u_jane-smith",
  "timestamp": "2026-07-07T16:05:23Z"
}

[2026-07-07T16:05:25Z] WARN
{
  "function": "webhooks/trigger",
  "webhook_id": "wh_abc123xyz789",
  "status": "rate_limited",
  "retry_after": 3600,
  "quota_used": 100,
  "quota_limit": 100
}
```

---

## Sentry Error Tracking

### Configuration

```javascript
// api/index.js
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions
  beforeSend(event) {
    // Filter out expected errors
    if (event.exception?.values?.[0]?.value?.includes("RateLimitError")) {
      return null;
    }
    return event;
  }
});
```

### Alert Rules

**P0 (Critical):**
- Service error rate >5%
- Slack bot response time >10s
- Webhook delivery failure rate >2%
- Database unavailable

**P1 (High):**
- Any 5xx error in Slack endpoint
- Webhook retry count >3
- Template validation failing
- Authentication errors >10/min

**P2 (Medium):**
- Response time >3s (P95)
- Quota check errors
- Rate limit warnings
- API gateway errors

---

## PostHog Analytics

### Custom Events to Track

**Slack Bot Events:**
```javascript
posthog.capture('slack_command_executed', {
  command: 'write',
  dialect: 'masri',
  workspace_id: 'ws_acme',
  duration_ms: 2340,
  success: true,
  quota_before: 50,
  quota_after: 49
});

posthog.capture('slack_workspace_installed', {
  workspace_id: 'ws_acme',
  workspace_name: 'Acme Corp',
  team_size: 47,
  plan: 'pro'
});
```

**Webhook Events:**
```javascript
posthog.capture('webhook_triggered', {
  webhook_id: 'wh_abc123',
  event_type: 'github_pr_comment',
  action: 'audit',
  files_count: 3,
  duration_ms: 3200,
  success: true
});

posthog.capture('webhook_job_completed', {
  job_id: 'job_xyz789',
  status: 'completed',
  issues_found: 5,
  quality_score: 85
});
```

**Template Events:**
```javascript
posthog.capture('template_created', {
  template_id: 'tpl_abc123',
  category: 'company_brand',
  dialect: 'masri',
  visibility: 'private',
  owner_plan: 'enterprise'
});

posthog.capture('template_published', {
  template_id: 'tpl_abc123',
  visibility: 'public',
  estimated_size_kb: 250
});

posthog.capture('template_cloned', {
  source_template_id: 'tpl_abc123',
  new_template_id: 'tpl_new456',
  cloner_plan: 'pro'
});
```

**User Events:**
```javascript
posthog.capture('user_signup_enterprise', {
  user_id: 'u_jane-smith',
  organization: 'Acme Corp',
  plan: 'enterprise',
  source: 'sales_outreach'
});

posthog.capture('team_member_added', {
  workspace_id: 'ws_acme',
  new_member_email: 'john@acme.com',
  invited_by: 'jane@acme.com'
});
```

### Dashboards

**Daily Dashboard:**
- Commands executed (write, audit, research)
- Workspaces active
- New team members joined
- Webhooks triggered
- Templates created/cloned
- Error rate

**Weekly Dashboard:**
- Usage trends (7-day)
- Adoption by plan tier (free, pro, enterprise)
- Feature adoption (Slack, webhooks, templates)
- Top commands by dialect
- Performance metrics (P50, P95, P99 latency)

**Monthly Dashboard:**
- New workspaces signed up
- Churn rate
- Enterprise pilots started
- Custom templates created
- Marketplace popular templates
- Revenue impact (MRR by tier)

---

## Cost Tracking Dashboard

### Services & Budgets

```
┌──────────────────────────────────────────┐
│ Phase 9B Infrastructure Costs             │
├──────────────────────────────────────────┤
│                                          │
│ Monthly Budget: $2,000                    │
│ Current Month Spend: $1,240 (62%)        │
│ Projected End of Month: $1,680            │
│                                          │
│ Breakdown:                               │
│                                          │
│ Vercel Functions:        $680 (55%)      │
│ - Slack bot: $320                        │
│ - Webhooks: $280                         │
│ - Template API: $80                      │
│                                          │
│ Neon (Marketplace):      $320 (26%)      │
│ - webhooks table: $120                   │
│ - templates table: $140                  │
│ - analytics queries: $60                 │
│                                          │
│ Vercel Queues:           $180 (15%)      │
│ - webhook async jobs: $180               │
│                                          │
│ Sentry:                  $60  (5%)       │
│ - Error tracking ($29) + PagerDuty link  │
│                                          │
│ Other (DNS, domain):     $0  (0%)        │
│                                          │
│ Alerts:                                  │
│ ⚠️ Vercel Functions trending high        │
│    Recommend: optimize cold starts       │
│                                          │
│ [View Detailed Breakdown] [Export CSV]   │
└──────────────────────────────────────────┘
```

### Cost Optimization Strategies

**Reduce Slack Bot Costs:**
- Cache command metadata (reduce cold starts)
- Batch analytics events (reduce log volume)
- Use Redis for workspace quota (vs DB lookup per request)

**Reduce Database Costs:**
- Archive old webhook jobs (>30 days) to cold storage
- Use read replicas for analytics queries
- Index frequently queried fields

**Reduce Queue Costs:**
- Batch webhook jobs (wait up to 10s for multiple triggers)
- Use shorter timeout for simple audits (vs full validation)
- Cancel jobs if webhook deleted before processing

---

## SLA Monitoring (Enterprise Only)

### Metrics to Track

**Availability:**
```
Uptime = (Total Time - Downtime) / Total Time
Target: 99.9% = max 43 minutes downtime/month
```

**Response Time:**
```
P95 Latency = 95th percentile response time
Target: <2.5s for Slack bot, <5s for webhooks
```

**Error Rate:**
```
Error Rate = Failed Requests / Total Requests
Target: <0.1% (1 failure per 1,000 requests)
```

### SLA Dashboard

```
┌──────────────────────────────────────────┐
│ Enterprise SLA Metrics (Acme Corp)       │
├──────────────────────────────────────────┤
│                                          │
│ Month: July 2026                         │
│                                          │
│ Availability:         99.97% ✅          │
│ SLA Target:           99.90%             │
│ Status:               Exceeds target     │
│ Downtime this month:  4 minutes          │
│                                          │
│ Latency:                                 │
│ P50:   1.2s                              │
│ P95:   2.1s  ✅ (target: <2.5s)         │
│ P99:   3.5s  ⚠️ (monitor trend)         │
│                                          │
│ Error Rate:           0.03% ✅           │
│ Target:               <0.1%              │
│                                          │
│ SLA Credits Earned:   $0 (no outages)   │
│ Credits Applied:      $0                 │
│                                          │
│ Incident History:                        │
│ 2026-07-01 02:15 UTC — 5 min database   │
│                        downtime (not SLA │
│                        incident)         │
│                                          │
│ [View Detailed Report] [Email Exec]      │
└──────────────────────────────────────────┘
```

---

## Alerting Strategy

### Alert Channels

```
P0 (Critical)
├─ SMS to on-call engineer
├─ PagerDuty page
├─ #incidents Slack channel
└─ ops-escalation@mediabubble-adv.com

P1 (High)
├─ Email to ops team
├─ #alerts Slack channel
└─ PagerDuty without page

P2 (Medium)
├─ #alerts Slack channel
└─ Daily summary email

P3 (Low)
└─ Dashboard only (no alerts)
```

### Example Alert Rules

**Alert: High Error Rate**
```
IF error_rate > 0.5% FOR 5 minutes
THEN send P1 alert
REASON: 1 in 200 requests failing, likely impact to users
```

**Alert: Slack Bot Timeout**
```
IF slack_endpoint latency P95 > 5 seconds FOR 10 minutes
THEN send P1 alert
REASON: Slack times out requests after 3s, users see "Delayed response"
```

**Alert: Webhook Queue Backlog**
```
IF queue_depth > 1000 jobs
THEN send P1 alert
REASON: Queue processing slower than incoming triggers
```

**Alert: Quota System Failure**
```
IF quota_check errors > 10 per minute
THEN send P0 alert
REASON: Users can bypass rate limiting
```

---

## Performance Monitoring

### Key Metrics

**Slack Bot:**
- Command execution time (target: <2s)
- Modal load time (target: <1s)
- Error recovery time (target: <1s retry)

**Webhooks:**
- Payload processing time (target: <3s)
- Job queue latency (target: <5s queue wait)
- GitHub API response time (target: <2s)

**Templates:**
- Template validation time (target: <500ms)
- Marketplace search latency (target: <500ms)
- Clone operation time (target: <2s)

### Performance Dashboard

```
┌──────────────────────────────────────────┐
│ Phase 9B Performance (Last 24h)          │
├──────────────────────────────────────────┤
│                                          │
│ Slack Bot Response Times:                │
│ /write        P50: 1.2s  P95: 2.1s  ✅  │
│ /audit        P50: 0.8s  P95: 1.5s  ✅  │
│ /research     P50: 2.3s  P95: 3.2s  ✅  │
│                                          │
│ Webhook Processing:                      │
│ GitHub        P50: 2.1s  P95: 3.5s  ✅  │
│ GitLab        P50: 2.4s  P95: 3.8s  ✅  │
│ Manual        P50: 0.5s  P95: 0.8s  ✅  │
│                                          │
│ Template Operations:                     │
│ Validate      P50: 0.3s  P95: 0.6s  ✅  │
│ Search        P50: 0.2s  P95: 0.5s  ✅  │
│ Clone         P50: 1.8s  P95: 2.5s  ✅  │
│                                          │
│ Database Queries:                        │
│ SELECT        P50: 10ms  P95: 25ms  ✅  │
│ INSERT        P50: 15ms  P95: 40ms  ✅  │
│ UPDATE        P50: 20ms  P95: 50ms  ✅  │
│                                          │
│ [View Details] [Export] [Archive]        │
└──────────────────────────────────────────┘
```

---

## Logging Best Practices

### What to Log

**Always log:**
- Command/webhook trigger (user request start)
- Duration & status (success/failure)
- Key metrics (tokens used, files processed)
- User/workspace identifiers (for debugging)

**Don't log:**
- API keys or secrets
- Full user content (summarize instead)
- Internal database IDs (ok to include user_id, not row count)

### Log Retention Policy

```
Real-time logs:     7 days (Vercel)
Sentry errors:      30 days (free tier)
PostHog analytics:  90 days (default)
Database logs:      1 year (archived storage)
Audit trail:        7 years (compliance)
```

---

## Implementation Roadmap

### Week 1-2: Setup Core Monitoring

- [ ] Configure Sentry project & error rules
- [ ] Set up PostHog analytics events
- [ ] Create Vercel logging dashboard
- [ ] Build cost tracking spreadsheet
- [ ] Set up PagerDuty for on-call

### Week 3-4: Deploy with Phase 9B Features

- [ ] Instrument Slack bot handlers
- [ ] Instrument webhook API endpoints
- [ ] Instrument template API operations
- [ ] Add analytics events to all features
- [ ] Configure alert rules

### Week 5+: Optimize & Scale

- [ ] Monitor cost trends, optimize expensive operations
- [ ] Refine alert thresholds based on real data
- [ ] Build executive dashboard for stakeholders
- [ ] Implement cost alerting (budget tracking)
- [ ] Automation: auto-scale based on queue depth

---

## Tools & Services (Monthly Cost Estimate)

| Service | Cost | Purpose |
|---------|------|---------|
| Vercel Functions | $300-500 | Compute (scales with usage) |
| Neon (Vercel Marketplace) | $100-200 | Database (scales with storage) |
| Vercel Queues | $50-100 | Async job processing |
| Sentry | $29 | Error tracking |
| PostHog | Free | Product analytics |
| Datadog | Free tier | Metrics (upgrade later) |
| StatusPage.io | $29 | Public status page |
| PagerDuty | $15/user | On-call scheduling |
| **Total** | **$500-900** | |

---

## Success Criteria

- ✅ <200ms P95 latency for Slack bot
- ✅ <0.1% error rate across all endpoints
- ✅ 99.9% uptime for enterprise tier
- ✅ All P0 alerts routed to on-call within 5 minutes
- ✅ Cost within $2,000/month budget
- ✅ Monthly SLA report generated automatically

---

**Owner:** DevOps + Backend  
**Timeline:** Week 1 (design), Week 2-3 (implementation)
