# Load Discipline — Task-Class Reference Sets

**Load when:** routing any `/arabic` command — pick the smallest reference set that can complete the task.
**Rule:** Do not load monolithic `engines.md` or full `output-templates.md` on every write. Load slices on demand.

> **Goal:** Faster responses, smaller context. Full QA and humanization still run at delivery — load discipline changes *what you read first*, not what you skip at the end.

---

## 1. Task classes

| Class | Trigger | Max files (incl. SKILL + dialect) |
|---|---|---|
| **plan** | `/arabic plan …`, Project Mode | 8 |
| **write** | `/arabic write …`, Pro Mode generation | 7 |
| **audit** | `/arabic audit …` (incl. `rtl`, `--dir`) | 6 |
| **rtl** | `/arabic audit rtl` | 6 |

Always load: `SKILL.md` (already active), target `dialects/{dialect}.md`, and `voice.md` when present.

---

## 2. Plan class (`plan`)

Load in order; stop when the plan gate is satisfied:

1. `references/advisory-mode.md` — if intent is still vague
2. `references/project-mode.md` — staged workflow + project type
3. `references/project-context-scanner.md` — when the plan describes a real repo/product
4. `references/output-templates.md` — **Templates H + I only** (recommendation + project plan)
5. `references/engines.md` — **one engine row** matching the primary deliverable type
6. `references/book-writing.md` — only for `plan book` or `plan series`
7. `references/ads-service-matrix.md` — only for `plan campaign`
8. `references/seo-aeo-masri.md` — only for Egypt-targeted website plans

**Do not load:** full audit pipeline, humanization protocol, or all engines during planning.

---

## 3. Write class (`write`)

Load in order:

1. `references/intake-protocols.md` — unless brief is complete (`--brief`)
2. `references/engines.md` — **single engine section** for the subcommand
3. `references/output-templates.md` — **one template (A–F)** for the subcommand
4. `domains/{industry}.md` — only when industry applies
5. `references/project-context-scanner.md` — only for `explain`, `tutorial`, `readme`, or repo-aware copy
6. `references/humanization-protocol.md` — **after draft**, before delivery
7. `references/taboos.md` — before final delivery

**Do not load:** `audit-mode.md`, `project-mode.md`, or unrelated engines/templates.

---

## 4. Audit class (`audit`)

Load in order:

1. `references/audit-mode.md` — 9-point QA + legacy/AI-likelihood scoring (**audit deliveries only**)
2. `references/humanization-protocol.md` — only when offering rewrites
3. `references/taboos.md` — cultural dimension cross-check
4. `voice.md` — when brand lexicon applies
5. `references/project-context-scanner.md` — only for `/arabic audit --dir` (safe scan rules)

**Do not load:** engines, output templates, or project-mode staging docs.

**Scoring rule:** Legacy-register and AI-likelihood scoring run on **`/arabic audit` outputs only** — not on every write delivery.

---

## 5. RTL class (`rtl`)

Extends audit class for UI/code surfaces:

1. `references/rtl-audit.md` — source-based RTL/UI checks (tier 1)
2. `references/audit-mode.md` — Arabic copy QA when UI strings are in scope
3. `references/project-context-scanner.md` — safe file scan for `--dir` (capped)
4. `references/taboos.md` — if visible user-facing Arabic is audited
5. `voice.md` — if brand lexicon applies to UI copy

**Deferred past v1.1:** browser/screenshot tier, visual regression.

---

## 6. Engine and template slices

When `engines.md` or `output-templates.md` is needed, load **only the matching section** — do not pull the full file into context if the agent can read by heading.

| Subcommand family | Engine slice | Template |
|---|---|---|
| caption / post / social | Captions Engine | A |
| ad / meta / funnel | Marketing Funnel Engine | A or B |
| landing / page / website | Website Content Engine | B |
| blog / seo / aeo | SEO or AEO Engine | B |
| video / script / youtube | Video Script Engine | C |
| book / chapter / outline | Book Engine | E |
| ui | UI/UX Microcopy Engine | A |
| contract / skill / rules | Professional Documents | F |

Full routing table: `references/command-router.md`.

---

## 7. Violations to avoid

- Loading all 55 files "to be safe"
- Running legacy + AI-likelihood scoring on every write (audit-only)
- Loading `project-mode.md` for a single caption task
- Loading `engines.md` in full when one row suffices
