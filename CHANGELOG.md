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

### Planned for v1.0.0
- Advisory operating model (`advisory-mode.md`, SKILL.md rewrite)
- Humanization v2 + Audit Mode (from `reference/arabic-qa`)
- Prompt Coach + `voice.md` persistence
- Ads matrix + Masri SEO/AEO domains
- Project Mode (website, campaign, book workflows)
- Project-aware Arabic explanations and tutorials from scanned repo docs/files
- Golden acceptance tests (13+ scenarios)
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
