# Golden Test R3 — `/arabic research` command wiring

Manual checklist for Research R3 (`feat/research-r3-command`).

## G-R3-01 — Runtime file exists and is indexed

- [ ] `arabic/references/research-mode.md` exists
- [ ] Listed in `arabic/references/INDEX.md` under References
- [ ] `load-discipline.md` has `research` task class

## G-R3-02 — `/arabic research status`

**Command:** `/arabic research status`

**Expected:**
- Summarizes `research/index.json` topic counts by status
- Reports open/deferred rows from `distillation-queue.md`
- Flags sources with `accessed` > 90 days as stale (or reports CLEAN)
- Suggests 1–3 next topics

## G-R3-03 — `/arabic research distill`

**Command:** `/arabic research distill`

**Expected:**
- Reads open queue rows (RQ-007, RQ-008)
- Outputs distill plan with target file, ≤50 line budget, golden test path
- Does **not** silently edit `arabic/` without user approval

## G-R3-04 — `/arabic research <topic>`

**Command:** `/arabic research reference-gap arabic-seo`

**Expected:**
- Loads `research-mode.md` + `research/prompts/reference-gap-scan.md`
- Proposes KB path + queue row format
- Cites `research/sources/sources.yaml` registration step

## G-R3-05 — Monthly cron doc

- [ ] `docs/planning/research-monthly-cron.md` exists and links from `research/README.md`

## Validation

- [ ] `npm run validate` exits 0
- [ ] `SKILL.md` Mode Router includes Research row
