# Strategic Assessment — Awesome Arabic Skill (`arabic`)

> Assessment date: 2026-06-29  
> Scope: `arabic/`, `docs/`, `reference/`  
> Purpose: baseline for product direction and roadmap (v1.0.0 target)

---

## Executive Summary

The project has a **structured Arabic content agency in markdown** — not a single prompt. The runtime pack is architecturally complete (37 files). Planning documents correctly identify the next leap: from **write-first generator** to **advisory-first execution partner**.

The main gap is **implementation drift**: excellent plans and deep reference material exist, but the runtime skill has not yet absorbed them.

| Layer | Status |
|-------|--------|
| `arabic/` (runtime) | Built and broad — 11 dialects, 12 domains |
| `docs/` (planning) | Strong — advisory model defined, not yet in runtime |
| `reference/` (38 specialist skills) | Deep knowledge — not yet distilled into runtime |
| Tool support (`docs/supported/`) | Framework exists — adapters are thin |

---

## 1. Runtime Skill Assessment

### Strengths

- **Modular routing:** Dialect → Domain → Workspace/Engine → Template → Humanization → Taboo scan
- **70/30 intake system:** 3 static + 1–2 dynamic questions per workspace
- **11 dialect files** including White Dialect and pan-Arab neutral register
- **12 industry domain packs**
- **6 conversation script types** and **4 professional document modes**
- **Humanization protocol** with banned lexicon and read-aloud test
- **Token load strategy:** max 6 files per task

### Differentiators

- AEO (Answer Engine Optimization) for Arabic NLP weaknesses
- UI microcopy engine with RTL length expansion (20–30%)
- Video script engine with Arabic WPM pacing (130–150)
- Regional taboo guardrails per market
- Contradiction protocol and returning-client protocol

### Gaps

1. **Behavioral model:** Runtime still write-first; advisory model is planned but not implemented
2. **Missing runtime files:** `advisory-mode.md`, `prompt-engineering.md`, `project-mode.md`, `ads-service-matrix.md`, `book-writing.md`, `seo-aeo-masri.md`, `seasonal-calendar.md`, `domains/ads-media.md`, `domains/dev-tech.md`, `voice.md`
3. **Positioning tension:** Pan-Arab breadth vs Masri-first depth — needs explicit public positioning
4. **Companion skills simulated:** `reference/arabic-qa` 9-point pipeline is stronger than internal simulation
5. **Known production failures:** Hashtag live-data dead end; hybrid engine routing; Khaliji without country

### Power Score

| Dimension | Score | Notes |
|-----------|-------|-------|
| Architecture | 9/10 | Modular, scalable, token-aware |
| Dialect depth | 7/10 | Good breadth; needs reference distillation |
| Industry coverage | 8/10 | Missing ads-media and dev-tech |
| Humanization | 7/10 | Strong v1; v2 layers not built |
| Advisory behavior | 3/10 | Planned well, not implemented |
| Tool portability | 5/10 | Framework exists; adapters not built |
| QA rigor | 6/10 | Simulated; reference QA is stronger |
| **Overall** | **7/10** | Best architecture; not yet best execution partner |

---

## 2. Planning Assessment

### Strengths

- PRD with clear product vision (advisor + strategist + prompt coach + QA)
- Operating model with locked default flow
- Implementation plan with correct sequencing (behavior first)
- System architecture with clean 3-layer model
- Context hierarchy with conflict resolution rules
- Integration model for **24** tools (expanded from 22 in v1.1.0 P7)

### Improvements Needed

1. Version and positioning clarity (Masri-first flagship + dialect expansion packs)
2. Reference sync mechanism and validation scripts
3. Tool adapter delivery (most folders are stubs)
4. Acceptance test automation (golden test cases)
5. Evergreen hashtag fallback in trends/hooks

---

## 3. Reference Library — Distillation Plan

| Reference skill | Distill into runtime |
|-----------------|---------------------|
| `arabic-qa` | 9-point audit → Audit Mode / Revision Loop |
| `arabic-creator` | YAML brief format → Pro Mode intake |
| `arabic-content-strategist` | 5-step framework → Project Mode + Advisory Mode |
| `arabic-seo-optimizer` | SEO references → `seo-aeo-masri.md` |
| `arabic-project-manager` | Pipeline + quality gates → Project Mode |
| `arabic-masri` | L1–L5 register → expand `dialects/masri.md` |
| Dialect specialists | Deepen thin runtime dialect files |
| `arabic-typography` | RTL/bilingual basics → runtime reference slice |
| Observance skills | Ramadan/Eid → `seasonal-calendar.md` |

**Rule:** `reference/` stays canonical; `arabic/` gets distilled runtime slices only.

---

## 4. Target Users

| Persona | Primary need |
|---------|--------------|
| Egyptian marketer / founder | Advisory Mode + Masri depth + ads matrix |
| Agency / media buyer | Brand voice persistence + campaign Project Mode |
| Arabic content creator | Trends/hooks + humanization v2 |
| Dev founder / technical writer | `dev-tech.md` + terminology bank |
| Non-Arabic speaker with Arabic product | Prompt Coach + Audit Mode + English summaries |
| Brand team (bilingual) | `voice.md` + brand asset templates |
| Author / educator | Book Project Mode + continuity QA |
| AI power user | Prompt Coach Mode |

**Unifying insight:** Any Arabic document is content — contracts, skills, agent rules, READMEs, campaigns, WhatsApp sequences.

---

## 5. Strategic Positioning

Compete as **The Awesome Arabic Skill** — not another copywriter skill.

**Unique claims:**

1. 11-dialect router with taboo guardrails
2. Advisory-first (not write-first)
3. Arabic Prompt Coach Mode
4. Professional docs (contracts, skills, agent rules)
5. Project Mode for websites, campaigns, books
6. 22-tool portability model

**Tagline options:**

- "من الفكرة للنشر — محتوى عربي بصوت إنسان"
- "Your Arabic content agency in one skill"

---

## 6. Prioritized Roadmap (Summary)

See [Roadmap](../planning/roadmap.md) for the full execution plan.

### Tier 1 — Behavior (highest ROI)

1. Rewrite `SKILL.md` for advisory operating model
2. Create `references/advisory-mode.md`
3. Upgrade `intake-protocols.md`
4. Embed `arabic-qa` audit as Audit Mode
5. Create `voice.md` persistence

### Tier 2 — Capability (Masri-first depth)

6. `prompt-engineering.md`
7. `ads-media.md` + `ads-service-matrix.md`
8. `dev-tech.md`
9. `seasonal-calendar.md`
10. Humanization v2.0

### Tier 3 — Distribution

11. Cursor adapter + command tree
12. Claude skill packaging
13. Golden test cases
14. Validation scripts
15. Public positioning: Masri-first, pan-Arab capable

---

## Related Documents

- [PRD](../product/prd.md)
- [Roadmap](../planning/roadmap.md)
- [Implementation Plan](../planning/implementation-plan.md)
- [Reference Distillation Plan](../planning/reference-distillation.md)
