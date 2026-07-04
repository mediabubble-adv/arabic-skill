# Product Roadmap — `arabic`

> Status: Active  
> Product version: **1.2.0** (current — see root `VERSION`)  
> **v1.0.0** shipped 2026-06-30 · **v1.1.0** website + P8 runtime · **v1.1.1** npm distribution · **v1.2.0** full Cursor + skills.sh  
> Next train: **1.2.x** — Research R1 distillation, onboarding (**R0 scaffold shipped**)  
> Positioning: **Masri-first Awesome Arabic Skill — pan-Arab capable**

---

## Vision

One skill that guides, plans, writes, audits, and teaches Arabic prompting — the only tool a user needs from idea to publishable Arabic content.

**Default behavior:**

```
user asks → guide → clarify → recommend → write → review
```

---

## What Changed in Planning (Version Reset)

| Remove / Defer | Add / Prioritize | Why |
|----------------|------------------|-----|
| Versioned plan labels (v4/v5.x) | Single semver on product (`VERSION`) | Cleaner releases and CI |
| Early `v1.0.0` tag on docs-only baseline | **0.1.0 dev** → **1.0.0 at plan completion** | Users trust semver |
| Pan-Arab depth parity in Phase 1 | Masri-first flagship + dialect packs | Depth beats shallow breadth |
| Live trend crawling | Preloaded seasonal + evergreen hooks | Honest capability; no fake recency |
| Simulated companion skills | Distilled QA audit from `reference/arabic-qa` | Measurable quality |
| More domain files before behavior | Advisory core before expansion | Architecture without behavior = bloat |
| 38 separate user-facing skills | One entry point consolidating reference | User retention |

---

## Release Train

| Milestone | Status | Theme | Tag |
|-----------|--------|-------|-----|
| **0.1.0** | ✅ Shipped | Dev baseline — architecture, docs, validation | `v0.1.0` |
| **1.0.0** | ✅ Shipped | **First public release** — Phases P1–P6 + PRD §12 | `v1.0.0` |
| **1.1.0** | ✅ Shipped | Website (G13–G18), P8 runtime, npx installer scaffold | `v1.1.0` |
| **1.1.1** | ✅ Shipped | npm publish CI, pack gates, `@mediabubble-adv/arabic-skill` on registry | `v1.1.1` |
| **1.2.0** | ✅ Shipped | Full Cursor npx install, skills.sh registry docs + validation | `v1.2.0` |
| **1.2.1+** | Next | Research R1, onboarding | — |
| **2.0.0** | Future | Breaking changes, major routing restructure | `v2.0.0` |

### Shipped phase map (reference)

> **Phase IDs are canonical in [implementation-plan.md §0](./implementation-plan.md#0-canonical-phase-map--golden-tests-source-of-truth).** Phases **P0–P6** gate **v1.0.0**; **P7** + **P8** gate **v1.1.x**; distribution follow-ups move to **v1.2.0**.

| Phase | Theme | Key deliverables |
|-------|-------|------------------|
| **P0** | Architecture lock | Truthful inventory, phase map, G1–G18 table, CI fixes |
| **P1** | Advisory operating model | `advisory-mode.md`, `SKILL.md` rewrite |
| **P2** | Quality engine | Humanization v2, Audit Mode |
| **P3** | Coach and memory | `prompt-engineering.md`, **`voice.md`** (persistence folded here) |
| **P4** | Masri commercial depth | Ads matrix, SEO/AEO, seasonal calendar |
| **P5** | Project Mode & Dev-Tech | Website/campaign/book workflows + project-aware Arabic explanations |
| **P6** | Runtime integration & validation | Wire routing, INDEX sync, run G1–G12 |
| **R0–R4** | Research intelligence (cross-cutting) | **R0 ✅** scaffold in `research/`; R1–R4 distillation + `/arabic research` + validation |
| **C0–C5** | Command surface (cross-cutting) | `/arabic` tree, `command-router.md`, workspace `.arabic/` auto |

Semver rules: see [Versioning and Releases](../engineering/versioning-and-releases.md).  
Skill quality bar: see [Skill Craft Research](../analysis/skill-craft-and-release-research.md).  
Research pipeline: see [Research Intelligence Plan](./research-intelligence-plan.md).  
Commands: see [Command Surface](./command-surface.md).

---

## P1 — Behavioral Core (→ v1.0.0)

**Goal:** Change product feel from write-first to advisory-first.

### Deliverables

| File | Action |
|------|--------|
| `arabic/SKILL.md` | Advisory modes, mode routing, direct-write exceptions |
| `references/advisory-mode.md` | **Create** — guide/clarify/recommend behavior |
| `references/intake-protocols.md` | Beginner/advanced, option-based questions, Prompt Coach intake |
| `product/operating-model.md` | Already defined — runtime must match |

### Acceptance Tests

1. Vague caption request → skill guides before writing
2. Contradiction in brief → skill pauses and clarifies
3. "Just write" + complete brief → compressed flow, review still runs

### Remove

- Default immediate generation without classification
- Implicit MSA default for commercial content

---

## P2 — Quality Engine (→ v1.0.0)

**Goal:** Material output quality jump.

### Deliverables

| File | Action |
|------|--------|
| `references/humanization-protocol.md` | v2 layers: rhythm, realism, native texture, anti-translationese, channel rules |
| Audit Mode in `SKILL.md` | Port `reference/arabic-qa` 9-point pipeline |
| `references/examples.md` | Bad vs good per dialect per engine |
| `references/engines.md` | Hybrid routing table (SEO+AEO, Brand+Captions) |
| `references/trends-and-hooks.md` | Evergreen hashtag categories + seasonal links |

### Acceptance Tests

4. Audit Mode scores register drift on sample copy
5. Humanization removes banned lexicon in test fixtures
6. Hybrid blog brief activates SEO + AEO synthesis

---

## P3 — Coach and Memory (→ v1.0.0)

**Goal:** Retention — users come back because the skill remembers.

### Deliverables

| File | Action |
|------|--------|
| `references/prompt-engineering.md` | **Create** — Arabic prompt repair, beginner/standard/pro templates |
| `voice.md` | **Create** — brand voice persistence schema |
| `SKILL.md` | Save/load voice protocol |

### Acceptance Tests

7. Weak Arabic prompt → upgraded versions with explanation
8. Saved `voice.md` → reused without full re-intake

---

## P4 — Masri Commercial Depth (→ v1.0.0)

**Goal:** Win Egyptian marketers and agencies.

### Deliverables

| File | Action |
|------|--------|
| `references/ads-service-matrix.md` | **Create** — Meta, Google, YouTube, TikTok, Snap, LinkedIn, WhatsApp |
| `domains/ads-media.md` | **Create** — Egyptian paid-media psychology |
| `references/seo-aeo-masri.md` | **Create** — from `reference/arabic-seo-optimizer` |
| `references/seasonal-calendar.md` | **Create** — Ramadan, Eid, White Friday, back-to-school |
| `dialects/masri.md` | Expand — ad jargon, dev slang, L4 professional |

### Acceptance Tests

9. Meta feed ad + Google search ad set from Egyptian brief
10. Ramadan campaign tone passes taboo scan

---

## P5 — Project Mode & Dev-Tech (→ v1.0.0)

**Goal:** Large deliverables without one-shot failure.

### Deliverables

| File | Action |
|------|--------|
| `references/project-mode.md` | **Create** — Discuss → Research → Recommend → Plan → Execute → Test → Refine |
| `references/book-writing.md` | **Create** — premise, outline, continuity QA |
| `domains/dev-tech.md` | **Create** — README, API docs, dev marketing |
| `references/project-context-scanner.md` | **Create** — safe repo scan rules and Arabic explanation formats |
| `references/output-templates.md` | Recommendation summary, project deliverable templates |

### Acceptance Tests

11. Multi-page website Project Mode completes staged plan
12. Book workflow: premise + outline + sample chapter with continuity review
13. Project scan produces an Arabic explanation grounded in README/docs/package evidence without leaking private files

---

## P7 — Distribution (v1.1.0 + v1.1.1)

**Goal:** Most-installed Arabic skill — install friction near zero.

### Deliverables

| Item | Status |
|------|--------|
| `website/` | ✅ Shipped v1.1.0 — live at https://arabic-skill.vercel.app; spec: [website-design-system.md](./website-design-system.md) |
| `docs/supported/cursor/` | ✅ Shipped — full adapter + `/arabic` command tree |
| `docs/supported/claude/` | ✅ Shipped — skill packaging guide |
| `bin/arabic-skill.js` + npm | ✅ Shipped v1.1.1 — `npx @mediabubble-adv/arabic-skill install` on [npm](https://www.npmjs.com/package/@mediabubble-adv/arabic-skill) |
| Golden test suite | ✅ Manual G13–G18 checklist in `tests/golden/`; automated runner → v1.2.0 |
| GitHub Releases | ✅ Shipped — tag push triggers `release.yml`; npm publish on tag via `npm-publish.yml` |
| `npx skills add` registry | ✅ Shipped v1.2.0 — `npx skills add mediabubble-adv/arabic-skill`; skills.sh telemetry listing |
| Full Cursor npx install | ✅ Shipped v1.2.0 — copies `~/.cursor/commands/arabic.md` + `~/.cursor/rules/arabic.mdc` |

### Tool Priority

1. Cursor, Claude, Windsurf, Aider (Strong)
2. Cline, Amp, OpenHands, Zed (Strong/Medium)
3. Gemini, Copilot, VS Code (Partial wrappers)
4. ~~Validate: Antigravity, Hermes, OpenClaw, OpenCode~~ **Done (PR #39)** — all four promoted to Partial

---

## CI and Quality Gates

Every PR must pass:

- `scripts/validate-skill.sh` — referenced runtime files exist
- `scripts/validate-docs.sh` — no broken internal links
- `scripts/validate-frontmatter.sh` — SKILL.md schema *(planned, not yet built — see [ci-pipeline.md](../engineering/ci-pipeline.md))*

Release tags trigger:

- GitHub Release with changelog excerpt

See [CI Pipeline](../engineering/ci-pipeline.md).

---

## Success Metrics (Product)

| Metric | Target |
|--------|--------|
| Advisory flow on vague requests | 100% before first draft |
| Audit Mode available | Every delivery |
| Runtime file integrity | 0 broken references in CI |
| Tool install docs | **24** tools documented; **0** Unknown-tier; npx presets for Cursor, Claude, Codex |
| Golden test pass rate | **G1–G12** ✅ gated v1.0.0; **G13–G18** ✅ manual checklist shipped v1.1.0 — see [implementation-plan §0.3](./implementation-plan.md#03-golden-test-master-table-g1g18) |

---

## Related Documents

- [PRD](../product/prd.md)
- [Implementation Plan](./implementation-plan.md)
- [Strategic Assessment](../analysis/strategic-assessment.md)
- [Skill Craft Research](../analysis/skill-craft-and-release-research.md)
- [Reference Distillation](./reference-distillation.md)
- [Versioning and Releases](../engineering/versioning-and-releases.md)
