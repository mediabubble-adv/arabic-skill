# Changelog

All notable changes to **Awesome Arabic Skill** (`arabic`) are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/).
Versioning follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

Working toward **v1.0.0** — first public release when [PRD success criteria](./docs/product/prd.md#12-success-criteria) and [implementation plan](./docs/planning/implementation-plan.md) are complete.

### Changed
- Runtime skill folder renamed `arabic-skill/` → `arabic/`; skill ID `arabic` (repo stays `mediabubble-adv/arabic-skill`)
- Added research intelligence plan and `/arabic` command surface specs
- Expanded Claude plan audit prompt (governance, golden tests G1–G18, git/PR playbook)
- Reworked master README with product status, `/arabic` command model, project-aware Arabic content goals, and cover artwork
- Added project-context scanner planning so the skill can explain real projects and tools in Arabic from repo evidence
- Added plan audit (`docs/analysis/plan-audit-2026.md`)
- **Unified phase numbering (P0–P7)** + **G1–G18 golden-test master table** as single source of truth in `implementation-plan.md §0`; reconciled `roadmap.md`, `versioning-and-releases.md`, `ci-pipeline.md` (golden tests G1–G12 gate v1.0.0, G13–G18 gate v1.1.0); `voice.md` placed in P3 (Coach & Memory)
- Fixed `scripts/validate-skill.sh` reference-integrity scan (was a silent no-op); corrected `arabic/references/INDEX.md` inventory (37 → 42); corrected PRD criteria count (10 → 11) in versioning + release-checklist docs
- Upgraded research-intelligence-plan (5 canonical prompts, KB/sources/index schemas, web-research behavior, decision-tree mermaid) and command-surface (flag reference, auto-flow mermaid, routing-pipeline proof, error handling); added `docs/supported/cursor/commands.md`, `docs/engineering/release-playbook.md`, `docs/planning/website-design-system.md`
- **P1 Advisory Core (runtime):** rewrote `arabic/SKILL.md` to advisory-first operating model (guide → clarify → recommend → write → review) with a 5-mode router; added `arabic/references/advisory-mode.md`; INDEX 42 → 43. VERSION stays `0.1.0`.
- **P2 Quality Engine (runtime):** added `arabic/references/audit-mode.md` (9-point QA pipeline distilled from `reference/arabic-qa`, scoring + report format, dialect-general); Humanization v2 — new Anti-Translationese and Channel Humanization layers in `humanization-protocol.md` + back-translation/channel-fit self-tests; wired Audit Mode into SKILL.md orchestration; INDEX 43 → 44.
- **P3 Coach & Memory (runtime):** added `arabic/references/prompt-engineering.md` (Prompt Coach — weak-prompt diagnosis, prompt anatomy, repair workflow, beginner/standard/pro tiers, bad→good examples) and `arabic/voice.md` (brand-voice persistence schema + save/load/show protocol); wired Prompt Coach + voice loading into SKILL.md; INDEX 44 → 46.

### Planned for v1.0.0
- Advisory operating model (`advisory-mode.md`, SKILL.md rewrite)
- Humanization v2 + Audit Mode (from `reference/arabic-qa`)
- Prompt Coach + `voice.md` persistence
- Ads matrix + Masri SEO/AEO domains
- Project Mode (website, campaign, book workflows)
- Project-aware Arabic explanations and tutorials from scanned repo docs/files
- Golden tests G1–G12 (G13–G18 at v1.1.0)
- Install website (post-v1 test project)

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

[Unreleased]: https://github.com/mediabubble-adv/arabic-skill/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/mediabubble-adv/arabic-skill/releases/tag/v0.1.0
