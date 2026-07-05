# Distillation Queue

Research findings waiting to land in `arabic/`. **Max 20 open rows.** Every item must end in `distilled` or `deferred`.

Spec: [research-intelligence-plan.md](../docs/planning/research-intelligence-plan.md)

## Status legend

| Status | Meaning |
|--------|---------|
| `open` | Ready for distill PR planning |
| `in_progress` | Active PR branch |
| `distilled` | Landed in runtime — link PR in Notes |
| `deferred` | Parked — reason required |

## Open

| ID | Source kind | Finding | Runtime target(s) | Trust | Added | Notes |
|----|-------------|---------|-------------------|-------|-------|-------|
| P2-001 | dialect-freshness | Canal cities (Suez/Ismailia/Port Said) markers — shipping/trade jargon specificity | masri.md §8 | B | 2026-07-05 | Verify English loanword prevalence; native speaker audit |
| P2-002 | dialect-freshness | Sharkia (northeastern Egypt) — phonetic hybrid (Delta+Saeid); lexical boundaries | masri.md §8 | B | 2026-07-05 | Rural/agricultural marker verification |
| P2-003 | dialect-freshness | Sinai peninsula — phoneme preservation, Bedouin tribal identity, conflict sensitivity | masri.md §8 | C | 2026-07-05 | ⚠ Political/social context; validate with native diaspora |
| P2-004 | dialect-freshness | Tripoli (North Lebanon) — port/merchant vocabulary; coastal cosmopolitanism | levantine.md §1 | B | 2026-07-05 | Verify historical trade jargon; distinguish from Beirut |
| P2-005 | dialect-freshness | Bekaa Valley — agricultural jargon specifics; irrigation/harvest terminology | levantine.md §1 | B | 2026-07-05 | Rural Lebanese dialect markers; phonetic drift from Beirut |
| P2-006 | dialect-freshness | Mountain/Metn (Lebanon) — geographic markers (جبل, ثلج, غابة, ينبوع); tribal heritage language | levantine.md §1 | B | 2026-07-05 | Verify forest/mountain vocabulary; tradition-centered register |
| P2-007 | dialect-freshness | Eastern Province (KSA) — tech/petroleum jargon (برترول, الصناعة); expat/multicultural influence | ksa.md §1 | B | 2026-07-05 | Verify English code-switching prevalence; oil-sector terminology |
| P2-008 | dialect-freshness | Southern Aseeri (KSA) — mountain accent phoneme preservation; proximity to classical Arabic | ksa.md §1 | B | 2026-07-05 | Phonetic audit; heritage/craftsmanship vocabulary |
| P2-009 | dialect-freshness | Abu Dhabi vs Dubai distinction — formality gradient; government vs. business register | khaliji.md §1 | B | 2026-07-05 | Verify code-switching reduction in official/governmental contexts |
| P2-010 | dialect-freshness | Bahrain — Persian loanwords (some communities); Sunni/Shia vocab mix | khaliji.md §1 | B | 2026-07-05 | Validate community-specific loanwords; historical context |
| P2-011 | dialect-freshness | Qatar — formal register features; diplomatic/official language patterns | khaliji.md §1 | B | 2026-07-05 | Verify reserve/formality distinction from UAE; government speech patterns |

## In progress

| ID | Branch | Owner | Notes |
|----|--------|-------|-------|
| — | — | — | — |

## Deferred

| ID | Reason | Revisit |
|----|--------|---------|
| RQ-002 | Full Masri error-catalog before/after — runtime has check logic; duplication bloats load | v1.3 if audit miss rate high |
| RQ-003 | YAML machine audit output — no `--format yaml` flag yet | R3 command wiring |
| RQ-004 | Egypt cultural-red-lines supplement — partial overlap with `taboos.md` | Next taboos distill |
| RQ-005 | Default brand lexicon table — client-specific; runtime uses `voice.md` | Only if product ships defaults |
| RQ-009 | Meta carousel intro-card Reels exclusion | niche format |
| RQ-012 | Masri grammar error quick-check — overlaps RQ-002 full error-catalog | v1.3 if audit miss rate high |

## Distilled (recent)

| ID | Runtime target | PR | Distilled |
|----|----------------|-----|-----------|
| RQ-001 | `arabic/references/audit-mode.md` — platform register targets | feat/research-r1-distill | 2026-07-04 |
| RQ-006 | `arabic/references/ads-service-matrix.md` — TikTok RTL safe zones, Spark caption rules, official limits | feat/research-r2-platforms | 2026-07-04 |
| RQ-007 | `arabic/references/ads-service-matrix.md` — Meta placement table (Reels ~72, FB headline ~27) | feat/research-rq007-rq008-distill | 2026-07-05 |
| RQ-008 | `arabic/references/ads-service-matrix.md` — Demand Gen long-headline standalone rule | feat/research-rq007-rq008-distill | 2026-07-05 |
| RQ-010 | `arabic/dialects/masri.md` — Egypt platform caption limits, hashtag counts, posting windows | feat/research-rq010-distill | 2026-07-05 |
| RQ-011 | `arabic/dialects/masri.md` — L4 business address titles (حضرتك/أستاذ/باشا/مهندس) | feat/research-rq011-distill | 2026-07-05 |
| RQ-013 | `arabic/references/seo-aeo-masri.md` — MSA vs Masri long-tail forms (orthographic + equivalents) | feat/research-rq013-distill | 2026-07-05 |

---

### New item template

Copy into **Open** (assign next `RQ-###`):

```text
| RQ-010 | platform | One-line finding | arabic/references/{file}.md | A | YYYY-MM-DD | sources: {id} |
```

**Source kind values:** `reference-gap` · `platform` · `dialect` · `competitor` · `humanization` · `seasonal` · `audit`
