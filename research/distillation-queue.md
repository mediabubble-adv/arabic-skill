# Distillation Queue

Research findings waiting to land in `arabic/`. **Max 20 open rows.** Every item must end in `distilled` or `deferred`.

Spec: [research-intelligence-plan.md](../docs/planning/research-intelligence-plan.md)

## Status legend

| Status | Meaning |
|--------|---------|
| `open` | Ready for distill PR planning |
| `in_progress` | Active PR branch |
| `distilled` | Landed in runtime — link PR in Notes |
| `deferred` | Parked — reason required |

## Open

| ID | Source kind | Finding | Runtime target(s) | Trust | Added | Notes |
|----|-------------|---------|-------------------|-------|-------|-------|
| — | — | _No open items — add via research cycle or `prompts/reference-gap-scan.md`_ | — | — | — | — |

## In progress

| ID | Branch | Owner | Notes |
|----|--------|-------|-------|
| — | — | — | — |

## Deferred

| ID | Reason | Revisit |
|----|--------|---------|
| RQ-002 | Full Masri error-catalog before/after — runtime has check logic; duplication bloats load | v1.3 if audit miss rate high |
| RQ-003 | YAML machine audit output — no `--format yaml` flag yet | R3 command wiring |
| RQ-004 | Egypt cultural-red-lines supplement — partial overlap with `taboos.md` | Next taboos distill |
| RQ-005 | Default brand lexicon table — client-specific; runtime uses `voice.md` | Only if product ships defaults |

## Distilled (recent)

| ID | Runtime target | PR | Distilled |
|----|----------------|-----|-----------|
| RQ-001 | `arabic/references/audit-mode.md` — platform register targets | feat/research-r1-distill | 2026-07-04 |

---

### New item template

Copy into **Open** (assign next `RQ-###`):

```text
| RQ-006 | reference-gap | One-line finding | arabic/references/{file}.md | A | YYYY-MM-DD | sources: {id} |
```

**Source kind values:** `reference-gap` · `platform` · `dialect` · `competitor` · `humanization` · `seasonal` · `audit`
