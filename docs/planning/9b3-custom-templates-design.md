# Phase 9B-3: Custom Skill Templates Design Specification

**Status:** Design Phase (Weeks 1-2)  
**Version:** v1.0  
**Last Updated:** 2026-07-07

---

## Overview

Enable power users and enterprises to create custom skill templates with their own dialects, brand voices, domain knowledge, and workflow configurations.

**Use Cases:**
- Company A: Custom Khaliji dialect + healthcare terminology + brand voice
- Company B: MSA + finance vocabulary + formal tone guidelines
- Agencies: Multi-dialect templates for different client brands

---

## Template Architecture

### Template Structure

```
templates/
├── my-company-brand/
│   ├── meta.json              # Metadata (name, version, author)
│   ├── dialect.md             # Dialect customizations
│   ├── tone.md                # Brand voice & tone guidelines
│   ├── domain.md              # Industry/domain terminology
│   ├── reference.md           # Additional context/rules
│   ├── test-cases.json        # Validation test cases
│   └── README.md              # Documentation
│
├── healthcare-khaliji/
│   ├── meta.json
│   ├── dialect.md
│   ├── domain.md
│   ├── tone.md
│   ├── test-cases.json
│   └── README.md
│
└── fintech-msa/
    ├── meta.json
    ├── [files...]
    └── README.md
```

---

## File Specifications

### 1. meta.json

**Purpose:** Metadata about the template

```json
{
  "id": "tpl_abc123xyz789",
  "name": "Acme Corp Brand Voice",
  "display_name": "Acme Corp - Masri + Tech",
  "version": "1.0.0",
  "author": {
    "name": "Jane Localization",
    "email": "jane@acme.com",
    "organization": "Acme Corp"
  },
  "description": "Custom Masri Arabic template for tech SaaS product",
  "tags": ["masri", "tech", "saas", "brand-voice"],
  "category": "company-brand",
  "dialects": ["masri"],
  "domains": ["technology", "saas"],
  "license": "proprietary",
  "visibility": "private",
  "created_at": "2026-07-07T10:00:00Z",
  "updated_at": "2026-07-07T10:00:00Z",
  "published_at": null,
  "downloads": 0,
  "rating": null,
  "reviews": 0,
  "deprecated": false,
  "changelog": {
    "1.0.0": "Initial release"
  },
  "dependencies": [],
  "max_file_size_kb": 500,
  "min_skill_version": "1.2.9"
}
```

---

### 2. dialect.md

**Purpose:** Dialect customizations and rules

```markdown
# Masri Dialect Template (Acme Corp)

## Phonetic Rules
- Use Egyptian colloquial pronunciation
- Preserve short vowels for clarity
- Example: "التطبيق" → "التطبيقة" (for feminine nouns)

## Vocabulary Preferences
- Use "هندسة البرمجيات" over "فن البرمجة"
- Use "الإنترنت" over "الشبكة العنكبوتية"
- Product names: Keep English (Acme, AppName) without Arabic equivalent

## Grammar Rules
- Casual context: Drop formal endings
- Formal context: Use full declension
- Questions: Use "هل" prefix, keep subject-verb order

## Known Issues
- Avoid "نحن" when speaking as company (use "احنا")
- Don't translate technical acronyms (SaaS, API, etc.)

## Regional Considerations
- Target: Cairo-based audience
- Secondary: Alexandria, Giza

## Testing Examples
✓ "اتفضل استخدم الميزة الجديدة" (good: casual, clear)
✗ "يرجى استخدام الخاصية الجديدة" (bad: too formal for brand)
```

---

### 3. tone.md

**Purpose:** Brand voice and tone guidelines

```markdown
# Acme Corp Brand Voice

## Brand Personality
- Friendly but professional
- Confident without being arrogant
- Helpful and educational
- Modern and forward-thinking

## Tone Guidelines

### When Addressing Users
- Use "أنت" formally, "حضرتك" for customers
- Be warm: "نحن هنا لنساعدك"
- Avoid corporate-speak: NO "نتشرف بخدمتكم"

### When Explaining Features
- Use analogies: "الـ Dashboard زي لوحة تحكم السيارة"
- Start with benefit: "توفر لك الوقت والجهد"
- End with action: "ابدأ استخدامها دلوقتي"

### When Apologizing
- Acknowledge: "معانا خطأ في النظام"
- Explain: "الخادم قعد متوقف لمدة ساعتين"
- Fix: "إحنا بنشتغل بسرعة علشان نحله"
- Assure: "متقلقش، كل البيانات تمام"

### Common Phrases
- "تمام التمام" (affirmative)
- "بشكل سهل جداً" (simplify)
- "شوية دقايق" (timeline)
- "روح وجرب" (call to action)

## Do's & Don'ts

| ✓ Do | ✗ Don't |
|-----|---------|
| "اعمل كذا الأول" | "من فضلك قم بالخطوة الأولى" |
| "الخطوة الجاية سهلة" | "الإجراء التالي متيسر" |
| "بيخلص في دقيقة" | "سيتطلب الأمر وقتاً قليلاً" |

## Testing Examples
✓ "عاوز تبدأ استخدام السحاب؟ اتفضل هنا"
✗ "هل تود أن تبدأ استخدام خدمة التخزين السحابي؟"
```

---

### 4. domain.md

**Purpose:** Domain-specific vocabulary and terminology

```markdown
# Technology / SaaS Domain (Acme Corp)

## Technical Vocabulary

| English | Standard Arabic | Custom (Acme) |
|---------|-----------------|---------------|
| Feature | ميزة | الميزة (keep as-is) |
| Plan | الخطة | الباقة |
| Dashboard | لوحة التحكم | الـ Dashboard (use English) |
| API | واجهة برمجية | API (use English) |
| Database | قاعدة البيانات | الـ Database |
| Authentication | المصادقة | تسجيل الدخول |

## Product-Specific Terms

- **Authentication**: "تسجيل الدخول" (not "مصادقة")
- **Multi-factor**: "تحقق من خطوتين" (not "عاملين")
- **Webhook**: Keep as "Webhook" (technical, untranslatable)
- **Token**: Keep as "Token" (technical context)

## Common Messaging Patterns

### Calls to Action
- "ابدأ مجاناً" (Start Free)
- "جرب الآن" (Try Now)
- "تواصل معانا" (Contact Us)
- "اطلب عرض توضيحي" (Request Demo)

### Error Messages
- "حصل خطأ: {error}" (An error occurred: {error})
- "بتحميل... اصبر شوية" (Loading... Please wait)
- "اتصل بفريق الدعم لو استمرت المشكلة" (Contact support if issue persists)

## Testing Examples
✓ "خطتك الحالية: الباقة المميزة"
✗ "خطتك الحالية: الخطة المميزة"
```

---

### 5. reference.md (Optional)

**Purpose:** Additional context and rules

```markdown
# Acme Corp Reference Materials

## Brand Values
- Innovation
- Accessibility
- Transparency
- Community

## Legal/Compliance
- Always mention: "Terms of Service apply"
- Privacy policy link: https://acme.com/privacy
- No promises about uptime >99.9%

## Approved Resources
- Brand guidelines: https://acme.com/brand
- Design system: https://design.acme.com
- Approved imagery: https://images.acme.com

## Forbidden Words/Phrases
- "artificial" (use "ذكي" instead)
- "unlimited" (use "كبير جداً" instead)
- "disruption" (use "تحديث" instead)
```

---

### 6. test-cases.json

**Purpose:** Validation test cases for template

```json
{
  "version": "1.0",
  "test_cases": [
    {
      "id": "write-caption",
      "type": "write",
      "input": {
        "brief": "Write a caption for a new feature launch",
        "dialect": "masri",
        "tone": "casual"
      },
      "expected_patterns": [
        "تمام التمام",
        "ميزة جديدة",
        "روح وجرب"
      ],
      "forbidden_patterns": [
        "يرجى",
        "متيسر",
        "الخاصية"
      ],
      "description": "Should use casual Acme brand voice"
    },
    {
      "id": "audit-technical-terms",
      "type": "audit",
      "input": {
        "content": "اختبر الـ API الجديد في لوحة التحكم",
        "dialect": "masri"
      },
      "expected_results": [
        {
          "type": "terminology",
          "suggestion": "Keep 'API' and 'Dashboard' in English"
        }
      ],
      "description": "Technical terms should remain in English"
    },
    {
      "id": "audit-formality",
      "type": "audit",
      "input": {
        "content": "يرجى استخدام الخطة المميزة للحصول على ميزات إضافية",
        "dialect": "masri"
      },
      "expected_results": [
        {
          "type": "tone",
          "issue": "Too formal for Acme brand",
          "suggestion": "استخدم الباقة المميزة علشان تحصل على ميزات أكتر"
        }
      ],
      "description": "Should flag formal tone inconsistent with brand"
    }
  ]
}
```

---

### 7. README.md

**Purpose:** User-facing documentation

```markdown
# Acme Corp Brand Voice Template

Use this template to write Arabic content with Acme's brand voice.

## Features
- Masri Egyptian Arabic dialect
- Tech SaaS terminology
- Casual, friendly tone
- Comprehensive test cases

## Usage

### Basic Usage
```bash
/arabic write caption --template acme-corp-brand --brief "New feature launch"
/arabic audit landing-page.md --template acme-corp-brand
```

### With Skill
```bash
npx @mediabubble-adv/arabic-skill write caption \
  --template acme-corp-brand \
  --brief "Write Instagram caption for new dashboard feature"
```

## What's Included
- Dialect customizations (Masri)
- Brand voice guidelines
- Tech domain vocabulary
- Test cases for validation

## Support
Contact: jane@acme.com
Issues: https://github.com/acme/arabic-templates/issues
```

---

## Template Builder UI Flow

### Screen 1: Create Template

```
┌─────────────────────────────────────────┐
│ Create New Template                     │
├─────────────────────────────────────────┤
│                                         │
│ Template Name:                          │
│ [Acme Corp Brand Voice        ]         │
│                                         │
│ Category:                               │
│ [Company Brand ▼]                       │
│                                         │
│ Dialects (Select 1+):                   │
│ ☑ Masri                                 │
│ ☐ Khaliji                               │
│ ☐ Levantine                             │
│ ☐ [View More]                           │
│                                         │
│ Domains (Select 1+):                    │
│ ☑ Technology                            │
│ ☑ SaaS                                  │
│ ☐ Healthcare                            │
│ ☐ [View More]                           │
│                                         │
│ Visibility:                             │
│ ◉ Private (only me)                     │
│ ○ Organization (my team)                │
│ ○ Public (marketplace)                  │
│                                         │
│ [Cancel]  [Create Template]             │
└─────────────────────────────────────────┘
```

### Screen 2: Configure Template

```
┌─────────────────────────────────────────┐
│ Configure: Acme Corp Brand Voice        │
├─────────────────────────────────────────┤
│                                         │
│ Section Tabs:                           │
│ [Dialect] [Tone] [Domain] [Tests]      │
│                                         │
│ ─── Dialect Configuration ───            │
│                                         │
│ Upload dialect.md file:                 │
│ [Choose File]                           │
│ Or paste content:                       │
│ ┌─────────────────────────────────────┐ │
│ │ # Masri Dialect Template            │ │
│ │                                     │ │
│ │ ## Phonetic Rules                   │ │
│ │ ...                                 │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Save & Continue]  [Preview]            │
└─────────────────────────────────────────┘
```

### Screen 3: Test Template

```
┌─────────────────────────────────────────┐
│ Test Template: Acme Corp Brand Voice    │
├─────────────────────────────────────────┤
│                                         │
│ Test Case: write-caption                │
│ Input: "Write a caption for new feature"│
│                                         │
│ [Run Test] [Edit Test]                  │
│                                         │
│ Result:                                 │
│ ✓ Test passed (3/3 checks)             │
│   - Contains "تمام التمام"             │
│   - Contains "ميزة جديدة"              │
│   - No forbidden phrases                │
│                                         │
│ Test Case: audit-technical-terms       │
│ Input: "اختبر الـ API..."               │
│                                         │
│ [Run Test]                              │
│                                         │
│ Result:                                 │
│ ✓ Test passed                           │
│   - Correctly identified English terms  │
│   - No false positives                  │
│                                         │
│ Overall: ✓ All tests passed             │
│                                         │
│ [Back] [Publish]                        │
└─────────────────────────────────────────┘
```

---

## Template Marketplace UI

### Browse Templates

```
┌─────────────────────────────────────┐
│ Template Marketplace                │
├─────────────────────────────────────┤
│                                     │
│ Search: [     ]  Filter: [All ▼]   │
│                                     │
│ Popular Templates:                  │
│                                     │
│ 📦 Acme Corp Brand Voice            │
│    ⭐⭐⭐⭐⭐ (4.8) • 125 downloads  │
│    Masri + Tech SaaS                │
│    [Clone] [View Details]           │
│                                     │
│ 📦 Healthcare + Khaliji             │
│    ⭐⭐⭐⭐ (4.5) • 42 downloads    │
│    Medical terminology              │
│    [Clone] [View Details]           │
│                                     │
│ 📦 Finance + MSA                    │
│    ⭐⭐⭐⭐ (4.3) • 18 downloads    │
│    Banking & fintech                │
│    [Clone] [View Details]           │
│                                     │
│ [Load More]                         │
└─────────────────────────────────────┘
```

---

## API Endpoints for Templates

### Create Template
```
POST /api/templates
```

### Get Template
```
GET /api/templates/{template_id}
```

### List Templates
```
GET /api/templates?category=company-brand&dialect=masri&limit=20
```

### Update Template
```
PUT /api/templates/{template_id}
```

### Publish to Marketplace
```
POST /api/templates/{template_id}/publish
```

### Clone Template
```
POST /api/templates/{template_id}/clone
```

### Delete Template
```
DELETE /api/templates/{template_id}
```

---

## CLI Integration

### Usage

```bash
# List available templates
/arabic list-templates

# Use template when writing
/arabic write caption --template acme-corp-brand --count 3

# Use template when auditing
/arabic audit content.md --template healthcare-khaliji

# Use as preset
/arabic --preset seo-aeo-gulf --template my-brand

# View template info
/arabic show-template acme-corp-brand
```

---

## Version Control & Rollback

### Template Versions
```json
{
  "template_id": "tpl_abc123",
  "name": "Acme Corp Brand Voice",
  "versions": [
    {
      "version": "1.2.0",
      "published_at": "2026-07-15",
      "changes": "Updated technical terminology"
    },
    {
      "version": "1.1.0",
      "published_at": "2026-07-01",
      "changes": "Initial release"
    }
  ]
}
```

### Rollback
```bash
/arabic rollback-template acme-corp-brand --to-version 1.1.0
```

---

## Next Steps

1. ✅ **Review this spec** with product team
2. **Build template builder UI** (React/Next.js)
3. **Implement API endpoints** (backend)
4. **Create example templates** (content team)
5. **Launch marketplace** (Week 5-6)

---

**Owner:** Product + Frontend + Content  
**Timeline:** Week 1 (design), Week 4-6 (implementation)
