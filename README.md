# Awesome Arabic Skill

**Awesome Arabic Skill** (`arabic`) is a MediaBubble skill for Arabic content creation, strategy, research distillation, and review. It is designed to behave like a senior Arabic content partner inside AI coding tools: it reads context, clarifies intent, recommends a direction, writes, humanizes, and audits before delivery.

It is **not** a translation shortcut. Current version is `1.2.9` (runtime hardening: load presets, RTL/dialect audit, research distillation) — **now in Maintenance Mode** (Phase 9A complete). Previous: `1.2.8` (geographic trilogy + distribution); `1.2.7` (harness + reports); `1.2.6` (scenario manifest); `1.2.5` (validation stack).

```text
user asks -> guide -> clarify -> recommend -> write -> review
```



## What It Does


| Capability              | Current role                                                                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Arabic content creation | Captions, ads, landing pages, blogs, scripts, sales copy, books, UI microcopy, and professional documents                        |
| Dialect routing         | Masri-first, pan-Arab capable, with 11 dialect modules + 4 regional SEO-AEO markets (Gulf, KSA, Levantine)                       |
| Humanization            | Removes translationese, AI phrasing, stiff rhythm, and wrong register                                                            |
| Project awareness       | `/arabic auto` scans project files so the skill can explain a product, tool, or codebase in natural Arabic                       |
| Research intelligence   | `research/` layer with 4-state lifecycle (collected → curated → distilled → deferred) + `/arabic research`                       |
| Load presets            | 11 named task bundles (plan, write, audit, seasonal, campaign, book, coach, init, audit-full, dialect-lock + 4 regional SEO-AEO) |
| RTL & dialect audit     | Runtime validation for bidirectional text structure + MSA-bleed detection (v1.2.9)                                               |
| First-run onboarding    | `/arabic guide` (Path A) and `/arabic init` (Path B) with `.arabic/` templates                                                   |
| Command system          | `/arabic` with subcommands for guide, write, audit, coach, plan, research, voice, auto, init, and help                           |
| Website dogfooding      | Shipped at `v1.1.0` — [install site](https://arabic-skill.vercel.app) (8 Masri routes, dogfood `/about`)                         |




## Install



### Full Cursor integration (recommended)

Copies the runtime skill, `/arabic` slash command, and routing rule:

```bash
npx @mediabubble-adv/arabic-skill@latest install --target cursor
```

From a **git clone** of this repo, `npx` without `@latest` resolves the local package and fails (`command not found: arabic-skill`). Use `@latest` above, or `npm run install:cursor`, or `node bin/arabic-skill.js install --target cursor`.

### skills.sh registry

Install the skill via the open agent skills CLI (skill pack only; use npm install above for full Cursor integration):

```bash
npx skills add mediabubble-adv/arabic-skill -a cursor -g -y
```

Browse: [skills.sh](https://skills.sh) · Listing is driven by install telemetry from `npx skills add`.

### Other targets

```bash
npx @mediabubble-adv/arabic-skill@latest install --list
npx @mediabubble-adv/arabic-skill@latest install --target claude
npx @mediabubble-adv/arabic-skill@latest install --target codex
npx @mediabubble-adv/arabic-skill@latest install --target hermes-agent
npx @mediabubble-adv/arabic-skill@latest install --target openclaw
npx @mediabubble-adv/arabic-skill@latest install --target opencode
npx @mediabubble-adv/arabic-skill@latest install --target antigravity
npx @mediabubble-adv/arabic-skill@latest install --target antigravity --scope workspace
npx @mediabubble-adv/arabic-skill@latest install --target chatgpt
npx @mediabubble-adv/arabic-skill@latest install --target all
npx @mediabubble-adv/arabic-skill@latest install --dir ~/.cursor/skills --force
```

`install --list` shows all **24** tools (`skills_home` presets + `print` guided steps). `install --target all` installs every global skills preset (skips print-only tools). Print tools (e.g. ChatGPT) print manual packaging steps instead of copying files.

See [Cursor support](./docs/supported/cursor/README.md), [Claude support](./docs/supported/claude/README.md), or the [supported tools index](./docs/supported/README.md). Install website: [https://arabic-skill.vercel.app](https://arabic-skill.vercel.app)

### After install

```text
/arabic guide                              ← first run (advisory, no repo setup)
/arabic init                               ← scaffold .arabic/ in a client project
/arabic write caption --dialect masri --count 3
```

In a client repo, run `/arabic init` before `--brief` or `plan` workflows. Templates ship in `arabic/templates/.arabic/`.

## Supported Tool Assets

The repository includes local logo assets under `[public/assets/](./public/assets/)` for README, docs, and the install website. GitHub renders these relative paths directly in Markdown, so docs can use either Markdown images or HTML `<img>` tags when fixed icon sizing is needed.

### Tool profiles (24)


| Tool             | Fit     | Install               | Profile                                                |
| ---------------- | ------- | --------------------- | ------------------------------------------------------ |
| Aider            | Strong  | manual                | [Profile](./docs/supported/aider/README.md)            |
| Amp              | Strong  | manual                | [Profile](./docs/supported/amp/README.md)              |
| Antigravity      | Partial | manual                | [Profile](./docs/supported/antigravity/README.md)      |
| ChatGPT          | Partial | manual                | [Profile](./docs/supported/chatgpt/README.md)          |
| Claude           | Strong  | `npx --target claude` | [Profile](./docs/supported/claude/README.md)           |
| Cline            | Strong  | manual                | [Profile](./docs/supported/cline/README.md)            |
| Codex            | Strong  | `npx --target codex`  | [Profile](./docs/supported/codex/README.md)            |
| Continue         | Partial | manual                | [Profile](./docs/supported/continue/README.md)         |
| Copilot          | Partial | manual                | [Profile](./docs/supported/copilot/README.md)          |
| Cursor           | Strong  | `npx --target cursor` | [Profile](./docs/supported/cursor/README.md)           |
| Gemini           | Partial | manual                | [Profile](./docs/supported/gemini/README.md)           |
| Hermes Agent     | Partial | manual                | [Profile](./docs/supported/hermes-agent/README.md)     |
| JetBrains Junie  | Partial | manual                | [Profile](./docs/supported/jetbrains-junie/README.md)  |
| Kilo Code        | Partial | manual                | [Profile](./docs/supported/kilo-code/README.md)        |
| Kiro             | Partial | manual                | [Profile](./docs/supported/kiro/README.md)             |
| OpenClaw         | Partial | manual                | [Profile](./docs/supported/openclaw/README.md)         |
| OpenCode         | Partial | manual                | [Profile](./docs/supported/opencode/README.md)         |
| OpenHands        | Strong  | manual                | [Profile](./docs/supported/openhands/README.md)        |
| Qwen             | Limited | manual                | [Profile](./docs/supported/qwen/README.md)             |
| Replit Agent     | Partial | manual                | [Profile](./docs/supported/replit/README.md)           |
| Sourcegraph Cody | Partial | manual                | [Profile](./docs/supported/sourcegraph-cody/README.md) |
| VS Code          | Partial | manual                | [Profile](./docs/supported/vs-code/README.md)          |
| Windsurf         | Strong  | manual                | [Profile](./docs/supported/windsurf/README.md)         |
| Zed              | Strong  | manual                | [Profile](./docs/supported/zed/README.md)              |


Fit tiers and packaging notes: [Support Matrix](./docs/supported/support-matrix.md). Tools without an `npx` preset use manual copy paths documented in each profile (or `npx … install --dir <skills-path>`).

## Usage Examples

Natural language works:

```text
Write 5 Masri Instagram captions for a fitness app launch in Cairo.
```

```text
Audit this Arabic landing page. It sounds translated and too formal.
```

```text
Scan this project and explain what it does in human Arabic for non-technical users.
```

The command surface makes the same workflows faster:

```text
/arabic guide
/arabic write meta --dialect masri --brief .arabic/briefs/fitness-launch.yaml
/arabic audit --file content/landing-ar.md
/arabic coach --file prompt.txt
/arabic plan website --dialect masri
/arabic research meta-ads
/arabic auto
```



## `/arabic` Command Model

The product direction is one root command, not dozens of independent skills:


| Command                      | Purpose                                         |
| ---------------------------- | ----------------------------------------------- |
| `/arabic` or `/arabic guide` | Advisory flow for unclear ideas                 |
| `/arabic write <type>`       | Pro mode for complete briefs                    |
| `/arabic audit`              | Arabic copy review and scoring                  |
| `/arabic coach`              | Arabic prompt improvement                       |
| `/arabic plan <project>`     | Websites, campaigns, books, and brand systems   |
| `/arabic research <topic>`   | Structured research collection and distillation |
| `/arabic init`               | Scaffold `.arabic/` workspace in a client repo  |
| `/arabic voice`              | Brand voice save, load, and show                |
| `/arabic auto`               | Workspace-aware inference from project files    |
| `/arabic help`               | Copy-ready usage reference                      |


Full spec: [Command Surface](./docs/planning/command-surface.md).

## Project-Aware Arabic Content

A core capability is making the skill useful inside real repositories and product folders. The workspace scanner rules inspect files such as `README.md`, docs, routes, package metadata, examples, and product copy, then produce Arabic content that explains the project in clear human language.

Expected outputs include:

- Arabic product summaries for non-technical users
- Arabic install and usage tutorials
- Arabic landing-page copy based on actual project capabilities
- Arabic README sections, changelogs, release notes, and help pages
- Dialect-aware explanations for tools, apps, APIs, and SaaS products

This behavior is routed through `/arabic auto`, Project Mode, Dev-Tech domain support, and the runtime project-context scanner.

## Repository Structure

```text
arabic-skill/
├── arabic/                 # Runtime skill pack users install
│   ├── SKILL.md            # Master router, name: arabic
│   ├── dialects/           # 11 dialect modules
│   ├── domains/            # 12 industry packs
│   ├── conversations/      # Sales, support, negotiation, coaching, podcast, community
│   ├── professional-docs/  # Contracts, AI skills, agent rules, compliance language
│   ├── references/         # Engines, intake, templates, humanization, QA support
│   └── templates/.arabic/  # Onboarding scaffold (config, briefs, README)
├── research/               # Collected intelligence, citation registry, distillation queue
├── reference/              # 38 canonical specialist packs, kept as source material
├── docs/                   # Product, planning, analysis, engineering, supported tools
├── website/                # Next.js marketing site (G13–G18, live on Vercel)
├── tests/golden/           # Golden fixtures (G1–G18, R*, RQ*) + scenario manifest
├── scripts/                # Validation scripts (npm run validate)
├── bin/arabic-skill.js     # npx installer CLI
├── VERSION                 # Current product version
└── CHANGELOG.md
```

Runtime install folder is `arabic/`. The GitHub repo can stay `mediabubble-adv/arabic-skill`.

## Development Status

**🛡️ Maintenance Mode Active** (as of 2026-07-07)


| Area                 | Status                                                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime pack         | `arabic/` at `v1.2.9` — runtime hardening (load presets, RTL/dialect audit, research distillation)                                           |
| Canonical references | 63 files in `arabic/references/` + `research/` knowledge base                                                                                |
| Research layer       | **R0–R4 ✅** — `research/`, `/arabic research`, 4-state lifecycle, monthly snapshot automation (cron-triggered)                               |
| RTL & Dialect Audit  | **P8B ✅** — `validate-rtl.sh`, `validate-dialect-bleed.sh`, MSA-bleed detection, runtime validation                                          |
| Load Presets         | **P8A ✅** — 11 named task bundles (plan, write, audit, seasonal, campaign, book, coach, init, audit-full, dialect-lock + 4 regional SEO-AEO) |
| `/arabic` commands   | Shipped — router, Cursor adapter, init, auto, research, guide, write, audit, coach, plan, voice                                              |
| Website              | **v1.1.0 ✅** — [https://arabic-skill.vercel.app](https://arabic-skill.vercel.app) (8 Masri routes, Playwright tested)                        |
| npm distribution     | `@mediabubble-adv/arabic-skill@1.2.9` — 24 tool profiles, npx install + publish CI                                                           |
| Golden tests         | **21 golden tests ✅** — G1–G12 (behavioral), G13–G18 (website), P8A–P8C (hardening)                                                          |
| Community            | Discord, GitHub Discussions, Substack newsletter, metrics dashboard (weekly/monthly/quarterly)                                               |
| Next phase           | **Phase 9B (optional)** — Advanced integrations (Slack, webhooks, custom templates) • OR sustain v1.2.9 + monitor metrics                    |




## Documentation

**Maintenance Mode Resources:**


| Doc                                                 | Purpose                                                                |
| --------------------------------------------------- | ---------------------------------------------------------------------- |
| [Maintenance Mode Plan](./docs/MAINTENANCE_MODE.md) | Weekly/monthly/quarterly cadence, support SLAs, metrics targets        |
| [Project Status](./docs/PROJECT_STATUS.md)          | Complete phase timeline (0–9A), repository structure, validation gates |
| [Docs Index](./docs/README.md)                      | Full documentation map                                                 |
| [Roadmap](./docs/planning/roadmap.md)               | Release train and phase sequence                                       |
| [Metrics Dashboard](./docs/metrics/)                | Weekly reports, marketplace tracker, GA4 analytics                     |


**Development Docs:**


| Doc                                                                         | Purpose                                            |
| --------------------------------------------------------------------------- | -------------------------------------------------- |
| [PRD](./docs/product/prd.md)                                                | Product vision and success criteria                |
| [Implementation Plan](./docs/planning/implementation-plan.md)               | File-by-file build plan                            |
| [Command Surface](./docs/planning/command-surface.md)                       | `/arabic` grammar and subcommands                  |
| [Research Intelligence Plan](./docs/planning/research-intelligence-plan.md) | 4-state distillation lifecycle, monthly automation |
| [Reference Distillation](./docs/planning/reference-distillation.md)         | How `reference/` becomes runtime behavior          |
| [Supported Tools](./docs/supported/README.md)                               | 24 tool profiles with install instructions         |




## Community & Support

Join the Awesome Arabic Skill community (Maintenance Mode):

- **💬 [Discord Server](https://discord.gg/arabic-skill)** — Real-time chat, #help channel, feature voting, community updates
- **💡 [GitHub Discussions](https://github.com/mediabubble-adv/arabic-skill/discussions)** — Questions, feature requests, ideas, announcements
- **📧 [Substack Newsletter](https://arabic-skill.substack.com)** — Weekly/monthly release notes, metrics reports, user spotlights, tips
- **🐛 [GitHub Issues](https://github.com/mediabubble-adv/arabic-skill/issues)** — Bug reports and feature requests (48-72h response time)
- **📊 [Metrics Dashboard](./docs/metrics/)** — Weekly/monthly community metrics, marketplace trends, usage analytics



## Validation

```bash
npm run validate
```

Runs skill reference integrity, frontmatter schema, docs links, supported-tool parity, website install copy (G14), npm pack contents, Cursor install dry-run, research scaffold + stale-source checks, onboarding templates, golden fixture structure, **G1–G12 routing contracts**, and **G1–G12 scenario manifest** parity. Website UX: `npm run validate:website-playwright` (CI `website-e2e`). Opt-in LLM runs: `npm run golden:harness` (not in default CI).

Individual gates:

```bash
./scripts/validate-skill.sh
./scripts/validate-frontmatter.sh
./scripts/validate-docs.sh
./scripts/validate-research.sh
./scripts/validate-reference-sync.sh
./scripts/validate-onboarding.sh
./scripts/validate-golden.sh
./scripts/validate-behavioral-golden.sh
./scripts/validate-golden-scenarios.sh
./scripts/validate-website-playwright.sh
npm run golden:harness -- --list
npm run golden:harness -- --run --dry-run
npm run golden:harness -- --run --report auto
```



## Release Policy

- `0.1.x` — development baseline.
- `v1.0.0` — first public release (P1–P6, G1–G12).
- `v1.1.x` — website (G13–G18), npm publish, P8 runtime extensions.
- `v1.2.x` — full Cursor npx install, skills.sh, research R0–R4, onboarding, validation stack (**current:** `1.2.7`).
- Future tags only after documented gates pass.

See [Versioning and Releases](./docs/engineering/versioning-and-releases.md).

## Positioning

> **Awesome Arabic Skill**: Masri-first, pan-Arab capable. A skill that helps you think, brief, plan, write, explain, and audit Arabic content.



## License

MIT. See [LICENSE](./LICENSE).

Built for the Arab world by MediaBubble · 2026