# Gemini Extension Implementation

**Status:** Manifest Design (Ready for Build)  
**Extension Name:** Awesome Arabic Skill  
**Platform:** Google Gemini Advanced  
**Target:** Google AI Extensions marketplace submission by 2026-07-20

---

## Extension Architecture

### Directory Structure

```
.google-ai/
├── manifest.json               # Extension manifest
├── api-spec.json              # API specification (similar to ChatGPT OpenAPI)
└── extension-logo-128x128.png # Extension icon (transparent)
```

### Extension Manifest (.google-ai/manifest.json)

```json
{
  "manifest_version": "1",
  "name": "Awesome Arabic Skill",
  "version": "1.2.9",
  "description": "Create, audit, and research Arabic content across 11 dialects with load presets, RTL validation, and research intelligence.",
  "author": "MediaBubble",
  "permissions": [
    "geminiApi"
  ],
  "api_endpoint": "https://api.arabic-skill.vercel.app",
  "api_version": "v1",
  "categories": [
    "Writing & Productivity",
    "Content Creation"
  ],
  "icons": {
    "16": "https://github.com/mediabubble-adv/arabic-skill/raw/main/public/assets/extension-icon-16x16.png",
    "48": "https://github.com/mediabubble-adv/arabic-skill/raw/main/public/assets/extension-icon-48x48.png",
    "128": "https://github.com/mediabubble-adv/arabic-skill/raw/main/public/assets/extension-icon-128x128.png"
  },
  "homepage_url": "https://arabic-skill.vercel.app",
  "support_url": "https://github.com/mediabubble-adv/arabic-skill/issues",
  "privacy_url": "https://github.com/mediabubble-adv/arabic-skill/blob/main/PRIVACY.md",
  "contact_email": "yasser.dorgham@gmail.com",
  "oauth": {
    "enabled": false,
    "scopes": []
  }
}
```

### API Specification (.google-ai/api-spec.json)

```json
{
  "version": "1.2.9",
  "endpoints": [
    {
      "path": "/v1/write",
      "method": "POST",
      "summary": "Generate Arabic content",
      "description": "Generate Arabic content (captions, ads, blogs, scripts, etc.) for specified dialect and tone",
      "parameters": {
        "type": {
          "type": "string",
          "enum": ["caption", "ad", "blog", "script", "copy", "microcopy"],
          "required": true
        },
        "dialect": {
          "type": "string",
          "enum": ["masri", "ksa", "gulf", "levantine", "iraqi", "yemeni", "maghrebi", "sudanese", "libyan", "msa", "white"],
          "required": true
        },
        "brief": {
          "type": "string",
          "maxLength": 500,
          "required": true
        },
        "count": {
          "type": "integer",
          "minimum": 1,
          "maximum": 10,
          "default": 1
        },
        "tone": {
          "type": "string",
          "enum": ["formal", "casual", "persuasive", "educational", "conversational"],
          "default": "conversational"
        }
      },
      "response": {
        "content": [
          {
            "text": "Generated Arabic content",
            "dialect": "masri",
            "notes": "Context and cultural notes"
          }
        ],
        "metadata": {
          "word_count": 42,
          "complexity_tier": "intermediate"
        }
      }
    },
    {
      "path": "/v1/audit",
      "method": "POST",
      "summary": "Audit Arabic copy",
      "description": "Analyze Arabic text for register, translationese, RTL issues, dialect purity, cultural sensitivity",
      "parameters": {
        "content": {
          "type": "string",
          "maxLength": 5000,
          "required": true
        },
        "dialect": {
          "type": "string",
          "description": "Expected dialect for validation"
        },
        "audit_type": {
          "type": "string",
          "enum": ["full", "register", "translationese", "rtl", "dialect-purity"],
          "default": "full"
        }
      },
      "response": {
        "overall_score": 92,
        "issues": [
          {
            "type": "translationese",
            "severity": "medium",
            "description": "Sounds like AI-generated content",
            "snippet": "...problematic phrase...",
            "suggestion": "Try a more natural phrasing"
          }
        ],
        "summary": "Good Arabic quality with minor improvements suggested"
      }
    },
    {
      "path": "/v1/research",
      "method": "POST",
      "summary": "Research Arabic content topics",
      "description": "Research and distill Arabic content topics with lifecycle tracking",
      "parameters": {
        "query": {
          "type": "string",
          "required": true
        },
        "dialect": {
          "type": "string"
        },
        "max_results": {
          "type": "integer",
          "minimum": 1,
          "maximum": 20,
          "default": 5
        }
      },
      "response": {
        "topic": "Research query",
        "findings": [
          {
            "title": "Finding title",
            "summary": "Summary of finding",
            "dialect_specific": "Dialect-specific insights",
            "citations": ["source 1", "source 2"]
          }
        ],
        "lifecycle_state": "distilled",
        "last_updated": "2026-07-06T10:30:00Z"
      }
    },
    {
      "path": "/v1/plan",
      "method": "POST",
      "summary": "Plan Arabic content projects",
      "description": "Plan content strategies with dialect selection, timeline, and deliverables",
      "parameters": {
        "project_type": {
          "type": "string",
          "enum": ["website", "campaign", "book", "product"],
          "required": true
        },
        "scope": {
          "type": "string",
          "required": true
        },
        "timeline": {
          "type": "string"
        },
        "dialects": {
          "type": "array",
          "items": {"type": "string"}
        }
      },
      "response": {
        "project": "Project name",
        "plan": {
          "phases": [
            {
              "phase": 1,
              "title": "Phase title",
              "duration": "1 week",
              "deliverables": ["deliverable 1"]
            }
          ],
          "timeline": "Total timeline",
          "dialect_strategy": "Strategy for dialect selection"
        }
      }
    }
  ],
  "rate_limits": {
    "requests_per_minute": 10,
    "max_request_size_bytes": 10000,
    "timeout_seconds": 30
  },
  "authentication": {
    "type": "none",
    "description": "Public API, no authentication required"
  }
}
```

---

## Integration with Gemini

### How Extensions Work in Gemini

1. **User adds extension** → "Extensions" → "Browse all" → Search "Arabic" → "Add Awesome Arabic Skill"
2. **Extension appears in chat** → User can reference it directly: "@Awesome Arabic Skill help me write a caption"
3. **Gemini sends request** → Extension API receives prompt + parameters
4. **API returns response** → Gemini displays result in conversation

### Extension Context Format

```
User: "@Awesome Arabic Skill write a Facebook caption for a fitness brand in Masri, casual tone"

Gemini calls:
POST /v1/write
{
  "type": "caption",
  "dialect": "masri",
  "brief": "Facebook caption for fitness brand launch",
  "count": 3,
  "tone": "casual"
}

Extension returns:
{
  "content": [
    {
      "text": "يا بطل! 💪 تطبيق فتنس جديد بس هنحول حياتك....",
      "dialect": "masri",
      "notes": "Casual, energetic; uses Masri colloquialisms"
    },
    ...
  ]
}

Gemini displays results in conversation
```

---

## Implementation Checklist

### Phase 1: API Backend Setup (Week 1–2)

- [ ] Reuse same API backend as ChatGPT plugin
  - [ ] Verify endpoints at `api.arabic-skill.vercel.app/v1/*`
  - [ ] Test Gemini-specific request format compatibility
  
- [ ] Gemini-specific adaptations
  - [ ] Max input length: 5000 chars (Gemini constraint)
  - [ ] Response format: JSON with `content`, `metadata`
  - [ ] Rate limiting: 10 req/min per user

- [ ] Testing
  - [ ] Manually test endpoints via `curl`
  - [ ] Verify response format matches `api-spec.json`
  - [ ] Test error handling (timeout, invalid input)

### Phase 2: Google Cloud Setup (Week 2)

- [ ] Create Google Cloud Project
  - [ ] Go to https://console.cloud.google.com
  - [ ] Create new project "awesome-arabic-skill"
  - [ ] Enable "Generative Language API"

- [ ] OAuth Configuration (if needed for future versions)
  - [ ] Create OAuth 2.0 credentials
  - [ ] Configure redirect URI: `https://gemini.google.com/callback`
  - [ ] Note: Currently disabled in manifest

- [ ] Create extension in Google AI Extensions
  - [ ] Go to https://ai.google.dev/extensions
  - [ ] Create new extension
  - [ ] Upload manifest + icons
  - [ ] Set API endpoint: `https://api.arabic-skill.vercel.app`

### Phase 3: Submission & Review (Week 2–3)

- [ ] Prepare submission materials
  - [ ] Extension manifest (JSON)
  - [ ] Icons (16×16, 48×48, 128×128 PNG)
  - [ ] Privacy policy link
  - [ ] Contact email
  - [ ] Homepage URL

- [ ] Submit to Google AI Extensions Marketplace
  - [ ] Follow Google submission guidelines
  - [ ] Provide demo/screenshots
  - [ ] Confirm API is live and responds correctly

- [ ] Review process (typically 3–5 business days)
  - [ ] Monitor email for feedback
  - [ ] Address any review comments
  - [ ] Resubmit if necessary

### Phase 4: Launch & Monitor (Week 3–4)

- [ ] Extension goes live in Gemini Extensions marketplace
- [ ] Update documentation
  - [ ] Add extension link to README
  - [ ] Create Gemini-specific tutorial
  - [ ] Update INSTALLATION.md
  
- [ ] Monitor metrics
  - [ ] Track activations via Google Analytics
  - [ ] Monitor error logs
  - [ ] Collect user feedback

---

## Asset Requirements

### Extension Icons

**Formats:** PNG, transparent background

| Size | Usage | Dimensions | Notes |
|------|-------|-----------|-------|
| 16×16 | Favicon | 16×16 px | Low-res, must be recognizable |
| 48×48 | List view | 48×48 px | Medium clarity needed |
| 128×128 | Store display | 128×128 px | High detail, main marketplace icon |

**Design Guidelines:**
- Keep icon simple (Arabic letter or geometric pattern)
- Use brand colors (MediaBubble primary color + white)
- Ensure legibility at all sizes
- Test on light and dark backgrounds

### Logo File Locations

```
public/assets/
├── extension-icon-16x16.png
├── extension-icon-48x48.png
├── extension-icon-128x128.png
└── extension-preview-512x512.png  # For Google submission
```

---

## Success Metrics

| Metric | Target | Timeline |
|--------|--------|----------|
| Manifest validation | Pass Google checks | Week 2 |
| API compliance | All endpoints respond <2s | Week 2 |
| Google submission approval | Within 5 business days | Week 3 |
| First week activations | 10+ | Week 4 |
| User rating | ≥4.0 stars | Month 2 |

---

## Notes

- **Shared Backend:** Both ChatGPT and Gemini use the same API backend at `api.arabic-skill.vercel.app`
- **Response Format:** Both platforms expect JSON responses; formatting is standardized across `.google-ai/api-spec.json` and `.openai/openapi.json`
- **Rate Limiting:** Essential to prevent abuse and manage costs
- **Icon Design:** Work with brand team or use design agency if in-house design unavailable

---

**Next:** Start API backend development (shared for both ChatGPT + Gemini)?
