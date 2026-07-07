# Phase 9B-1: Slack Bot Integration

**Status:** Planning  
**Effort:** 3-4 weeks  
**Target:** 50+ workspaces installed (3-month goal)

---

## Slack Bot Specification

### Commands

#### `/arabic write`
```
/arabic write "Create a Ramadan greeting for fitness app" --dialect masri --tone native
```

- Launches modal with brief input
- Dialect selector: Masri, MSA, Khaliji, Levantine, etc.
- Tone selector: native, formal, casual, persuasive
- Count: 1-5 variations
- Response: Posted in thread, threaded replies with variations

#### `/arabic audit`
```
/arabic audit "Please check this caption for quality"
```

- User pastes text or attaches file
- Checks for: translationese, RTL issues, register mismatch
- Response: Summary in modal with issues highlighted
- Option to "Approve" or "Request Changes"

#### `/arabic research`
```
/arabic research "Best practices for Ramadan e-commerce"
```

- Returns research findings in digest format
- Links to sources
- Threaded in Slack

#### `/arabic help`
```
/arabic help
```

- Shows available commands
- Links to documentation
- Shows workspace quota usage

#### `/arabic status`
```
/arabic status
```

- Workspace usage stats (requests used, remaining)
- Team performance (most active users, popular commands)
- Plan tier (free, pro, enterprise)

---

## Bot Modals

### Write Modal
```
Title: Create Arabic Content

Fields:
- Brief (text area): "What do you want to write?"
- Dialect (select): [Masri, MSA, Khaliji, Levantine, etc.]
- Tone (select): [Native, Formal, Casual, Persuasive]
- Count (select): [1-5 variations]

Buttons:
[Generate] [Cancel]
```

### Audit Modal
```
Title: Audit Arabic Content

Fields:
- Content (text area): "Paste text to audit"
- Checks (multi-select):
  ✓ Translationese
  ✓ RTL validation
  ✓ Register matching
  ✓ Dialect purity

Buttons:
[Audit] [Cancel]
```

---

## Technical Architecture

### Database Schema

**Workspaces**
```sql
CREATE TABLE slack_workspaces (
  workspace_id TEXT PRIMARY KEY,
  team_id TEXT,
  team_name TEXT,
  installed_at TIMESTAMP,
  plan ENUM('free', 'pro', 'enterprise'),
  quota_daily INT DEFAULT 10,
  webhook_secret TEXT,
  custom_reference_id TEXT
);

CREATE TABLE slack_usage (
  workspace_id TEXT,
  user_id TEXT,
  command TEXT,
  timestamp TIMESTAMP,
  tokens_used INT,
  status ENUM('success', 'failed')
);
```

**Quota Reset**
- Free: 10 requests/day (UTC midnight)
- Pro: 100 requests/day
- Enterprise: Unlimited

### API Endpoints

```
POST /api/slack/events
  - Handle slash commands
  - Validate request signature
  - Route to command handler
  - Track usage

POST /api/slack/interactive
  - Handle button clicks
  - Handle modal submissions
  - Route to handler
  - Update UI with results

GET /api/slack/install
  - OAuth flow
  - Redirect to Slack authorization
  - Handle callback
  - Store workspace config

POST /api/slack/audit
  - Webhook for automated audits
  - Triggered on channel patterns
  - Post results in thread
```

---

## Implementation Phases

### Phase 1: Bot Manifest & Setup (Week 1)
- [ ] Create Slack app in Slack API console
- [ ] Define scopes & permissions
- [ ] Generate bot token & signing secret
- [ ] Deploy manifest (JSON file)
- [ ] Test locally with Slack CLI

### Phase 2: Command Handlers (Week 1-2)
- [ ] Implement `/arabic write` handler
- [ ] Implement `/arabic audit` handler
- [ ] Implement `/arabic research` handler
- [ ] Implement `/arabic help` handler
- [ ] Implement `/arabic status` handler
- [ ] Build response formatting (Slack blocks)

### Phase 3: Database & Quota (Week 2)
- [ ] Design workspace/usage schema
- [ ] Implement quota checking
- [ ] Implement usage logging
- [ ] Build quota reset cron job
- [ ] Test quota limits

### Phase 4: OAuth & Install Flow (Week 2-3)
- [ ] Implement OAuth flow
- [ ] Store workspace config
- [ ] Generate bot tokens
- [ ] Implement /slack/install endpoint
- [ ] Test install from Slack app directory

### Phase 5: Testing & Certification (Week 3-4)
- [ ] Internal dogfooding (MediaBubble team)
- [ ] Fix bugs found in testing
- [ ] Submit to Slack App Review
- [ ] Work with Slack support on certification
- [ ] Publish to app directory

---

## Success Criteria

- ✅ Bot published to Slack App Directory
- ✅ 5+ commands functional & tested
- ✅ <2s response time (p95)
- ✅ 50+ workspaces installed (3-month goal)
- ✅ <1% error rate
- ✅ Quota system preventing abuse

---

## Documentation

- Slack app privacy policy
- Bot setup guide (for users installing to workspace)
- Command reference guide
- Workspace admin guide (quota management, team settings)
- Troubleshooting guide

---

## Launch Announcement

**Target:** Slack community (dev-focused)
- "Awesome Arabic Skill now in Slack!"
- Feature video: 30 sec demo of `/arabic write`
- Blog post: "How to use Awesome Arabic Skill in Slack"
- Twitter/LinkedIn announcement

**Channels:**
- Twitter: @mediabubble_adv
- LinkedIn: MediaBubble
- Slack community spaces (ProductHunt, dev communities)
- Product Hunt (if re-launching with new feature)

---

**Next:** Proceed to Phase 9B-2 (Webhooks API) after Slack bot certification
