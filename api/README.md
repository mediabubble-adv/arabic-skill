# Awesome Arabic Skill Plugin APIs

**Status:** Scaffold (Mock responses)  
**Target Deployment:** Vercel Functions  
**URL:** `https://api.arabic-skill.vercel.app`

---

## Overview

Plugin API backend for ChatGPT Plugin Store and Google Gemini Extensions. Provides endpoints for Arabic content writing, auditing, research, and planning.

### Architecture

- **Framework:** Vercel Functions (Node.js)
- **Language:** TypeScript
- **Runtime:** Node.js 18+
- **Endpoints:** 4 core API routes (`/v1/write`, `/v1/audit`, `/v1/research`, `/v1/plan`)

---

## Current Status

All endpoints return **mock responses** for rapid development. Full integration with the local `/arabic` CLI commands is planned.

### Endpoints

| Endpoint | Purpose | Status |
|----------|---------|--------|
| `POST /v1/write` | Generate Arabic content | ✅ Scaffold (mock) |
| `POST /v1/audit` | Audit Arabic copy | ✅ Scaffold (mock) |
| `POST /v1/research` | Research Arabic topics | ✅ Scaffold (mock) |
| `POST /v1/plan` | Plan content projects | ✅ Scaffold (mock) |
| `GET /openapi.json` | OpenAPI spec (ChatGPT) | ❌ TODO |
| `GET /api/spec` | API spec (Gemini) | ❌ TODO |

---

## Quick Start (Local Development)

### Prerequisites

```bash
node --version  # v18+
npm --version   # v9+
```

### Install Dependencies

```bash
npm install
```

### Run Locally (Vercel CLI)

```bash
npm install -g vercel
vercel dev
```

Starts local API at `http://localhost:3000`.

### Test Endpoints

```bash
# Write endpoint
curl -X POST http://localhost:3000/api/v1/write \
  -H "Content-Type: application/json" \
  -d '{
    "type": "caption",
    "dialect": "masri",
    "brief": "Facebook caption for fitness app launch",
    "count": 3,
    "tone": "casual"
  }'

# Audit endpoint
curl -X POST http://localhost:3000/api/v1/audit \
  -H "Content-Type: application/json" \
  -d '{
    "content": "يا بطل، تطبيق فتنس جديد يحول حياتك",
    "dialect": "masri",
    "audit_type": "full"
  }'

# Research endpoint
curl -X POST http://localhost:3000/api/v1/research \
  -H "Content-Type: application/json" \
  -d '{
    "query": "meta ads trends in Egyptian market",
    "dialect": "masri",
    "max_results": 5
  }'

# Plan endpoint
curl -X POST http://localhost:3000/api/v1/plan \
  -H "Content-Type: application/json" \
  -d '{
    "project_type": "website",
    "scope": "5-page website in Masri + Gulf variants",
    "timeline": "4 weeks",
    "dialects": ["masri", "gulf"]
  }'
```

---

## Integration Roadmap

### Phase 1: CLI Integration (Week 2)

**Goal:** Wire endpoints to local `/arabic` CLI commands

**Implementation:**
- Each endpoint uses Node.js `child_process` to call local `/arabic` command
- Example: `/v1/write` → `npm run /arabic write --type caption --dialect masri --brief "..."`
- Stream responses back to caller

**Files to Modify:**
- `api/v1/write.ts`: Replace mock with `child_process` call
- `api/v1/audit.ts`: Replace mock with `/arabic audit` command
- `api/v1/research.ts`: Replace mock with `/arabic research` command  
- `api/v1/plan.ts`: Replace mock with `/arabic plan` command

**Example Implementation:**

```typescript
import { execSync } from 'child_process';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { type, dialect, brief, count } = req.body;
  
  try {
    const output = execSync(
      `npm run /arabic write -- --type ${type} --dialect ${dialect} --brief "${brief}" --count ${count}`,
      { cwd: process.cwd(), encoding: 'utf-8' }
    );
    
    return res.status(200).json(JSON.parse(output));
  } catch (error) {
    return res.status(500).json({ error: String(error) });
  }
}
```

### Phase 2: Rate Limiting (Week 2)

**Goal:** Prevent abuse, manage costs

**Implementation:**
- Use Vercel KV for rate limiting
- Limit: 10 requests/minute per IP
- Return 429 status if limit exceeded

**Configuration:**

```env
KV_REST_API_URL=xxx
KV_REST_API_TOKEN=xxx
```

**Example:**

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});

const { success } = await ratelimit.limit(req.headers['x-forwarded-for']);
if (!success) return res.status(429).json({ error: 'Too many requests' });
```

### Phase 3: Monitoring & Logging (Week 3)

**Goal:** Track performance and errors

**Implementation:**
- Use Vercel Analytics for built-in monitoring
- Log errors to external service (Sentry, DataDog)
- Track response times and error rates

### Phase 4: Production Deployment (Week 3–4)

**Goal:** Deploy to `https://api.arabic-skill.vercel.app`

**Steps:**
1. Ensure all tests pass locally
2. Configure environment variables in Vercel
3. Deploy: `vercel --prod`
4. Test endpoints against production
5. Update ChatGPT/Gemini manifests with production URL

---

## Testing

### Unit Tests

```bash
npm test
```

### Integration Tests

```bash
npm run test:integration
```

### Load Testing

```bash
npm run test:load
```

---

## Deployment

### Vercel Deployment

```bash
# Configure Vercel project
vercel link

# Set environment variables
vercel env add KV_REST_API_URL
vercel env add KV_REST_API_TOKEN

# Deploy to production
vercel --prod
```

### Environment Variables

Create `.env.local` for local development:

```
KV_REST_API_URL=https://xxxx.upstash.io
KV_REST_API_TOKEN=xxxx
NODE_ENV=development
```

For production, add variables in Vercel dashboard.

---

## Troubleshooting

### 500 Error: "Internal server error"

1. Check Vercel logs: `vercel logs`
2. Ensure all required parameters are provided
3. Check `/arabic` CLI is installed and working

### Rate Limit Not Working

1. Verify KV environment variables are set
2. Check Upstash Redis is accessible
3. Ensure `@upstash/ratelimit` is installed

### Slow Response Times

1. Profile endpoint with `vercel analytics`
2. Check `/arabic` CLI performance locally
3. Consider caching responses for common queries

---

## API Response Examples

### Write Response

```json
{
  "content": [
    {
      "text": "يا بطل! 💪 تطبيق فتنس جديد بس هنحول حياتك...",
      "dialect": "masri",
      "notes": "Casual, energetic; uses Masri colloquialisms"
    }
  ],
  "metadata": {
    "word_count": 42,
    "character_count": 256,
    "complexity_tier": "intermediate"
  }
}
```

### Audit Response

```json
{
  "overall_score": 78,
  "issues": [
    {
      "type": "translationese",
      "severity": "medium",
      "description": "Contains AI-sounding phrases",
      "snippet": "يرجى العلم",
      "suggestion": "Use conversational: اعرف إن"
    }
  ],
  "summary": "Good Arabic quality with minor improvements suggested"
}
```

---

## Next Steps

1. Integrate with `/arabic` CLI commands (Phase 1)
2. Add rate limiting (Phase 2)
3. Deploy to Vercel (Phase 3–4)
4. Gather feedback from early users
5. Iterate based on usage patterns

---

**Questions?** See `docs/marketplace/{chatgpt,gemini}-*` for platform-specific details.
