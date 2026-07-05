# Reference Distillation Plan

How to use `reference/` specialist skills to improve `arabic/` without duplicating canonical knowledge.

---

## Principle

```
docs/        → what to build
reference/   → what the system knows (canonical)
arabic/ → what the system does at runtime (distilled)
```

Runtime files should stay under ~300 lines per module. Deep cuts stay in `reference/`.

---

## Phase A — QA and Strategy (Highest ROI)

| Source | Target | Action |
|--------|--------|--------|
| `reference/arabic-qa/` | `humanization-protocol.md` review section + Audit Mode | Port 9-point audit pipeline |
| `reference/arabic-content-strategist/` | `advisory-mode.md` + Project Mode | Port intake YAML and pillar framework |
| `reference/arabic-creator/` | Pro Mode in `intake-protocols.md` | Port structured YAML brief schema |

**Acceptance:** Audit Mode produces scored report; Pro Mode accepts YAML brief.

---

## Phase B — SEO and Ads

| Source | Target | Action |
|--------|--------|--------|
| `reference/arabic-seo-optimizer/reference/*` | `references/seo-aeo-masri.md` | Distill keyword, on-page, local, YouTube rules |
| `reference/arabic-creator/` + strategist | `ads-service-matrix.md` | Map platforms, formats, funnel roles |
| Campaign structures | `domains/ads-media.md` | Egyptian paid-media psychology |

**Acceptance:** Meta + Google + TikTok ad examples pass golden tests.

---

## Phase C — Dialect Depth

For each `arabic/dialects/{dialect}.md`:

1. Audit against `reference/arabic-{dialect}/`
2. Merge register levels, vocabulary banks, greeting rituals
3. Add sub-register notes where thin (Khaliji per-country, Iraqi, Yemeni)
4. Link to reference for deep cuts — do not copy entire reference packs

**Priority order:** masri → khaliji → levantine → ksa → maghrebi → rest

---

## Phase D — Cultural and Seasonal

| Source | Target | Action |
|--------|--------|--------|
| `arabic-islamic-observances/` | `seasonal-calendar.md` | Ramadan, Eid timing and tone |
| `arabic-secular-observances/` | `seasonal-calendar.md` | National dates, back-to-school |
| `arabic-cultural-advisor/` | `taboos.md` + seasonal hooks | Cultural sensitivity expansion |
| `arabic-typography/` | `references/typography-basics.md` (new) | RTL, numerals, bilingual layout slice |

**Acceptance:** Evergreen hook categories fix hashtag live-data dead end.

---

## Phase E — Orchestration

| Source | Target | Action |
|--------|--------|--------|
| `arabic-project-manager/` | `project-mode.md` | Pipeline stages and quality gates |
| `arabic-agent-orchestration/` | `SKILL.md` Module 6 | Handoff sequence (strategist → creator → QA) |

---

## What NOT to Distill

Keep in `reference/` only — do not mirror into runtime unless user explicitly needs:

- Religious scholarship (`arabic-tafsir`, `arabic-quran-*`, `arabic-seerah`)
- Calligraphy and art skills
- Lexicography deep cuts
- Watan al-Arabi geopolitical profiles

These are specialist domains outside the core content agency mission.

---

## Per-Pack Budgets and Do-Not-Copy

Distilled output is **rewritten, not pasted**. Each runtime target has a max line budget; deep cuts stay in `reference/`. Phase IDs reference [implementation-plan §0](./implementation-plan.md#0-canonical-phase-map--golden-tests-source-of-truth).

| reference/ pack | Runtime target | Phase | Max lines | Do not copy |
|-----------------|----------------|-------|-----------|-------------|
| `arabic-qa` | Audit Mode + `humanization-protocol.md` | P2 | ≤120 | full error catalog, brand-lexicon tables |
| `arabic-content-strategist` | `advisory-mode.md` + `project-mode.md` | P1/P5 | ≤150 | full KPI framework, competitive-landscape prose |
| `arabic-creator` | Pro Mode brief schema (`intake-protocols.md`) | P1 | ≤100 | full CTA library, brief-template bodies |
| `arabic-seo-optimizer` | `seo-aeo-masri.md` | P4 | ≤150 | technical-SEO deep cuts, analytics tables |
| `arabic-masri` (1060 lines) | `dialects/masri.md` expansion | P4 | ≤200 | full vocabulary bank — link to reference for deep cuts |
| per-dialect packs | matching `dialects/*.md` | P6 | ≤150 each | exhaustive vocab lists; keep top registers + slang only |
| `arabic-project-manager` | `project-mode.md` stages | P5 | ≤100 | full RACI / governance prose |
| `arabic-agent-orchestration` | `SKILL.md` Module 6 | P6 | ≤60 | full orchestration theory |
| Islamic/secular observances | `seasonal-calendar.md` | P4 | ≤120 | religious scholarship beyond date + tone |
| `arabic-cultural-advisor` | `taboos.md` + seasonal hooks | P4 | ≤80 | geopolitical deep cuts |

**Hard rule:** if a distilled section would exceed its budget, link to the `reference/` pack instead of inlining. Religious-scholarship, calligraphy, art, lexicography, and `watan-al-arabi` packs are **canonical-only** (see "What NOT to Distill").

## Sync and Validation

- Run `scripts/validate-skill.sh` after each distillation phase
- Run `scripts/validate-reference-sync.sh` — INDEX parity, distillation map (`scripts/reference-distillation-map.json`), queue exclusivity
- Update `arabic/references/INDEX.md` counts
- Log distillation decisions in `CHANGELOG.md`

---

## Related Documents

- [Implementation Plan](./implementation-plan.md)
- [Roadmap](./roadmap.md)
- [Context and Sources](../product/context-and-sources.md)
