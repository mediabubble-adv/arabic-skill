# Awesome Arabic Skill

<p align="center">
  <img src="./docs/assets/awesome-arabic-skill-cover.png" alt="Awesome Arabic Skill cover" width="100%">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@mediabubble-adv/arabic-skill"><img src="https://img.shields.io/npm/v/@mediabubble-adv/arabic-skill?label=version" alt="npm version"></a>
  <a href="./docs/README.md"><img src="https://img.shields.io/badge/docs-index-green" alt="docs"></a>
  <a href="https://arabic-skill.vercel.app/install"><img src="https://img.shields.io/badge/install-npx-purple" alt="install"></a>
  <img src="https://img.shields.io/badge/runtime-arabic-blue" alt="runtime folder">
  <img src="https://img.shields.io/badge/reference-38_packs-lightgrey" alt="reference packs">
</p>

**Awesome Arabic Skill** (`arabic`) is a MediaBubble skill for Arabic content creation, strategy, research distillation, and review. It is designed to behave like a senior Arabic content partner inside AI coding tools: it reads context, clarifies intent, recommends a direction, writes, humanizes, and audits before delivery.

It is **not** a translation shortcut. Current version is `1.2.0` (full Cursor npx install + skills.sh registry; website + P8 runtime shipped in `1.1.0`).

<p align="center">
  <img src="./public/assets/claude-color.svg" alt="Claude" width="26" height="26">
  <img src="./public/assets/cursor.svg" alt="Cursor" width="26" height="26">
  <img src="./public/assets/codex-color.svg" alt="Codex" width="26" height="26">
  <img src="./public/assets/ChatGPT_Logo_2025.svg" alt="ChatGPT" width="26" height="26">
  <img src="./public/assets/gemini-color.svg" alt="Gemini" width="26" height="26">
  <img src="./public/assets/Qwen_Logo.svg" alt="Qwen" width="26" height="26">
  <img src="./public/assets/windsurf.svg" alt="Windsurf" width="26" height="26">
  <img src="./public/assets/code.svg" alt="VS Code" width="26" height="26">
</p>

```text
user asks -> guide -> clarify -> recommend -> write -> review
```

## What It Does

| Capability | Current role |
|------------|------------------------|
| Arabic content creation | Captions, ads, landing pages, blogs, scripts, sales copy, books, UI microcopy, and professional documents |
| Dialect routing | Masri-first, pan-Arab capable, with 11 dialect modules |
| Humanization | Removes translationese, AI phrasing, stiff rhythm, and wrong register |
| Project awareness | `/arabic auto` scans project files so the skill can explain a product, tool, or codebase in natural Arabic |
| Research intelligence | Combines internet research, official sources, and `reference/` packs before distilling updates into runtime files |
| Command system | `/arabic` with subcommands for guide, write, audit, coach, plan, research, voice, auto, and help |
| Website dogfooding | Shipped at `v1.1.0` — [install site](https://arabic-skill.vercel.app) (8 Masri routes, dogfood `/about`) |

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
npx @mediabubble-adv/arabic-skill@latest install --target claude
npx @mediabubble-adv/arabic-skill@latest install --target codex
npx @mediabubble-adv/arabic-skill@latest install --target all
npx @mediabubble-adv/arabic-skill@latest install --dir ~/.cursor/skills --force
```

See [Cursor support](./docs/supported/cursor/README.md), [Claude support](./docs/supported/claude/README.md), or the [supported tools index](./docs/supported/README.md). The repo documents **24** AI coding surfaces (profiles below). Install website: https://arabic-skill.vercel.app

### After install

```text
/arabic guide                              ← first run (advisory, no repo setup)
/arabic init                               ← scaffold .arabic/ in a client project
/arabic write caption --dialect masri --count 3
```

In a client repo, run `/arabic init` before `--brief` or `plan` workflows. Templates ship in `arabic/templates/.arabic/`.

## Supported Tool Assets

The repository includes local logo assets under [`public/assets/`](./public/assets/) for README, docs, and the install website. GitHub renders these relative paths directly in Markdown, so docs can use either Markdown images or HTML `<img>` tags when fixed icon sizing is needed.

<p>
  <img src="./public/assets/claude-color.svg" alt="Claude" width="24" height="24">
  <img src="./public/assets/cursor.svg" alt="Cursor" width="24" height="24">
  <img src="./public/assets/codex-color.svg" alt="Codex" width="24" height="24">
  <img src="./public/assets/ChatGPT_Logo_2025.svg" alt="ChatGPT" width="24" height="24">
  <img src="./public/assets/gemini-color.svg" alt="Gemini" width="24" height="24">
  <img src="./public/assets/Qwen_Logo.svg" alt="Qwen" width="24" height="24">
  <img src="./public/assets/windsurf.svg" alt="Windsurf" width="24" height="24">
  <img src="./public/assets/code.svg" alt="VS Code" width="24" height="24">
  <img src="./public/assets/copilot.svg" alt="GitHub Copilot" width="24" height="24">
  <img src="./public/assets/replit-color.svg" alt="Replit Agent" width="24" height="24">
  <img src="./public/assets/openhands-color.svg" alt="OpenHands" width="24" height="24">
  <img src="./public/assets/zed.svg" alt="Zed" width="24" height="24">
</p>

### Tool profiles (24)

| Tool | Fit | Install | Profile |
|------|-----|---------|---------|
| Aider | Strong | manual | [Profile](./docs/supported/aider/README.md) |
| Amp | Strong | manual | [Profile](./docs/supported/amp/README.md) |
| Antigravity | Partial | manual | [Profile](./docs/supported/antigravity/README.md) |
| ChatGPT | Partial | manual | [Profile](./docs/supported/chatgpt/README.md) |
| Claude | Strong | `npx --target claude` | [Profile](./docs/supported/claude/README.md) |
| Cline | Strong | manual | [Profile](./docs/supported/cline/README.md) |
| Codex | Partial | `npx --target codex` | [Profile](./docs/supported/codex/README.md) |
| Continue | Partial | manual | [Profile](./docs/supported/continue/README.md) |
| Copilot | Partial | manual | [Profile](./docs/supported/copilot/README.md) |
| Cursor | Strong | `npx --target cursor` | [Profile](./docs/supported/cursor/README.md) |
| Gemini | Partial | manual | [Profile](./docs/supported/gemini/README.md) |
| Hermes Agent | Partial | manual | [Profile](./docs/supported/hermes-agent/README.md) |
| JetBrains Junie | Partial | manual | [Profile](./docs/supported/jetbrains-junie/README.md) |
| Kilo Code | Partial | manual | [Profile](./docs/supported/kilo-code/README.md) |
| Kiro | Partial | manual | [Profile](./docs/supported/kiro/README.md) |
| OpenClaw | Partial | manual | [Profile](./docs/supported/openclaw/README.md) |
| OpenCode | Partial | manual | [Profile](./docs/supported/opencode/README.md) |
| OpenHands | Strong | manual | [Profile](./docs/supported/openhands/README.md) |
| Qwen | Limited | manual | [Profile](./docs/supported/qwen/README.md) |
| Replit Agent | Partial | manual | [Profile](./docs/supported/replit/README.md) |
| Sourcegraph Cody | Partial | manual | [Profile](./docs/supported/sourcegraph-cody/README.md) |
| VS Code | Partial | manual | [Profile](./docs/supported/vs-code/README.md) |
| Windsurf | Strong | manual | [Profile](./docs/supported/windsurf/README.md) |
| Zed | Strong | manual | [Profile](./docs/supported/zed/README.md) |

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

| Command | Purpose |
|---------|---------|
| `/arabic` or `/arabic guide` | Advisory flow for unclear ideas |
| `/arabic write <type>` | Pro mode for complete briefs |
| `/arabic audit` | Arabic copy review and scoring |
| `/arabic coach` | Arabic prompt improvement |
| `/arabic plan <project>` | Websites, campaigns, books, and brand systems |
| `/arabic research <topic>` | Structured research collection and distillation |
| `/arabic voice` | Brand voice save, load, and show |
| `/arabic auto` | Workspace-aware inference from project files |
| `/arabic help` | Copy-ready usage reference |

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
│   └── references/         # Engines, intake, templates, humanization, QA support
├── reference/              # 38 canonical specialist packs, kept as source material
├── docs/                   # Product, planning, analysis, engineering, supported tools
├── scripts/                # Validation scripts
├── VERSION                 # Current product version
└── CHANGELOG.md
```

Runtime install folder is `arabic/`. The GitHub repo can stay `mediabubble-adv/arabic-skill`.

## Development Status

| Area | Status |
|------|--------|
| Runtime baseline | `arabic/` pack at `v1.1.0` |
| Canonical references | 38 packs preserved in `reference/` |
| Planning docs | Active, with roadmap and release governance for future phases |
| `/arabic` command system | Runtime router and Cursor adapter shipped |
| Research layer | Specified for structured research collection and future runtime expansion |
| Website | Shipped at `v1.1.0` — https://arabic-skill.vercel.app |
| Public release | `v1.1.1` current (npm); `v1.1.0` website + P8 runtime; `v1.0.0` first public release |

## Documentation

| Doc | Purpose |
|-----|---------|
| [Docs Index](./docs/README.md) | Full documentation map |
| [PRD](./docs/product/prd.md) | Product vision and success criteria |
| [Roadmap](./docs/planning/roadmap.md) | Release train and phase sequence |
| [Implementation Plan](./docs/planning/implementation-plan.md) | File-by-file build plan |
| [Claude Plan Audit Prompt](./docs/planning/claude-plan-audit-prompt.md) | Prompt for Claude to audit and rewrite the plan set |
| [Research Intelligence Plan](./docs/planning/research-intelligence-plan.md) | Internet + AI + reference research workflow |
| [Command Surface](./docs/planning/command-surface.md) | `/arabic` grammar and subcommands |
| [Reference Distillation](./docs/planning/reference-distillation.md) | How `reference/` becomes runtime behavior |
| [Supported Tools](./docs/supported/README.md) | Install profiles for AI tools |

## Validation

```bash
./scripts/validate-skill.sh
./scripts/validate-docs.sh
./scripts/validate-supported.sh
```

## Release Policy

- `0.1.x` means development.
- `v1.0.0` was the first public release.
- `v1.1.1` is the current release (npm publish + distribution CI).
- `v1.1.0` shipped the website, P8 runtime, and npx installer scaffold.
- Future release tags should only be created after the documented gates pass.

See [Versioning and Releases](./docs/engineering/versioning-and-releases.md).

## Positioning

> **Awesome Arabic Skill**: Masri-first, pan-Arab capable. A skill that helps you think, brief, plan, write, explain, and audit Arabic content.

## License

MIT. See [LICENSE](./LICENSE).

<p align="center">
  <sub>Built for the Arab world by MediaBubble · 2026</sub>
</p>
