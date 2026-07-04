# Golden Test R4 — validate-research.sh

Manual checklist for Research R4 (`feat/research-r4-validate`).

## G-R4-01 — Script exists and runs in CI

- [ ] `scripts/validate-research.sh` exists and is executable
- [ ] `npm run validate` invokes `validate-research.sh` after scaffold check
- [ ] `npm run validate:research` runs the script standalone

## G-R4-02 — Stale-source tiers

**Command:** `bash scripts/validate-research.sh`

**Expected (current registry):** All sources `accessed` within 90 days → exit 0, summary shows `fresh N, warn 0, fail 0`.

**Tier policy (research-monthly-cron.md):**

| Age | CI behavior |
|-----|-------------|
| ≤ 90 days | Pass (fresh) |
| 91–180 days | Pass with WARN |
| > 180 days | Fail |

## G-R4-03 — Queue cap

- [ ] Open rows in `distillation-queue.md` ≤ 20 (script fails if exceeded)

## G-R4-04 — Fixed-date smoke (optional)

```bash
RESEARCH_VALIDATE_TODAY=2026-10-05 bash scripts/validate-research.sh
```

**Expected:** Sources accessed 2026-07-04 are ~93 days old → WARN lines, exit 0.

```bash
RESEARCH_VALIDATE_TODAY=2027-01-05 bash scripts/validate-research.sh
```

**Expected:** Same sources >180 days → FAIL, exit 1.

## Validation

- [ ] `npm run validate` exits 0
- [ ] `research/README.md` marks R4 ✅
