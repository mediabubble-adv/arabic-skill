# Slack API Reference

**Phase 9B-1** — HTTP endpoints and payload shapes for the Awesome Arabic Skill Slack app.

Companion guides: [slack-bot-setup.md](./slack-bot-setup.md), [slack-commands.md](./slack-commands.md).

## Base URL

Replace `YOUR_DOMAIN` with your deployment host (e.g. `arabic-skill.vercel.app`):

```
https://YOUR_DOMAIN/api/slack/
```

## Authentication

All Slack-facing routes verify the request using Slack's signing secret (`SLACK_SIGNING_SECRET`):

- Header: `X-Slack-Request-Timestamp`
- Header: `X-Slack-Signature` (`v0=<hmac>`)

Invalid signatures return `401`. Implementation: `api/slack/auth.ts` → `verifySlackRequest()`.

## Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/slack/oauth/start` | Start OAuth install flow |
| `GET` | `/api/slack/oauth/callback` | OAuth token exchange + workspace registration |
| `POST` | `/api/slack/commands` | Slash command `/arabic` |
| `POST` | `/api/slack/events` | Events API (URL verification + `app_mention`, App Home) |
| `POST` | `/api/slack/interactive` | Block actions, modals, view submissions |

App manifest template: `slack-bot/manifest.json`.

## Slash command payload

`POST /api/slack/commands` — `application/x-www-form-urlencoded` body:

| Field | Description |
|-------|-------------|
| `token` | Deprecated verification token |
| `team_id` | Workspace ID (`T…`) |
| `team_domain` | Workspace subdomain |
| `channel_id` | Channel where command was invoked |
| `channel_name` | Channel name |
| `user_id` | Invoking user (`U…`) |
| `user_name` | Username |
| `command` | `/arabic` |
| `text` | Arguments after the command (e.g. `write caption --dialect masri`) |
| `response_url` | URL for delayed responses (3-minute window) |
| `trigger_id` | Opens modals / interactive flows |

TypeScript shape: `SlackCommand` in `api/slack/auth.ts`.

### Immediate response

The handler acknowledges within 3 seconds with:

```json
{
  "response_type": "ephemeral",
  "text": "⏳ Processing your request..."
}
```

Final output is posted to `response_url` asynchronously (`waitUntil`).

### Error responses

| Status | When |
|--------|------|
| `401` | Invalid signature |
| `404` | Workspace not installed / inactive |
| `429` | Daily quota exceeded (ephemeral blocks + upgrade button) |

## Events API

`POST /api/slack/events`

### URL verification (handshake)

```json
{
  "type": "url_verification",
  "challenge": "3eZbr39qZ4rCZsHFRuWIsA"
}
```

Respond with:

```json
{ "challenge": "3eZbr39qZ4rCZsHFRuWIsA" }
```

### Event callback

```json
{
  "type": "event_callback",
  "team_id": "T01234567",
  "event": {
    "type": "app_mention",
    "user": "U01234567",
    "text": "<@UBOTID> write caption",
    "channel": "C01234567",
    "ts": "1234567890.123456"
  }
}
```

Handled types:

- `app_mention` — bot mentioned in a channel
- `message` (channel `app_home`) — App Home tab messages

Always return `200` with `{}` to acknowledge (even on internal errors) to avoid Slack retries.

## Interactive payloads

`POST /api/slack/interactive` — `payload` field contains JSON:

| `type` | Use |
|--------|-----|
| `block_actions` | Buttons, selects (audit dialect picker, etc.) |
| `view_submission` | Modal submit |
| `view_closed` | Modal dismissed |

TypeScript shape: `SlackInteractive` in `api/slack/auth.ts`.

## Outbound Slack webhooks (GitHub Actions)

Incoming webhooks for notifications (not the Events API) use `slackapi/slack-github-action` with `SLACK_WEBHOOK_URL`. See [github-actions-integration.md](./github-actions-integration.md).

## Database tables

Schema: `migrations/001_slack_bot_schema.sql`

- `workspaces` — installed teams + bot tokens
- `workspace_quotas` — daily usage limits
- `slack_command_logs` — command analytics

## Related

- [webhooks-setup.md](./webhooks-setup.md) — CI/CD HTTP webhooks (separate from Slack)
- [template-author-guide.md](./template-author-guide.md) — custom brand voice packs
