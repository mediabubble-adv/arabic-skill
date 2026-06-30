# Product Roadmap — `arabic`

> Status: Active  
> Product version: **0.1.0** (development — see root `VERSION`)  
> **v1.0.0** = first public release when plan + PRD criteria complete  
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

| Milestone | Target | Theme | Tag |
|-----------|--------|-------|-----|
| **0.1.0** | Now | Dev baseline — architecture, docs, validation | `v0.1.0` (optional) |
| **1.0.0** | Plan complete | **First public release** — Phases 1–5 + PRD §12 | **`v1.0.0`** |
| **1.1.0** | Post-v1 | Distribution — website, `npx skills add`, install UX | `v1.1.0` |
| **2.0.0** | Future | Breaking changes, major routing restructure | `v2.0.0` |

### Work toward v1.0.0 (not separate public releases)

Phases 1–5 below are **implementation milestones** merged to `main` until the v1.0.0 gate passes. They do not each require a public semver tag.

| Phase | Theme | Key deliverables |
|-------|-------|------------------|
| **Phase 1** | Advisory operating model | `advisory-mode.md`, `SKILL.md` rewrite |
| **Phase 2** | Quality engine | Humanization v2, Audit Mode |
| **Phase 3** | Coach and memory | `prompt-engineering.md`, `voice.md` |
| **Phase 4** | Masri commercial depth | Ads matrix, SEO/AEO, seasonal calendar |
| **Phase 5** | Project Mode | Website/campaign/book workflows + project-aware Arabic explanations |
| **Phase R** | Research intelligence | `research/` layer, internet + AI + reference distillation |
| **Phase C** | Command surface | `/arabic` tree, `command-router.md`, workspace `.arabic/` auto |

Semver rules: see [Versioning and Releases](../engineering/versioning-and-releases.md).  
Skill quality bar: see [Skill Craft Research](../analysis/skill-craft-and-release-research.md).  
Research pipeline: see [Research Intelligence Plan](./research-intelligence-plan.md).  
Commands: see [Command Surface](./command-surface.md).

---

## Phase 1 — Behavioral Core (→ v1.0.0)

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

## Phase 2 — Quality Engine (→ v1.0.0)

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

## Phase 3 — Coach and Memory (→ v1.0.0)

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

## Phase 4 — Masri Commercial Depth (→ v1.0.0)

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

## Phase 5 — Project Mode (→ v1.0.0)

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

## Phase 6 — Distribution (v1.1.0)

**Goal:** Most-installed Arabic skill — install friction near zero.

### Deliverables

| Item | Action |
|------|--------|
| `website/` | **Post-v1 test project** — install site (impeccable.style-style) |
| `docs/supported/cursor/` | Full adapter + `/arabic` command tree |
| `docs/supported/claude/` | Skill packaging guide |
| `scripts/install.js` | `npx arabic install` (future) |
| Golden test suite | 13+ acceptance scenarios in `tests/golden/` |
| GitHub Releases | Automated from tags |

### Tool Priority

1. Cursor, Claude, Windsurf, Aider (Strong)
2. Cline, Amp, OpenHands, Zed (Strong/Medium)
3. Gemini, Copilot, VS Code (Partial wrappers)
4. Validate: Antigravity, Hermes, OpenClaw, OpenCode

---

## CI and Quality Gates

Every PR must pass:

- `scripts/validate-skill.sh` — referenced runtime files exist
- `scripts/validate-docs.sh` — no broken internal links
- `scripts/validate-frontmatter.sh` — SKILL.md schema

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
| Tool install docs | 22 tools documented, 4 first-class adapters |
| Golden test pass rate | 13/13 before **v1.0.0** tag |

---

## Related Documents

- [PRD](../product/prd.md)
- [Implementation Plan](./implementation-plan.md)
- [Strategic Assessment](../analysis/strategic-assessment.md)
- [Skill Craft Research](../analysis/skill-craft-and-release-research.md)
- [Reference Distillation](./reference-distillation.md)
- [Versioning and Releases](../engineering/versioning-and-releases.md)
