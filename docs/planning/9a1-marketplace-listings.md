# Phase 9A-1: Marketplace Listings

**Status:** In Progress  
**Target:** List on Codex, ChatGPT, Gemini by 2026-07-20  
**Owner:** Distribution Team

---

## Overview

Marketplace listings are the primary discovery channel for the Awesome Arabic Skill. This phase establishes presence on three major AI tool marketplaces, enabling users to find and install the skill directly from their preferred platforms.

---

## Codex Skills Registry

### Current Status
- ✅ Profile exists: `docs/supported/codex/README.md`
- ✅ npm package published: `@mediabubble-adv/arabic-skill`
- ❓ Listed on skills.sh (verify)

### Marketplace Entry Points
- **Primary:** `npx skills add mediabubble-adv/arabic-skill`
- **Secondary:** https://skills.sh (community registry)
- **Discovery:** `npx skills search arabic`

### Listing Requirements

**Manifest (package.json metadata):**
```json
{
  "name": "@mediabubble-adv/arabic-skill",
  "version": "1.2.9",
  "description": "Masri-first Arabic content creation, dialect routing, RTL audit, and research distillation for Cursor, Claude, Codex, and 20+ AI tools",
  "keywords": ["arabic", "content-creation", "dialect", "masri", "llm-skill"],
  "author": "MediaBubble",
  "repository": {
    "type": "git",
    "url": "https://github.com/mediabubble-adv/arabic-skill.git"
  },
  "homepage": "https://arabic-skill.vercel.app",
  "license": "MIT"
}
```

**Registry Entry (skills.sh format):**
- Title: `Awesome Arabic Skill`
- Summary: `11 dialects, load presets, RTL audit. Arabic content creation for Cursor, Claude, Codex, ChatGPT, Gemini, VS Code, and 18+ AI tools.`
- Category: `Writing & Productivity` or `Content Creation`
- Tags: `#arabic #content-creation #dialect #masri #multilingual`
- Logo: GitHub org avatar or custom skill icon (128×128 PNG)
- Author: `MediaBubble`
- Repository: `https://github.com/mediabubble-adv/arabic-skill`

### Tasks

- [ ] Verify `npx skills add mediabubble-adv/arabic-skill` installs correctly
- [ ] Verify `npx skills search arabic` returns skill in top 3 results
- [ ] Optimize package.json keywords for discoverability
- [ ] Create/upload skill icon (128×128, transparent PNG)
- [ ] Verify skills.sh registry listing (auto-indexed from npm installs telemetry)
- [ ] Add install telemetry to track Codex installs

**Acceptance:**
- [ ] `npx skills add mediabubble-adv/arabic-skill -a cursor` completes without errors
- [ ] Skill appears in `npx skills search` results
- [ ] Install telemetry shows ≥10 installs in first week

---

## ChatGPT Plugin Store

### Current Status
- ⚠️ Profile exists: `docs/supported/chatgpt/README.md`
- ❌ Plugin manifest not created
- ❌ Not submitted to OpenAI Plugin Store

### Marketplace Entry Points
- **Primary:** OpenAI Plugin Store (ChatGPT → "Plugins" → "Plugin Store")
- **Discovery:** Search "Arabic" or "Writing"
- **Installation:** 1-click install in ChatGPT Advanced

### Plugin Architecture

**Manifest (.openai/plugin.json):**
```json
{
  "schema_version": "v1",
  "name_for_human": "Awesome Arabic Skill",
  "name_for_model": "awesome_arabic_skill",
  "description_for_human": "Create, audit, and research Arabic content across 11 dialects. Includes load presets, RTL validation, and research intelligence.",
  "description_for_model": "Helps users write, audit, plan, and research Arabic content with dialect-specific guidance and quality assurance.",
  "auth": {
    "type": "none"
  },
  "api": {
    "type": "openapi",
    "url": "https://arabic-skill.vercel.app/openapi.json"
  },
  "logo_url": "https://arabic-skill.vercel.app/logo.png",
  "contact_email": "yasser.dorgham@gmail.com",
  "legal_info_url": "https://github.com/mediabubble-adv/arabic-skill/blob/main/LICENSE"
}
```

**OpenAPI Spec (openapi.json):**
```yaml
openapi: 3.0.0
info:
  title: Awesome Arabic Skill API
  version: 1.2.9
servers:
  - url: https://arabic-skill-api.vercel.app
paths:
  /write:
    post:
      summary: Generate Arabic content (captions, ads, blogs, scripts)
      operationId: write_content
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                type: { type: string, enum: [caption, ad, blog, script, copy] }
                dialect: { type: string, enum: [masri, ksa, gulf, levantine, ...] }
                brief: { type: string }
                count: { type: integer }
  /audit:
    post:
      summary: Audit Arabic copy for quality, register, translationese
      operationId: audit_content
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                content: { type: string }
  /research:
    post:
      summary: Research and distill Arabic content topics
      operationId: research_topic
```

### Tasks

- [ ] Create `.openai/` directory with plugin manifest
- [ ] Design/source plugin icon (512×512 PNG, ChatGPT store guidelines)
- [ ] Create OpenAPI spec for `/write`, `/audit`, `/research` endpoints
- [ ] Set up backend API (Vercel Functions) to serve endpoints
- [ ] Test plugin installation in ChatGPT Advanced
- [ ] Create ChatGPT-specific privacy policy (link in manifest)
- [ ] Submit to OpenAI Plugin Store via https://openai.com/plugins/submit
- [ ] Monitor Plugin Store analytics (installs, active users, reviews)

**Acceptance:**
- [ ] Plugin appears in ChatGPT Plugin Store within 1–2 weeks of submission
- [ ] Plugin installs and authenticates without errors
- [ ] ≥10 installs in first week
- [ ] Average user rating ≥4/5 stars (after 3+ reviews)

---

## Gemini Extensions Marketplace

### Current Status
- ⚠️ Profile exists: `docs/supported/gemini/README.md`
- ❌ Extension manifest not created
- ❌ Not submitted to Google AI Extensions marketplace

### Marketplace Entry Points
- **Primary:** Gemini.google.com → "Extensions" → Marketplace
- **Discovery:** Search "Arabic" or "Writing"
- **Installation:** 1-click add in Gemini interface

### Extension Architecture

**Manifest (manifest.json):**
```json
{
  "manifest_version": "1",
  "name": "Awesome Arabic Skill",
  "version": "1.2.9",
  "description": "Create, audit, research Arabic content with 11 dialects, load presets, RTL validation, and research distillation.",
  "author": "MediaBubble",
  "icons": {
    "16": "/images/icon-16x16.png",
    "48": "/images/icon-48x48.png",
    "128": "/images/icon-128x128.png"
  },
  "permissions": [
    "geminiApi"
  ],
  "api_endpoint": "https://arabic-skill-api.vercel.app",
  "oauth": {
    "client_id": "YOUR_GOOGLE_CLOUD_CLIENT_ID",
    "scopes": []
  }
}
```

**API Spec:**
Similar to ChatGPT; Google provides [Extensions API docs](https://ai.google.dev/docs/extensions).

### Tasks

- [ ] Create `manifest.json` for Gemini Extensions
- [ ] Design extension icons (16×16, 48×48, 128×128 PNG)
- [ ] Set up Google Cloud project + OAuth (if needed)
- [ ] Create extension backend API
- [ ] Test in Gemini Advanced interface
- [ ] Create privacy policy & terms (link in manifest)
- [ ] Submit to Google AI Extensions via Google Cloud Console
- [ ] Monitor extension analytics (activations, user feedback)

**Acceptance:**
- [ ] Extension appears in Gemini Extensions marketplace within 1–2 weeks
- [ ] Extension activates correctly in Gemini
- [ ] ≥10 activations in first week
- [ ] No critical bugs reported by users

---

## Marketing Copy (All Platforms)

### 50-Word Elevator Pitch (Meta Descriptions)

> Awesome Arabic Skill: Masri-first Arabic content creation for AI tools. 11 dialects, load presets for task-class bundling, RTL/bidirectional text audit, and research distillation. Perfect for agencies, content teams, and developers writing Arabic at scale.

### Platform-Specific Marketing

**Codex:**
- Positioning: Developer-first, CLI integration, open-source
- CTA: `npx skills add mediabubble-adv/arabic-skill`

**ChatGPT:**
- Positioning: No-setup Arabic content (no API key required)
- CTA: "Add to ChatGPT" (1-click)
- Use Cases: Social media captions, landing page copy, blog articles

**Gemini:**
- Positioning: Multi-dialect + research intelligence
- CTA: "Add to Gemini" (1-click)
- Use Cases: Content planning, dialect consultation, RTL compliance

---

## Implementation Checklist

### Week 1 (Jul 6–12)
- [ ] Codex: Verify npm listing + skills.sh integration
- [ ] ChatGPT: Design plugin icon + create manifest
- [ ] Gemini: Design extension icons + create manifest

### Week 2 (Jul 13–19)
- [ ] ChatGPT: Set up API endpoints + submit to OpenAI
- [ ] Gemini: Set up Google Cloud + OAuth + API endpoints
- [ ] Codex: Optimize keywords + telemetry

### Week 3–4 (Jul 20–Aug 2)
- [ ] Monitor store submissions (approval status)
- [ ] Gather user feedback + ratings
- [ ] Post-launch: Update README with install links
- [ ] Track metrics: installs, active users, ratings

---

## Success Metrics

| Platform | Target | Timeline |
|----------|--------|----------|
| Codex | Listed + 10+ installs | Week 1 |
| ChatGPT | Submitted + Approved | Week 2 |
| Gemini | Submitted + Approved | Week 2 |
| **Combined** | 50+ total installs | Month 1 |
| **Average Rating** | ≥4.0 stars | Month 2 |

---

## Notes

- **Parallel Track:** ChatGPT and Gemini submissions can happen in parallel (week 2).
- **Codex Priority:** Already available via npm; focus on discovery optimization.
- **API Backend:** Both ChatGPT and Gemini plugins may require a lightweight API layer. Consider Vercel Functions for rapid deployment.
- **Privacy/Terms:** Ensure all platforms have privacy policy links. Use repo's existing LICENSE and privacy guidance.

---

**Next Steps:**
1. ✅ Codex verification (this week)
2. Start ChatGPT plugin development (week 2)
3. Start Gemini extension development (week 2)
