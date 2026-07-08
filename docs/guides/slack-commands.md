# Slack Bot Command Reference

**Phase 9B-1: Slack Bot Integration (planned — not yet shipped)**  
**Status:** Draft / pre-greenlit  
**Last Updated:** 2026-07-07

## Master Command: `/arabic`

All commands use the `/arabic` master command with subcommands:

```
/arabic <subcommand> [options]
```

## Subcommands

### 1. `/arabic write` — Generate Arabic Content

Generate original Arabic content with dialect and tone control.

**Syntax:**
```
/arabic write <type> [--dialect <dialect>] [--count <n>]
```

**Parameters:**
- `<type>` — Content type (required)
  - `caption` — Social media caption (100-300 chars)
  - `ad` — Ad copy or advertisement
  - `ui-copy` — User interface text
  - `blog` — Blog post excerpt (500+ words)
  - `script` — Video or podcast script
  - `email` — Email subject line or body
  - `social` — Social media post
  - `landing-page` — Landing page headline/CTA

- `--dialect <dialect>` — Target dialect (optional, defaults to workspace setting)
  - `masri` — Egyptian Arabic (most widely understood)
  - `khaliji` — Gulf Arabic
  - `levantine` — Levantine Arabic (Syria, Lebanon, Palestine)
  - `msa` — Modern Standard Arabic (formal, media)
  - `moroccan` — Moroccan Darija
  - `algerian` — Algerian Darija
  - `saudi` — Saudi Arabic
  - `yemeni` — Yemeni Arabic
  - `iraqi` — Iraqi Arabic
  - `uae` — UAE Arabic
  - `kuwaiti` — Kuwaiti Arabic
  - `palestinian` — Palestinian Arabic

- `--count <n>` — Number of variations to generate (default: 1, max: 5)

**Examples:**

```
/arabic write caption --dialect masri
```
→ Generates 1 Egyptian Arabic social media caption

```
/arabic write ad --dialect khaliji --count 3
```
→ Generates 3 Gulf Arabic ad copies for comparison

```
/arabic write email --count 2
```
→ Generates 2 email copies in workspace default dialect

**Response Format:**
- Title + parameters
- Generated content (with "Approve", "Reject", "Regenerate" buttons)
- Quality score (0-100)

---

### 2. `/arabic audit` — Audit Arabic Content

Analyze Arabic content for quality, authenticity, and brand alignment.

**Syntax:**
```
/arabic audit [--dialect <dialect>] [--file <file-id>]
```

**Parameters:**
- `--dialect <dialect>` — Dialect to audit against (optional, defaults to workspace setting)
- `--file <file-id>` — Audit an uploaded file (optional)

**Examples:**

```
/arabic audit --dialect masri
```
→ Opens a modal to paste content for auditing

```
/arabic audit --dialect msa --file F123456
```
→ Audits an uploaded document against Modern Standard Arabic standards

**Response Format:**
- Quality score (0-100)
- Issues found (translationese, tone mismatch, dialect inconsistency, etc.)
- Suggestions for improvement
- "View Full Report" button for detailed analysis

---

### 3. `/arabic research` — Research Topics

Discover terminology, cultural insights, and dialect-specific examples.

**Syntax:**
```
/arabic research <topic> [--dialect <dialect>]
```

**Parameters:**
- `<topic>` — Topic to research (required)
- `--dialect <dialect>` — Focus on specific dialect (optional)

**Examples:**

```
/arabic research technology --dialect masri
```
→ Shows Egyptian Arabic terminology for tech concepts

```
/arabic research fashion --dialect khaliji
```
→ Shows Gulf Arabic terms used in fashion industry

**Response Format:**
- Topic overview
- Dialect-specific terminology table
- Cultural considerations
- Related topics

---

### 4. `/arabic help` — Show Command Help

Display available commands and usage hints.

**Syntax:**
```
/arabic help
```

**Examples:**

```
/arabic help
```
→ Shows list of all commands with syntax

**Response Format:**
- Command list with descriptions
- Available dialects
- Available content types
- Link to full documentation

---

### 5. `/arabic status` — Show Workspace Quota

Check your workspace's daily request quota and remaining capacity.

**Syntax:**
```
/arabic status
```

**Examples:**

```
/arabic status
```
→ Shows:
```
Workspace: Your Company
Plan: free
Daily Limit: 10
Remaining Today: 7/10
```

**Response Format:**
- Workspace name
- Current plan (free, pro, enterprise)
- Daily request limit
- Remaining requests
- "Upgrade to Pro" button if on free plan

---

### 6. `/arabic settings` — Configure Workspace Defaults

Customize workspace-level settings (default dialect, tone preferences, validation rules).

**Syntax:**
```
/arabic settings [--dialect <dialect>] [--tone <tone>]
```

**Parameters:**
- `--dialect <dialect>` — Set default dialect for all commands
- `--tone <tone>` — Set default tone/brand voice
- `--rtl-validation` — Enable/disable RTL text validation
- `--dialect-purity` — Enable/disable strict dialect consistency checks

**Examples:**

```
/arabic settings --dialect masri
```
→ Sets Egyptian Arabic as default for all future commands

```
/arabic settings --tone professional
```
→ Sets "professional" brand voice as default

**Response Format:**
- Modal form to update settings
- Current settings display
- "Save" and "Cancel" buttons

---

## Global Options

These options work with any command:

### `--tone <tone>`
Override workspace tone for this command (does not change default).

Examples: `professional`, `casual`, `formal`, `creative`, `friendly`

```
/arabic write caption --tone casual --dialect masri
```

### `--verbose`
Show additional details in response (full metadata, processing time, etc.)

```
/arabic audit --verbose
```

---

## Interactive Components

After receiving a response, you can interact with buttons and menus:

### Write Command Buttons
- ✅ **Approve** — Accept the generated content
- 👎 **Reject** — Request a different approach
- 🔄 **Regenerate** — Generate a new variation

### Audit Command Buttons
- 📋 **View Full Report** — Show detailed audit results
- 💾 **Save to Channel** — Post audit results in channel
- 📤 **Export PDF** — Download audit report as PDF

### Quota Buttons
- 📊 **View Usage** — Show historical usage statistics
- 📈 **View Plan** — Compare plans and pricing
- 🚀 **Upgrade to Pro** — Go to billing page

---

## Error Messages

### "Quota exceeded"
You've reached your daily request limit.
- Free tier: 10 requests/day
- Pro tier: 100 requests/day
- Enterprise: Unlimited

**Solution:** Upgrade to Pro plan or wait until tomorrow (quota resets at UTC midnight)

### "Invalid dialect"
The dialect you specified is not recognized.

**Solution:** Use `/arabic help` to see available dialects

### "Content too long"
The content you provided exceeds the maximum length.

**Solution:** Break content into smaller chunks and audit separately

### "Workspace not configured"
Your workspace has not been properly installed.

**Solution:** Reinstall the bot: **Settings → Reinstall to Workspace**

---

## Rate Limiting

Commands are rate-limited per workspace per day:

| Plan | Daily Limit | Per-Minute Limit |
|------|-------------|------------------|
| Free | 10 | 2 requests/min |
| Pro | 100 | 10 requests/min |
| Enterprise | Unlimited | No limit |

If you exceed per-minute limits, you'll see:
```
⏳ Please wait before making another request
```

---

## Tips & Tricks

### Generate Variations Quickly
```
/arabic write caption --count 5
```
Get 5 options at once instead of running the command 5 times.

### Compare Dialects
```
/arabic write ad --dialect masri
/arabic write ad --dialect khaliji
/arabic write ad --dialect levantine
```
Generate the same content in multiple dialects for A/B testing.

### Audit Your Own Content
Use `/arabic audit` to quality-check content before posting:
```
/arabic audit --dialect masri
(paste your caption and hit Audit)
```

### Batch Audit Files
Upload multiple documents to the bot channel, then:
```
/arabic audit --file F123 --file F456
```

### Use App Home Tab
Click on the Arabic Skill Bot in Slack to access:
- Command reference
- Settings
- Usage analytics
- Upgrade options

---

## Keyboard Shortcuts (Slack Desktop)

- **Cmd+/** (Mac) or **Ctrl+/** (Windows) — Open command palette
- Type `/arabic` and press **Tab** — Auto-complete available subcommands
- **Up Arrow** — Repeat last command
- **Shift+Enter** — Multi-line input for audit content

---

## Next Steps

- **Setup:** See [slack-bot-setup.md](./slack-bot-setup.md)
- **API Reference:** See [slack-api.md](./slack-api.md)
- **Webhooks:** See [webhooks-setup.md](./webhooks-setup.md)
- **Templates:** See [template-author-guide.md](./template-author-guide.md)
