# System Architecture: `arabic`

> **Current product version:** see root `VERSION` · Research **R0–R4 ✅** · Onboarding **1.2.2+** · Website **G13–G18 ✅**

## 1. Purpose

This document defines the design architecture of the Awesome Arabic Skill.

The PRD explains what the product should do.  
This document explains how the system should be structured so that behavior, content, and reference knowledge stay coherent.

## 2. Architectural Goal

Build an advisory-first Arabic content system where:

- `docs/` holds planning and product intent
- `reference/` holds canonical knowledge
- `research/` holds collected intelligence and distillation queue
- `arabic/` holds the runtime skill pack

The runtime skill should stay thin enough to operate reliably, while deeper context and specialist material stay organized outside the runtime layer.

## 3. Top-Level System Layers

### Layer A — Planning Layer

Location: `docs/`

Purpose: PRD, implementation plan, operating model, architecture docs, engineering governance.

### Layer B — Canonical Knowledge Layer

Location: `reference/`

Purpose: specialist skill packs, long-lived research material, contextual reference sets.

This layer is the source of truth for deep knowledge.

### Layer C — Collected Intelligence Layer

Location: `research/`

Purpose:

- citation registry (`sources/sources.yaml`)
- curated knowledge-base findings
- distillation queue (max 20 open items)
- monthly cron logs (`research/logs/`)

Flow: collect → cite → curate → distill (≤50 lines/runtime PR) → golden test. Never write directly into `arabic/SKILL.md` from research.

### Layer D — Runtime Skill Layer

Location: `arabic/`

Purpose:

- live skill behavior and routing
- runtime references, dialect/domain packs, templates
- onboarding scaffold (`templates/.arabic/`)

This is the layer consumed during skill execution.

### Layer E — Distribution & Validation

Locations: `bin/`, `website/`, `scripts/`, `.github/workflows/`, `tests/golden/`

Purpose:

- npx installer (`bin/arabic-skill.js`)
- marketing site (G14 install parity with README)
- CI gates (`npm run validate`)
- manual golden acceptance checklists

## 4. Core Runtime Model

The runtime skill executes:

`user asks -> skill guides -> skill clarifies -> skill recommends -> skill writes -> skill reviews`

Runtime subsystems:

1. request classification (`SKILL.md`, `command-router.md`, `load-discipline.md`)
2. guidance and clarification (`advisory-mode.md`, `intake-protocols.md`, `onboarding-mode.md`)
3. recommendation (`engines.md`, domain/dialect packs)
4. generation (`output-templates.md`, `voice.md` when present)
5. review (`humanization-protocol.md`, `audit-mode.md`, `taboos.md`)
6. continuity (`.arabic/` workspace, `voice.md`, project-mode workflows)

## 5. Mode Routing Architecture

| Mode | Best for |
|------|----------|
| **Advisory** | Vague or partially formed requests |
| **Pro** | Structured briefs, expert users |
| **Project** | Websites, campaigns, books |
| **Audit** | Draft review, RTL/UI checks |
| **Prompt Coach** | Arabic prompt improvement |
| **Research** | Gap scan, platform KB, distillation planning |
| **Onboarding** | First install, `/arabic init` |

## 6. Knowledge Flow

```text
docs/ (intent) -> reference/ (canonical) + research/ (collected)
                        |
                        v
                 distill -> PR -> arabic/ (runtime) -> output
```

- Planning intent starts in `docs/`
- Deep knowledge lives in `reference/`
- Fresh external/platform knowledge lands in `research/` first
- Runtime behavior is implemented in `arabic/` only through distillation PRs

## 7. Validation Architecture

`npm run validate` runs (in order):

| Script | Gate |
|--------|------|
| `validate-skill.sh` | Runtime file references + version sync |
| `validate-frontmatter.sh` | `SKILL.md` YAML schema |
| `validate-docs.sh` | Internal markdown links |
| `validate-supported.sh` | 24 tool profile parity |
| `validate-website-install.sh` | G14 README ↔ `/install` |
| `validate-npm-pack.sh` | npm pack contents |
| `validate-cursor-install.sh` | Full Cursor dry-run |
| `validate-research-scaffold.sh` | R0 KB/index frontmatter |
| `validate-research.sh` | R4 stale sources + queue cap |
| `validate-reference-sync.sh` | INDEX parity, distillation map, queue exclusivity |
| `validate-onboarding.sh` | Onboarding templates + references |
| `validate-golden.sh` | Golden fixture structure, path refs, G13 route smoke |
| `validate-behavioral-golden.sh` | G1–G12 routing contracts (manifest + markers) |
| `validate-golden-scenarios.sh` | G1–G12 scenario manifest schema + command parity |
| `run-golden-harness.py` | Opt-in LLM runner (`npm run golden:harness`) |

Golden tests in `tests/golden/` combine **automated** structural (`validate-golden.sh`), **routing contracts** (`validate-behavioral-golden.sh`), **scenario manifest** (`validate-golden-scenarios.sh`), **Playwright** UX/content gates (`validate-website-playwright.sh`), and **opt-in LLM runs** (`golden:harness` — not in default CI).

## 8. Key Design Constraints

- runtime files stay load-efficient (`load-discipline.md` task classes)
- canonical reference knowledge is not duplicated unnecessarily
- new capability goes through mode/engine structure, not prompt sprawl
- project-level behavior is staged (Project Mode), not improvised
- distillation queue never exceeds 20 open items

## 9. Planned Extensions (1.2.8+)

- Tune presets from nightly harness report artifacts
- trend snapshot storage conventions under `research/snapshots/`

## 10. Architectural Summary

| Layer | Role |
|-------|------|
| `docs/` | explains what to build |
| `reference/` | stores what the system knows at depth |
| `research/` | collects and queues what to distill next |
| `arabic/` | defines how the system behaves at runtime |

That separation is the main defense against drift.
