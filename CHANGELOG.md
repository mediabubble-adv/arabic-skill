# Changelog

All notable changes to **Awesome Arabic Skill** (`arabic`) are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/).
Versioning follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- `tests/golden/scenarios/signal-presets.json` — reusable `pass_signals` bundles for harness tuning
- Harness `regex_match_any` signal checks and `--report` / `--report auto` JSON output
- `.github/workflows/golden-harness-nightly.yml` — weekly maintainer LLM run (secret-gated)
- `tests/golden/reports/.gitkeep` — report output directory (JSON gitignored)

### Changed
- G1–G12 scenarios refactored to use signal presets; G9 uses scored-audit regex
- `validate-golden-scenarios.sh` validates presets + regex patterns
- Golden fixture `g1-g12-agent-harness.md` — AH-05/06 sections

## [1.2.6] - 2026-07-05

**LLM agent harness** — G1–G12 scenario manifest, schema gate, opt-in runner.

### Added
- `tests/golden/scenarios/g1-g12-scenarios.json` — G1–G12 interactive scenario manifest with `pass_signals`
- `scripts/validate-golden-scenarios.sh` — scenario schema + manifest command parity gate (CI)
- `scripts/run-golden-harness.py` + `scripts/run-golden-harness.sh` — opt-in LLM runner (`npm run golden:harness`)
- Golden test `tests/golden/g1-g12-agent-harness.md`
- G9 audit fixture `tests/golden/scenarios/fixtures/g9-audit-sample.txt`

### Changed
- `npm run validate` and CI — include `validate-golden-scenarios.sh`
- Docs: README, roadmap, CI pipeline, system architecture, versioning, docs index

## [1.2.5] - 2026-07-05

**Validation stack** — golden fixture gate, Playwright G15–G16, G1–G12 routing contracts.

### Added
- `scripts/validate-golden.sh` — structural golden fixture gate (paths, ids, G13 route smoke)
- Golden test `tests/golden/validate-golden-runner.md`
- `scripts/validate-website-playwright.sh` — G15–G16 Playwright runner (mobile UX + frozen audit/footer smoke)
- `website/e2e/g15-mobile-ux.spec.ts`, `website/e2e/g16-content.spec.ts`, `website/playwright.config.ts`
- Golden test `tests/golden/g15-g16-playwright.md`
- CI job `website-e2e` in `.github/workflows/validate.yml`
- `scripts/validate-behavioral-golden.sh` + `tests/golden/g1-g12-manifest.json` — G1–G12 routing contract gate
- Golden test `tests/golden/g1-g12-routing.md`
- `scripts/validate-reference-sync.sh` + `scripts/reference-distillation-map.json` — INDEX parity, distillation map, queue exclusivity (PR #63)
- Golden tests `reference-sync-gate.md`, `rq010-masri-platform-specs.md`, `rq011-masri-l4-address.md`, `rq013-seo-spelling-variants.md`

### Changed
- `scripts/validate-reference-sync.sh` — unmapped reference packs and missing INDEX counts now fail the gate
- `arabic/dialects/masri.md` §5 — Egypt platform caption limits, hashtag counts, posting windows (RQ-010)
- `arabic/dialects/masri.md` §13 — L4 business address titles (RQ-011)
- `arabic/references/INDEX.md` — file count sync (59 total, 22 references incl. INDEX)
- `tests/golden/g13-g18-website.md` — notes automated G15–G16 coverage
- `npm run validate` — includes `validate-golden.sh` and `validate-behavioral-golden.sh`
- Docs: README, roadmap, system architecture, CI pipeline, AGENTS.md

## [1.2.4] - 2026-07-05

**CI polish + first research cron.**

### Added
- `scripts/validate-frontmatter.sh` — SKILL.md YAML schema gate; wired into `npm run validate` and CI
- Golden test `tests/golden/validate-frontmatter.md`
- First research monthly cron log (`research/logs/2026-07-monthly-cron.md`)

### Changed
- `research/distillation-queue.md` — queued RQ-010, RQ-011, RQ-013 from reference-gap scan; deferred RQ-012

### Fixed
- Frontmatter validator exits cleanly when required keys are missing (no raw `KeyError`)
- `ci-pipeline.md` diagram and local validation docs include frontmatter gate

## [1.2.3] - 2026-07-05

**Onboarding polish** — doc/UI alignment missed at v1.2.2 tag.

### Fixed
- `.arabic/` template README brief path uses `.arabic/briefs/example.yaml`
- `command-router.md` init scaffold matches template-backed init (no premature `voice.md` / `last-run.json`)
- `load-discipline.md` duplicate §8 renumbered to §9
- Install page client post-install steps synced with `website/content/install.md` (`/arabic init` + brief example)
- Keep a Changelog compare links for 1.2.x releases

## [1.2.2] - 2026-07-05

**First-run onboarding.** Path A (`/arabic guide`) and Path B (`/arabic init`) with scaffold templates and CI gate.

### Added
- First-run onboarding — `onboarding-mode.md`, `.arabic/` templates, `/arabic init` load discipline, post-install CLI steps, `validate-onboarding.sh`
- Golden test `tests/golden/onboarding-first-run.md`

### Fixed
- `scripts/validate-research.sh` — restore missing `fresh += 1` branch (IndentationError on CI)

### Added (R4)
- Research R4 — `scripts/validate-research.sh` stale-source tiers (90/180d) + distillation queue cap; wired into `npm run validate`
- Golden test `tests/golden/r4-validate-research.md`

### Added (R3)
- Research R3 — `/arabic research` command wiring (`research-mode.md`, distill, status) + monthly cron doc
- Golden test `tests/golden/r3-research-command.md`

### Added (R2)
- TikTok Arabic RTL safe zones + Spark caption rules distilled into `ads-service-matrix.md` (RQ-006)
- Golden test `tests/golden/r2-platform-kb.md`

### Added (R1)
- Research R0 scaffold — `research/` README, `index.json`, `sources/sources.yaml`, `distillation-queue.md`, knowledge-base tree, 5 prompt templates, `validate-research-scaffold.sh`
- Research R1 — `arabic-qa` gap scan + platform register targets in `audit-mode.md` (`--platform` audit scoring)
- `research/knowledge-base/humanization/arabic-qa-gap-scan-2026-07-04.md` — gap scan artifact
- Golden test `tests/golden/r1-audit-platform-register.md`

## [1.2.1] - 2026-07-04

**Install fix.** `npx` from a git clone no longer fails when docs use `@latest`.

### Fixed
- Document and recommend `npx @mediabubble-adv/arabic-skill@latest install` — avoids local package resolution (`command not found: arabic-skill`) inside the cloned repo

### Added
- `npm run install:cursor|claude|codex|all` scripts for in-repo installs via `node bin/arabic-skill.js`

### Changed
- README, website install copy, and npm-publishing docs — `@latest` on all npx install commands; git-clone caveat documented

## [1.2.0] - 2026-07-04

**Distribution follow-ups.** Full Cursor npx install and skills.sh registry path.

### Added
- `bin/arabic-skill.js` — Cursor target now copies `~/.cursor/commands/arabic.md` and `~/.cursor/rules/arabic.mdc` alongside `~/.cursor/skills/arabic/`
- `scripts/validate-cursor-install.sh` — dry-run gate for full Cursor integration paths
- `scripts/validate-skills-registry.sh` — verifies `npx skills add mediabubble-adv/arabic-skill --list` discovers skill `arabic`
- npm tarball includes `.cursor/commands/arabic.md` and `.cursor/rules/arabic.mdc`
- README + website — `npx skills add mediabubble-adv/arabic-skill` documented as skills.sh registry install

### Changed
- `VERSION`, `arabic/SKILL.md`, and `package.json` now report `1.2.0`
- `docs/supported/cursor/README.md` — documents full vs skills.sh install paths

## [1.1.1] - 2026-07-04

**Distribution patch.** Publishes `@mediabubble-adv/arabic-skill` to npm with CI gates so `npx install` works without cloning the repo.

### Added
- `.github/workflows/npm-publish.yml` — publish on `v*.*.*` tag or manual dispatch (`NPM_TOKEN` required)
- `scripts/validate-npm-pack.sh` — tarball must include `bin/`, `arabic/SKILL.md`, `VERSION`
- `prepublishOnly` — runs full `validate` + `pack:check` before publish
- npm package `keywords` and `author` metadata

### Fixed
- `website/` — `postcss` override to `^8.5.16` (GHSA advisory; Next 16.2.10 pin)

### Changed
- `VERSION`, `arabic/SKILL.md`, and `package.json` now report `1.1.1`
- npm registry: `1.0.0` → `1.1.1` (includes all `1.1.0` product changes)

## [1.1.0] - 2026-07-04

**Website + distribution release.** P7 marketing site (G13–G18), npx installer package, P7 supported-tool docs expansion, and P8 runtime extensions ship together.

### Added
- `website/` — Arabic-first marketing site (G13–G18): RTL Next.js App Router, 8 routes, install funnel, dogfood `/about`, G15 interactives; live at https://arabic-skill.vercel.app
- `website/content/` — Masri route copy (8 pages + `footer.md`) with G16 audit snapshot in `.arabic/audits/`
- `tests/golden/g13-g18-website.md` — manual website acceptance checklist (G13–G18)
- `scripts/validate-website-install.sh` — G14 README install parity (wired into `npm run validate`)
- npm package scaffold for `@mediabubble-adv/arabic-skill`, including the `arabic-skill` bin and `npx @mediabubble-adv/arabic-skill install` workflow
- P8 runtime: `load-discipline.md` (task-class load sets), `rtl-audit.md` (tier-1 RTL/UI source audit)
- `/arabic plan series` — YouTube/podcast season planning with narrative bible gate
- `/arabic audit rtl` and capped `/arabic audit --dir` (40-file limit)
- Legacy-register and AI-likelihood scoring on `/arabic audit` deliveries only
- `docs/supported/` — P7 expansion: Codex profile, ChatGPT profile, v1.1 command maps for Partial tools, Unknown-tier validation (24 tools documented)

### Changed
- `VERSION`, `arabic/SKILL.md`, and `package.json` now report `1.1.0`
- README — install website shipped, release policy, and Development Status aligned with `v1.1.0`
- `arabic/references/INDEX.md` — build status reflects `v1.1.0` public release

## [1.0.0] - 2026-06-30

**First public release.** The runtime skill now ships with advisory-first routing, project-aware project scanning, the `/arabic` command surface, Cursor adapter files, and the release-gated runtime/docs sync.

### Added
- Advisory / Pro / Project / Audit / Prompt Coach mode routing in `arabic/SKILL.md`
- Runtime references for `project-mode`, `book-writing`, `project-context-scanner`, `command-router`, and the commercial / quality / coach layers
- Cursor integration files: `.cursor/commands/arabic.md`, `.cursor/rules/arabic.mdc`, and `docs/supported/cursor/commands.md`
- `.arabic/` workspace scaffold for config, briefs, projects, voice memory, and automation state
- Release playbook and versioning docs aligned to the `v1.0.0` gate and the `v1.1.0` website/distribution phase

### Changed
- Runtime skill folder remains `arabic/`; skill ID stays `arabic` (repo stays `mediabubble-adv/arabic-skill`)
- README status now reflects the public `v1.0.0` release
- `VERSION` and `arabic/SKILL.md` now report `1.0.0`
- `arabic/references/INDEX.md` inventory updated for the new command-router runtime file

## [0.1.0] - 2026-06-29

**Pre-release development baseline.** Not a public product release — use `v1.0.0` when the plan ships.

### Added
- Runtime skill pack: 37 files across dialects, domains, conversations, professional docs
- 11 dialect modules including White Dialect and MSA
- 12 industry domain packs
- 7 built-in tools: Dialect Router, Domain Router, Conversation Router, Content Planner, Tone & Voice Adapter, SEO & Platform Optimizer, Revision Loop
- Humanization protocol with banned lexicon and rhythm rules
- 70/30 intake system across 10 workspaces
- Documentation reorganized into `analysis/`, `product/`, `planning/`, `engineering/`, `supported/`
- Strategic assessment, skill-craft research, improved roadmap
- CI validation scripts and GitHub Actions workflows
- Tool support matrix for 22 AI coding surfaces
- Reference library with 38 specialist skills

### Removed
- Legacy `references/workspaces.md` (superseded by `intake-protocols.md`)
- Obsolete chat transcript `reference/chat-Arabic Content Skill Progress.txt`
- Empty `arabic/test-workspace/` scaffold
- Website scaffold (deferred to post-v1 test project)

### Changed
- Rebranded to **Awesome Arabic Skill** — GitHub repo `arabic-skill`, runtime skill ID `arabic`
- Renamed runtime folder `arabic-content/` → `arabic/`
- Version policy: **0.x = development**, **1.0.0 = plan complete + first public release**

[Unreleased]: https://github.com/mediabubble-adv/arabic-skill/compare/v1.2.6...HEAD
[1.2.6]: https://github.com/mediabubble-adv/arabic-skill/compare/v1.2.5...v1.2.6
[1.2.5]: https://github.com/mediabubble-adv/arabic-skill/compare/v1.2.4...v1.2.5
[1.2.4]: https://github.com/mediabubble-adv/arabic-skill/compare/v1.2.3...v1.2.4
[1.2.3]: https://github.com/mediabubble-adv/arabic-skill/compare/v1.2.2...v1.2.3
[1.2.2]: https://github.com/mediabubble-adv/arabic-skill/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/mediabubble-adv/arabic-skill/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/mediabubble-adv/arabic-skill/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/mediabubble-adv/arabic-skill/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/mediabubble-adv/arabic-skill/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/mediabubble-adv/arabic-skill/releases/tag/v1.0.0
[0.1.0]: https://github.com/mediabubble-adv/arabic-skill/releases/tag/v0.1.0
