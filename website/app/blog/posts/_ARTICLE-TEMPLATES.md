# Blog Article Templates (9A-3)

This file contains scaffolded outlines for Articles 2–5. Use these as starting points; expand each section with 150–300 words of content.

---

## Article 2: Masri vs. MSA — When to Use Each Dialect

**File:** `masri-vs-msa-dialect-guide.mdx`  
**Word count:** 1200 | **Read time:** 5 min

```markdown
---
title: "Masri vs. MSA: When to Use Each Dialect"
description: "Understand Masri vs. MSA: when to use Egyptian dialect (casual, social media) vs. Modern Standard Arabic (formal, official). Avoid the mixing trap."
author: "MediaBubble"
date: "2026-07-21"
readTime: "5 min"
category: "Guide"
keywords: ["Egyptian Arabic", "MSA", "dialect", "formal vs casual"]
---

# Masri vs. MSA: When to Use Each Dialect

## What Are They?
[Explain MSA: formal, written, pan-Arab]
[Explain Masri: informal, spoken, Cairo-based, 40M speakers]

## Key Differences
[Create comparison table: register, medium, audience, familiarity, use cases]

## When to Use MSA
[List 5 scenarios: official docs, scholarly, news, religious, formal announcements]
[Example for each]

## When to Use Masri
[List 5 scenarios: social media, ads, informal blogs, marketing, customer service]
[Example for each]

## Real Examples
[E-commerce: Masri | Government: MSA | Meta ad: Masri | Academic: MSA]

## The Trap: Mixing Them
[Why mixing confuses readers]
[How AI often mixes]
[Cost of mistakes]

## Practical Advice
[Coffee or newspaper test]
[When unsure, ask locals]

## Tools & Resources
[Awesome Arabic Skill, dialect guides, examples]

## Conclusion
[Dialect choice = audience trust]
[CTA: Try dialect routing]
```

---

## Article 3: Case Study — 100 Arabic Captions in 1 Week

**File:** `case-study-100-arabic-captions.mdx`  
**Word count:** 800 | **Read time:** 4 min

```markdown
---
title: "How [Brand] Scaled Arabic Content with Awesome Arabic Skill"
description: "Case study: How an e-commerce brand scaled from 0 to 100 Arabic Ramadan captions in 1 week. Results: 3.2x ROI, 60+ hours saved."
author: "MediaBubble"
date: "2026-07-22"
readTime: "4 min"
category: "Case Study"
keywords: ["case study", "Arabic content scaling", "ROI"]
---

# Case Study: How [Brand] Scaled Arabic Content with Awesome Arabic Skill

## The Challenge
[Company: e-commerce | Goal: Ramadan campaign Masri + Gulf | Timeline: 1 week | Budget: small team]

## The Problem
[No Arabic copywriter | AI defaulted to MSA | Manual translation slow | Need 100+ captions]

## The Solution
[Discovered Awesome Arabic Skill | Used load presets "seasonal" + "seo-aeo-gulf"]

## Workflow
[Brief → Generate variants → Audit → Ship]

## Results
[Time: 60+ hours saved | Cost: $3K+ avoided | Quality: 95% approval | ROI: 3.2x]

## Key Wins
[Dialect accuracy | Speed | Scalability | Consistency]

## Challenges & Lessons
[Brief writing takes time | RTL validation needed | Team learning curve]

## Numbers
[100 captions | 2 dialects | 50 variations tested | 48-hour turnaround]

## What They Learned
[Dialect > perfection | Presets save time | Audit is critical]

## Recommendation
[Quote: "Try before hiring freelancer"]

## Call-to-Action
[Install link | Preset guide]
```

---

## Article 4: RTL & Bidirectional Text — A Developer's Guide

**File:** `rtl-bidirectional-text-guide.mdx`  
**Word count:** 1000 | **Read time:** 5 min

```markdown
---
title: "RTL & Bidirectional Text: A Developer's Guide"
description: "Master RTL text handling: learn RLE/PDF markers, LRM placement, and validation. Avoid common bugs. Tools and code examples included."
author: "MediaBubble"
date: "2026-07-23"
readTime: "5 min"
category: "Technical"
keywords: ["RTL", "bidirectional text", "Arabic UI", "developer"]
---

# RTL & Bidirectional Text: A Developer's Guide

## Why RTL Matters
[300M speakers affected | Common bugs]

## The Problem
[CSS dir="rtl" is easy | Unicode bidi is hard]

## Unicode Markers
[RLE, LRE, PDF, LRM, RLM explained with examples]

## Common Mistakes
[❌ No LRM after Arabic→English | ❌ Unbalanced RLE/PDF | ❌ Missing dir="rtl"]

## Validation Checklist
[7-point checklist for testing]

## Tools
[Awesome Arabic Skill: validate-rtl.sh | Browser DevTools | Unicode analyzer]

## Code Examples
[Correct vs. incorrect implementation]

## Performance Considerations
[Re-layout cost | Caching | CSS containment]

## Resources
[Links to docs and guides]

## Conclusion
[RTL is not edge case | Automation > manual | Small effort, big impact]

## Call-to-Action
[Use RTL validator in CI pipeline]
```

---

## Article 5: Why Load Presets Matter

**File:** `load-presets-task-bundling.mdx`  
**Word count:** 600 | **Read time:** 3 min

```markdown
---
title: "Why Load Presets Matter: Task-Class Bundling for Efficiency"
description: "Load presets bundle reference files for specific tasks. Save 75% context, tokens, and cost. 14 presets for writing, auditing, planning, and more."
author: "MediaBubble"
date: "2026-07-24"
readTime: "3 min"
category: "Tutorial"
keywords: ["load presets", "efficiency", "task bundling"]
---

# Why Load Presets Matter: Task-Class Bundling for Efficiency

## The Problem
[26 reference files | Loading all = waste | Different tasks need different files]

## The Solution
[Presets = curated bundles | Example: seasonal preset]

## Available Presets
[List all 14 presets with short descriptions]

## Benefits
[Speed | Cost | Accuracy | Consistency]
[Performance numbers: 3 files vs 26 → 80% context savings]

## How to Use
[CLI examples | Plugin API examples]

## Examples
[Scenario 1: Ramadan captions | Scenario 2: Audit | Scenario 3: Website planning]

## Performance Data
[Metrics: files loaded, tokens used, time, cost comparison]

## Conclusion
[Presets = smart efficiency | Pick right preset for task]

## Call-to-Action
[Learn all presets | Link to docs]
```

---

## Implementation Guide

### For Each Article

1. **Expand the template** — Replace [brackets] with 150–300 words
2. **Add examples** — Real quotes, numbers, screenshots if possible
3. **Internal links** — 3–5 links to other blog posts or docs
4. **Meta review** — Check title, description, keywords
5. **Test formatting** — Verify MDX frontmatter and markdown render correctly

### Writing Tips

- **Tone:** Conversational, helpful, not salesy
- **Length:** Aim for word count target (±100 words acceptable)
- **Structure:** H2 sections, short paragraphs, bullet lists
- **Examples:** Real over hypothetical
- **CTAs:** At end, subtle but clear ("Install Awesome Arabic Skill", "Learn more")

### SEO Checklist Per Article

- [ ] Title includes primary keyword
- [ ] Meta description: 150–160 chars, includes keyword
- [ ] H1 tag (once per article)
- [ ] H2–H3 hierarchy logical
- [ ] 3–5 internal links to other content
- [ ] Alt text on images (if any)
- [ ] Keywords naturally woven (1–2% density)

---

## Next Steps

1. **Expand templates** into full articles (do 1 per day)
2. **Commit each article** as you finish
3. **Create blog index** (`website/app/blog/page.tsx`) to list all posts
4. **Test rendering** locally (`npm run dev` → http://localhost:3000/blog)
5. **Promote on social** once all 5 are published

---

**Total work remaining:**
- 4 articles to expand (Article 2–5)
- 1 blog index page to wire
- ~4 hours writing + testing
- Estimated completion: Week 2 of Phase 9A-3

---

**Questions?** Reference the main planning doc: `docs/planning/9a3-blog-case-studies.md`
