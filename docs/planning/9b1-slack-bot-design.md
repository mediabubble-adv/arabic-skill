# Phase 9B-1: Slack Bot Design Specification

**Status:** Design Phase (Weeks 1-2)  
**Version:** v1.0  
**Last Updated:** 2026-07-07

---

## Overview

Embed Awesome Arabic Skill into Slack workflows via a native bot with slash commands, interactive modals, and real-time quota tracking.

**Target Users:**
- Engineering teams needing Arabic content in Slack workflows
- Content teams using Slack for editorial collaboration
- Localization managers auditing content before shipping

---

## Command Hierarchy

### Primary Command
`/arabic` — Master command with subcommands

```
/arabic write <type> --dialect <dialect> --tone <tone> [--count 3]
/arabic audit <file-or-text> [--dialect <dialect>]
/arabic research <topic> [--dialect <dialect>]
/arabic help
/arabic status
```

### Slash Commands (Slack App Manifest)

| Command | Description | Scope | Modal? |
|---------|-------------|-------|--------|
| `/arabic write` | Write captions, ads, UI copy, etc. | Required | Yes (brief input) |
| `/arabic audit` | Audit Arabic content for quality | Required | Yes (file upload/paste) |
| `/arabic research` | Run research on a topic | Required | Yes (topic input) |
| `/arabic help` | Show command reference | Optional | No |
| `/arabic status` | Show workspace quota & usage | Optional | No |
| `/arabic settings` | Configure workspace defaults | Optional | Yes (dialect, tone) |

---

## Modal Designs

### Modal 1: Write Brief Input

**Trigger:** `/arabic write caption` (or other types)

**Form Fields:**
- **Brief** (required, textarea) — Content brief (max 1000 chars)
- **Dialect** (required, select menu) — Choose from 11 dialects (default: Masri)
- **Tone** (optional, select menu) — Professional, casual, humorous, formal, etc.
- **Count** (optional, number input) — How many variations (1-5, default: 1)
- **Context** (optional, textarea) — Brand voice, product info, etc.
- **Reference File** (optional, file upload) — Custom reference file (.md)

**Buttons:**
- "✍️ Write" — Submit and generate content
- "Cancel" — Close modal

**Example:**
```
Brief: Write 3 Instagram captions for a fitness app launch in Cairo
Dialect: Masri
Tone: Casual
Count: 3
Reference: [fitness-brand-voice.md]
```

---

### Modal 2: Audit Content Input

**Trigger:** `/arabic audit`

**Form Fields:**
- **Content** (required, textarea or file) — Paste Arabic content or upload .md/.txt file
- **Dialect** (required, select menu) — Which dialect to validate against
- **Check RTL** (checkbox, default checked) — Run RTL structure validation
- **Check Dialect Purity** (checkbox, default checked) — Detect MSA bleed
- **Check Translationese** (checkbox, default checked) — Flag translation patterns

**Buttons:**
- "🔍 Audit" — Run audit
- "Cancel"

**Example:**
```
Content: [paste Arabic landing page copy]
Dialect: Masri
RTL: checked
Dialect Purity: checked
Translationese: checked
```

---

### Modal 3: Research Topic Input

**Trigger:** `/arabic research`

**Form Fields:**
- **Topic** (required, text input) — What to research (e.g., "meta-ads trends", "healthcare terminology")
- **Dialect** (optional, select menu) — Dialect-specific research (default: all)
- **Source Filter** (optional, checkbox group) — Websites, books, academic, social media
- **Max Results** (optional, number input) — How many results to return (1-20, default: 10)

**Buttons:**
- "📚 Research" — Run research
- "Cancel"

---

### Modal 4: Settings (Workspace Defaults)

**Trigger:** `/arabic settings`

**Form Fields:**
- **Default Dialect** (select menu) — Applied to new commands (default: Masri)
- **Default Tone** (select menu) — Professional, casual, etc.
- **RTL Validation** (toggle) — Auto-enable for audits
- **Dialect Purity Check** (toggle) — Auto-enable for audits
- **Channel for Posts** (channel select) — Where to post results (optional)
- **Notification Level** (radio) — On completion, on error only, or silent

**Buttons:**
- "💾 Save Settings" — Save defaults
- "Reset to Defaults"
- "Cancel"

---

## Response Format & Message Layout

### Write Response

**Block Kit Format:**
```
[Header Block]
✍️ Awesome Arabic Skill — Writing Mode
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Section Block]
📋 Brief:
"Write 3 Instagram captions for fitness app launch"

[Section Block]
🎯 Settings:
Dialect: Masri | Tone: Casual | Count: 3

[Divider Block]

[Section Block - Generated Content 1]
Caption 1:
"هاي يا جماعة! 🔥 
تطبيق جديد لياقة غيره اللعبة..."

[Button Block]
👍 Approve | 👎 Reject | 📋 Copy | 🔄 Regenerate

[Section Block - Generated Content 2]
Caption 2:
[...]

[Section Block - Generated Content 3]
Caption 3:
[...]

[Footer Block]
Powered by Awesome Arabic Skill • Quota: 7/10 remaining today
```

---

### Audit Response

**Block Kit Format:**
```
[Header Block]
🔍 Awesome Arabic Skill — Audit Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Section Block]
📄 Content: Landing page copy
🎯 Dialect: Masri
Status: ⚠️ Needs Review

[Divider Block]

[Section Block]
🚨 Critical Issues (2):
1. Line 5: "تطبيق التطبيق" — translationese detected. Suggest: "التطبيق"
2. Line 12: Missing RLE marker before English brand name

⚠️ Warnings (3):
3. Line 8: Formal tone inconsistent with casual brand voice
4. Line 15: Technical jargon should be simplified
5. MSA bleed detected: "الذي" should be "اللي" for Masri

✅ Passes (5):
- RTL structure: valid
- Arabic character set: clean
- Dialect consistency: 95%
- Length: appropriate
- CTA clarity: good

[Divider Block]

[Section Block]
📊 Summary:
Quality Score: 72/100 (needs review)
Estimated Time to Fix: 5-10 min

[Button Block]
💬 View Full Report | 📥 Download | 🔄 Re-audit

[Footer Block]
Quota: 8/10 remaining today
```

---

### Research Response

**Block Kit Format:**
```
[Header Block]
📚 Awesome Arabic Skill — Research Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Section Block]
🔎 Topic: Healthcare terminology (Khaliji)
📊 Results: 8 sources found

[Divider Block]

[Section Block]
1️⃣ **Medical Terminology Guide**
   Source: Healthcare Authority (KSA)
   Relevance: High
   "Terms like 'مصاحة' (hospital), 'طبيب' (doctor) in Khaliji context..."
   
2️⃣ **Digital Health Messaging**
   Source: Industry Report
   Relevance: High
   "App copy recommendations for health apps in Gulf market..."

[Divider Block]

[Button Block]
💾 Save Results | 📥 Export | 🔍 New Search

[Footer Block]
Quota: 9/10 remaining today
```

---

### Status Response

**Block Kit Format:**
```
[Header Block]
📊 Awesome Arabic Skill — Workspace Status
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Section Block]
📍 Workspace: @acme-co
👥 Members using Skill: 12
Tier: Free (10 requests/day)

[Section Block]
📈 Today's Usage:
Write: 3 requests (30%)
Audit: 5 requests (50%)
Research: 2 requests (20%)
⏳ Remaining: 0/10 requests

[Section Block]
⏰ Quota Resets: 23:45 UTC today

[Button Block]
📋 View History | 🔧 Manage Quota | ⬆️ Upgrade to Pro

[Footer Block]
Next billing cycle: 2026-08-07
```

---

## Interactive Components

### Button Actions

| Button | Action | Response |
|--------|--------|----------|
| "Approve" | Mark content as good | Saves to workspace history |
| "Reject" | Flag for revision | Asks for feedback |
| "Copy" | Copy to clipboard | Confirmation message |
| "Regenerate" | Create new variant | Shows new content |
| "Download" | Save as PDF/Markdown | File download link |
| "View Full Report" | Expand audit details | Detailed modal |

### Select Menus (Interactive)

**Dialect Selector:**
- Masri (Egyptian)
- Khaliji (Gulf)
- Levantine
- Saudi (MSA-leaning)
- Iraqi
- Yemeni
- Maghrebi
- MSA (Modern Standard)
- [+ 3 more]

**Tone Selector:**
- Professional
- Casual
- Humorous
- Formal
- Friendly
- Technical

### Approval Workflow

**Scenario: Content manager reviews caption in #arabic-content channel**

```
1. Bot posts auto-generated caption
   [Caption text]
   👍 Approve | 👎 Reject | 🔄 Regenerate

2. Manager clicks "Approve"
   → Saves to workspace content library
   → Notifies author: "Caption approved ✓"
   → Logs to audit trail

3. Manager clicks "Reject"
   → Shows rejection reason modal
   → Bot creates follow-up revision
   → Logs in audit trail
```

---

## Workspace Configuration

### Installation Flow

1. User clicks "Add to Slack" button
2. OAuth confirmation screen
3. Workspace default settings form:
   - Default dialect (Masri)
   - Default tone (Professional)
   - Result posting channel (optional)
4. Confirmation: "Slack bot installed! Try `/arabic help`"

### Quota System

**Free Tier:** 10 requests/day per workspace
**Pro Tier:** 100 requests/day per workspace
**Enterprise:** Unlimited

**Tracking:**
- Per-command breakdown (write, audit, research)
- Daily reset at 00:00 UTC
- Workspace member can't bypass quota
- Graceful error: "Quota exceeded. Upgrade to Pro for unlimited access."

### Workspace Permissions

**Required OAuth Scopes:**
- `chat:write` — Post bot messages
- `commands` — Respond to slash commands
- `users:read` — Get user info for analytics
- `team:read` — Get workspace name/logo
- `files:read` — Read uploaded files for audit
- `reactions:read` — Track emoji reactions

---

## Performance & UX Targets

| Metric | Target | Notes |
|--------|--------|-------|
| Command response time | <2s | Modal appears, content loads in background |
| Write generation time | <5s | Show "generating..." spinner |
| Audit response time | <3s | For <500 char content |
| Modal load time | <1s | No loading spinner needed |
| Error recovery | <2s | Clear error message + retry button |
| Quota check latency | <100ms | Pre-flight validation |

---

## Error Handling

### User-Facing Errors

**"Quota exceeded"**
```
❌ You've used all 10 requests today
Upgrade to Pro for 100/day or wait until tomorrow at 00:00 UTC
[Upgrade Button]
```

**"Command error"**
```
⚠️ Something went wrong
Error: Invalid dialect "masri123"
Try /arabic help for valid options
[View Help]
```

**"Content generation failed"**
```
⚠️ Generation failed
We hit a temporary issue. Try again in 30s
[Retry]
```

---

## Slack App Manifest Structure

```json
{
  "display_information": {
    "name": "Awesome Arabic Skill",
    "description": "Write, audit, research Arabic content in Slack",
    "background_color": "#1a1a1a",
    "long_description": "Slack bot for Arabic content creation, quality audits, and research intelligence"
  },
  "features": {
    "bot_user": {
      "display_name": "Arabic Skill Bot",
      "always_online": true
    },
    "slash_commands": [
      {
        "command": "/arabic",
        "description": "Master command for write, audit, research, help, status, settings",
        "usage_hint": "write caption --dialect masri",
        "should_escape": false
      }
    ]
  },
  "oauth_config": {
    "redirect_urls": ["https://arabic-skill.vercel.app/api/slack/oauth/callback"],
    "scopes": {
      "bot": ["chat:write", "commands", "users:read", "team:read", "files:read", "reactions:read"]
    }
  },
  "settings": {
    "org_deploy_enabled": false,
    "socket_mode_enabled": false,
    "token_rotation_enabled": true
  }
}
```

---

## Mockups & Flows

See: `docs/planning/9b1-slack-bot-mockups/` (Figma link or screenshot directory)

---

## Next Steps

1. ✅ **Review this spec** with team
2. **Create Figma mockups** for each modal
3. **Test OAuth flow** with Slack
4. **Start implementation** (Week 2-3)

---

**Owner:** Product + UX  
**Timeline:** Week 1 (design), Week 2-4 (implementation)
