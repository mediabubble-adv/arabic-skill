# Audit Remediation Plan — Persuasion Layer, City Dialects, Storytelling

**Date:** 2026-07-05 · **Source:** Cowork audit of v1.2.7 · **Executor:** Claude Code
**Gate:** Plan-first. Do NOT execute any phase until the user says `approve plan` / `وافق على الخطة`.

---

## Mission

Close the strategic gap between the engineering shell (mature) and the copywriting core (incomplete):
add the Arab persuasion-psychology layer, upgrade city-level dialect intelligence, add a commercial
storytelling reference, add Gulf SEO/AEO, and eliminate sync/bookkeeping drift.

---

## Global Constraints (apply to every phase — non-negotiable)

1. **`SKILL.md` stays a clean router.** Each new file may add at most one routing row + one INDEX row. Never inline content into SKILL.md.
2. **No new top-level directories.** Everything lands in existing `arabic/references/` or `arabic/dialects/`. The 4-layer architecture (`docs/` → `reference/` → `research/` → `arabic/`) is frozen.
3. **Load discipline is sacred.** Every new reference file must be added to a task-class set in `arabic/references/load-discipline.md` and must respect the max-6-files-per-task budget. If a set would exceed budget, propose a slice split — do not silently exceed.
4. **Runtime changes via PR.** One branch per phase off `main`: `fix/p0-drift`, `feat/p1-persuasion`, `feat/p2-city-dialects`, `feat/p3-storytelling`, `feat/p4-gulf-seo-aeo`, `chore/p5-research-feed`, `feat/p6a-registry` / `feat/p6b-wave1` /
`feat/p6c-wave2`. Conventional commits.
5. **Validation gate per phase:** `npm run validate` must pass before the phase is considered done. New behavior gets a golden fixture in `tests/golden/`.
6. **Do not modify:** `website/`, `bin/`, `scripts/` (except the one addition in Phase 0), `reference/` (read-only source material), `docs/product/prd.md`, existing golden fixtures.
7. **Language of new content:** rule prose in English (consistent with existing references); all Arabic examples must be native-register dialect, pass the humanization-protocol back-translation test, and never invent city lexicon — when a marker is uncertain, mark it `⚠ verify` instead of guessing.
8. **Counts and cross-references:** after any file add, update `arabic/references/INDEX.md` (file counts, load-when rows) in the same PR. INDEX is SSOT — no stale numbers.

---

## Phase 0 — Drift & Bookkeeping (fix/p0-drift) — do first, low risk

1. **Re-sync `.cursor/skills/arabic/`** from `arabic/` (it is missing `onboarding-mode.md`, `research-mode.md`, `templates/`; 7 files differ). Use the existing install path (`node bin/arabic-skill.js install` logic) — do not hand-copy if a sync command exists.
2. **Extend `scripts/validate-reference-sync.sh`** (or add `validate-cursor-sync.sh` + wire into `npm run validate` and CI) to diff `arabic/` against `.cursor/skills/arabic/` and fail on drift. Exclude `.DS_Store`.
3. **Fix `arabic/references/INDEX.md`:** reference count says 21 over a 22-row table; build-status total (59) is stale. Recount from disk, correct.
4. **Add dialect Confidence Tier column** to INDEX dialect table and SKILL.md Module 1 table:
   - Tier 1 (deep): masri, ksa, khaliji, levantine
   - Tier 2 (solid): iraqi, maghrebi, msa, white-dialect
   - Tier 3 (baseline): yemeni, sudanese, libyan
   Router rule: Tier 3 dialect + high-stakes commercial task → disclose tier and offer white-dialect fallback option.

**Acceptance:** `npm run validate` green; `diff -rq arabic .cursor/skills/arabic` clean (modulo .DS_Store); INDEX counts match disk.

---

## Phase 1 — Arab Persuasion Psychology Layer (feat/p1-persuasion) — highest impact

### 1a. Create `arabic/references/persuasion-arab-psychology.md`

Structure (target 350–500 lines, follow humanization-protocol.md formatting conventions):

**§1 Six Cultural Archetypes** — for each of Family Guardian (حامي العيلة), Generous Host (الكريم),
Faithful Steward (الأمين), Ambitious Achiever (الطموح), Community Pillar (عمود المجتمع),
Heritage Keeper (حارس التراث):
- definition + core values + underlying fear/desire
- trigger phrases in 4 dialects minimum (Masri, KSA, Khaliji, Levantine) — native register, not translated
- product-category fit table (which industries/domains activate it)
- taboo interactions (cross-reference `taboos.md` — e.g., Faithful Steward + finance → riba rules)
- one ❌/✅ copy pair per archetype (bad = generic appeal, good = archetype-activated)

**§2 Persuasion Lever Matrix** — levers: thiqa (trust), reciprocity, karam, barakah/halal assurance,
social proof (الناس بتقول), honor/shame, nostalgia, FOMO. Matrix: lever × market (Egypt / KSA / Gulf /
Levant / Maghreb) × segment (youth vs elders, urban vs rural) with intensity guidance (lead / support / avoid).

**§3 Archetype Selection Protocol** — how to pick during intake: from product category + audience +
market; default mappings; mixed-archetype rule (max 1 primary + 1 secondary per piece).

**§4 Integration Hooks** — explicit handoffs: recommendation summary line format, audit check wording,
voice.md field.

### 1b. Wiring edits (same PR)

| File | Edit |
|---|---|
| `arabic/references/intake-protocols.md` | Add one dynamic intake question slot: archetype confirmation ("Who is this buyer at heart — the provider, the achiever, the host…?") — counts inside the existing 70/30 budget, not on top of it |
| `arabic/references/advisory-mode.md` §4 | Recommendation summary gains one line: `Archetype/lever: <primary archetype + lead lever + why>` |
| `arabic/references/audit-mode.md` | 9-point audit becomes 10-point: "persuasion-lever consistency — does the copy activate the declared archetype, and only compatible levers?" |
| `arabic/voice.md` | Schema gains `archetype:` (primary, optional secondary) field; loading rule updated |
| `arabic/references/engines.md` | Marketing Funnel + Sales Content engines: replace the one-line psychology note with a pointer to the new file + rule "label each funnel piece with archetype + lever" (extends the existing stage/lever labeling) |
| `arabic/SKILL.md` | One routing row: load persuasion file for any commercial/persuasive task (ads, sales, funnel, landing, captions with CTA). One checklist item in Activation Checklist |
| `arabic/references/load-discipline.md` | Add to `write` task-class set for commercial tasks; verify budget still ≤6 — if exceeded, persuasion file replaces `examples.md` in the commercial write set |
| `arabic/references/INDEX.md` | New row + count fix |

### 1c. Golden test

New fixture `tests/golden/p1-persuasion-routing.md`: given a KSA family-car campaign brief, the flow
must (a) load the persuasion file, (b) state archetype in the recommendation summary, (c) include the
10th audit check. Wire into `validate-golden-scenarios.sh` manifest.

**Acceptance:** all wiring edits present; no load-set exceeds 6 files; golden fixture passes; `npm run validate` green.

---

## Phase 2 — City-Level Dialect Intelligence (feat/p2-city-dialects)

Upgrade sub-regional sections from vibe descriptions to **operational blocks**. Standard block per city/region:

```
### <City/Region name (AR + EN)>
Register note (1 line) · When to use (1 line)
Markers: 5–10 lexicon items (marker | meaning | contrast with capital-city form)
Sample line: 1 native commercial line
Avoid: 2–3 items that would mark the copy as outsider
```

| File | Add/upgrade |
|---|---|
| `arabic/dialects/masri.md` §8 | Upgrade Cairo/Alexandria/Sa'idi/Delta to full blocks; ADD Canal cities (Suez/Ismailia/Port Said), Sharkia, Sinai |
| `arabic/dialects/levantine.md` | ADD Lebanon city registers: Beirut, Tripoli, South, Bekaa, Mountain; upgrade Damascus, Amman notes to blocks |
| `arabic/dialects/ksa.md` | ADD Eastern Province, Southern (Aseeri) blocks; upgrade Najdi/Hejazi/Qassimi to standard block format |
| `arabic/dialects/khaliji.md` | Upgrade Dubai / Abu Dhabi / Kuwaiti / Qatari / Bahraini / Omani sketches to standard blocks |

Rules: stay inside existing dialect files (no `cities/` directory); each file stays under ~450 lines —
if a file would exceed, compress prose, never cut markers; uncertain markers get `⚠ verify` and a row
in `research/distillation-queue.md` (dialect-freshness item) instead of a guess.

**Acceptance:** every listed city has a complete standard block; zero unmarked guesses; `npm run validate` green.

---

## Phase 3 — Commercial Storytelling Reference (feat/p3-storytelling)

Create `arabic/references/storytelling.md` (target 250–350 lines):

- **§1 Arab narrative devices:** proverb-anchored opening, hakawati cadence (oral-rhythm pacing), nested reveal (1001-Nights structure adapted to 30s), the communal "we" arc, honor-restoration arc
- **§2 Frameworks per format:** 30-sec ad story (beat sheet), landing-page origin story, testimonial arc (relatable → transformation → proof), founder story, before/after with dignity (no shame-based befores — cross-ref taboos)
- **§3 Dialect story rhythm:** how pacing/beat length differs Masri vs Khaliji vs Levantine (Masri = punchline rhythm, Levantine = lyrical build, Gulf = dignified reveal)
- **§4 Integration:** Content Planner hook (story spine before outline), archetype pairing table (which narrative device serves which archetype from Phase 1)

Wiring: routing row in SKILL.md (Content Planner + Sales/Funnel/Video engines), `load-discipline.md`
write-set placement, INDEX row, engines.md pointers (replace book-only narrative references for
commercial tasks). Book Engine keeps its own section — do not merge book-writing.md into this file.

**Acceptance:** file exists with all 4 sections; wired in 4 places; `npm run validate` green.

---

## Phase 4 — Gulf SEO/AEO (feat/p4-gulf-seo-aeo)

Create `arabic/references/seo-aeo-gulf.md`, mirroring `seo-aeo-masri.md` structure exactly (same
headings, KSA/UAE content): search behavior, colloquial-vs-MSA query splits for Gulf, Arabic AEO for
Gulf entities, local platform notes (Google.sa/.ae, Haraj, local directories — mark unverifiable
volume claims `⚠ verify` and queue for research). Wiring: SKILL.md/INDEX/load-discipline rows;
`seo-aeo-masri.md` gets a one-line cross-pointer.

**Acceptance:** structural parity with the Masri file; wired; `npm run validate` green.

---

## Phase 5 — Feed the Research Pipeline (chore/p5-research-feed) — ongoing, parallel-safe

The KB dirs `marketing-psychology/`, `dialects/`, `seasonal/`, `seo-aeo/` are empty and the
distillation queue has zero rows. Seed it:

1. Run `/arabic research arab-persuasion-evidence` → `research/knowledge-base/marketing-psychology/` (backs Phase 1 with citations; trust-tier per research-mode rules).
2. Run `/arabic research dialect-freshness <tier-3 dialect>` for yemeni, sudanese, libyan → `research/knowledge-base/dialects/` + queue rows targeting those dialect files.
3. Add queue rows for every `⚠ verify` marker created in Phases 2 and 4.
4. Update `research/index.json` per entry; respect queue cap ≤20.

**Acceptance:** ≥2 KB files created with citations; queue non-empty with valid runtime targets; `validate-research.sh` green.

---

## Phase 6 — Expand `npx install` Target Presets (feat/p6-npx-targets)

Today `bin/arabic-skill.js` hardcodes 3 presets (`targetRoots`: cursor, claude, codex) while
`docs/supported/` documents 24 tool profiles. Close the gap in two waves.

### 6a. Refactor installer to a data-driven target registry

- Replace the hardcoded `targetRoots` object with a registry (e.g. `bin/targets.json` or a `TARGETS`
  map in the script): `{ id, skillsDir, integrationFiles[], notes }` per tool.
- Keep the existing Cursor special-case (command + rule files) as the model for per-tool
  `integrationFiles`; other tools get skill-pack-only installs unless their profile documents an
  equivalent command/rule surface.
- `--target all` iterates the registry; `--target <id>` validates against it; unknown id error must
  list available ids.
- **Backwards compatibility is frozen:** `--target cursor|claude|codex`, `--dir`, `--force`, and all
  flags/output formats documented in README must keep working unchanged.

### 6b. Wave 1 targets (priority — owner's stack)

Add presets: **gemini**, **antigravity**, **opencode**, **kilo-code**.

Rule: derive each `skillsDir` from the tool's own profile in `docs/supported/<tool>/` — do NOT invent
paths. If a profile lacks a confirmed global skills/rules directory, first update that profile with
the verified convention (check the tool's official docs), then add the preset. If no stable
convention exists, the tool ships as `--dir`-only with a documented recommended path in its profile —
no fake preset.

### 6c. Wave 2 targets (feasibility-gated)

Evaluate from profiles and add where a stable directory convention exists: windsurf, cline, amp,
qwen, continue, zed, aider. Same derive-don't-invent rule. Tools with workspace-only conventions
(copilot, replit, chatgpt web) stay manual-path per profile — record the decision in
`support-matrix.md` so the matrix explains *why* a tool has no preset.

### 6d. Wiring & parity (same PRs)

| Surface | Edit |
|---|---|
| `bin/arabic-skill.js` | Registry refactor + new presets + updated `--help` text |
| `README.md` Install section | New preset commands per tool |
| `website/content/` `/install` page copy | Must match README (G14 gate: `validate-website-install.sh`) — Masri-first copy per website rules; this is the **only** permitted `website/` change, exempting it from Global Constraint 6 for this phase |
| `docs/supported/<tool>/README.md` | Each new preset tool: install section updated from manual → preset |
| `docs/supported/support-matrix.md` | New "npx preset" column state per tool (`preset` / `--dir` / `manual` + reason) |
| `scripts/` | New `validate-install-targets.sh`: registry ids ↔ support-matrix rows ↔ README preset list parity; wire into `npm run validate` + CI |
| `tests/golden/` | Fixture: `--target <new-id>` dry-run resolves correct paths; `--target bogus` errors with id list |

### 6e. Constraints specific to this phase

- Installer stays **zero-dependency Node** (no new npm deps) and single-file friendly — registry may
  be a JSON asset included in `files` for npm pack (`validate-npm-pack.sh` must stay green).
- Never write outside the target tool's own config directory; `--force` semantics identical across targets.
- Each wave = its own PR (`feat/p6a-registry`, `feat/p6b-wave1`, `feat/p6c-wave2`) so a path mistake
  in one tool can't block the rest.

**Acceptance:** wave-1 presets install + uninstall cleanly (smoke-test via `--dir` into a temp dir in
CI); README ↔ `/install` ↔ support-matrix ↔ registry all in parity via the new validator;
`npm run validate` + `validate-npm-pack.sh` green.

---

## Sequencing & Effort

| Order | Phase | Risk | Est. size |
|---|---|---|---|
| 1 | P0 drift | Low | S |
| 2 | P1 persuasion | Medium (touches 8 files) | L |
| 3 | P2 city dialects | Medium (content accuracy) | L |
| 4 | P3 storytelling | Low | M |
| 5 | P4 gulf seo/aeo | Low | M |
| ∥ | P5 research feed | Low | M, ongoing |
| ∥ | P6 npx targets | Medium (installer refactor) | M–L, 3 PRs |

P1 before P2/P3 (both cross-reference the archetype layer). P5 item 1 can start before P1 to ground
it in evidence. P6 is fully independent of the content phases and can run in parallel — but 6a
(registry refactor) must merge before 6b/6c.

## Definition of Done (whole plan)

- All 6 archetypes implemented and routed; recommendation summaries name archetype + lever; audit is 10-point.
- Every charter city (Egypt ×7, Lebanon ×5, KSA ×5, Gulf ×6) has an operational block.
- `storytelling.md` + `seo-aeo-gulf.md` live and routed.
- Zero drift between `arabic/` and `.cursor/skills/arabic/`, enforced by CI.
- Distillation queue actively populated; no empty KB category relevant to the charter.
- `npx install` presets cover the owner's stack (cursor, claude, codex, gemini, antigravity, opencode,
  kilo-code) via a data-driven registry; support-matrix explains preset/`--dir`/manual state for all 24 tools.
- `npm run validate` + golden harness green on `main`.
