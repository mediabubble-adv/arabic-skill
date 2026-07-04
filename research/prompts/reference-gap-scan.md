---
name: reference-gap-scan
version: 2026-07-04
purpose: Compare reference/ pack vs runtime target; queue distillation items
output: research/distillation-queue.md
---

# Reference vs runtime gap scan

## Inputs

- `reference_pack`: e.g. `arabic-qa`, `arabic-masri`, `arabic-seo-optimizer`
- `runtime_target`: e.g. `arabic/references/humanization-protocol.md`, `arabic/dialects/masri.md`
- `index`: `arabic/references/INDEX.md` for load-map context

## Task

Compare `reference/{reference_pack}/` with the runtime target file(s).

List:

1. **Missing rules** — in reference but absent or weaker in runtime
2. **Outdated rules** — runtime contradicts or predates reference
3. **Safe-to-distill excerpts** — max 30 lines each, with file paths

Do **not** copy entire reference files into runtime or knowledge-base.

## Output format

Append rows to `research/distillation-queue.md` **Open** table:

```text
| RQ-### | reference-gap | {one-line finding} | {runtime_target} | A | YYYY-MM-DD | ref: {pack} |
```

If no gap is actionable, add a **Deferred** row with reason.

## Guardrails

- Prefer distillation over duplication — runtime stays lean (~300 lines/module)
- Flag Tier C slang for human review before `arabic/dialects/`
- Cross-check `docs/planning/reference-distillation.md` phase priority
