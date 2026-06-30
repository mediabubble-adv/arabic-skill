# System Architecture: `arabic`

## 1. Purpose

This document defines the design architecture of the Awesome Arabic Skill.

The PRD explains what the product should do.  
This document explains how the system should be structured so that behavior, content, and reference knowledge stay coherent.

## 2. Architectural Goal

Build an advisory-first Arabic content system where:

- `reference/` holds canonical knowledge
- `arabic/` holds the runtime skill pack
- `docs/` holds planning, architecture, and implementation intent

The runtime skill should stay thin enough to operate reliably, while the deeper context and specialist material stay organized outside the runtime layer.

## 3. Top-Level System Layers

### Layer A — Planning Layer

Location:

- `docs/`

Purpose:

- PRD
- implementation plan
- operating model
- architecture docs
- design and structure docs

This layer explains the system to humans building it.

### Layer B — Canonical Knowledge Layer

Location:

- `reference/`

Purpose:

- specialist skill packs
- long-lived research material
- contextual reference sets
- historical decisions
- future trend snapshots and source notes

This layer is the source of truth for deep knowledge.

### Layer C — Runtime Skill Layer

Location:

- `arabic/

Purpose:

- live skill behavior
- routing
- runtime references
- active dialect/domain packs
- templates
- mode execution

This is the layer actually consumed during skill execution.

## 4. Core Runtime Model

The runtime skill should execute this behavior:

`user asks -> skill guides -> skill clarifies -> skill recommends -> skill writes -> skill reviews`

That means the runtime layer needs six functional subsystems:

1. request classification
2. guidance and clarification
3. recommendation
4. generation
5. review
6. continuity and persistence

## 5. Runtime Subsystems

### A. Request Classification

Files primarily involved:

- `arabic/SKILL.md`
- `arabic/references/intake-protocols.md`

Responsibilities:

- classify user intent
- detect user clarity level
- detect mode
- detect project complexity
- detect whether saved voice context should be loaded

### B. Guidance and Clarification

Files primarily involved:

- `arabic/references/advisory-mode.md`
- `arabic/references/intake-protocols.md`

Responsibilities:

- ask strategic questions
- offer structured choices
- reduce ambiguity
- handle beginner vs advanced users differently

### C. Recommendation

Files primarily involved:

- `arabic/references/engines.md`
- domain and dialect packs

Responsibilities:

- choose the best path
- explain channel or format tradeoffs
- recommend engine and structure before writing

### D. Generation

Files primarily involved:

- `arabic/references/engines.md`
- `arabic/references/output-templates.md`
- domain packs
- dialect packs
- `voice.md` if available

Responsibilities:

- load the right writing rules
- generate in the chosen structure
- maintain consistency with voice and context

### E. Review

Files primarily involved:

- `arabic/references/humanization-protocol.md`
- `arabic/references/taboos.md`
- dialect pack

Responsibilities:

- dialect purity
- anti-AI cleanup
- taboo scan
- output-format compliance
- project consistency check

### F. Continuity and Persistence

Files primarily involved:

- `arabic/voice.md`
- project-mode workflows

Responsibilities:

- persist brand voice
- carry context across repeated tasks
- keep multi-piece outputs coherent

## 6. Mode Routing Architecture

### Advisory Mode

Best for:

- vague or partially formed requests
- strategic content exploration

### Pro Mode

Best for:

- structured briefs
- repeated execution
- expert users

### Project Mode

Best for:

- websites
- campaign bundles
- editorial systems
- books

### Audit Mode

Best for:

- draft review
- quality diagnosis
- rewrite guidance

### Prompt Coach Mode

Best for:

- users who need help briefing in Arabic
- prompt improvement and education

## 7. Knowledge Flow

The intended knowledge flow is:

`docs -> reference -> arabic runtime -> final output`

Meaning:

- planning intent starts in `docs/`
- deep knowledge lives in `reference/`
- runtime behavior is implemented in `arabic/

This prevents the runtime skill from becoming the only place where product intent and execution logic exist.

## 8. Key Design Constraints

- runtime files should stay load-efficient
- canonical reference knowledge should not be duplicated unnecessarily
- new capability should be added through mode/engine structure, not random prompt growth
- examples should support execution, not replace architecture
- project-level behavior should be staged, not improvised

## 9. Recommended Future Supporting Assets

The architecture would benefit from future additions such as:

- reference sync rules
- validation scripts for missing references
- golden test cases per mode
- trend snapshot storage conventions
- reusable brand voice templates

## 10. Architectural Summary

This system should be treated as three connected layers:

- `docs/` explains what to build
- `reference/` stores what the system knows
- `arabic/` defines how the system behaves

If that separation is respected, the skill can grow without turning into one oversized prompt pack.
