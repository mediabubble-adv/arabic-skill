# Research Mode — `/arabic research`

Load when the task is **collecting, curating, or distilling** intelligence into the `research/` layer
or planning a runtime distill PR. Does **not** replace live web browsing for one-off user questions —
it runs the **versioned research pipeline** defined in `docs/planning/research-intelligence-plan.md`.

> **Honest bounds:** Research informs preloaded runtime knowledge. Never claim live platform data in generated Arabic copy.
> **Load discipline:** Use the `research` task class in `references/load-discipline.md` — max 6 files.

---

## Command variants

| Command | Behavior | Primary output |
|---|---|---|
| `/arabic research <topic>` | Structured research run for `<topic>` | `research/knowledge-base/{folder}/{slug}.md` |
| `/arabic research distill` | Process open rows in `distillation-queue.md` | Distill PR plan (≤50 lines/runtime file) |
| `/arabic research status` | Registry + queue + stale-source report | stdout summary |

Repo paths are relative to the **attached workspace** (this repo or a clone with `research/`).

---

## 1. `/arabic research <topic>`

### 1.1 Classify topic → prompt template

| Topic signal | Prompt | KB folder |
|---|---|---|
| `reference-gap`, `arabic-qa`, `reference/` pack name | `research/prompts/reference-gap-scan.md` | `humanization/` or path from gap scan |
| `meta`, `google`, `tiktok`, `snap`, `linkedin`, `platform`, `ads` | `research/prompts/platform-ads-research.md` | `platforms/` |
| `dialect`, `masri`, `slang`, `register`, `ksa`, … | `research/prompts/dialect-freshness-audit.md` | `dialects/` |
| `competitor`, `landing`, `teardown` | `research/prompts/competitor-landing-teardown.md` | `marketing-psychology/` |
| `humanization`, `anti-ai`, `texture`, `rhythm` | `research/prompts/humanization-pattern-mining.md` | `humanization/` |
| `seasonal`, `ramadan`, `eid`, `white-friday` | Use `references/seasonal-calendar.md` + queue item | `seasonal/` |

Load the matching prompt file and follow it exactly.

### 1.2 Research run steps (7)

1. **PLAN** — Confirm topic, market (default Egypt / Masri-first), and target runtime file(s)
2. **COLLECT** — Official sources first (Tier A); web only when user has network access
3. **CITE** — Add stable IDs to `research/sources/sources.yaml` (`accessed`, `trust_tier`, `runtime_eligible`)
4. **CURATE** — Write KB file with frontmatter (§7a in research-intelligence-plan)
5. **QUEUE** — Append actionable gaps to `research/distillation-queue.md` (max 20 open rows)
6. **INDEX** — Register in `research/index.json`
7. **REPORT** — Summarize findings, sources, queue IDs, and suggested next distill

### 1.3 KB frontmatter (required)

```yaml
---
topic: short-slug
last_reviewed: YYYY-MM-DD
trust_tier: A
sources:
  - source-id-from-sources-yaml
runtime_targets:
  - arabic/references/{file}.md
status: collected
---
```

**Status values:** `collected` → `curated` → `distilled` | `deferred`

### 1.4 Guardrails

- Do **not** copy entire `reference/` files into KB or runtime
- Tier **C** slang → human-review flag; never land in `dialects/` without approval
- No web access → mark source-dependent claims `needs_live_verification`; do not promote to runtime rules
- Distill is a **separate** step — this command writes to `research/` only unless user explicitly asks to edit `arabic/`

---

## 2. `/arabic research distill`

Read `research/distillation-queue.md` **Open** and **In progress** rows.

For each open item (or a user-specified `RQ-###`):

1. Read the linked KB file(s) and runtime target
2. Draft a distill plan: exact file, section, ≤50 new lines, golden test path
3. List blockers (missing sources, Tier C, contradictions with runtime)
4. Output a **copy-ready PR checklist** — do not merge runtime edits without user approval

**Output format:**

```markdown
## Distill plan — RQ-###
**Target:** arabic/references/{file}.md § {section}
**Lines:** ~N (budget ≤50)
**Sources:** {ids}
**Golden test:** tests/golden/{name}.md

### Proposed diff (summary)
- bullet changes

### PR checklist
- [ ] sources.yaml entries
- [ ] index.json status → distilled
- [ ] distillation-queue row moved
- [ ] npm run validate
```

If no open items: report queue health and suggest next topic from deferred/revisit list.

---

## 3. `/arabic research status`

Read and summarize:

| Source | Report |
|---|---|
| `research/index.json` | Topic count by `status`; list `last_reviewed` |
| `research/sources/sources.yaml` | Flag `accessed` older than **90 days** as stale |
| `research/distillation-queue.md` | Open / in-progress / deferred counts |
| `research/knowledge-base/` | Orphan files not in `index.json` |

**Stale rule:** `accessed` date > 90 days ago → `⚠️ stale — re-verify before runtime distill`

**Output format:**

```markdown
## Research status — YYYY-MM-DD
**KB topics:** N (collected: X, curated: Y, distilled: Z)
**Queue:** open A · in-progress B · deferred C
**Stale sources:** {list or CLEAN}
**Next suggested:** {1–3 topics from queue or monthly cron}
```

Monthly maintenance cadence: `docs/planning/research-monthly-cron.md`

---

## 4. Persistence (optional)

When running inside a repo with `.arabic/`:

| Artifact | Path |
|---|---|
| Research run log | `.arabic/research/{slug}-{date}.md` |
| Distill plan | `.arabic/research/distill-{RQ-id}-{date}.md` |

Create `.arabic/research/` on first write if missing.

---

## Related

- `research/README.md` — folder map and trust tiers
- `docs/planning/research-intelligence-plan.md` — full pipeline spec
- `docs/planning/research-monthly-cron.md` — scheduled maintenance
- `references/command-router.md` — command grammar
- `references/ads-service-matrix.md` — common distill target for platform KB
