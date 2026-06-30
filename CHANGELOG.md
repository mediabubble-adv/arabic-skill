# Changelog

All notable changes to **Awesome Arabic Skill** (`arabic`) are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/).
Versioning follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

Working toward **v1.1.0** — website + distribution layer.

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

[Unreleased]: https://github.com/mediabubble-adv/arabic-skill/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/mediabubble-adv/arabic-skill/releases/tag/v1.0.0
[0.1.0]: https://github.com/mediabubble-adv/arabic-skill/releases/tag/v0.1.0
