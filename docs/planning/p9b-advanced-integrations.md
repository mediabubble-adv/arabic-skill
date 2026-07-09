# Phase 9B: Advanced Integrations

**Status:** Planning  
**Version:** Post-v1.2.9 (Maintenance Mode baseline)  
**Goal:** Expand platform presence with Slack bot, webhooks, and custom skill templates

---

## Strategic Overview

Phase 9A established distribution (marketplaces), marketing (blog), and community (Discord, newsletter). Phase 9B deepens integration into tools where users already work: **Slack** for team communication, **webhooks** for CI/CD pipelines, and **custom templates** for power users.

### Market Segments
- **Engineering Teams** — Integrate Arabic skill into Slack workflows (#arabic-content channel)
- **DevOps/CI Users** — Webhook triggers for automated content audits in pipeline
- **Power Users** — Custom skill templates for company-specific dialects, brand voices, domains
- **Enterprises** — White-label custom templates + API access

---

## Phase Map

| Phase | Deliverable | Owner | Effort | Timeline |
|-------|-------------|-------|--------|----------|
| 9B-1 | Slack Bot (command + interactive) | Backend | 3-4 weeks | Week 1-4 |
| 9B-2 | Webhooks API (GitHub, CI/CD) | Backend | 2-3 weeks | Week 3-5 |
| 9B-3 | Custom Skill Templates | Frontend + Backend | 2-3 weeks | Week 4-6 |
| 9B-4 | Enterprise Packaging | Ops | 1-2 weeks | Week 6-7 |

**Total Phase 9B Duration:** 6-8 weeks  
**Gating:** Maintenance metrics must support (50+ Discord, 100+ newsletter by Phase 9B start)

---

## Phase 9B-1: Slack Bot Integration

### Overview

Embed Awesome Arabic Skill into Slack workflows:
- **Slash commands:** `/arabic write`, `/arabic audit`, `/arabic help`
- **Interactive buttons:** Approve/reject flows, dialect selector, tone chooser
- **Channels integration:** Automatic content posting, digest summaries
- **Real-time status:** Token usage, plan limits, team activity

### Deliverables

**Slack App Manifest** (`slack-bot/manifest.json`)
- OAuth scopes: `chat:write`, `commands`, `users:read`, `team:read`
- Slash commands: `/arabic`, `/arabic-help`, `/arabic-status`
- Interactive components: modals, buttons, select menus
- Event subscriptions: message reactions, app mentions

**Bot Backend** (`api/slack/`)
- `POST /slack/events` — Handle slash commands
- `POST /slack/interactive` — Handle button clicks, modal submissions
- `GET /slack/install` — OAuth flow (install to workspace)
- `POST /slack/audit` — Automatic content audits on channel triggers

**Slack UI Components**
- Modal: Write caption with dialect/tone selectors
- Modal: Audit content with RTL validation
- Modal: Research topic with results table
- Status dashboard: Token usage per workspace, team performance

### Technical Design

**Architecture:**
```
User in Slack
  ↓
/arabic write "brief" --dialect masri
  ↓
POST /slack/interactive (slash command handler)
  ↓
Validate workspace + user quota
  ↓
Call /arabic CLI via execFile (same as plugin API)
  ↓
Format response in Slack blocks
  ↓
Update message in Slack channel
```

**Rate Limiting:**
- Free tier: 10 requests/day per workspace
- Pro tier: 100 requests/day
- Enterprise: Unlimited

**Quota Tracking:**
- Per-workspace database (Vercel Postgres or similar)
- Track usage by command type (write, audit, research, plan)
- Reset daily at UTC midnight

### Success Criteria

- ✅ Bot published to Slack App Directory
- ✅ 50+ workspaces installed (3-month goal)
- ✅ 5+ commands functional
- ✅ <2s response time on commands
- ✅ 95%+ success rate

---

## Phase 9B-2: Webhooks API

### Overview

Allow CI/CD pipelines and external services to trigger Arabic Skill:
- **GitHub Actions:** Run audit on PR comments
- **GitLab CI:** Auto-validate Arabic content before merge
- **Jenkins/CircleCI:** Batch audit on deployment
- **Custom webhooks:** Any tool that supports HTTP POST

### Deliverables

**Webhook API Endpoints**
- `POST /api/webhooks` — Register webhook
- `POST /api/webhooks/{id}` — Delete webhook
- `GET /api/webhooks` — List webhooks for user
- `POST /api/webhooks/trigger` — Receive webhook payload

**Webhook Types**
- **GitHub:** On PR comment containing `@arabic-skill audit`
- **GitLab:** On merge request, validate Arabic content
- **Manual:** User sends HTTP POST to trigger audit batch
- **Custom:** Template for integrating with other tools

**Payload Format** (GitHub PR audit example)
```json
{
  "event": "github_pr_comment",
  "repository": "mediabubble-adv/my-content",
  "pr": 42,
  "comment": "@arabic-skill audit",
  "files": ["src/copy/banner.md", "src/copy/cta.md"],
  "dialect": "masri",
  "webhook_id": "wh_abc123"
}
```

**Response Format**
```json
{
  "success": true,
  "audit_results": [
    {
      "file": "src/copy/banner.md",
      "issues": [
        {"type": "translationese", "line": 5, "suggestion": "..."}
      ],
      "status": "needs_review"
    }
  ],
  "github_comment": "https://github.com/.../issues/42#comment-123"
}
```

**Technical Implementation**
- Database: Store webhook subscriptions + auth keys
- Queue: Async job processor for batch audits
- Retry logic: Exponential backoff (max 3 retries)
- Logging: Full audit trail in Vercel Functions logs

### Success Criteria

- ✅ 3+ CI/CD integrations documented
- ✅ GitHub Actions example repo
- ✅ Webhook payload validation & signing
- ✅ <5s audit response time (batch)
- ✅ 99%+ delivery success rate

---

## Phase 9B-3: Custom Skill Templates

### Overview

Allow power users and enterprises to create custom skills with their own dialects, brand voices, and domain-specific knowledge.

**Template Types:**
- **Company Brand:** Custom tone, terminology, approved vocabulary
- **Dialect + Domain:** E.g., "Khaliji + Healthcare", "MSA + Finance"
- **Workflow Template:** Pre-configured tasks (brief → write → audit → ship)
- **Reference Pack:** Custom reference files bundled as preset

### Deliverables

**Template Builder UI** (`website/app/templates/`)
- Create from scratch or clone existing
- Upload reference files (.md, .txt)
- Configure dialect + tone + domain
- Test with sample briefs before publishing

**Template Structure**
```
templates/
├── my-company-brand/
│  ├── meta.json (name, description, author)
│  ├── dialect.md (Khaliji-specific rules)
│  ├── tone.md (brand voice guide)
│  ├── domain.md (healthcare terminology)
│  └── test-cases.json (validation examples)
└── healthcare-khaliji/
   ├── meta.json
   ├── dialect.md
   ├── domain.md
   └── test-cases.json
```

**API Endpoints**
- `POST /api/templates` — Create template
- `GET /api/templates/{id}` — View template
- `PUT /api/templates/{id}` — Edit template
- `DELETE /api/templates/{id}` — Delete template
- `POST /api/templates/{id}/publish` — Publish to marketplace
- `GET /api/templates/search` — Search template library

**Template Marketplace**
- Public gallery of community templates
- Rating/review system
- Clone & customize existing templates
- Version history & rollback

### Integration with CLI

Users can load custom templates:
```bash
/arabic write caption --template my-company-brand --dialect khaliji
/arabic audit page.md --template healthcare-khaliji
```

### Success Criteria

- ✅ Template builder launched
- ✅ 10+ community templates published
- ✅ Clone & customize working
- ✅ Version control for templates
- ✅ Documentation for template authors

---

## Phase 9B-4: Enterprise Packaging

### Overview

Package 9B-1, 9B-2, 9B-3 as an enterprise offering with priority support, SLAs, and white-label options.

**Enterprise Tier Includes:**
- Dedicated Slack bot instance
- Unlimited webhook calls
- Custom template support (we build it)
- Priority email support (4h response)
- Usage analytics dashboard
- SSO integration (Okta, Azure AD)

### Deliverables

**Enterprise Pricing Tier**
- **Pro:** $500/month (100 webhook calls, 5 custom templates)
- **Enterprise:** Custom pricing (unlimited, white-label, SLA)

**Enterprise Dashboard** (`website/app/enterprise/`)
- Usage analytics (by team, by command, by dialect)
- Quota management
- Team member management
- Custom template builder access
- Support ticket system

**White-Label Options**
- Custom branding (logo, colors)
- Custom domain (e.g., skill.company.com)
- Whitelisted Slack bot name
- Custom reference files (IP-protected)

### Success Criteria

- ✅ Enterprise tier pricing finalized
- ✅ 2-3 pilot customers onboarded
- ✅ SLA monitoring in place
- ✅ White-label customization working
- ✅ Revenue $2K+/month by Q4 2026

---

## Implementation Timeline

### Week 1-2: Slack Bot (9B-1)
- [ ] Design bot commands & modals
- [ ] Build Slack app manifest
- [ ] Implement slash command handlers
- [ ] Deploy to Slack App Directory
- [ ] Dogfood with internal team
- [ ] Publish to directory + announce

### Week 3-4: Webhooks API (9B-2)
- [ ] Design webhook payload format
- [ ] Implement API endpoints
- [ ] Build GitHub Actions example
- [ ] Create webhook signing/validation
- [ ] Write integration docs
- [ ] Announce to CI/CD community

### Week 4-5: Custom Templates (9B-3)
- [ ] Design template schema
- [ ] Build template builder UI
- [ ] Implement template marketplace
- [ ] Create template documentation
- [ ] Publish 5 template examples
- [ ] Announce to power users

### Week 6-7: Enterprise Packaging (9B-4)
- [ ] Finalize enterprise pricing
- [ ] Build enterprise dashboard
- [ ] Implement white-label features
- [ ] Outreach to potential customers
- [ ] Onboard 1-2 pilot accounts
- [ ] Iterate based on feedback

---

## Success Metrics

| Metric | Target | Timeline |
|--------|--------|----------|
| Slack installs | 50+ workspaces | 3 months |
| Webhook integrations | 20+ active | 3 months |
| Custom templates published | 10+ community | 3 months |
| Enterprise pilots | 2-3 customers | 4 months |
| Revenue | $2K+/month | Q4 2026 |
| Community engagement | GitHub stars +50 | 3 months |

---

## Gating Criteria for Phase 9B Start

**Phase 9A metrics must support Phase 9B investment:**

| Metric | Target | Status |
|--------|--------|--------|
| Discord members | 50+ | ⏳ |
| Newsletter subscribers | 100+ | ⏳ |
| Monthly website users | 500+ | ⏳ |
| NPM installs | Trending to 1K | ⏳ |
| Community sentiment | Positive | ⏳ |

**Go/No-Go Decision:** October 7, 2026 (quarterly review)

---

## Resources Required

### Development
- 1 Backend engineer (Slack bot, webhooks, templates API)
- 1 Frontend engineer (template builder, enterprise dashboard)
- 1 DevOps engineer (infrastructure, monitoring, white-label setup)

### Non-Development
- Slack app review & certification (~2 weeks)
- Documentation & tutorials
- Sales/customer success for enterprise tier

### Infrastructure
- Additional Vercel Functions for Slack & webhooks
- Database expansion (template storage, webhook logs)
- Monitoring & analytics (Vercel, Sentry, custom)

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Slack app approval delays | 2-4 week delay | Start certification early, engage Slack support |
| Webhook abuse/rate limiting issues | Reputational damage | Implement strict rate limiting, SLA monitoring |
| Custom templates complexity | User confusion | Provide extensive docs, template wizard guidance |
| Enterprise sales cycles | Revenue delayed | Start outreach early (Month 1), get pilots quickly |

---

## Phase 9B Success Criteria (Go/No-Go)

**By end of Phase 9B (8 weeks):**

- ✅ Slack bot published & 20+ workspaces installed
- ✅ Webhooks API live with 10+ active integrations
- ✅ 10+ community templates published
- ✅ Enterprise tier pricing & dashboard live
- ✅ 1-2 pilot enterprise customers onboarded
- ✅ $500+/month revenue from enterprise tier

**If success criteria met:** Proceed to Phase 9C (Enterprise Features)  
**If metrics don't support:** Maintain Phase 9B in maintenance mode, extend Phase 9A

---

## Related Planning

- **Phase 9A:** docs/planning/p9a-distribution-marketing.md (completed)
- **Maintenance Mode:** docs/MAINTENANCE_MODE.md (active)
- **Roadmap:** docs/planning/roadmap.md

---

**Next:** Decision on whether to proceed with Phase 9B based on Phase 9A metrics (Oct 7, 2026)
