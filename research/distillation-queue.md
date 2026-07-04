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
| — | — | — |

## Distilled (recent)

| ID | Runtime target | PR | Distilled |
|----|----------------|-----|-----------|
| — | — | — | — |

---

### New item template

Copy into **Open** (assign next `RQ-###`):

```text
| RQ-001 | reference-gap | One-line finding | arabic/references/{file}.md | A | YYYY-MM-DD | sources: {id} |
```

**Source kind values:** `reference-gap` · `platform` · `dialect` · `competitor` · `humanization` · `seasonal` · `audit`
