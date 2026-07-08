# Slack Bot Setup Guide

**Phase 9B-1: Slack Bot Integration**  
**Version:** 1.0  
**Last Updated:** 2026-07-07

## Overview

Awesome Arabic Skill is now available as a Slack bot. This guide walks through:
- Creating a Slack app
- Installing in your workspace
- Configuring environment variables
- Testing the bot

**Prerequisites:**
- Admin access to a Slack workspace
- Node.js 18+
- Access to the Awesome Arabic Skill Vercel deployment

## Step 1: Create Slack App

### Via Slack App Manifest (Recommended)

1. Go to [Slack Apps](https://api.slack.com/apps)
2. Click **"Create an App"** → **"From an app manifest"**
3. Select your workspace
4. Paste the contents of `slack-bot/manifest.json`:

```json
{
  "_metadata": {
    "major_version": 1,
    "minor_version": 1
  },
  "display_information": {
    "name": "Awesome Arabic Skill",
    "description": "Write, audit, research Arabic content in Slack",
    "background_color": "#1a1a1a"
  },
  "features": {
    "bot_user": {
      "display_name": "Arabic Skill Bot",
      "always_online": true
    },
    "slash_commands": [
      {
        "command": "/arabic",
        "url": "https://YOUR_DOMAIN/api/slack/commands",
        "description": "Master command: write, audit, research, help, status, settings",
        "usage_hint": "write caption --dialect masri --count 3",
        "should_escape": false
      }
    ]
  },
  "oauth_config": {
    "redirect_urls": [
      "https://YOUR_DOMAIN/api/slack/oauth/callback"
    ],
    "scopes": {
      "bot": [
        "chat:write",
        "commands",
        "users:read",
        "team:read",
        "files:read",
        "reactions:read"
      ]
    }
  },
  "settings": {
    "event_subscriptions": {
      "request_url": "https://YOUR_DOMAIN/api/slack/events",
      "bot_events": [
        "app_mention",
        "message.app_home"
      ]
    },
    "interactivity": {
      "is_enabled": true,
      "request_url": "https://YOUR_DOMAIN/api/slack/interactive"
    },
    "token_rotation_enabled": true
  }
}
```

**Update the URLs** in the manifest to match your deployment:
- Replace `YOUR_DOMAIN` with your Vercel domain (e.g., `arabic-skill.vercel.app`)

5. Click **"Create"**

## Step 2: Get App Credentials

After creating the app, you'll see the **Basic Information** page. You need:

1. **Client ID** — Under "App Credentials"
2. **Client Secret** — Under "App Credentials"
3. **Signing Secret** — Under "App Credentials"

Save these temporarily — you'll add them to environment variables next.

## Step 3: Configure Environment Variables

### Option A: Local Development

Copy the environment variables template:

```bash
cp .env.slack.example .env.local
```

Edit `.env.local` and fill in the values:

```env
SLACK_CLIENT_ID=xoxb-your-client-id-here
SLACK_CLIENT_SECRET=your-client-secret-here
SLACK_SIGNING_SECRET=your-signing-secret-here

# Your deployment domain
SLACK_OAUTH_CALLBACK_URL=https://your-domain.com/api/slack/oauth/callback
SLACK_COMMANDS_URL=https://your-domain.com/api/slack/commands
SLACK_INTERACTIVE_URL=https://your-domain.com/api/slack/interactive
SLACK_EVENTS_URL=https://your-domain.com/api/slack/events

# Database (required)
DATABASE_URL=postgresql://user:password@localhost:5432/arabic_skill
```

Then load them:

```bash
export $(grep -v '^#' .env.local | xargs)
```

Or in development:

```bash
npm run dev  # Next.js auto-loads .env.local
```

### Option B: Vercel Production

Add environment variables via the Vercel Dashboard or CLI:

```bash
# Link your project first
vercel link --project arabic-skill

# Add secrets one by one
vercel env add SLACK_CLIENT_ID production preview development
# (It will prompt for the value)

vercel env add SLACK_CLIENT_SECRET production preview development
vercel env add SLACK_SIGNING_SECRET production preview development

# Pull to local .env.local
vercel env pull .env.local --yes
```

## Step 4: Install Bot to Workspace

1. In Slack, go to your app's **Installation & Permissions** page
2. Scroll to **"Bot Token Scopes"** — verify these are included:
   - `chat:write`
   - `commands`
   - `users:read`
   - `team:read`
   - `files:read`
   - `reactions:read`

3. Click **"Install to Workspace"** (or **"Reinstall to Workspace"** if upgrading)
4. Authorize the requested permissions
5. You'll be redirected to your app's success page with:
   - **Bot User OAuth Token** (starts with `xoxb-`)
   - **Workspace ID** (starts with `T`)

Copy the **Bot User OAuth Token** — this is automatically saved in the database after OAuth, but you can also set it manually:

```env
SLACK_BOT_TOKEN=xoxb-your-bot-token-here
```

## Step 5: Initialize Database Schema

If using PostgreSQL, run the schema migration:

```bash
psql $DATABASE_URL < migrations/001_slack_bot_schema.sql
```

This creates the required tables:
- `workspaces` — Slack workspace installations
- `workspace_quotas` — Daily request limits
- `workspace_settings` — Dialect & tone preferences
- `slack_command_logs` — Command analytics

## Step 6: Test the Bot

### In Your Slack Workspace

1. **Invite the bot to a channel:**
   ```
   /invite @Arabic Skill Bot
   ```

2. **Try the help command:**
   ```
   /arabic help
   ```

   Expected response:
   ```
   Available Commands:

   /arabic write <type> --dialect <dialect> --count <n> — Generate Arabic content
   /arabic audit --dialect <dialect> — Audit Arabic content
   /arabic research <topic> — Research a topic
   /arabic status — Show workspace quota
   /arabic settings — Configure workspace defaults
   /arabic help — Show this message

   Dialects: masri, khaliji, levantine, msa, and more
   Content Types: caption, ad, ui-copy, blog, script, email, social, landing-page
   ```

3. **Check workspace quota:**
   ```
   /arabic status
   ```

   Expected response:
   ```
   Workspace: Your Workspace Name
   Plan: free
   Daily Limit: 10
   Remaining Today: 10/10
   ```

4. **Try generating content:**
   ```
   /arabic write caption --dialect masri
   ```

### In Local Development

If testing locally with `npm run dev`:

1. Use **ngrok** to expose your local server:
   ```bash
   ngrok http 3000
   ```

2. Update the manifest Request URLs to use your ngrok URL:
   - `https://your-ngrok-url.ngrok.io/api/slack/commands`
   - `https://your-ngrok-url.ngrok.io/api/slack/interactive`
   - `https://your-ngrok-url.ngrok.io/api/slack/events`

3. Reinstall the app to your workspace

## Step 7: Configure Quotas (Optional)

By default:
- **Free plan:** 10 requests/day
- **Pro plan:** 100 requests/day
- **Enterprise:** Unlimited

To change quota limits, edit the environment variables:

```env
SLACK_FREE_TIER_LIMIT=10
SLACK_PRO_TIER_LIMIT=100
SLACK_ENTERPRISE_TIER_LIMIT=0  # 0 = unlimited
```

Or update the database:

```sql
UPDATE workspace_quotas
SET daily_limit = 100
WHERE workspace_id = 'ws_T12345ABCDE';
```

## Troubleshooting

### "Invalid request signature"

**Cause:** Signing secret mismatch or timestamp outside 5-minute window

**Fix:**
- Verify `SLACK_SIGNING_SECRET` matches the app's signing secret
- Check server time is synchronized (NTP)
- Slack rejects requests older than 5 minutes

### "Workspace not found"

**Cause:** Workspace not installed or database not initialized

**Fix:**
- Reinstall the app: **Settings → Reinstall to Workspace**
- Verify database tables exist: `SELECT * FROM workspaces;`
- Check `workspace.team_id` matches Slack workspace ID (starts with `T`)

### Bot doesn't respond to commands

**Cause:** Request URLs not pointing to your deployment

**Fix:**
- Update manifest Request URLs in **Settings → Event Subscriptions**
- Reinstall the app
- Check Vercel logs for errors

### "Quota exceeded"

**Cause:** Workspace has reached daily limit

**Fix:**
- Wait until quota resets (UTC midnight)
- Upgrade to Pro plan
- Set higher limit in `SLACK_*_TIER_LIMIT` env vars

### Commands work but responses are slow

**Cause:** Cold starts or database latency

**Fix:**
- Use connection pooling (Neon serverless driver)
- Reduce database calls by caching workspace settings
- Use Vercel Fluid Compute for faster executions

## Command Reference

See [slack-commands.md](./slack-commands.md) for detailed command documentation.

## API Reference

See [slack-api.md](./slack-api.md) for webhook payload formats and event types.

## Monitoring

Access bot analytics and logs:

- **Command logs:** `SELECT * FROM slack_command_logs;`
- **Workspace quotas:** `SELECT * FROM workspace_quotas;`
- **Vercel logs:** `vercel logs https://arabic-skill.vercel.app`

## Support

For issues or questions:
- **GitHub Discussions:** https://github.com/mediabubble-adv/arabic-skill/discussions
- **Email:** support@mediabubble-adv.com
- **Discord:** https://discord.gg/your-discord-server

---

**Next Steps:**
- ✅ Invite team members to use the bot
- ✅ Create custom brand voice templates (see [template-author-guide.md](./template-author-guide.md))
- ✅ Set up webhooks for automated workflows (see [webhooks-setup.md](./webhooks-setup.md))
- ✅ Upgrade to Pro plan for higher quotas
