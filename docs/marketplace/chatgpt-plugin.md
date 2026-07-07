# ChatGPT Plugin Implementation

**Status:** Manifest Design (Ready for Build)  
**Plugin Name:** Awesome Arabic Skill  
**Target:** OpenAI Plugin Store submission by 2026-07-20

---

## Plugin Architecture

### Directory Structure

```
.openai/
├── plugin.json                 # Plugin manifest
├── openapi.json               # OpenAPI specification
├── privacy-policy.md          # Privacy policy (linked in manifest)
└── terms-of-service.md        # Terms of service (optional)
```

### Plugin Manifest (.openai/plugin.json)

```json
{
  "schema_version": "v1",
  "name_for_human": "Awesome Arabic Skill",
  "name_for_model": "awesome_arabic_skill",
  "description_for_human": "Create, audit, and research Arabic content across 11 dialects with load presets, RTL validation, and research intelligence.",
  "description_for_model": "A comprehensive Arabic content creation assistant that helps users write, audit, plan, and research Arabic content with dialect-specific guidance, quality assurance, RTL text validation, and research topic lifecycle management. Supports 11 Arabic dialects (Masri, KSA, Gulf, Levantine, Iraqi, Yemeni, Maghrebi, Sudanese, Libyan, MSA, White Arabic).",
  "auth": {
    "type": "none"
  },
  "api": {
    "type": "openapi",
    "url": "https://api.arabic-skill.vercel.app/openapi.json"
  },
  "logo_url": "https://github.com/mediabubble-adv/arabic-skill/raw/main/public/assets/plugin-logo-512.png",
  "contact_email": "yasser.dorgham@gmail.com",
  "legal_info_url": "https://github.com/mediabubble-adv/arabic-skill/blob/main/LICENSE",
  "categor": [
    "Writing & Productivity"
  ]
}
```

### OpenAPI Specification (.openai/openapi.json)

```yaml
openapi: 3.0.0
info:
  title: Awesome Arabic Skill API
  description: Arabic content creation, audit, and research API for ChatGPT Plugin
  version: 1.2.9
  contact:
    name: MediaBubble
    email: yasser.dorgham@gmail.com
    url: https://github.com/mediabubble-adv/arabic-skill

servers:
  - url: https://api.arabic-skill.vercel.app
    description: Production API

paths:
  /v1/write:
    post:
      summary: Generate Arabic content
      description: |
        Generate Arabic content for various formats and dialects.
        Supports captions, ads, blogs, scripts, sales copy, and more.
      operationId: write_content
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - type
                - dialect
                - brief
              properties:
                type:
                  type: string
                  enum: [caption, ad, blog, script, copy, microcopy]
                  description: Content format type
                dialect:
                  type: string
                  enum: [masri, ksa, gulf, levantine, iraqi, yemeni, maghrebi, sudanese, libyan, msa, white]
                  description: Target Arabic dialect
                brief:
                  type: string
                  description: Content brief or prompt (150-500 chars)
                count:
                  type: integer
                  minimum: 1
                  maximum: 10
                  default: 1
                  description: Number of variations to generate
                tone:
                  type: string
                  enum: [formal, casual, persuasive, educational, conversational]
                  default: conversational
                  description: Desired tone/register
      responses:
        '200':
          description: Content generated successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  content:
                    type: array
                    items:
                      type: object
                      properties:
                        text:
                          type: string
                          description: Generated Arabic content
                        dialect:
                          type: string
                        notes:
                          type: string
                          description: Writer's notes on word choices, cultural context
                  metadata:
                    type: object
                    properties:
                      word_count:
                        type: integer
                      character_count:
                        type: integer
                      complexity_tier:
                        type: string
                        enum: [simple, intermediate, advanced]

  /v1/audit:
    post:
      summary: Audit Arabic copy
      description: |
        Analyze Arabic content for:
        - Register (formal/casual match)
        - Translationese (AI-sounding phrases)
        - RTL/bidirectional text issues
        - Dialect purity (MSA bleed, cross-dialect mixing)
        - Cultural sensitivity
      operationId: audit_content
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - content
              properties:
                content:
                  type: string
                  description: Arabic text to audit (500-5000 chars)
                dialect:
                  type: string
                  description: Expected dialect (for validation)
                audit_type:
                  type: string
                  enum: [full, register, translationese, rtl, dialect-purity]
                  default: full
      responses:
        '200':
          description: Audit results
          content:
            application/json:
              schema:
                type: object
                properties:
                  overall_score:
                    type: number
                    minimum: 0
                    maximum: 100
                  issues:
                    type: array
                    items:
                      type: object
                      properties:
                        type:
                          type: string
                          enum: [register, translationese, rtl, dialect-purity, cultural]
                        severity:
                          type: string
                          enum: [low, medium, high]
                        description:
                          type: string
                        snippet:
                          type: string
                        suggestion:
                          type: string
                  summary:
                    type: string
                    description: Human-readable audit summary

  /v1/research:
    post:
      summary: Research Arabic content topics
      description: |
        Research and distill Arabic content topics across dialects.
        Supports topic collection, curation, and distillation workflow.
      operationId: research_topic
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - query
              properties:
                query:
                  type: string
                  description: Research topic or question
                dialect:
                  type: string
                  description: Target dialect for research focus
                sources:
                  type: array
                  items:
                    type: string
                  description: Research sources (web, books, media)
                max_results:
                  type: integer
                  minimum: 1
                  maximum: 20
                  default: 5
      responses:
        '200':
          description: Research findings
          content:
            application/json:
              schema:
                type: object
                properties:
                  topic:
                    type: string
                  findings:
                    type: array
                    items:
                      type: object
                      properties:
                        title:
                          type: string
                        summary:
                          type: string
                        dialect_specific:
                          type: string
                        citations:
                          type: array
                          items:
                            type: string
                  lifecycle_state:
                    type: string
                    enum: [collected, curated, distilled, deferred]
                  last_updated:
                    type: string
                    format: date-time

  /v1/plan:
    post:
      summary: Plan Arabic content projects
      description: |
        Plan content strategies for websites, campaigns, books, and products.
        Includes dialect selection, timeline, and deliverables.
      operationId: plan_project
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - project_type
                - scope
              properties:
                project_type:
                  type: string
                  enum: [website, campaign, book, product, other]
                scope:
                  type: string
                  description: Project scope (e.g., "5-page website in Masri + Gulf variants")
                timeline:
                  type: string
                  description: Timeline (e.g., "4 weeks")
                dialects:
                  type: array
                  items:
                    type: string
      responses:
        '200':
          description: Content plan
          content:
            application/json:
              schema:
                type: object
                properties:
                  project:
                    type: string
                  plan:
                    type: object
                    properties:
                      phases:
                        type: array
                        items:
                          type: object
                      deliverables:
                        type: array
                        items:
                          type: string
                      timeline:
                        type: string
                      dialect_strategy:
                        type: string

components:
  schemas:
    Error:
      type: object
      properties:
        code:
          type: string
        message:
          type: string
        details:
          type: object
```

---

## Privacy Policy Template

**File:** `.openai/privacy-policy.md`

```markdown
# Privacy Policy — Awesome Arabic Skill Plugin

## Data Collection

The plugin processes:
- Content you provide for writing, auditing, or research (sent to our API)
- User messages and context from ChatGPT conversations

## Data Usage

We use your content only to:
- Generate Arabic writing suggestions
- Audit your Arabic copy
- Research Arabic content topics
- Improve plugin functionality

## Data Retention

- User content is NOT stored permanently
- API logs are retained for 30 days for debugging
- No data is shared with third parties

## Security

All API communications use HTTPS encryption. For details, see our full [privacy policy](https://github.com/mediabubble-adv/arabic-skill/blob/main/PRIVACY.md).

## Contact

For privacy questions: yasser.dorgham@gmail.com
```

---

## Implementation Checklist

### Phase 1: API Backend Setup (Week 1–2)

- [ ] Create Vercel Functions at `api.arabic-skill.vercel.app`
  - [ ] `/v1/write` endpoint
  - [ ] `/v1/audit` endpoint
  - [ ] `/v1/research` endpoint
  - [ ] `/v1/plan` endpoint
  - [ ] `/openapi.json` endpoint (serves OpenAPI spec)

- [ ] Each endpoint wraps existing skill logic:
  - `write` → `/arabic write` command
  - `audit` → `/arabic audit` command
  - `research` → `/arabic research` command
  - `plan` → `/arabic plan` command

- [ ] Error handling & rate limiting
  - Max 10 requests/minute per user
  - Graceful timeouts (30s max per request)
  - Clear error messages

- [ ] Testing
  - [ ] Manual test each endpoint via `curl`
  - [ ] Test error cases (invalid dialect, empty content, etc.)
  - [ ] Load test (simulate 10 concurrent users)

### Phase 2: Manifest & Submission (Week 2)

- [ ] Create `.openai/plugin.json` (manifest)
- [ ] Create `.openai/openapi.json` (OpenAPI spec)
- [ ] Create `.openai/privacy-policy.md` (privacy docs)
- [ ] Design plugin icon (512×512 PNG, transparent)
- [ ] Submit to OpenAI Plugin Store
  - Go to https://openai.com/plugins/submit
  - Follow submission wizard
  - Provide manifest URL, icon, contact email

### Phase 3: Review & Launch (Week 3–4)

- [ ] OpenAI review (typically 3–7 days)
- [ ] Address any review feedback
- [ ] Plugin appears in ChatGPT Plugin Store
- [ ] Monitor user feedback & issues
- [ ] Create GitHub issue template for plugin bugs

---

## Success Metrics

| Metric | Target | Timeline |
|--------|--------|----------|
| API response time | <2s per request | Week 1 |
| Uptime | 99.5% | Week 2+ |
| Plugin Store approval | Within 2 weeks of submission | Week 3 |
| First week activations | 10+ | Week 4 |
| User rating | ≥4.0 stars | Month 2 |

---

## Notes

- **API Key:** Plugin uses no API key (open access for now). Future versions may add authentication.
- **Rate Limiting:** Essential for managing costs and preventing abuse.
- **Icon:** Use the same logo as install site but optimized for store display.
- **Submission Timeline:** OpenAI Plugin Store reviews submissions within 3–7 days.

---

**Next:** Build API backend (Vercel Functions) for ChatGPT plugin?
