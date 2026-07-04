# Research monthly cron

Scheduled maintenance for the `research/` intelligence layer. Run **once per month** (or before a minor release that touches runtime ads/audit/dialect rules).

**Owner:** Product + content engineering  
**Runtime command:** `/arabic research status` then `/arabic research distill`  
**Spec:** [research-intelligence-plan.md](./research-intelligence-plan.md)

---

## Calendar (suggested)

| Week | Action |
|------|--------|
| **W1** | `/arabic research status` — stale sources, queue health |
| **W2** | Platform changelog check (Meta, Google, TikTok help centers) → update or queue |
| **W3** | Pick ≤2 open `distillation-queue.md` items → distill PR |
| **W4** | Reference gap scan on one `reference/` pack → queue or defer |

---

## Checklist (copy-ready)

```text
[ ] /arabic research status — note stale sources (>90d)
[ ] distillation-queue.md — open rows ≤ 20; finish or defer stale items
[ ] index.json matches every knowledge-base/*.md file
[ ] Pick ≤3 topics for next month (queue + platform changelogs)
[ ] Run one distill PR if open items exist (≤50 lines/runtime file + golden test)
[ ] npm run validate
[ ] CHANGELOG Unreleased — research line if runtime distilled
```

---

## Stale source policy

| Age (`accessed`) | Action |
|------------------|--------|
| ≤ 90 days | OK for runtime distill |
| 91–180 days | Re-verify URL before distill; update `accessed` |
| > 180 days | Mark KB `needs_live_verification`; do not distill until refreshed |

Automated in `scripts/validate-research.sh` (also run via `npm run validate`).

---

## Topic rotation (default)

Rotate monthly — do not run all every cycle:

1. **Platforms** — Meta / Google / TikTok specs (`research/prompts/platform-ads-research.md`)
2. **Reference gap** — next pack from [reference-distillation.md](./reference-distillation.md) priority
3. **Dialect freshness** — Masri first, then KSA/Khaliji (`dialect-freshness-audit.md`)
4. **Seasonal** — 6–8 weeks before Ramadan, Eid, White Friday (`seasonal-calendar.md`)

---

## Outputs

| Step | Artifact |
|------|----------|
| Status run | stdout summary (optional log in `.arabic/research/`) |
| Collect | `research/knowledge-base/**/*.md` + `sources.yaml` |
| Distill | Runtime PR + `tests/golden/r*-*.md` + queue row → distilled |

---

## Related

- [research/README.md](../../research/README.md)
- [Command surface](./command-surface.md) — `/arabic research` verbs
- [Versioning and releases](../engineering/versioning-and-releases.md)
