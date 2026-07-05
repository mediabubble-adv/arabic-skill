# Content Structure: `arabic`

## 1. Purpose

This document defines the structure of the content system: what files should exist, what they should contain, and where each type of information belongs.

It is a design-structure doc, not a product brief.

## 2. Structural Rule

Every new piece of information should answer two questions before it is added:

1. Is this planning intent, canonical reference knowledge, or runtime execution logic?
2. Is this cross-cutting, domain-specific, dialect-specific, or mode-specific?

Those two decisions determine file placement.

## 3. Folder Roles

### `docs/`

Use for:

- PRDs
- implementation plans
- operating-model docs
- architecture docs
- design docs
- context docs

Do not use for:

- runtime prompt rules
- active generation references

### `reference/`

Use for:

- canonical expert knowledge
- specialist skill packs
- durable research
- source notes
- trend snapshots
- decision history

Do not use for:

- final runtime routing instructions unless they are being mirrored intentionally

### `research/`

Use for:

- citation registry and knowledge-base findings
- distillation queue and monthly cron logs
- reusable research prompts

Do not use for:

- runtime routing rules (distill into `arabic/` via PR)
- raw planning discussion

### `arabic/`

Use for:

- active runtime behavior
- runtime reference docs
- active dialect and domain packs
- templates (onboarding scaffold under `templates/.arabic/`)

Do not use for:

- long historical planning discussion
- raw research dumps (use `research/` first)

### `website/`

Use for:

- marketing install site (G13–G18)
- Masri page copy SSOT in `website/content/`

### `tests/golden/`

Use for:

- manual acceptance checklists (G13–G18, research R*, distill RQ*)
- behavior fixtures referenced in PR bodies

Do not use for:

- automated test runners (until golden runner ships)

## 4. File Classification Model

### A. Runtime Routing Files

Examples:

- `SKILL.md`
- `references/intake-protocols.md`
- `references/engines.md`
- `references/output-templates.md`

These control behavior.

### B. Runtime Knowledge Files

Examples:

- `references/humanization-protocol.md`
- `references/taboos.md`
- `references/trends-and-hooks.md`
- `references/project-mode.md`

These supply rules and logic the runtime uses.

### C. Dialect Files

Examples:

- `dialects/masri.md`
- future dialect packs

These hold language behavior, register patterns, and dialect-specific humanization cues.

### D. Domain Files

Examples:

- `domains/ads-media.md`
- `domains/dev-tech.md`
- existing vertical files

These hold industry- and use-case-specific execution rules.

### E. Persistence Files

Examples:

- `voice.md` (project-local or `.arabic/voice.md`)
- `.arabic/config.yaml`, `.arabic/briefs/` (onboarding scaffold)

### F. Research Files

Examples:

- `research/sources/sources.yaml`
- `research/knowledge-base/**/*.md`
- `research/distillation-queue.md`
- `research/index.json`

## 5. Recommended Runtime Structure by Responsibility

### Behavioral Core

- `SKILL.md`
- `references/advisory-mode.md`
- `references/intake-protocols.md`

### Generation Core

- `references/engines.md`
- `references/output-templates.md`

### Review Core

- `references/humanization-protocol.md`
- `references/taboos.md`
- dialect files

### Project Core

- `references/project-mode.md`
- `references/book-writing.md`

### Prompt Core

- `references/prompt-engineering.md`

### Research Core

- `references/research-mode.md`
- `research/` tree (see [Research Intelligence Plan](../planning/research-intelligence-plan.md))

### Onboarding Core

- `references/onboarding-mode.md`
- `templates/.arabic/`

### Ads Core

- `references/ads-service-matrix.md`
- `domains/ads-media.md`

### Dev-Tech Core

- `domains/dev-tech.md`

## 6. Recommended Supporting Docs in `docs/`

The current planning set should include at minimum:

- PRD
- implementation plan
- operating-model doc
- system-architecture doc
- content-structure doc
- context-and-sources doc

Optional future docs:

- validation plan
- testing strategy
- migration plan
- file ownership matrix

## 7. Structure Rules for New Files

When adding a new file:

### Put it in `docs/` if:

- it explains what to build
- it explains why decisions were made
- it is not directly loaded by runtime behavior

### Put it in `reference/` if:

- it is durable knowledge
- it is deeper than the runtime needs every time
- it should be treated as canonical source material

### Put it in `arabic/` if:

- it directly shapes generation behavior
- it is part of the runtime reference set
- it must be available during active content creation

## 8. Anti-Sprawl Rules

To keep the system maintainable:

- do not duplicate the same logic in multiple runtime files
- do not store raw planning chat as runtime context
- do not add examples into files that should only define behavior
- do not add mode logic into unrelated domain files
- do not use `SKILL.md` to hold every detailed rule

Instead:

- keep `SKILL.md` as router and contract
- keep deep logic in referenced docs
- keep examples in `examples.md`

## 9. Structural Summary

The structure should stay legible:

- `docs/` explains the system
- `reference/` informs the system
- `arabic/` runs the system

That separation is the main defense against drift.
