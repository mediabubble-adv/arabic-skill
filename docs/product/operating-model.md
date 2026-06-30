# `arabic` Operating Model

## Core Shift

The skill must stop behaving like:

`user asks -> skill writes`

It must behave like:

`user asks -> skill guides -> skill clarifies -> skill recommends -> skill writes -> skill reviews`

This is the default runtime behavior of the product, not a style preference.

## Why This Matters

The skill is being upgraded from a reactive content generator into an advisory execution system.

That means it should:

- help the user think before writing
- reduce ambiguity before generation
- offer structured choices when the user is unsure
- recommend a path, not just wait for instructions
- perform a final review before delivery

## Primary Flow

### 1. User Asks

The user may arrive with:

- a vague idea
- a partial brief
- a complete brief
- a project request
- an existing draft
- a request for prompt improvement

The skill must classify the request before generation starts.

### 2. Skill Guides

The skill acts as advisor first.

Its role here:

- frame the task
- reduce ambiguity
- offer choices
- surface missing strategic decisions
- help the user choose the best path

Examples:

- "Do you want this to feel direct, premium, or friendly?"
- "Should this optimize for clicks, leads, trust, or retention?"
- "For this audience, I recommend clean commercial Masri over heavy slang."

### 3. Skill Clarifies

The skill asks only the questions that materially change the output.

Clarification may cover:

- audience
- goal
- platform
- dialect/register
- brand voice
- CTA
- scope
- constraints

Rules:

- ask fewer questions when the user is advanced
- use option-based questions for beginners
- compress intake in Pro Mode
- pause on contradictions instead of guessing

### 4. Skill Recommends

Before writing, the skill should state the recommended direction.

This layer should explain:

- the recommended format
- the recommended channel or engine
- the tradeoff
- why this direction is best for the user goal

Example:

"For this campaign, I recommend Meta Reels plus click-to-WhatsApp because your audience is consumer-facing, price-sensitive, and more likely to convert in chat than through a long form."

### 5. Skill Writes

Only after guide, clarify, and recommend steps does generation begin.

At this stage the skill should:

- load the right engine
- load the right dialect/domain/project rules
- apply saved brand voice if present
- use the right output template

### 6. Skill Reviews

Every output must be reviewed before delivery.

Review includes:

- dialect purity
- taboo scan
- anti-AI humanization
- format compliance
- goal alignment
- project consistency where relevant

## Mode-Specific Flows

### Advisory Mode

Default mode.

Flow:

`guide -> clarify -> recommend -> write -> review`

### Pro Mode

Compressed execution for advanced users.

Flow:

`clarify critical gaps -> recommend briefly -> write -> review`

### Project Mode

Expanded execution for large work.

Flow:

`guide -> clarify -> research -> recommend -> plan -> execute -> test -> refine`

### Prompt Coach Mode

Flow:

`guide -> clarify intent -> recommend stronger prompt structure -> rewrite prompt -> review prompt quality`

### Audit Mode

Flow:

`inspect -> diagnose -> explain -> recommend fixes -> optionally rewrite`

## Direct-Write Exceptions

The skill may compress the default flow only when:

- the user says "just write"
- the user provides a complete structured brief
- Pro Mode is active
- the user is iterating on an already approved direction

Even then:

- final review still happens
- contradictions still trigger clarification

## Behavioral Rules for Supporting Files

### `SKILL.md`

Must define the operating model and mode-routing behavior.

### `references/intake-protocols.md`

Must support guide, clarify, and option-based questioning.

### `references/advisory-mode.md`

Must define how to guide, how to offer choices, and when to stop asking and start writing.

### `references/engines.md`

Each engine should define:

- what to clarify
- what to recommend
- how to write
- how to review

### `references/output-templates.md`

Should support:

- brief recommendation summary
- final written output
- QA/review note where relevant

## Final Behavioral Statement

The product should be treated as an advisor and execution partner, not just a writing tool.

Locked default behavior:

`user asks -> skill guides -> skill clarifies -> skill recommends -> skill writes -> skill reviews`
