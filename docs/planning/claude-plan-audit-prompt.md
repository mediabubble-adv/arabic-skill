# Claude Plan Audit Prompt

Copy-paste the prompt below into **Claude Code** or **Claude Projects** after opening the `arabic-skill` repository.

**Purpose:** Full audit of docs, `reference/`, and `arabic/` runtime — then **rewrite and improve** all plan files, the Research Intelligence Plan, the `/arabic` Command Surface, project-aware workspace scanning, engineering governance (branching, semver, tags, PRs), and the v1.1.0 Arabic-first tutorial website phase.

**Includes:** Phase-by-phase workflow (0–10), document inventory, golden tests G1–G18, git branch/commit/PR playbook, release tags, and follow-up prompts for implementation.

**Expected session length:** Multi-step. Complete Phase 1 (audit) before Phase 2 (rewrites). Use git branches per Phase 9 when a Git checkout is available.

**Readiness goal:** After your edits, another Claude Code session should be able to execute the plan without guessing file names, phase order, command behavior, research rules, or release gates.

---

## Before you paste

1. Open repo: `cd arabic-skill` (clone folder; GitHub: `mediabubble-adv/arabic-skill`)
2. Read `AGENTS.md` at repo root
3. Ensure you can run: `./scripts/validate-skill.sh` and `./scripts/validate-docs.sh`

---

## Prompt (copy from here)

```markdown
# Mission: Professional Plan Audit, Improvement & Delivery Governance
## Awesome Arabic Skill (`arabic`) — MediaBubble

You are the **lead product architect and technical program manager** for this repository. The repo is open in your workspace. **Read files on disk** — never assume structure from memory.

Your job is **not** to implement runtime skill behavior or website code in this session unless explicitly told. Your job is to:

1. **Audit** the current plan, skill, reference library, and engineering setup
2. **Improve and rewrite** plan documents to professional, shippable quality
3. **Upgrade** `research-intelligence-plan.md` and `command-surface.md` to production-grade specs
4. **Specify** how the skill scans project files and writes valuable Arabic explanations, tutorials, and product copy from that context
5. **Align** branching, versioning, tags, releases, commits, and PR workflow across all docs
6. **Produce** a complete document inventory with acceptance criteria per file

---

## A. Project truth table (verify on disk)

| Item | Expected value |
|------|----------------|
| Product name | **Awesome Arabic Skill** |
| Runtime skill folder | `arabic/` (not `arabic-skill/`) |
| Skill ID (`SKILL.md` `name:`) | `arabic` |
| Display name | Awesome Arabic Skill |
| GitHub repo | `mediabubble-adv/arabic-skill` |
| Clone folder | `arabic-skill` |
| Install | `cp -r arabic ~/.cursor/skills/arabic` |
| Current version | `0.1.0` dev (`VERSION`, `CHANGELOG.md`, `arabic/SKILL.md`) |
| v1.0.0 gate | PRD §12 + implementation Phases 1–5 + golden tests |
| v1.1.0 | Website + distribution (`npx skills add`) |
| Default flow | `guide → clarify → recommend → write → review` |
| Project-aware goal | Skill can scan project files and explain the project/tool in natural Arabic |
| Website goal | Arabic-first multi-page install + command tutorial website, built after v1.0.0 |

**Non-negotiables:**
- `reference/` = 38 canonical specialist skills — do not delete; distill into runtime only via plan
- `arabic/` = portable runtime pack users install
- No fake live trends; preloaded seasonal hooks only
- No premature `v1.0.0` tag or VERSION bump
- No redundant `-skill` in runtime folder name
- Project scanning must respect repository boundaries, avoid secret leakage, and summarize evidence from actual files
- Arabic website copy must be produced by dogfooding the skill after v1.0.0, not before

---

## B. Phase 0 — Discovery scan (do first, no writes yet)

Read in this order and take structured notes:

### B1. Runtime (`arabic/`)
- `arabic/SKILL.md` — routers, modes, token budget, gaps
- `arabic/references/INDEX.md` — inventory vs disk
- All of: `dialects/`, `domains/`, `conversations/`, `professional-docs/`, `references/`
- List **missing planned files**: `advisory-mode.md`, `prompt-engineering.md`, `project-mode.md`, `project-context-scanner.md`, `ads-service-matrix.md`, `book-writing.md`, `seo-aeo-masri.md`, `seasonal-calendar.md`, `command-router.md`, `domains/ads-media.md`, `domains/dev-tech.md`, `voice.md`

### B2. Product (`docs/product/`)
- `prd.md` (especially §12 Success Criteria)
- `operating-model.md`, `system-architecture.md`, `content-structure.md`, `context-and-sources.md`

### B3. Planning (`docs/planning/`)
- `roadmap.md`, `implementation-plan.md`, `reference-distillation.md`
- `research-intelligence-plan.md`, `command-surface.md`, `claude-plan-audit-prompt.md`

### B4. Analysis (`docs/analysis/`)
- `strategic-assessment.md`, `skill-craft-and-release-research.md`

### B5. Engineering (`docs/engineering/`)
- `versioning-and-releases.md`, `branching-strategy.md`, `collaboration-rules.md`, `ci-pipeline.md`

### B6. Supported tools (`docs/supported/`)
- `README.md`, `integration-model.md`, `support-matrix.md`
- `cursor/README.md` (and note missing `cursor/commands.md`)

### B7. Reference library (`reference/`)
- `reference/README.md`
- Deep sample: `arabic-qa/`, `arabic-creator/`, `arabic-content-strategist/`, `arabic-seo-optimizer/`, `arabic-masri/`

### B8. Engineering artifacts
- `scripts/validate-skill.sh`, `scripts/validate-docs.sh`
- `.github/workflows/validate.yml`, `release.yml`, `CODEOWNERS`
- `VERSION`, `CHANGELOG.md`, `README.md`, `AGENTS.md`

### B9. Project-awareness audit
- Identify how `/arabic auto` should scan a project: file inventory, README/package metadata, docs, routes/pages, examples, config, and public copy
- Define what must never be used in generated Arabic content: secrets, private credentials, `.env`, lockfile noise, generated build output
- Specify outputs for project-aware Arabic writing: product summary, landing copy, tutorial, README section, install guide, tool explanation, release notes
- Check whether this behavior belongs in `arabic/references/project-context-scanner.md`, `command-router.md`, `domains/dev-tech.md`, or Project Mode

**Output:** Internal notes only until Phase 1.

---

## C. Phase 1 — Audit report (write before any rewrites)

Create **`docs/analysis/plan-audit-2026.md`** with this exact structure:

```markdown
# Plan Audit — Awesome Arabic Skill
> Date: YYYY-MM-DD | Auditor: Claude | Repo state: 0.1.0 dev

## 1. Executive summary
- Overall plan quality: X/10
- Runtime readiness: X/10
- Claude execution readiness: ready / needs changes / blocked
- Top 3 risks (ranked)
- Top 3 highest-ROI fixes

## 2. Alignment matrix
| PRD §12 criterion | Roadmap phase | Implementation phase | Runtime file(s) | Status |
|-------------------|---------------|----------------------|-----------------|--------|

## 3. Inventory truth table
| Claimed in docs | On disk? | Path | Action |

## 4. Gap analysis
### 4.1 Missing runtime files
### 4.2 Docs-only / behavior-not-shipped
### 4.3 Conflicts between PRD, SKILL.md, operating-model
### 4.4 Broken or stale cross-links

## 5. Reference distillation audit
| reference/ pack | Runtime target | Priority | Phase | Lines budget |

## 6. Research intelligence audit
| Topic | Current spec quality | Gaps | Recommended structure |

## 7. Command surface audit
| Subcommand | Routed in SKILL.md? | Engine/template mapped? | Test exists? |

## 8. Project-aware content audit
| Capability | Current state | Required files | Risks | Tests |

## 9. Engineering governance audit
| Area | Current state | Gaps vs best practice |

## 10. Sequencing critique
- Is behavioral core before expansion enforced?
- What to cut, defer, or merge?

## 11. Recommendations (ranked P0–P3)
| ID | Recommendation | Effort | Impact | Target phase |

## 12. Open questions for maintainer (max 7)
```

Be brutally honest. Separate **documentation progress** from **shipped behavior**.

---

## D. Phase 2 — Rewrite core product plans

After Phase 1 is written, **overwrite** these files with improved, professional versions. Each file must include: **Status**, **Owner**, **Last updated**, **Dependencies**, **Acceptance criteria**, and cross-links.

### D1. `docs/planning/roadmap.md`

Must contain:
- Vision + default flow
- Release train table:

| Version | Theme | Gate | Git tag | Branch type |
|---------|-------|------|---------|-------------|
| 0.1.x | Dev baseline | CI green | `v0.1.x` optional | `main`, `feat/*` |
| **1.0.0** | Skill complete | PRD §12 + Phases 1–5 + golden tests | **`v1.0.0`** | `release/1.0.0` |
| 1.1.0 | Website + distribution | Phase 9 + G13–G18 | `v1.1.0` | `release/1.1.0` |
| 2.0.0 | Breaking changes | Migration notes | `v2.0.0` | `release/2.0.0` |

- Work phases toward v1.0.0: **1–5** (advisory, quality, coach, Masri commercial, project mode)
- Cross-cutting phases: **R** (research), **C** (commands), **9** (website at v1.1.0)
- Per-phase: goal, deliverables table, acceptance tests, **suggested git branch name**, **PR title example**
- Mermaid diagram: version timeline + phase dependencies
- CI quality gates per milestone

### D2. `docs/planning/implementation-plan.md`

Must contain:
- Numbered phases 0–9 with **dependency graph**
- Per phase:
  - Goal
  - Files table: `path` | action (create/update) | source (`reference/` or research) | owner | acceptance gate
  - Tasks (checkbox list)
  - **Branch:** `feat/phase-N-short-name`
  - **PR:** `feat(skill): …` example
  - **Do not merge until:** checklist
- **Phase 0** Architecture lock
- **Phases 1–5** → v1.0.0 (unchanged intent, improved detail)
- **Phase R0–R4** Research intelligence (from improved research plan)
- **Phase C0–C5** Command surface (from improved command plan)
- **Project context scanner** path from workspace scan → evidence summary → Arabic explanation/tutorial/copy
- **Phase 9** Marketing website (v1.1.0 only — plan spec, not code)
- **Golden tests G1–G18** master section with steps + expected outcomes
- **Priority order** if time-boxed
- Link every new runtime file to a golden test
- Add a dedicated project-aware content test: scan a real repo sample and produce Arabic explanation without leaking private files

### D3. `docs/planning/reference-distillation.md`

- Absorption schedule tied to implementation phases
- Per `reference/` pack: target runtime file, max lines to distill, do-not-copy list
- Validation: how to prove distillation worked

### D4. `docs/product/prd.md`

- Update only where audit found gaps
- Add sections if missing:
  - **§ Research intelligence** (how external knowledge enters product)
  - **§ Command surface** (`/arabic` as product UX)
  - **§ Project-aware Arabic content** (scan project files, infer what the tool/product does, explain it in Arabic)
  - **§ Website (v1.1.0)** — multi-page React marketing site
- Keep §12 Success Criteria; add traceability to G1–G18

### D5. `docs/README.md`

- Update index with all planning docs and new files you create

---

## E. Phase 3 — Improve Research Intelligence Plan

**Overwrite** `docs/planning/research-intelligence-plan.md` to production quality.

### Required sections

1. **Purpose & principles** — canonical vs collected vs runtime layers
2. **Folder structure** — full tree for `research/` with file purposes
3. **Research types** — internet, AI-assisted, internal `reference/`
4. **Trust tiers** A/B/C with examples and runtime eligibility rules
5. **Monthly research cycle** — 7-step workflow with owners and outputs
6. **Distillation queue format** — template for `research/distillation-queue.md`
7. **Source registry** — `research/sources/sources.yaml` schema
8. **Knowledge-base file template** — frontmatter: `topic`, `last_reviewed`, `trust_tier`, `sources[]`, `runtime_targets[]`
9. **Topic map** — platforms, dialects, seasonal, SEO/AEO, humanization, ads psychology
10. **Agent prompt library** — at least 5 prompts in `research/prompts/` (specify filenames + purpose):
    - `reference-gap-scan.md`
    - `platform-ads-research.md`
    - `dialect-freshness-audit.md`
    - `competitor-landing-teardown.md`
    - `humanization-pattern-mining.md`
11. **Integration with `/arabic research`** — command args, outputs, file paths
12. **Phasing R0–R4** — tied to versions 1.0.0 / 1.1.0 / 1.2.0
13. **Acceptance criteria** — checklist
14. **Git workflow** — branch `feat/research-R0-scaffold`, PR checklist
15. **How `reference/` + internet research combine** — decision tree diagram (mermaid)

### Required web-research behavior

- If web access is available, collect current official sources for platform specs and policy-sensitive topics before writing research conclusions.
- Prefer official platform documentation first: Meta, Google Ads, TikTok, Snapchat, LinkedIn, YouTube, and relevant help centers.
- Record source URL, access date, trust tier, and runtime eligibility.
- If web access is unavailable, mark every unverified source-dependent item as `needs_live_verification`.

### Research improvement goals

- Every research item must end in either **runtime distill** or **explicit defer**
- No unbounded growth: max 20 open distillation-queue items
- Cite official ad platform docs first (Meta, Google, TikTok, Snap, LinkedIn)
- Dialect slang: Tier A/B only in runtime; Tier C needs human review flag

---

## F. Phase 4 — Improve Command Surface (`/arabic`)

**Overwrite** `docs/planning/command-surface.md` to production quality.

### Required sections

1. **Design principles** — one root command, advisory default, workspace-aware
2. **Grammar** — `/arabic <verb> [subcommand] [args] [flags]`
3. **Flag reference** — `--dialect`, `--platform`, `--brief`, `--file`, `--out`, `--yes`, `--count`
4. **Root verbs** — full spec for each:

| Verb | Mode | When to use | Loads |
|------|------|-------------|-------|
| `(default)` / `guide` | Advisory | Vague request | advisory-mode, intake |
| `write` | Pro | Structured brief | engine + template |
| `audit` | Audit | Review copy | arabic-qa distill |
| `coach` | Prompt Coach | Weak prompt | prompt-engineering |
| `plan` | Project | Multi-piece | project-mode |
| `research` | Research | Collect intel | research prompts |
| `voice` | Memory | Brand persistence | voice.md |
| `auto` | Automation | Infer from workspace | command-router + context scan |
| `init` | Setup | First use in project | `.arabic/` scaffold |
| `help` | Docs | Usage | command-router |

5. **`write` subcommand matrix** — complete table (minimum 25 rows):

Columns: `subcommand` | `workspace` | `engine` | `template` | `files loaded` | `example invocation`

Must include: `caption`, `captions`, `reel`, `story`, `post`, `ad`, `ads`, `meta`, `google`, `tiktok`, `snap`, `linkedin`, `whatsapp`, `email`, `landing`, `page`, `website`, `blog`, `seo`, `aeo`, `video`, `script`, `youtube`, `podcast`, `sales`, `funnel`, `tagline`, `brand`, `book`, `chapter`, `outline`, `ui`, `contract`, `skill`, `rules`

6. **`plan` subcommands** — `campaign`, `website`, `book`, `brand` with staged workflows
7. **`/arabic auto` specification** — detection signals, flow diagram, confirmation rules, monorepo-specific behaviors for `arabic-skill` repo
8. **`.arabic/` workspace scaffold** — full tree + `config.yaml` schema
9. **Project scan grammar** — `/arabic auto explain`, `/arabic plan website`, `/arabic write readme`, and `/arabic write tutorial`
10. **Runtime file:** `arabic/references/command-router.md` — spec to create at v1.0.0 (include full routing table; SKILL.md must link, not duplicate)
11. **Runtime file:** `arabic/references/project-context-scanner.md` — spec to create at v1.0.0 (safe scan rules, evidence map, Arabic output formats)
12. **Cursor adapter:** `docs/supported/cursor/commands.md` — create with copy-paste examples per verb
13. **Golden tests G7–G12** (extend to G18 if needed) — step-by-step
14. **Phasing C0–C5** — version targets
15. **Error handling** — unknown subcommand → suggest nearest match
16. **Git workflow** — branch `feat/command-surface-C0`, PR checklist

### Command routing rule

Every subcommand must map through existing SKILL.md pipeline:

`dialect → domain → workspace → engine → template → taboo → humanization → review`

Document the mapping explicitly. No orphan commands.

---

## G. Phase 5 — Website (v1.1.0 / Phase 9)

Document in roadmap + implementation plan (plan only — **no `website/` code** unless told). The website is an Arabic-first dogfood project: the skill should generate the Arabic tutorials, command examples, install explanations, and user-facing copy from the repo itself.

### Stack (pick one, justify)
- React 19 + TypeScript + Vite, or Next.js App Router

### Routes (minimum)
- `/` Home
- `/features`
- `/install`
- `/docs` (or GitHub link)
- `/examples`
- `/about`
- `/commands` (optional — interactive `/arabic` reference)
- `/tutorials` Arabic-first command tutorials and workflows

### Advanced React components (list each with behavior spec)
- Animated hero + dialect switcher preview
- Mode flow diagram (interactive)
- Copy-to-clipboard install blocks
- Tabbed snippets (bash / Cursor / Claude)
- Before/after humanization cards
- Feature bento grid with motion
- RTL Arabic typography showcase
- Command palette demo (static)

### Design system doc to plan
- Create spec for `docs/planning/website-design-system.md` (tokens, typography AR+EN, color, spacing, motion)

### Golden Test G13–G18 (website-specific)
- G13: all routes render
- G14: install copy matches README
- G15: 3+ interactive components on mobile
- G16: Masri + MSA blocks pass audit rules
- G17: `npm run build` passes
- G18: deploy preview URL documented

### Content workflow
```
Scan repo → discuss audience → sitemap → per-page Arabic brief → skill writes copy → design system → React build → QA → deploy
```

Benchmark: [impeccable.style](https://impeccable.style/)

---

## H. Phase 6 — Engineering & delivery governance (align all docs)

Update or verify consistency across **`docs/engineering/`** and embed git workflow in implementation plan.

### H1. Branching (`branching-strategy.md`)

Ensure documented:
- `main` protected, always CI-green
- Branch prefixes: `feat/`, `fix/`, `docs/`, `release/`, `chore/`
- Feature branch per implementation phase
- Release branch: `release/{version}` for semver tags
- Hotfix: `fix/` → patch tag
- Squash merge preferred; delete branch after merge

### H2. Versioning & tags (`versioning-and-releases.md`)

Ensure documented:
- `VERSION` = `arabic/SKILL.md` version = must match on every tag
- v1.0.0 gate checklist (PRD §12, phases 1–5, golden tests, validate scripts)
- Tag format: `v{MAJOR}.{MINOR}.{PATCH}` only — never plan labels like v5.2
- Annotated tags: `git tag -a v1.0.0 -m "v1.0.0: first public release"`
- `release.yml` triggers on tag push → GitHub Release
- CHANGELOG: `[Unreleased]` during dev; version section on release

### H3. Collaboration & PRs (`collaboration-rules.md`)

Ensure documented:
- PR title: `type(scope): description` (feat, fix, docs, chore, refactor, test)
- Every PR: summary, roadmap phase link, CI green, CHANGELOG `[Unreleased]` if user-visible
- CODEOWNERS paths: `arabic/SKILL.md`, `arabic/dialects/`, `VERSION`, workflows
- AI-assisted edits: note in PR, run golden scenarios

### H4. CI (`ci-pipeline.md`)

Ensure documented:
- `validate` workflow on PR to `main`
- `validate-skill.sh` + `validate-docs.sh` + version sync check
- Future: `validate-research.sh`, golden test runner

### H5. Per-phase git playbook (add to implementation-plan.md)

For **each phase**, document:

```markdown
### Git delivery — Phase N
- Branch: `feat/phase-N-short-name`
- Commits: conventional, atomic (docs vs runtime separate commits)
- PR title: `feat(skill): phase N — short description`
- PR body: phase checklist, golden tests run, screenshots if UI
- Merge: squash to main after CI + review
- CHANGELOG: under [Unreleased]
- Tag: only on release branch when version bumps
```

### H6. Release playbook (add to versioning doc or new `docs/engineering/release-playbook.md`)

Step-by-step for v1.0.0 and v1.1.0:

1. Open `release/{version}` from `main`
2. Bump `VERSION`, `CHANGELOG.md`, `arabic/SKILL.md`, `INDEX.md`
3. Run all validations + golden tests
4. PR `release/{version}` → `main`
5. Merge
6. `git tag -a vX.Y.Z -m "..."` on `main`
7. `git push origin main && git push origin vX.Y.Z`
8. Verify GitHub Release created
9. Post-release: merge `[Unreleased]` section in CHANGELOG

---

## I. Phase 7 — Complete document inventory

After rewrites, ensure these files exist or are planned with create date + phase:

### Product
| File | Status |
|------|--------|
| `docs/product/prd.md` | Update |
| `docs/product/operating-model.md` | Verify alignment |
| `docs/product/system-architecture.md` | Update command + research layers |
| `docs/product/content-structure.md` | Add `research/`, `.arabic/` |
| `docs/product/context-and-sources.md` | Add research layer hierarchy |

### Planning
| File | Status |
|------|--------|
| `docs/planning/roadmap.md` | Rewrite |
| `docs/planning/implementation-plan.md` | Rewrite |
| `docs/planning/reference-distillation.md` | Rewrite |
| `docs/planning/research-intelligence-plan.md` | Rewrite |
| `docs/planning/command-surface.md` | Rewrite |
| `docs/planning/website-design-system.md` | **Create** |
| `docs/planning/claude-plan-audit-prompt.md` | Do not delete |

### Analysis
| File | Status |
|------|--------|
| `docs/analysis/plan-audit-2026.md` | **Create** |
| `docs/analysis/strategic-assessment.md` | Update if stale |
| `docs/analysis/skill-craft-and-release-research.md` | Cross-link |

### Engineering
| File | Status |
|------|--------|
| `docs/engineering/versioning-and-releases.md` | Align |
| `docs/engineering/branching-strategy.md` | Align |
| `docs/engineering/collaboration-rules.md` | Align |
| `docs/engineering/ci-pipeline.md` | Align |
| `docs/engineering/release-playbook.md` | **Create** |

### Supported
| File | Status |
|------|--------|
| `docs/supported/cursor/commands.md` | **Create** |
| `docs/supported/cursor/README.md` | Link commands |

### Runtime (planned — spec only, do not implement unless asked)
| File | Phase |
|------|-------|
| `arabic/references/advisory-mode.md` | 1 |
| `arabic/references/command-router.md` | C1 |
| `arabic/references/prompt-engineering.md` | 3 |
| `arabic/references/project-mode.md` | 5 |
| `arabic/references/project-context-scanner.md` | C1 / 5 |
| `arabic/voice.md` | 3 |
| `research/README.md` | R0 |

### Root
| File | Action |
|------|--------|
| `CHANGELOG.md` | Add `[Unreleased]` entries for plan doc updates |
| `docs/README.md` | Full index update |

---

## J. Phase 8 — Golden tests master table

Add to `implementation-plan.md` and reference from PRD:

| ID | Name | Phase | PRD §12 | Command | Pass criteria |
|----|------|-------|---------|---------|---------------|
| G1 | Advisory caption flow | 1 | #1 | `/arabic guide` | Guides before write |
| G2 | Pro Mode ad brief | 1 | #1 | `/arabic write meta` | Compressed intake |
| G3 | Prompt Coach | 3 | #3 | `/arabic coach` | Upgraded prompt + why |
| G4 | Website project | 5 | #5 | `/arabic plan website` | Staged plan output |
| G5 | Campaign bundle | 4 | #6 | `/arabic plan campaign` | Multi-channel ads |
| G6 | Book workflow | 5 | #5 | `/arabic plan book` | Outline + sample chapter |
| G7 | Command advisory | C1 | #1 | `/arabic` | Same as G1 via command |
| G8 | Command write pro | C1 | #1 | `/arabic write caption` | Pro path |
| G9 | Command audit | C2 | #10 | `/arabic audit` | Scored report |
| G10 | Command plan | C3 | #5 | `/arabic plan website` | `.arabic/projects/` |
| G11 | Command auto + project scan | C4 | #1/#7 | `/arabic auto explain` | Infers correct verb, uses repo evidence, avoids secrets |
| G12 | Dialect lock | 1 | #2 | `/arabic write caption --dialect masri` | No MSA bleed |
| G13 | Website routes | 9 | — | — | 8 routes render |
| G14 | Website install copy | 9 | — | — | Matches README |
| G15 | Website mobile UX | 9 | — | — | 3+ components |
| G16 | Website Arabic QA | 9 | #10 | — | Audit pass |
| G17 | Website build | 9 | — | — | `npm run build` |
| G18 | Website deploy | 9 | — | — | Preview URL |

---

## K. Phase 9 — Git workflow for THIS session

Execute your doc changes using proper git hygiene when the repo has a usable `.git` checkout. If `git status` fails because the workspace is not a Git checkout, skip branch/commit/push steps, still make file edits, run validation, and report `Git unavailable: <error>`.

### K1. Branch
```bash
git checkout main
git pull origin main
git checkout -b docs/plan-audit-2026
```

### K2. Commits (atomic, conventional)
Separate commits for:
1. `docs(analysis): add plan-audit-2026`
2. `docs(planning): rewrite roadmap and implementation plan`
3. `docs(planning): improve research intelligence and command surface`
4. `docs(engineering): add release-playbook and align governance`
5. `docs(planning): add website design system spec`
6. `docs(supported): add cursor commands adapter`
7. `docs: update README index and CHANGELOG`

Example:
```bash
git add docs/analysis/plan-audit-2026.md
git commit -m "docs(analysis): add comprehensive plan audit 2026"
```

### K3. Validate before PR
```bash
./scripts/validate-docs.sh
./scripts/validate-skill.sh
```

### K4. Push & PR
```bash
git push -u origin docs/plan-audit-2026
```

PR title:
```
docs(planning): professional plan audit and governance upgrade
```

PR body must include:
- Summary of audit score and top risks
- List of files created/updated
- Mermaid phase diagram (paste)
- Golden tests table (paste)
- Open questions for maintainer
- Checklist: CI expected green, CHANGELOG updated, no VERSION bump

### K5. Do NOT in this session
- Push tags
- Bump `VERSION` beyond `0.1.0`
- Merge to `main` without human approval
- Implement `website/` or new `arabic/` runtime files (spec only)

---

## L. Phase 10 — Final response to user

When all phases complete, reply with:

1. **Audit score** (1–10) + 5 bullet summary
2. **Files created/updated** (table)
3. **Mermaid diagram** — versions + phases
4. **Golden tests G1–G18** table
5. **Research plan** — top 3 improvements made
6. **Command surface** — verb count + auto behavior summary
7. **Git state** — branch name, commits made, PR ready URL (if pushed)
8. **Open questions** (max 5)
9. **Recommended next step** — which `feat/phase-1-*` branch to open first

---

## M. Guardrails

| Do | Don't |
|----|-------|
| Read disk before writing | Assume file layout |
| Audit before rewrite | Skip Phase 1 |
| Keep phases dependency-ordered | Add domain files before advisory core |
| Use `arabic/` paths | Use `arabic-skill/` for runtime |
| Spec `website/` at v1.1.0 | Build website code now |
| Update CHANGELOG `[Unreleased]` | Bump VERSION to 1.0.0 |
| Conventional commits | Vague commit messages |
| Run validate scripts | Merge with broken links |
| Preserve `reference/` | Delete reference packs |
| Link PRD ↔ golden tests | Orphan tests without criteria |

---

## N. Start now

1. Read `AGENTS.md`
2. Run Phase 0 discovery
3. Write `docs/analysis/plan-audit-2026.md`
4. Execute Phases 2–7 rewrites
5. Create `docs/engineering/release-playbook.md` and `docs/planning/website-design-system.md`
6. Create `docs/supported/cursor/commands.md`
7. Follow Phase 9 git workflow
8. Deliver Phase 10 summary

Ask clarifying questions only if truly blocked on a product decision. Otherwise choose sensible defaults and list them under Open questions.
```

---

## Follow-up prompts

### After plan PR is merged

```markdown
Plan PR merged. Start implementation Phase 1 on branch `feat/phase-1-advisory-core`:
1. Create `arabic/references/advisory-mode.md` per implementation-plan.md
2. Rewrite `arabic/SKILL.md` advisory routing (keep under 500 lines)
3. Update `arabic/references/INDEX.md`
4. Run golden tests G1, G7, G12
5. Open PR: `feat(skill): phase 1 — advisory operating model`
Follow collaboration-rules.md and branching-strategy.md exactly.
```

### Build website (v1.1.0 only)

```markdown
v1.0.0 shipped. Start Phase 9 on branch `feat/website-v1.1.0`:
1. Read `docs/planning/website-design-system.md`
2. Scaffold `website/` per implementation-plan.md Phase 9
3. Implement all routes and advanced React components
4. Dogfood skill for all Arabic copy blocks
5. Run G13–G18; open PR `feat(website): marketing site v1.1.0`
Do not bump VERSION until release branch.
```

### Research scaffold (R0)

```markdown
Start Phase R0 on branch `feat/research-R0-scaffold`:
1. Create `research/README.md`, `sources/sources.yaml`, `distillation-queue.md`
2. Add 5 prompt templates under `research/prompts/` per research-intelligence-plan.md
3. Run `/arabic research` spec validation
4. PR: `feat(research): R0 knowledge layer scaffold`
```

---

## Related documents

- [Roadmap](./roadmap.md)
- [Implementation Plan](./implementation-plan.md)
- [Research Intelligence Plan](./research-intelligence-plan.md)
- [Command Surface](./command-surface.md)
- [Branching Strategy](../engineering/branching-strategy.md)
- [Versioning and Releases](../engineering/versioning-and-releases.md)
- [Collaboration Rules](../engineering/collaboration-rules.md)
- [PRD](../product/prd.md)
- [AGENTS.md](../../AGENTS.md)
