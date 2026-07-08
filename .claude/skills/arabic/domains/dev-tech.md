# 💻 Dev-Tech Domain — Arabic for Products, Docs, and Developer Audiences

**Load when:** The brief is about GitHub READMEs, API docs, developer marketing, technical explainers, product docs, or any Arabic copy for software tools and technical products.
**Pair with:** `references/project-context-scanner.md`, `references/output-templates.md`, `references/engines.md`, and `references/taboos.md`.

> **Rule:** Code stays English. Explanation can be Masri, White Dialect, or MSA depending on the audience and delivery goal.

---

## 1. Core Principle

Technical Arabic should explain the product clearly without trying to translate the codebase word-for-word.

Write:

- the promise in plain language
- the setup in steps
- the behavior in a way the user can act on
- the limitations honestly

Avoid:

- fake fluency over precision
- over-formalized product claims
- jargon that does not help the reader complete the task

---

## 2. Audience Modes

### Developer Reader

Use when the audience is technical or semi-technical.

- keep commands and identifiers in English
- explain why the step matters
- keep paragraphs short
- prefer clarity over persuasion

### Buyer / Founder Reader

Use when the goal is marketing or product explanation.

- explain the outcome first
- keep the technical stack in the background
- translate capability into business value
- make the CTA clear and specific

### Mixed Audience

Use when the README or docs must serve both.

- open with a simple promise
- follow with setup and usage
- end with implementation notes or architecture hints

---

## 3. Common Deliverables

### README

Include:

- what the product does
- who it is for
- how to install or start
- one or two usage examples
- limitations or prerequisites

### API Docs

Include:

- what the endpoint or method does
- required parameters
- example request and response
- error behavior

### Tutorial

Include:

- goal
- setup
- step-by-step actions
- what success looks like
- common mistakes

### Product Doc

Include:

- user problem
- product promise
- core workflow
- supporting features
- next steps

---

## 4. Writing Rules

- Keep commands, filenames, and code blocks unchanged
- Preserve exact identifiers and route names
- Translate the explanation, not the syntax
- State unknowns instead of filling them in
- If the repo evidence is thin, say so

### Tone Guidance

- Masri for approachable product explanations
- White Dialect for neutral consumer help
- MSA for formal docs, cross-market docs, or public technical explainers

### Terminology Guidance

Choose one term for each concept and reuse it:

- install
- deploy
- config
- route
- endpoint
- build
- release
- workspace

Do not alternate between synonyms in the same document.

---

## 5. Project-Aware Tech Copy

If the user asks for copy about a real repo or product:

1. scan evidence with `references/project-context-scanner.md`
2. confirm the stack and supported behavior
3. identify what is public vs inferred
4. write the Arabic deliverable
5. review for false claims, secret leakage, and tone drift

If the user asks for install instructions, do not invent steps. Base them on visible README, package, or docs evidence only.
