# Documentation Index

Planning, product, engineering, and tool-support documentation for **Awesome Arabic Skill** (`arabic`).

**Product version:** see root [`VERSION`](../VERSION)

---

## Quick Start

| I want to… | Read |
|------------|------|
| Understand the product vision | [PRD](./product/prd.md) |
| See what to build next | [Roadmap](./planning/roadmap.md) |
| Use `/arabic` commands | [Command Surface](./planning/command-surface.md) |
| Run research to improve the skill | [Research Intelligence Plan](./planning/research-intelligence-plan.md) |
| Execute file-by-file work | [Implementation Plan](./planning/implementation-plan.md) |
| Understand skill behavior | [Operating Model](./product/operating-model.md) |
| Install on my AI tool | [Supported Tools](./supported/README.md) |
| Browse canonical reference skills | [Reference Library](../reference/README.md) |

---

## Categories

### Analysis

Strategic assessments and research snapshots.

| Document | Description |
|----------|-------------|
| [Strategic Assessment](./analysis/strategic-assessment.md) | Full skill, plan, and reference analysis |
| [Skill Craft Research](./analysis/skill-craft-and-release-research.md) | Good/bad skills, performance, release playbook |

### Product

What the system should become — vision, architecture, structure.

| Document | Description |
|----------|-------------|
| [PRD](./product/prd.md) | Product vision, goals, modes, success criteria |
| [Operating Model](./product/operating-model.md) | Default advisory flow and mode behaviors |
| [System Architecture](./product/system-architecture.md) | Runtime layers and subsystems |
| [Content Structure](./product/content-structure.md) | File placement rules |
| [Context and Sources](./product/context-and-sources.md) | Source-of-truth hierarchy |

### Planning

How and when to build.

| Document | Description |
|----------|-------------|
| [Roadmap](./planning/roadmap.md) | Release train, phases, acceptance tests |
| [Implementation Plan](./planning/implementation-plan.md) | Phased file-by-file execution |
| [Claude Plan Audit Prompt](./planning/claude-plan-audit-prompt.md) | Full audit + plan rewrite prompt (git, PRs, G1–G18) |
| [Codex GitHub Cover Prompt](./planning/codex-github-cover-prompt.md) | Image prompt for repo cover / social preview |
| [Research Intelligence Plan](./planning/research-intelligence-plan.md) | Internet + AI research pipeline + `reference/` distillation |
| [Command Surface](./planning/command-surface.md) | `/arabic` command tree, subcommands, workspace automation |
| [Reference Distillation](./planning/reference-distillation.md) | How to absorb `reference/` into runtime |
| [Website Design System](./planning/website-design-system.md) | v1.1.0 site tokens, typography (AR+EN), motion |

### Engineering

Versioning, CI, branching, and collaboration.

| Document | Description |
|----------|-------------|
| [Versioning and Releases](./engineering/versioning-and-releases.md) | Semver, tags, changelog |
| [Branching Strategy](./engineering/branching-strategy.md) | Branch types and release flow |
| [Collaboration Rules](./engineering/collaboration-rules.md) | PR requirements and ownership |
| [CI Pipeline](./engineering/ci-pipeline.md) | Automated validation and deploy |
| [Release Playbook](./engineering/release-playbook.md) | Step-by-step release procedure (v1.0.0 / v1.1.0) |

### Supported Tools

Multi-tool portability — 22 AI coding surfaces.

| Document | Description |
|----------|-------------|
| [Supported Tools Index](./supported/README.md) | Tool folder index |
| [Integration Model](./supported/integration-model.md) | Portable logic vs tool adapters |
| [Support Matrix](./supported/support-matrix.md) | Fit ratings per tool |

---

## Folder Layout

```text
docs/
├── README.md              ← you are here
├── analysis/
├── product/
├── planning/
├── engineering/
└── supported/
    ├── integration-model.md
    ├── support-matrix.md
    └── {tool}/README.md
```

---

## Default Product Behavior

```
user asks → guide → clarify → recommend → write → review
```

This is defined in [Operating Model](./product/operating-model.md) and implemented progressively per [Roadmap](./planning/roadmap.md).
