# Phase 9B-3: Custom Skill Templates

**Status:** Planning  
**Effort:** 2-3 weeks  
**Target:** 10+ community templates published (3-month goal)

---

## Custom Templates Overview

Allow power users and enterprises to create custom skills with their own dialects, brand voices, and domain-specific knowledge. Enable template sharing, versioning, and marketplace distribution.

### Template Types

1. **Company Brand Templates** — Custom tone, vocabulary, messaging guidelines
2. **Dialect + Domain Combos** — E.g., "Khaliji + Healthcare", "MSA + Finance"
3. **Workflow Templates** — Pre-configured task chains (brief → write → audit → ship)
4. **Reference Packs** — Custom knowledge bases bundled as reusable presets

---

## Template Structure

### File Organization

```
templates/
├── my-company-brand/          # Company brand template
│   ├── meta.json              # Template metadata
│   ├── dialect.md             # Dialect rules (e.g., Khaliji-specific)
│   ├── tone.md                # Brand voice guide
│   ├── domain.md              # Company terminology & context
│   ├── test-cases.json        # Validation examples
│   └── references/            # Custom reference files
│       ├── brand-guide.md
│       ├── approved-terms.txt
│       └── style-guide.pdf
│
├── healthcare-khaliji/        # Domain + dialect combo
│   ├── meta.json
│   ├── dialect.md
│   ├── domain.md
│   ├── tone.md
│   ├── test-cases.json
│   └── references/
│       ├── medical-terminology.txt
│       └── khaliji-healthcare-glossary.md
│
└── legal-msa/                 # MSA legal template
    ├── meta.json
    ├── dialect.md
    ├── domain.md
    ├── tone.md
    ├── test-cases.json
    └── references/
        ├── legal-terms.txt
        └── contract-examples.txt
```

### meta.json Schema

```json
{
  "id": "my-company-brand",
  "name": "My Company Brand",
  "description": "Custom Arabic brand voice for marketing materials",
  "version": "1.0.0",
  "author": "John Doe",
  "email": "john@mycompany.com",
  "published_at": "2026-07-15T00:00:00Z",
  "license": "CC-BY-4.0",
  "category": "company_brand",
  "tags": ["brand", "marketing", "b2b"],
  "dialect": "khaliji",
  "domains": ["marketing", "ecommerce"],
  "target_audience": ["creators", "developers", "enterprise"],
  "rating": 4.8,
  "downloads": 245,
  "is_public": true,
  "is_verified": false,
  "documentation_url": "https://docs.example.com/arabic-brand",
  "github_url": "https://github.com/mycompany/arabic-brand-template",
  "example_output": "مرحبا! انضم إلى مجتمعنا الحي واستكشف إمكانيات لا حصر لها"
}
```

### dialect.md Format

```markdown
# Dialect Rules: Khaliji

## Overview
This template enforces Gulf Arabic (Khaliji) dialect with modern, professional tone.

## Core Rules

### Vocabulary
- ✓ Use Gulf-specific terms: شنو (what), ويّاك (with you), أمس (yesterday)
- ✗ Avoid Egyptian: عايز (want), إزاي (how), كويس (good)
- ✗ Avoid Levantine: معك (with you), شو (what), إيش (what)

### Grammar
- Use Gulf present tense patterns
- Prefer compound verbs: راح + verb (going to)
- Modern numerals: ٠-٩ only

### Phonetics
- Emphatic consonants: ض, ظ, ص, ط
- Pharyngeal sounds: ع, غ, ح, خ
- Avoid Egyptian assimilation

## Testing

Validate against test cases:
```
Input: "What is your name?"
Expected: "شنو اسمك؟" (Gulf Khaliji)
Flag: ❌ "إيش اسمك؟" (Levantine), "ايه اسمك؟" (Egyptian)
```

## References
- Gulf Dialect Reference (2024)
- Khaliji Business Communication Guide
- Contemporary Gulf Arabic Corpus
```

### tone.md Format

```markdown
# Brand Voice: Tech Startup

## Tone Attributes

### Professional (70%)
- Credible, knowledgeable
- Confident without arrogance
- Respectful of customer expertise

### Approachable (20%)
- Friendly, conversational
- Relatable examples
- Human-centered language

### Innovative (10%)
- Forward-thinking
- Modern, contemporary
- Solution-oriented

## Writing Principles

1. **Be Direct** — No flowery language
   ✓ "Our platform automates Arabic content verification"
   ✗ "In a world of endless possibilities, our revolutionary tool brings harmony..."

2. **Use Active Voice** — Humans take action
   ✓ "We help you create better content"
   ✗ "Better content can be created with our platform"

3. **Show, Don't Tell** — Use concrete examples
   ✓ "Reduce review time from 2 hours to 10 minutes"
   ✗ "We save you time"

4. **Empower Users** — Position customer as hero
   ✓ "You'll publish more confident Arabic content"
   ✗ "Our tool publishes Arabic content"

## Terminology

### Preferred Terms
- "workflow" (not "process")
- "create" (not "generate")
- "results" (not "output")
- "customers" (not "users")

### Brand Vocabulary
- Always: "Awesome Arabic" (not "Arabic Skill")
- Tone descriptor: "native" (not "natural")
- Audience: "content creators" (not "users")
```

### domain.md Format

```markdown
# Domain: Healthcare + Khaliji

## Medical Terminology (Khaliji)

### Common Terms
- Heart disease: أمراض القلب
- Treatment: العلاج
- Patient: المريض
- Medication: الدواء
- Diagnosis: التشخيص

### Specialized Terms
- Cardiologist: طبيب القلب (literally "heart doctor")
- Hypertension: ارتفاع ضغط الدم
- Diabetes: السكري
- Thyroid: الغدة الدرقية

## Regulatory Compliance

### Required Disclaimers
- All medical content must include: "هذا المحتوى لأغراض تعليمية فقط"
- Risk warnings for common conditions
- Link to healthcare provider recommendation

### Prohibited Terms
- ❌ "Cure" (only "الدواء" / treatment)
- ❌ "Guaranteed" (use "قد يساعد" / may help)
- ❌ Unproven medical claims

## Context & Use Cases

**Target Audience:** Saudi/UAE healthcare providers, pharmacies, medical clinics

**Common Tasks:**
- Patient education materials
- Medical appointment reminder texts
- Pharmaceutical product descriptions
- Healthcare service announcements

## Examples

### Well-Formed (Khaliji + Healthcare)
"أمراض القلب تحتاج اهتمام فوري. اتصل بطبيبك اليوم."
(Heart disease needs immediate attention. Call your doctor today.)

### Red Flags
"❌ أمراض القلب يمكن شفاؤها بسهولة" (implies cure — regulatory issue)
"❌ هذا الدواء يعالج كل الأمراض" (overstated claims)
```

### test-cases.json Format

```json
{
  "version": "1.0",
  "test_cases": [
    {
      "id": "test_001",
      "description": "Basic greeting in brand voice",
      "input": "Create a greeting message",
      "dialect": "khaliji",
      "tone": "professional_approachable",
      "domain": "ecommerce",
      "expected_contains": [
        "مرحبا",
        "نسعد",
        "خدمتك"
      ],
      "should_not_contain": [
        "أهلا وسهلا (too formal)",
        "يا حبيبي (too casual)"
      ],
      "min_length": 10,
      "max_length": 50
    },
    {
      "id": "test_002",
      "description": "Medical terminology validation",
      "input": "Describe hypertension symptoms",
      "dialect": "khaliji",
      "domain": "healthcare",
      "expected_contains": [
        "ارتفاع ضغط الدم",
        "تشاور الطبيب"
      ],
      "should_not_contain": [
        "شفاء",
        "ضمان"
      ],
      "includes_disclaimer": true
    }
  ],
  "validation_rules": [
    {
      "rule": "No Egyptian dialect terms",
      "pattern": "(عايز|إزاي|كويس|عم)"
    },
    {
      "rule": "Gulf-specific preferences",
      "pattern": "(شنو|ويّاك|غدية)"
    }
  ]
}
```

---

## Template Builder UI

### Pages & Flows

**1. Template Gallery** (`/templates`)
- Browse community templates
- Filter: dialect, domain, rating, downloads
- Search by name/author
- Quick preview of each template
- Clone/fork buttons

**2. Create Template** (`/templates/new`)
- Form-based builder
- Step 1: Basic info (name, dialect, domain)
- Step 2: Upload/paste dialect rules
- Step 3: Upload/paste tone guide
- Step 4: Add domain-specific terms
- Step 5: Create test cases
- Step 6: Review & publish
- Validation at each step

**3. Template Editor** (`/templates/{id}/edit`)
- Edit existing template
- Version management (publish new version)
- View version history
- A/B test variations
- Clone from existing templates

**4. Template Preview** (`/templates/{id}`)
- Full template details
- Author info & rating
- Usage stats (downloads, active users)
- Test results
- Customer reviews & feedback
- "Use This Template" button

---

## API Endpoints

```
POST /api/templates
  - Create new template
  - Requires: meta.json, dialect.md, tone.md, domain.md
  - Returns: {template_id, version, url}

GET /api/templates/{id}
  - Get template details
  - Returns: full template content + metadata

PUT /api/templates/{id}
  - Update template (publish new version)
  - Requires: updated files
  - Returns: {version, published_at}

DELETE /api/templates/{id}
  - Delete template (owner only)
  - Returns: {success, message}

POST /api/templates/{id}/clone
  - Clone existing template
  - Creates new template under user's ownership
  - Returns: {new_template_id}

GET /api/templates/search
  - Search templates by query, dialect, domain
  - Pagination: limit, offset
  - Returns: [{id, name, dialect, domain, rating, downloads}]

POST /api/templates/{id}/test
  - Run test cases against template
  - Returns: {passed: N, failed: N, results: [...]}

GET /api/templates/{id}/versions
  - List all versions of a template
  - Returns: [{version, published_at, author}]

POST /api/templates/{id}/publish
  - Publish to public template marketplace
  - Requires: passing test cases, documentation
  - Returns: {published_at, marketplace_url}

GET /api/templates/trending
  - Get trending templates (7d downloads, high rating)
  - Returns: [{id, name, rating, downloads}]
```

---

## CLI Integration

Users can load custom templates via CLI:

```bash
# Use custom template
/arabic write "Brief text" --template my-company-brand --dialect khaliji

# Audit with custom template
/arabic audit file.md --template healthcare-khaliji

# List available templates
/arabic templates list

# Install community template
/arabic templates install healthcare-khaliji

# Create new template
/arabic templates new --name "My Template" --dialect masri
```

---

## Implementation Phases

### Phase 1: Template Schema & Storage (Week 1)
- [ ] Design template JSON schema
- [ ] Database schema for templates
- [ ] File storage for template assets (Vercel Blob)
- [ ] Version management system
- [ ] API endpoints: CRUD operations

### Phase 2: Template Builder UI (Week 2)
- [ ] Create form-based template builder
- [ ] Real-time validation
- [ ] Markdown editor for rules/tone/domain
- [ ] Test case builder
- [ ] Preview functionality

### Phase 3: Template Marketplace (Week 2)
- [ ] Public template gallery
- [ ] Search & filtering
- [ ] Rating & review system
- [ ] Clone/fork functionality
- [ ] "Trending" algorithms

### Phase 4: CLI Integration (Week 2-3)
- [ ] `--template` flag for all commands
- [ ] `templates list` command
- [ ] `templates install` command
- [ ] Template caching locally
- [ ] Fallback to defaults if template not found

### Phase 5: Testing & Launch (Week 3)
- [ ] Integration tests for template loading
- [ ] Test runner validation
- [ ] Example templates (3-5 curated templates)
- [ ] Documentation & tutorials
- [ ] Launch announcement

---

## Example Templates (Pre-Built)

### 1. "Tech Startup Brand" (Khaliji)
- Target: SaaS/tech companies in GCC
- Tone: Professional, innovative, approachable
- Domains: Marketing, product documentation
- Test cases: 15 scenarios

### 2. "Medical Professional" (MSA + Khaliji)
- Target: Hospitals, clinics, pharma
- Tone: Authoritative, compassionate
- Domains: Healthcare, patient education
- Test cases: 25 scenarios (regulatory compliance)

### 3. "E-Commerce Seller" (Masri + Levantine)
- Target: Shopify/store owners
- Tone: Persuasive, friendly, energetic
- Domains: Product descriptions, promotions
- Test cases: 12 scenarios

### 4. "Legal Services" (MSA)
- Target: Law firms, compliance teams
- Tone: Formal, precise, authoritative
- Domains: Contracts, regulatory documents
- Test cases: 20 scenarios

### 5. "Travel & Tourism" (Khaliji + Levantine)
- Target: Hotels, tourism boards
- Tone: Welcoming, descriptive, aspirational
- Domains: Marketing, descriptions
- Test cases: 10 scenarios

---

## Success Criteria

- ✅ Template builder launched & functional
- ✅ 10+ community templates published
- ✅ 50+ template installs (3-month goal)
- ✅ Template marketplace live
- ✅ Clone & customize working
- ✅ Version history & rollback functional
- ✅ CLI integration complete
- ✅ Test case validation passing

---

## Monitoring & Analytics

### Template Metrics
- Total templates published
- Downloads per template
- Rating distribution (1-5 stars)
- Usage: templates loaded per command
- Retention: % of installs still active after 30d

### Marketplace Metrics
- Search queries (top keywords)
- Featured template performance
- Trending algorithm effectiveness
- Clone/fork rate vs download rate

---

**Next:** Proceed to Phase 9B-4 (Enterprise Packaging) after template marketplace is live
