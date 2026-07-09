# 🛠️ AI Skill Writing — Arabic & Bilingual Skills

**Use when:** Writing Claude Code skills, AI assistant skills, system prompts, or instruction sets that involve Arabic content, bilingual workflows, RTL interfaces, or Arabic-speaking users
**Load alongside:** This file is self-contained; cross-reference `professional-docs/agent-rules.md` for agent/subagent patterns

---

## 1. What Makes an Arabic Skill Different

Writing skills for Arabic contexts requires solving three layers simultaneously:
1. **Linguistic layer:** The skill must understand dialect variation, register, and MSA vs colloquial rules
2. **Cultural layer:** What the skill should and should not do in Arabic cultural contexts
3. **Technical layer:** RTL, character encoding, Arabic numeral handling, diacritics

A skill that ignores any of these layers will produce technically correct but culturally wrong output.

---

## 2. Skill YAML Frontmatter for Arabic Skills

### Minimal frontmatter
```yaml
---
name: arabic-example
description: Creates Arabic content across dialects. Use when asked to write social media posts, ads, emails, or any Arabic copy in any dialect (Masri, KSA, Gulf, Levantine, etc.)
---
```

### Rich frontmatter (preferred for Arabic skills)
```yaml
---
name: arabic-example
description: >
  Creates culturally accurate Arabic content across 11 dialects and 12 domains.
  Trigger when: user asks for Arabic copy, content in Arabic, translation to Arabic,
  Arabic ads/posts/emails/scripts, or when any Arabic dialect is mentioned.
  Always runs intake protocol before generating content.
compatibility:
  - claude-3
  - claude-sonnet
  - claude-haiku
---
```

**Arabic skill trigger signals to include in description:**
- "Arabic" / "عربي" (even in the user's Arabic message)
- Dialect names: Masri, Egyptian, Khaliji, Gulf, Saudi, KSA, Levantine, Syrian, Jordanian, Moroccan, Libyan, Iraqi
- Platform + Arabic: "Instagram in Arabic", "TikTok caption Arabic"
- Cultural context: Ramadan content, Eid posts, Islamic content

---

## 3. Intake Protocol (Mandatory for Arabic Skills)

Never generate Arabic content without knowing the dialect. Every Arabic skill must run this intake:

### Minimum intake (3 questions)
```markdown
Before I write this, I need 3 quick answers:

1. **المنطقة المستهدفة** (Target region): Egypt / KSA / UAE / Gulf / Levant / Morocco / Pan-Arab?
2. **المنصة** (Platform): Instagram / TikTok / WhatsApp / LinkedIn / Email / Other?
3. **النبرة** (Tone): Warm/Conversational / Professional / Playful / Inspirational?
```

### Extended intake (when domain is unclear)
```markdown
4. **المجال** (Domain): E-commerce / Services / Personal brand / Health / Finance / Food / Real estate?
5. **الجمهور** (Audience age/type): Youth 18–24 / Young professionals 25–35 / Decision makers 35+?
6. **الهدف** (Goal): Awareness / Engagement / Sales / Trust-building?
```

**Zero-guessing rule:** If the user says "write something in Arabic" with no other context, run full intake before writing a single word.

---

## 4. Dialect Routing Logic

Build this routing table into every Arabic skill:

```markdown
## Dialect Router

When target region is identified, load the corresponding dialect rules:

| User says | Load dialect file | Key rules |
|---|---|---|
| Egypt / مصر / Egyptian | `dialects/masri.md` | Soft ق→أ, Geem→ج, warm register |
| Saudi / KSA / سعودية | `dialects/ksa.md` | Keep ق hard, formal register, Vision 2030 awareness |
| UAE / Dubai / دبي / إمارات | `dialects/khaliji.md` or White Dialect | Use White Dialect for brand comms |
| Kuwait / Qatar / Bahrain / Oman | `dialects/khaliji.md` | Gulf Khaliji markers |
| Lebanon / Jordan / Syria / Palestine | `dialects/levantine.md` | ق→ق or أ by sub-region |
| Morocco / Tunisia / Libya / Algeria | `dialects/maghrebi.md` | Heavy French borrowings |
| Iraq | `dialects/iraqi.md` | Distinct phonology; treat carefully |
| Yemen | `dialects/yemeni.md` | Conservative register; classical influence |
| Pan-Arab | `dialects/white-dialect.md` | Neutral Arabic; no strong regional markers |
| Pan-Arab professional | MSA L4 | Business MSA; no dialect |
```

---

## 5. Content Generation Rules for Arabic Skills

### Register enforcement
```markdown
## Register Rules

Always specify the register explicitly in your output header:
**Register:** [L1 Street / L2 Casual / L3 Standard Conversational / L4 Professional / L5 Formal MSA]

Match register to platform:
- TikTok: L2-L3 (light, playful)
- Instagram (brand): L3 (conversational, polished)
- LinkedIn (Arabic): L4 (professional)
- WhatsApp messages: L1-L3 (warm, personal)
- Email newsletters: L3-L4
- Legal/contracts: L5 (MSA only)
```

### Anti-AI content rules (mandatory)
```markdown
## Humanization Rules

Banned phrases — never write these:
- "في عالم يتغير بسرعة" (in a rapidly changing world)
- "في ظل التطور المتسارع"
- "يسعدنا أن نقدم لكم"
- "الحلول المبتكرة" without specifics
- "تميّزنا بـ" as an empty opener
- Any sentence starting with "إن" + 3 nouns in a row (classical AI tell)

Required patterns:
- Start with tension, question, or scene — not a product statement
- Use one unexpected specific detail (concrete over abstract)
- Vary sentence length: short / medium / long in rotation
- At least one sentence under 5 words
- No more than 2 consecutive sentences of similar length
```

### Halal content rules (domain-triggered)
```markdown
## Halal Content Rules (activate when domain = food/beauty/fitness/finance)

Food: Every meat product mentions حلال status. No assumption of halal without label.
Finance: Islamic finance content — never use "فائدة/فوائد" (interest); use "أرباح" or "عائد".
Beauty: Avoid promising "whitening" (تبييض); use "توحيد لون البشرة" or "إشراق".
Fitness: Supplements must not claim to "يحرق الدهون" (burn fat) without regulatory approval language.
```

---

## 6. Platform-Specific Output Formatting

Include these format constraints in Arabic skills:

### Instagram Arabic post
```markdown
## Instagram Post Format (Arabic)

Structure:
Line 1: Hook — single powerful statement (no greeting opener)
Line 2-3: [blank line after hook] Core value or story
Line 4: CTA (question or action)
Line 5: Hashtags (3-5 niche + 2-3 broad; Arabic hashtags with English pair where searchable)

Character limit: 300 Arabic chars optimal for engagement
Emoji: 1-2 max (end of sentence, never mid-sentence)
Hashtag placement: Always last, separated by blank line
```

### Twitter/X Arabic thread
```markdown
## Twitter/X Arabic Thread Format

Tweet 1 (hook): Provocative claim or question — under 200 chars
Tweet 2-N (body): One idea per tweet; each self-contained
Final tweet: CTA + thread summary in one line

Arabic threads perform best when Tweet 1 makes a counterintuitive claim.
```

### WhatsApp message
```markdown
## WhatsApp Format (Arabic)

No formatting markdown (no **, no #)
Short paragraphs (2-3 lines max)
Voice-note register: conversational, warm
Use → or • for lists instead of formal numbering
Emojis OK if brand allows
```

---

## 7. Arabic Skill Self-Check Protocol

Every Arabic skill should run this before outputting:

```markdown
## Pre-Output Self-Check

□ Dialect consistent throughout (no mixing KSA + Masri without reason)
□ Register matches platform (not too formal for TikTok / not too casual for LinkedIn)
□ No banned AI phrases (عالم يتغير / حلول مبتكرة / etc.)
□ Sentence rhythm varied (no 5 consecutive medium-length sentences)
□ Halal rules applied if domain triggers them
□ Hashtags in correct language (Arabic/English as appropriate)
□ No plagiarism of cultural symbols (no oud trivialization / no stereotypes)
□ CTA is specific and actionable
```

---

## 8. Bilingual (Arabic + English) Skill Patterns

For skills that output both Arabic and English:

### Output structure for bilingual content
```markdown
## Bilingual Output Format

**النسخة العربية (Arabic version):**
[Arabic content — dialect specified]

**English version:**
[English content — translated or adapted, not literal]

**Adaptation notes:**
[Where the two versions diverge and why — humor that doesn't translate, cultural references replaced, tone differences]
```

**Bilingual skill rule:** Arabic-first for MENA audiences. English-first only for international/diaspora audiences. Never copy-paste between — always adapt.

---

## 9. Progressive Disclosure in Arabic Skills

For large Arabic skill systems (like this one), structure progressive loading:

```markdown
## File Loading Order

Load on every activation (always in context):
1. SKILL.md — router + intake protocol

Load per task type:
2. Target dialect file (one of 11)
3. Domain file if domain is specific (one of 12)

Load only if task requires:
4. Conversation type file (conversations/)
5. Professional docs file (professional-docs/)
6. References (trends-and-hooks, humanization-protocol, etc.)

**Hard limit: Never load more than 6 files in a single task.**
```

---

## 10. Example Arabic Skill Structure

```
my-arabic/
├── SKILL.md              (router, intake protocol, quick reference)
├── dialects/
│   ├── masri.md          (Egyptian Arabic)
│   ├── ksa.md            (Saudi Arabic)
│   └── [other dialects]
├── domains/
│   └── [industry files]
└── references/
    ├── humanization.md
    └── banned-phrases.md
```

---

## 11. Cross-Reference

- **Building agent rules for Arabic agents:** `professional-docs/agent-rules.md`
- **Compliance language for regulated content:** `professional-docs/compliance-language.md`
- **Full dialect specifications:** `dialects/` directory
