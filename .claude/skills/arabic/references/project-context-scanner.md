# 🧭 Project Context Scanner — Safe Repo Evidence for Arabic Output

**Load when:** The user asks for project-aware Arabic content, a repo explanation, an install/use guide, technical copy grounded in a real codebase, or `/arabic auto explain`.
**Pair with:** `references/project-mode.md`, `references/output-templates.md`, `references/intake-protocols.md`, `domains/dev-tech.md`, and `references/taboos.md`.

> **Rule:** Write from visible evidence only. If the repo cannot support a claim, do not state it as fact.

---

## 1. What the Scanner Is For

Use this scanner to turn a real project into a grounded Arabic explanation without inventing features.

Supported outputs:

- product overviews
- README sections
- install and setup guides
- feature summaries
- changelog summaries
- developer-facing explainers
- internal project notes in Arabic

---

## 2. Safe Scan Rules

### Include

- `README.md`
- `docs/`
- `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, or similar stack files
- routes, pages, examples, and public config files
- changelog or release notes
- visible scripts and command surfaces
- brand voice files when they exist

### Exclude

- `.env*`
- credentials, tokens, secrets, private keys
- dependency folders such as `node_modules/`, `vendor/`, `.venv/`
- build output, caches, generated artifacts
- lockfile noise unless it is explicitly relevant to install instructions
- private notes or internal-only files not intended for public explanation

### Escalation Rule

If a file might be sensitive, exclude it. The scanner is meant to reduce leakage risk, not maximize coverage.

---

## 3. Evidence Ladder

Read sources in this order:

1. `README.md` and top-level docs
2. package and config files
3. routes, pages, examples, and public source files
4. release notes and changelog
5. supporting docs for edge cases or terminology

If the first two layers already answer the question, stop there.

---

## 4. Claim Discipline

Every public claim should fall into one of these buckets:

- **Confirmed:** directly visible in the repo
- **Inferred:** strongly implied by visible files
- **Unknown:** not enough evidence to say

Do not collapse these into one bucket.

### Allowed claim forms

- "The repo includes ..."
- "The docs suggest ..."
- "The visible stack appears to be ..."
- "Based on the README and scripts, the setup flow is ..."

### Disallowed claim forms

- "The product supports ..." when no file proves it
- "The team uses ..." without direct evidence
- "This is optimized for ..." unless that is visible in the docs or code

---

## 5. Output Format

Use this structure when explaining a real project:

```text
1. Evidence summary
2. What the project appears to do
3. What is confirmed vs inferred
4. Setup/install steps
5. Risks, gaps, or unknowns
6. Arabic explanation or tutorial
```

### Evidence Summary

Keep it short:

- what files were read
- what they prove
- what remains uncertain

### Arabic Explanation Style

- Use the register that matches the audience
- Keep code and commands in English
- Explain the surrounding behavior in Arabic
- Prefer Masri for product and tutorial copy unless the user asks for MSA

---

## 6. `/arabic auto explain`

When auto-explaining a repo:

1. infer the most likely verb: explain / readme / install / tutorial / changelog / docs
2. scan safe evidence only
3. produce a short evidence summary
4. write the Arabic deliverable
5. run the final review and taboo scan

If the user asks for something broader than the repo evidence supports, say so and narrow the scope.

