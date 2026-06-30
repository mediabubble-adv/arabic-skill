# Implementation Plan: `arabic`

## 1. Goal of the Plan

Implement the advisory-first upgrade in a way that changes system behavior first, then expands capability, then hardens integration and validation.

The sequence matters. If content files are added before the operating model is fixed, the system becomes larger without becoming better.

## 2. Delivery Strategy

Implementation should follow this order:

1. architecture lock
2. behavioral core
3. humanization redesign
4. capability expansion
5. project workflow expansion
6. runtime integration
7. examples and QA assets
8. validation and acceptance

## 3. Phase 0 — Architecture Lock

### Goal

Prevent drift before adding new content.

### Tasks

- declare `reference/` canonical and `arabic/` runtime
- align file inventory with actual files on disk
- define which docs are authored directly vs derived later
- remove false inventory claims from planning docs

### Outputs

- locked architecture map
- ownership rules for runtime vs reference content
- validation checklist for future file additions

### Acceptance Gate

- runtime file map is truthful
- no planned file is assumed to exist without being created

## 4. Phase 1 — Behavioral Core

### Goal

Change the product behavior from write-first to advisory-first.

### Files

- `arabic/SKILL.md`
- `arabic/references/intake-protocols.md`
- `arabic/references/advisory-mode.md` (new)
- `docs/product/operating-model.md`

### Tasks

#### A. `SKILL.md`

- define the default operating model
- define Advisory Mode, Pro Mode, Project Mode, Audit Mode, Prompt Coach Mode
- define direct-write exceptions
- require final review on every output

#### B. `intake-protocols.md`

- separate beginner and advanced questioning behavior
- add option-based questioning
- add recommendation triggers
- add Prompt Coach intake
- add Project Mode intake
- add Brand Voice Detector intake

#### C. `advisory-mode.md`

Create a new file defining:

- how the skill guides
- how it offers choices
- how it explains tradeoffs
- how it transitions from clarify to recommend to write

### Acceptance Gate

- the skill no longer defaults to immediate generation
- each mode has an explicit flow
- intake behavior changes based on user clarity

## 5. Phase 2 — Humanization v2.0

### Goal

Make the output sound materially more native, less synthetic, and less translated.

### Files

- `arabic/references/humanization-protocol.md`

### Tasks

Add or rewrite the following layers:

#### A. Banned Lexicon Layer

- keep current banned phrases
- add channel-specific forbidden phrasing
- add anti-corporate filler patterns

#### B. Rhythm Layer

- uneven sentence length
- breath-point checks
- pause logic
- anti-symmetry rules
- read-aloud validation

#### C. Realism Layer

- replace abstract emotion with scene or lived effect
- allow limited hesitation and self-correction
- reduce over-clean motivational tone

#### D. Native Texture Layer

- dialect-appropriate fillers
- controlled interruptions
- natural transitions
- light idiom use without caricature

#### E. Anti-Translationese Layer

Detect and rewrite:

- English-first sentence logic
- unnatural adjective stacking
- overly abstract corporate framing
- direct-lift English rhetorical structures

#### F. Channel Humanization Layer

Different rules for:

- captions
- scripts
- landing pages
- WhatsApp
- LinkedIn
- tutorials
- dev docs

### Acceptance Gate

- humanization goes beyond phrase deletion
- review rules are actionable, not decorative

## 6. Phase 3 — Capability Expansion

### Goal

Add the core new knowledge packs required by the roadmap.

### Files to Create

- `arabic/references/prompt-engineering.md`
- `arabic/references/ads-service-matrix.md`
- `arabic/references/book-writing.md`
- `arabic/references/seo-aeo-masri.md`
- `arabic/references/seasonal-calendar.md`
- `arabic/references/project-context-scanner.md`
- `arabic/domains/ads-media.md`
- `arabic/domains/dev-tech.md`

### Workstreams

#### A. Prompt Engineering

`prompt-engineering.md` should include:

- Arabic prompt frameworks
- prompt repair workflow
- beginner / standard / pro prompt patterns
- bad vs good prompt examples
- prompt templates by content type

#### B. Ads Service Matrix

`ads-service-matrix.md` should map:

- Meta
- Google Search
- Google Display
- YouTube
- TikTok
- Snapchat
- LinkedIn
- WhatsApp click-to-chat

For each:

- format
- character limits
- hook logic
- CTA behavior
- funnel role
- Egyptian audience behavior

#### C. Book Writing

`book-writing.md` should include:

- premise and audience promise
- structure selection
- outline rules
- chapter blueprint
- continuity QA
- voice consistency system

#### D. SEO/AEO Masri

`seo-aeo-masri.md` should include:

- Egyptian search behavior
- MSA vs Masri query split
- title and description formulas
- schema patterns
- AI-overview optimization notes

#### E. Seasonal Calendar

`seasonal-calendar.md` should cover:

- Ramadan
- Eid al-Fitr
- Eid al-Adha
- national dates
- back-to-school
- summer travel
- White Friday
- New Year and Coptic Christmas

#### F. Ads Domain

`ads-media.md` should cover:

- Meta ads
- Google ads
- YouTube ads
- TikTok ads
- Snapchat ads
- LinkedIn ads
- WhatsApp campaigns
- retargeting and funnel copy
- Egyptian paid-media psychology

#### G. Dev-Tech Domain

`dev-tech.md` should cover:

- dev marketing
- READMEs
- API docs
- tutorials
- product docs
- terminology bank
- register system for L3/L4/L5 technical content

#### H. Project Context Scanner

`project-context-scanner.md` should define how `/arabic auto`, Project Mode, and Dev-Tech tasks inspect a project before writing Arabic content about it.

It should include:

- safe file discovery rules for README, docs, package metadata, routes, examples, and public copy
- private-file exclusions for `.env*`, credentials, generated output, dependency folders, and lockfile noise
- evidence summary format before making public Arabic claims
- output formats for product explanation, install tutorial, command tutorial, README section, release notes, and website copy
- uncertainty behavior when the repo does not contain enough evidence

### Acceptance Gate

- each new file has a clear responsibility
- the new files map to explicit product features

## 7. Phase 4 — Project Mode Expansion

### Goal

Support large projects with staged execution instead of one-shot writing.

### Files

- `arabic/references/project-mode.md`
- `arabic/references/output-templates.md`

### Tasks

#### A. `project-mode.md`

Expand to support:

- websites
- campaign bundles
- editorial systems
- books

Standard stage model:

1. Discuss
2. Research
3. Recommend
4. Plan
5. Execute
6. Test
7. Refine

#### B. `output-templates.md`

Add:

- recommendation summary block
- project deliverable template
- prompt-coach deliverable template
- book deliverable template

### Acceptance Gate

- Project Mode is usable for website, campaign, and book flows
- output templates match the new operating model
- project-aware Arabic explanations are based on real repo evidence, not invented product claims

## 8. Phase 5 — Runtime Integration

### Goal

Wire the new systems into actual skill behavior.

### Files

- `arabic/references/engines.md`
- `arabic/references/INDEX.md`
- `arabic/dialects/masri.md`
- `arabic/references/taboos.md`
- `arabic/references/trends-and-hooks.md`

### Tasks

#### A. `engines.md`

Each engine should define:

- what to clarify
- what to recommend
- how to write
- how to review

Add or expand:

- Meta Ads engine
- Google Ads engine
- TikTok/Snapchat/LinkedIn ad layers
- Prompt Coach engine
- Book Writing engine
- Project Mode engine
- Dev-Tech / Project Explanation engine

#### B. `INDEX.md`

- add all new reference files
- ensure counts and descriptions are accurate

#### C. `masri.md`

Expand with:

- developer slang
- ad jargon
- L4 professional patterns
- B2B tone patterns

#### D. `taboos.md`

Add:

- general paid-media safety notes
- platform-safe phrasing guidance

#### E. `trends-and-hooks.md`

Add:

- seasonal hooks linked to `seasonal-calendar.md`
- guidance for preloaded trend usage vs evergreen fallback

#### F. `project-context-scanner.md`

- connect scanner outputs to `/arabic auto`, `/arabic write readme`, `/arabic write tutorial`, and `/arabic plan website`
- define evidence-to-claim rules for Arabic explanatory content
- define privacy exclusions and "do not publish" warnings

### Acceptance Gate

- engines reflect the advisory-first model
- indexes are accurate
- new files are reachable from runtime routing
- project scan behavior is reachable from `/arabic auto` and Dev-Tech tasks

## 9. Phase 6 — Examples and QA Assets

### Goal

Raise the quality floor and make new capabilities testable.

### Files

- `arabic/references/examples.md`

### Add Example Sets

- advisory interaction example
- prompt improvement example
- Meta feed ad
- Google search ad set
- TikTok ad script
- Snapchat or LinkedIn ad example
- WhatsApp sequence
- landing-page hero
- AEO opening
- GitHub README opening
- API explanation block
- project-mode deliverable
- project-aware Arabic explanation from a sample repo scan
- Arabic install/use tutorial generated from README + docs evidence
- book outline
- chapter sample

### Acceptance Gate

- examples cover the new product surface
- examples show both good and bad patterns where useful

## 10. Phase 7 — Persistence Layer

### Goal

Make saved brand context reusable.

### Files

- `arabic/voice.md`
- `arabic/references/intake-protocols.md`
- `arabic/SKILL.md`

### Tasks

- define `voice.md` structure
- define save/load behavior
- define reuse behavior in Pro Mode
- define reuse behavior in Project Mode

### Acceptance Gate

- a saved voice profile can be reused without full re-intake

## 11. Phase 8 — Validation and Acceptance

### Goal

Ensure the repo is internally consistent and the plan is shippable.

### Validation Checklist

- index matches real files
- all referenced files exist
- no routing section points to missing docs
- all modes have clear flows
- output templates cover new modes
- examples cover new capabilities
- project workflows cover website, campaign, and book cases

### Final Acceptance Tests

#### Test 1 — Advisory Caption Flow

User arrives vague.  
Skill guides, clarifies, recommends, writes, reviews.

#### Test 2 — Pro Mode Ad Brief

User provides structured brief.  
Skill compresses intake, writes, reviews.

#### Test 3 — Prompt Coach

User provides weak Arabic prompt.  
Skill upgrades it into stronger versions and explains why.

#### Test 4 — Website Project

Skill runs Project Mode across multi-page structure.

#### Test 5 — Campaign Bundle

Skill builds phased ad content with channel distinction.

#### Test 6 — Book Workflow

Skill creates premise, outline, chapter objective, and sample chapter with continuity review.

#### Test 7 — Project-Aware Arabic Explanation

Given a repository with README, docs, and package metadata, the skill scans available evidence, states what files informed the answer, and writes a clear Arabic explanation for non-technical users without leaking secrets or inventing unsupported features.

#### Test 8 — Arabic Tutorial From Project Docs

Given install and command docs, the skill writes a high-detail Arabic tutorial that explains setup, first use, common commands, and troubleshooting in human language.

## 12. Priority Order

If time is limited, the highest-ROI order is:

1. `SKILL.md`
2. `references/advisory-mode.md`
3. `references/intake-protocols.md`
4. `references/humanization-protocol.md`
5. `references/engines.md`

Then:

6. `references/prompt-engineering.md`
7. `references/ads-service-matrix.md`
8. `domains/ads-media.md`
9. `domains/dev-tech.md`
10. `references/project-context-scanner.md`
11. `references/project-mode.md`
12. `references/examples.md`

## 13. Strategic Note

The most important implementation decision is sequencing.

Do not start by only adding new domain content.

Start by changing system behavior first:

`guide -> clarify -> recommend -> write -> review`

Then expand the content surface on top of that corrected model.

## 14. Research and Command Layers (cross-reference)

These specs extend this plan — integrate their phases when recreating the implementation plan:

| Doc | Adds |
|-----|------|
| [research-intelligence-plan.md](./research-intelligence-plan.md) | `research/` folder, internet + AI collection, distillation queue, `/arabic research` |
| [command-surface.md](./command-surface.md) | `/arabic` subcommands, `.arabic/` workspace auto, `command-router.md`, golden tests G7–G12 |

**v1.0.0 targets:** `arabic/references/command-router.md`, `arabic/references/project-context-scanner.md`, research R0 scaffold, Cursor command adapter doc.
