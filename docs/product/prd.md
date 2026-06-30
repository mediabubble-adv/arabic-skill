# PRD: Awesome Arabic Skill

## 1. Product Vision

Build a Masri-first Arabic content skill that acts as:

- content writer
- content strategist
- brand voice partner
- campaign advisor
- project planner
- prompt coach
- QA reviewer

The product should help users think better, brief better, choose better, and publish stronger Arabic content faster.

## 2. Core Operating Model

Default behavior:

`user asks -> skill guides -> skill clarifies -> skill recommends -> skill writes -> skill reviews`

This is the default product behavior, not an optional interaction style.

## 3. Product Goals

- Produce higher-quality Arabic content with less wasted prompting
- Improve humanization materially beyond the current version
- Support users who do not know what they need yet
- Persist and reuse brand voice
- Support one-off content and large multi-piece projects
- Add broader ads capability and stronger dev-tech support
- Add Arabic prompt engineering as a product feature
- Scan project files when needed so Arabic content reflects the actual product, tool, docs, or codebase
- Keep `reference/` as the source of truth and `arabic/` as the runtime pack

## 4. Product Principles

- Advisor before generator
- Ask only what changes the output
- Recommend a direction before writing when ambiguity exists
- Humanization is a first-class system
- Large work uses staged project execution
- Prompt engineering is a first-class feature
- Project-aware writing must be grounded in visible repo evidence
- No fake recency claims; trend intelligence is preloaded
- Every output is reviewed before delivery

## 5. Primary User Types

- founders and marketers
- agencies and media buyers
- creators and educators
- dev founders and technical writers
- brand teams
- users who need Arabic prompt help
- users managing large website, campaign, or book projects

## 6. Core Modes

### Advisory Mode

Default mode for unclear or partially clear requests.

Flow:

`guide -> clarify -> recommend -> write -> review`

### Pro Mode

Fast execution for advanced users with structured briefs or repeated workflows.

Flow:

`clarify critical gaps -> recommend briefly -> write -> review`

### Project Mode

For larger deliverables and multi-step work.

Flow:

`guide -> clarify -> research -> recommend -> plan -> execute -> test -> refine`

Supports:

- full websites
- multi-page bundles
- campaign systems
- editorial systems
- books
- project explanation and tutorial systems

### Audit Mode

Reviews existing Arabic content and explains what is weak, too formal, translated, risky, or misaligned.

### Prompt Coach Mode

Improves Arabic prompts and teaches the user how to brief better.

## 7. Core Functional Systems

### A. Advisory System

The skill must:

- ask smart questions
- provide useful choices
- explain tradeoffs simply
- recommend the best-fit path
- summarize decisions before writing

### B. Humanization v2.0

Upgrade the current humanization layer into a layered system:

- banned lexicon removal
- rhythm and breath-flow checks
- anti-translationese cleanup
- native texture and dialect markers
- scene-based emotional realism
- channel-specific humanization rules

### C. Brand Voice Persistence

The skill can:

- detect brand voice
- save it to `voice.md`
- reload it on future tasks
- apply it across channels and project types

Detection sources:

- website questionnaire
- social questionnaire
- pasted samples
- existing `voice.md`

### D. Prompt Engineering

The skill should:

- diagnose weak prompts
- rewrite them into stronger Arabic prompts
- provide beginner, standard, and pro versions
- explain why the improved prompt is better

### E. Paid Media Expansion

Support:

- Meta Ads
- Google Search Ads
- Google Display Ads
- YouTube Ads
- TikTok Ads
- Snapchat Ads
- LinkedIn Ads
- WhatsApp click-to-chat campaigns
- retargeting copy
- landing page ad copy
- funnel sequencing

### F. Dev-Tech Content

Support:

- GitHub README writing
- API docs
- dev tutorials
- technical explainers
- product documentation
- dev marketing content

Rule:

- code stays English
- explanation is Masri or professional Arabic depending on register

### G. Project-Aware Arabic Content

When the user asks the skill to write about a project, app, tool, or repository, the skill should inspect available project files before writing public Arabic claims.

The skill should use:

- README and docs for product purpose and user-facing promises
- package/config files for stack, scripts, and install clues
- routes/pages/examples for capability inventory
- changelog and release docs for development status
- brand voice files when present

The skill must avoid:

- `.env*`, credentials, private tokens, secret config, and private keys
- dependency folders, generated build output, cache folders, and lockfile noise
- invented features not supported by project evidence

Outputs should include Arabic product explanations, install/use tutorials, README sections, website copy, changelog summaries, and command guides.

### H. Book Writing

Project Mode includes a dedicated book workflow:

- premise
- audience promise
- outline
- chapter map
- sample voice
- full chapter drafting
- continuity QA
- final cohesion review

## 8. Information Architecture

```text
arabic/
├── SKILL.md
├── voice.md
├── references/
│   ├── INDEX.md
│   ├── intake-protocols.md
│   ├── engines.md
│   ├── output-templates.md
│   ├── taboos.md
│   ├── humanization-protocol.md
│   ├── examples.md
│   ├── trends-and-hooks.md
│   ├── seo-aeo-masri.md
│   ├── seasonal-calendar.md
│   ├── project-mode.md
│   ├── project-context-scanner.md
│   ├── advisory-mode.md
│   ├── prompt-engineering.md
│   ├── ads-service-matrix.md
│   └── book-writing.md
├── dialects/
│   └── masri.md
├── domains/
│   ├── ads-media.md
│   ├── dev-tech.md
│   └── existing domain files
├── conversations/
└── professional-docs/

reference/
├── canonical authoring material
├── specialist skills
├── historical decisions
└── trend snapshots / source notes
```

## 9. File Responsibilities

### `SKILL.md`

Master runtime behavior:

- define the operating model
- route modes
- define default advisory behavior
- set direct-write exceptions
- enforce final review

### `references/advisory-mode.md`

Defines:

- how to guide
- how to clarify
- how to offer choices
- how to recommend
- when to stop asking and start writing

### `references/intake-protocols.md`

Must support:

- beginner vs advanced users
- Brand Voice Detector intake
- Pro Mode compressed intake
- Project Mode intake
- Prompt Coach Mode intake

### `references/engines.md`

Adds:

- advisory hooks per engine
- recommendation logic per engine
- ad-service engines
- Prompt Coach engine
- Project Mode engine
- Book Writing engine

### `references/humanization-protocol.md`

Upgrade to Humanization v2.0 with layered review rules.

### `references/project-mode.md`

Defines full staged workflow for websites, campaigns, editorial systems, and books.

### `references/project-context-scanner.md`

Defines safe project scanning, evidence summaries, private-file exclusions, and Arabic output formats for explaining products, tools, docs, APIs, and install flows.

### `references/book-writing.md`

Defines book-specific planning, generation, and continuity rules.

### `references/prompt-engineering.md`

Defines Arabic prompt frameworks and prompt-fixing workflows.

### `references/ads-service-matrix.md`

Single matrix for paid-media surfaces, use cases, and funnel roles.

### `domains/ads-media.md`

Execution details for ad writing, format constraints, hooks, CTA logic, platform behavior, and Egyptian paid-media psychology.

### `domains/dev-tech.md`

Execution details for technical writing and developer-facing content.

### `dialects/masri.md`

Expand with:

- developer slang
- ad and marketing jargon
- L4 professional patterns
- B2B and executive tone handling

## 10. Direct-Write Exceptions

The skill may compress the default flow only when:

- the user says "just write"
- the user provides a complete structured brief
- Pro Mode is active
- the user is iterating on an approved direction

Even then:

- final review still happens
- contradictions still trigger clarification

## 11. Output Requirements

Every final output should include, when relevant:

- chosen dialect/register
- brief recommendation summary
- main deliverable
- review or QA note
- next-step suggestion for ongoing work

## 12. Success Criteria

The advisory-first milestone is complete only if:

1. The skill behaves as advisor before writer by default
2. Humanization is clearly stronger than the current version
3. Prompt Coach Mode works end to end
4. Brand voice can be saved and reused
5. Project Mode supports website, campaign, and book workflows
6. Ads support goes beyond Meta and Google basics
7. Dev-tech content works with the correct terminology strategy
8. Project-aware Arabic content is grounded in actual project files and avoids private data
9. Trend handling uses preloaded references, not fake recency
10. Indexes and file maps match the real repo
11. All outputs pass final review rules

### Traceability to golden tests

Each criterion maps to golden tests in [implementation-plan §0.3](../planning/implementation-plan.md#03-golden-test-master-table-g1g18). G1–G12 gate **v1.0.0**; G13–G18 gate **v1.1.0**.

| # | Criterion | Phase | Golden test(s) |
|---|-----------|-------|----------------|
| 1 | Advisor before writer | P1 / C1 | G1, G2, G7, G8 |
| 2 | Stronger humanization | P2 | covered by P2 fixtures + review in every test |
| 3 | Prompt Coach end-to-end | P3 | G3 |
| 4 | Brand voice save/reuse | P3 | P3 acceptance (voice save → reuse without re-intake) |
| 5 | Project Mode (web/campaign/book) | P5 / C3 | G4, G6, G10 |
| 6 | Ads beyond Meta/Google | P4 | G5 |
| 7 | Dev-tech terminology strategy | P5 | G11 (project explain) + P5 dev-tech fixtures |
| 8 | Project-aware, no private data | P5 / C4 | G11 |
| 9 | Preloaded trends, no fake recency | P4 | P4 seasonal-calendar fixture (no live-data claim) |
| 10 | Indexes/file maps match repo | P0 / P6 | `validate-skill.sh` + G16 (website QA) |
| 11 | All outputs pass final review | P1 / P2 | G9 + review step asserted in every test |

## 13. Non-Goals

The current plan does not require:

- live trend crawling during content generation
- real-time ad-platform API integration
- legal-policy packs for restricted industries beyond general compliance
- cross-dialect parity beyond the current Masri-first operating strategy

## 14. Strategic Summary

The biggest product change is not adding more content files.

It is changing the skill from:

`user asks -> skill writes`

to:

`user asks -> skill guides -> skill clarifies -> skill recommends -> skill writes -> skill reviews`

That shift turns the product into an advisor and execution partner rather than a reactive writing tool.
