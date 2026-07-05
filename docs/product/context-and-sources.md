# Context and Sources of Truth: `arabic`

> **Current version:** see root `VERSION`

## 1. Purpose

This document defines the context model for the skill and the hierarchy of sources of truth.

It exists to answer a recurring implementation problem:

When the same idea appears in multiple places, which file wins?

## 2. Source-of-Truth Hierarchy

Use this order:

### Level 1 — Product Intent

Location:

- `docs/`

Authority:

- PRD
- implementation plan
- operating model
- architecture docs

These define product direction and design intent.

### Level 2 — Canonical Knowledge

Location:

- `reference/`

Authority:

- specialist skill packs
- deep subject references
- stable research
- source notes
- historical decisions

These define what the system knows at depth.

### Level 2b — Collected Intelligence

Location:

- `research/`

Authority:

- `sources/sources.yaml` (citations)
- `knowledge-base/` curated findings
- `distillation-queue.md` (pending runtime targets)
- `index.json` topic registry

These define what has been researched and is queued or distilled — not yet (or no longer) raw canonical depth.

### Level 3 — Runtime Execution

Location:

- `arabic/`

Authority:

- routing
- generation behavior
- templates
- review rules
- active domain and dialect packs

These define how the system behaves in practice.

## 3. What Counts as Context

For this skill, context includes:

- user goal
- audience
- platform
- dialect and register
- domain/industry
- brand voice
- project scope
- trend or season context
- reusable prior decisions

Context does not mean every historical note should be injected into runtime behavior.

## 4. Context Layers

### A. Session Context

What the current user is asking for right now.

Examples:

- "write 5 captions"
- "help me build a landing page"
- "improve this Arabic prompt"

### B. Reusable Brand Context

Persistent context that should survive across tasks.

Examples:

- `voice.md`
- saved vocabulary fingerprint
- preferred tone
- target register

### C. Reference Context

Deep supporting knowledge the runtime should draw from when relevant.

Examples:

- paid-media format rules
- seasonal content guidance
- book-writing workflow
- dialect cues

### D. Planning Context

Why the system is built the way it is.

Examples:

- PRD decisions
- architecture decisions
- implementation sequencing

## 5. Where Different Context Types Should Live

### User- and Brand-Specific Reusable Context

Lives in:

- `arabic/voice.md` or `.arabic/voice.md` (client project)

### Researched / Platform Intelligence

Lives in:

- `research/knowledge-base/`
- distilled into `arabic/references/` or `arabic/dialects/` via PR

### Deep Expert Knowledge

Lives in:

- `reference/`
- mirrored or distilled into `arabic/references/` only when needed for runtime

### Runtime Behavioral Context

Lives in:

- `arabic/SKILL.md`
- runtime reference docs

### Planning and Design Context

Lives in:

- `docs/`

## 6. Conflict Resolution Rules

When two files seem to disagree, resolve them in this order:

1. `docs/` sets direction
2. `research/` holds collected findings pending distill
3. `arabic/` defines current runtime behavior
4. `reference/` supplies deeper canonical knowledge

Practical interpretation:

- if the PRD says the system should be advisory-first, runtime files must be updated to match
- if a deep reference says something more precise than a runtime summary, the runtime summary should be corrected
- if a historical note conflicts with the current PRD, the PRD wins

## 7. What Should Not Be a Source of Truth

These should not be treated as primary truth by themselves:

- raw planning chat transcripts
- outdated index counts
- example outputs
- one-off test outputs

They can be evidence or context, but they should not drive architecture by themselves.

## 8. Recommended Additional Context Assets

To improve long-term maintainability, the system would benefit from:

- a decision log in `reference/`
- trend snapshot files with dates and sources
- a canonical source map for runtime references
- validation notes for which docs are mirrored vs canonical

## 9. Context Summary

Use this model:

- `docs/` = what the system should become
- `reference/` = what the system should know
- `arabic/` = what the system currently does

That is the cleanest way to keep planning, knowledge, and execution aligned.
