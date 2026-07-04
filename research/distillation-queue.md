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
| RQ-007 | platform | Meta placement-specific limits (Reels 72, FB headline 27) | `ads-service-matrix.md` § Meta | A | 2026-07-04 | sources: meta-text-best-practices-2026 |
| RQ-008 | platform | Google Demand Gen long-headline standalone rule | `ads-service-matrix.md` § Display | A | 2026-07-04 | sources: google-rsa-specs-2026 |

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
| RQ-009 | Meta carousel intro-card Reels exclusion | niche format |

## Distilled (recent)

| ID | Runtime target | PR | Distilled |
|----|----------------|-----|-----------|
| RQ-001 | `arabic/references/audit-mode.md` — platform register targets | feat/research-r1-distill | 2026-07-04 |
| RQ-006 | `arabic/references/ads-service-matrix.md` — TikTok RTL safe zones, Spark caption rules, official limits | feat/research-r2-platforms | 2026-07-04 |

---

### New item template

Copy into **Open** (assign next `RQ-###`):

```text
| RQ-010 | platform | One-line finding | arabic/references/{file}.md | A | YYYY-MM-DD | sources: {id} |
```

**Source kind values:** `reference-gap` · `platform` · `dialect` · `competitor` · `humanization` · `seasonal` · `audit`
