# Skill Craft and Release Research

> Research snapshot for **Awesome Arabic Skill** (`arabic`)  
> Status: Active reference  
> Last updated: 2026-06-29

This document synthesizes official guidance, open standards, distribution patterns, and user-facing product examples so we can ship **v1.0.0** as a high-quality first public release — not just a folder rename.

---

## Executive Summary

| Finding | Implication for `arabic` |
|---------|-------------------------------|
| Skills are **progressive disclosure** systems, not giant prompts | Keep `SKILL.md` lean; load `references/` on demand |
| **Description metadata** drives discovery and triggering | Invest in YAML `description` with real user phrases |
| **Under ~500 lines** in `SKILL.md` is the practical ceiling | Route to modules; never monolith |
| **Concrete workflows + validation** beat vague instructions | Advisory flow, audit scripts, golden tests |
| **Honest capability bounds** build trust | No fake live trends, no simulated APIs |
| **Install friction** is the #1 adoption killer | Git clone → copy path today; `npx skills add` at v1.1.0 |
| **v1.0.0 = behavior complete**, not docs-only | Gate on PRD §12 success criteria |

---

## 1. What Is a Skill (Technically)?

A skill is a **portable instruction package** an agent loads when a task matches its metadata. The model does not read every file at once — it follows a tiered loading model.

### Progressive disclosure (Anthropic / Agent Skills)

| Tier | What loads | Token budget (approx.) | Role |
|------|------------|------------------------|------|
| **1 — Metadata** | YAML frontmatter (`name`, `description`) | ~50–100 tokens | Discovery: *should this skill activate?* |
| **2 — Core** | `SKILL.md` body | ~500–2,000 tokens | Routing, defaults, non-negotiable rules |
| **3 — References** | `references/*.md`, `domains/`, `dialects/` | On demand | Depth only when the task needs it |

**Performance effect:** Loading everything upfront wastes context window, dilutes attention, and increases cost/latency. Skills that respect tiers **score better on task focus** because the model spends tokens on the right slice of knowledge.

**Sources:**
- [Anthropic — Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Anthropic — Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- [agentskills.io](https://agentskills.io) — open specification for interoperable skill folders

---

## 2. What Makes a Good Skill

### Anatomy of a strong skill

1. **Sharp metadata** — `description` answers: *what*, *for whom*, *when to use*, *when NOT to use*
2. **Single entry point** — one `SKILL.md` router; no competing top-level instructions
3. **Explicit default behavior** — e.g. `guide → clarify → recommend → write → review`
4. **Mode routing table** — user intent → file(s) to load
5. **Non-negotiables up front** — dialect policy, banned lexicon, review gates
6. **Examples over adjectives** — bad vs good copy, not "write naturally"
7. **Validation hooks** — scripts or checklists the agent can run (`validate-skill.sh`, audit mode)
8. **INDEX or map** — agent knows what exists without guessing paths
9. **Tool-agnostic core** — adapters in `docs/supported/`, not duplicated logic per IDE
10. **Version field** — matches root `VERSION`; users know what they installed

### Patterns that correlate with high user satisfaction

| Pattern | Why users like it |
|---------|-------------------|
| **Advisory before generation** | Feels like a strategist, not a slot machine |
| **Option-based questions** | Reduces blank-page anxiety; faster briefs |
| **Dialect respect** | Arabic users are sensitive to MSA vs Masri drift |
| **Audit / review pass** | Trust — "it caught my mistake" |
| **Saved voice / memory** | Return visits without re-explaining brand |
| **Copy-paste install** | One command, works offline |
| **Clear scope** | "I do X, I don't do live ad API calls" |

### Reference exemplars (study these)

| Skill / product | What to steal | Link |
|-----------------|---------------|------|
| **Anthropic official skills** | Minimal `SKILL.md`, scripts folder, tight descriptions | [github.com/anthropics/skills](https://github.com/anthropics/skills) |
| **Impeccable** | Install landing page, single command, clear positioning | [impeccable.style](https://impeccable.style/) |
| **Vercel skills guide** | `npx skills add`, folder layout, sharing | [vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context](https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context) |
| **skills.sh** | Discovery + install telemetry for open skills | [skills.sh](https://www.skills.sh) |
| **Our `reference/` library** | Domain depth — but **one** user-facing entry (`arabic`) | `reference/README.md` |

---

## 3. What Makes a Bad Skill

### Anti-patterns (hurt performance and results)

| Bad pattern | Symptom | Fix |
|-------------|---------|-----|
| **Monolithic SKILL.md** (800+ lines) | Model skims; rules ignored | Split into `references/`; keep router thin |
| **Vague description** | Skill never triggers or triggers wrong | Add trigger phrases from real user requests |
| **Fake capabilities** | "I will crawl live trends" → hallucinated data | Preloaded calendars; honest non-goals |
| **Duplicate conflicting rules** | MSA in one file, Masri in another | Single source of truth + INDEX |
| **No default flow** | Immediate generic Arabic wall of text | Advisory modes in `SKILL.md` |
| **Orphan files** | CI warnings; agent cites missing paths | `validate-skill.sh` on every PR |
| **38 skills for one job** | User confusion, maintenance hell | One skill, many reference modules (our strategy) |
| **Tool-specific logic in core** | Breaks on Claude vs Cursor | Adapters in `docs/supported/` only |
| **Unversioned releases** | "Which skill do I have?" | `VERSION` + CHANGELOG + GitHub Releases |
| **Marketing without tests** | High churn, bad reviews | Golden acceptance tests before v1.0.0 |

### How bad skills affect model performance

1. **Context pollution** — Irrelevant instructions compete with the user's actual task
2. **Attention dilution** — Long skills → middle sections ignored ("lost in the middle")
3. **Wrong routing** — Weak metadata → skill doesn't load → generic mediocre Arabic
4. **Over-prompting** — Restating the same rule 5 times doesn't increase compliance; structure does
5. **False confidence** — Claiming audit/SEO/API features that aren't implemented → user trust loss (worse than no skill)

---

## 4. Skill Description — The Highest-Leverage Field

Anthropic and Cursor both use frontmatter `description` for **when to attach** the skill.

### Good description checklist

- [ ] States primary outcome (e.g. "Arabic content operating system")
- [ ] Lists 3–5 trigger scenarios in user language
- [ ] Names dialects/domains if specialized
- [ ] Says what it refuses (e.g. "not legal advice")
- [ ] Under ~200 words

### Example shape (for `arabic`)

```yaml
description: >
  Masri-first Arabic content operating system for marketers, founders, and creators.
  Use when writing or planning Arabic social posts, ads, SEO, email, scripts, websites,
  or brand voice — including dialect routing (Masri, Khaliji, Levantine, MSA).
  Guides and clarifies before drafting; runs humanization and audit review.
  Not for live trend APIs or legal compliance packs.
```

---

## 5. File Structure Best Practices

### Recommended layout (matches our repo)

```text
arabic/
├── SKILL.md              # Router + non-negotiables (<500 lines target)
├── voice.md              # User brand persistence (v1.0.0)
├── dialects/             # Per-dialect rules
├── domains/              # Industry packs
├── conversations/        # Channel templates
└── references/           # Deep modules + INDEX.md
```

### ZIP / packaging rule

When distributing as archive, the skill folder must wrap correctly:

```text
arabic.zip
└── arabic/
    └── SKILL.md          # ✅ correct

# NOT:
arabic.zip
└── SKILL.md              # ❌ wrong — breaks installers
```

---

## 6. How Skills Affect Results (Measurable)

| Dimension | Good skill impact | How to verify |
|-----------|-------------------|---------------|
| **Relevance** | Loads right dialect/domain | Golden test: Masri ad brief → Masri output |
| **Consistency** | Same brand voice across sessions | `voice.md` reuse test |
| **Safety** | Taboo/banned lexicon caught | Audit mode on fixtures |
| **Efficiency** | Fewer user correction rounds | Advisory flow metrics (manual QA) |
| **Trust** | User keeps skill installed | Retention / re-install (post-launch) |

For **v1.0.0**, we commit to **12 golden acceptance scenarios** in the implementation plan — these are our objective quality bar, not subjective "feels better."

---

## 7. What Users Really Like (Synthesis)

From public skill ecosystems, install sites, and our strategic assessment:

### Top positive signals

1. **"It asked me the right questions first"** — advisory beats auto-draft
2. **"It sounds Egyptian, not translated"** — humanization + dialect routing
3. **"One install, works in my editor"** — Cursor/Claude path documented
4. **"It remembered my brand"** — `voice.md` / project context
5. **"I know what version I have"** — semver + changelog
6. **"It didn't pretend to know today's trends"** — honesty > hype
7. **"Copy-paste commands in README"** — zero ambiguity

### Top complaints (avoid)

1. Install docs that don't match folder names
2. Skills that never activate (bad description)
3. Generic MSA when user asked for dialect
4. 50 files with no index
5. No changelog between versions
6. Website promises features the skill files don't contain

---

## 8. Release and Distribution Strategy

### Version policy for `arabic`

| Version | Meaning | Git tag? | Public release? |
|---------|---------|----------|-----------------|
| **0.1.x** | Development baseline | Optional `v0.1.0` | Dev/pre-release only |
| **1.0.0** | PRD §12 + implementation plan Phases 1–5 complete | **Required** `v1.0.0` | **First public release** |
| **1.1.0** | Distribution layer (website, `npx skills add`, CLI) | Yes | Public |
| **2.0.0** | Breaking routing or removed modes | Yes | Public + migration notes |

See [Versioning and Releases](../engineering/versioning-and-releases.md).

### Release channels (priority order)

| Channel | When | Command / action |
|---------|------|------------------|
| **GitHub repo** | Now | `git clone https://github.com/mediabubble-adv/arabic-skill.git` |
| **Manual copy** | Now | `cp -r arabic ~/.cursor/skills/arabic` |
| **GitHub Releases** | v1.0.0+ | Tag `v*.*.*` → `release.yml` |
| **skills.sh / Vercel CLI** | v1.1.0 | `npx skills add mediabubble-adv/arabic-skill` |
| **Install website** | v1.1.0 (test project) | impeccable.style-style landing |
| **npm package** | v2.x optional | `npx arabic install` |

### Release checklist (v1.0.0)

1. [ ] All 10 PRD success criteria pass
2. [ ] 12/12 golden acceptance tests pass
3. [ ] `validate-skill.sh` — 0 errors (warnings only for deferred v1.1 items)
4. [ ] `VERSION`, `SKILL.md`, `CHANGELOG.md` aligned
5. [ ] README install block tested on Cursor + Claude
6. [ ] Annotated tag `v1.0.0` + GitHub Release notes
7. [ ] Optional: submit to [skills.sh](https://www.skills.sh) for discoverability

### Pre-release (0.x) checklist

- Merge to `main` with CI green
- Update `[Unreleased]` section in CHANGELOG
- **Do not** market as "production v1" until criteria met

---

## 9. Packaging for Multiple AI Tools

| Tool | Install path | Notes |
|------|--------------|-------|
| **Cursor** | `~/.cursor/skills/arabic/` | Project skills: `.cursor/skills/` |
| **Claude Code** | `~/.claude/skills/` or project `.claude/skills/` | Same folder shape |
| **Windsurf / others** | See `docs/supported/` | Adapter docs only; core unchanged |

**Rule:** One canonical `arabic/` folder in repo; installers copy it verbatim.

---

## 10. Recommendations for Our v1.0.0 Push

### Must ship in runtime (not docs-only)

1. `references/advisory-mode.md` + `SKILL.md` advisory routing
2. Humanization v2 + Audit Mode (from `reference/arabic-qa`)
3. `references/prompt-engineering.md` + `voice.md`
4. `references/ads-service-matrix.md`, `domains/ads-media.md`, `seo-aeo-masri.md`
5. `references/project-mode.md`, `book-writing.md`, `domains/dev-tech.md`
6. Golden tests in `tests/golden/`

### Keep deferred to v1.1.0 (distribution)

- Install website
- `npx skills add` registration
- Full per-tool command trees (`/arabic` in Cursor)

### Ongoing craft habits

- Every new reference file → update `INDEX.md`
- Every behavior change → acceptance test or golden fixture
- Every release → CHANGELOG + tag + description review

---

## 11. Source Bibliography

| Source | URL | Use |
|--------|-----|-----|
| Anthropic Agent Skills overview | https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview | Progressive disclosure |
| Anthropic Skill best practices | https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices | Authoring checklist |
| agentskills.io | https://agentskills.io | Open standard |
| Vercel KB — Agent Skills | https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context | Install/share |
| skills.sh | https://www.skills.sh | Discovery + `npx skills add` |
| Cursor Skills docs | https://cursor.com/docs/skills | Cursor-specific paths |
| Keep a Changelog | https://keepachangelog.com | CHANGELOG format |
| Semantic Versioning | https://semver.org | Version policy |
| Impeccable (reference product) | https://impeccable.style | Install UX benchmark |

---

## Related Documents

- [Strategic Assessment](./strategic-assessment.md)
- [PRD §12 Success Criteria](../product/prd.md#12-success-criteria)
- [Implementation Plan](../planning/implementation-plan.md)
- [Roadmap](../planning/roadmap.md)
- [Versioning and Releases](../engineering/versioning-and-releases.md)
