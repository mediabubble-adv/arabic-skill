# Golden Test R2 — Platform KB (Meta, Google, TikTok)

Manual checklist for Research R2 (`feat/research-r2-platforms`).

## G-R2-01 — KB files exist with frontmatter

- [ ] `research/knowledge-base/platforms/meta.md`
- [ ] `research/knowledge-base/platforms/google.md`
- [ ] `research/knowledge-base/platforms/tiktok.md`
- [ ] Each has `topic`, `last_reviewed`, `trust_tier`, `sources[]`, `runtime_targets[]`

## G-R2-02 — Official sources registered

- [ ] `research/sources/sources.yaml` includes Meta, Google, TikTok Tier A URLs
- [ ] `research/index.json` lists all three platform KB entries

## G-R2-03 — TikTok Arabic distill in runtime

**Command:** `/arabic write tiktok` for an Egyptian product brief.

**Expected:** Agent cites RTL safe-zone requirement and Spark caption immutability from `ads-service-matrix.md` § TikTok without loading full KB file.

## G-R2-04 — Google RSA limits

**Command:** `/arabic write google` with a Cairo service query.

**Expected:** Headlines ≤30 chars, descriptions ≤90, path fields mentioned if relevant.

## G-R2-05 — Meta placement limits

**Command:** `/arabic write meta` for a Reels + Feed ad set.

**Expected:** Agent cites Reels overlay ≤~72 chars and FB Feed headline ~27 truncation from `ads-service-matrix.md` § Meta placement table.

## G-R2-06 — Demand Gen standalone headline

**Command:** `/arabic write google` for a Display / Demand Gen retargeting brief.

**Expected:** Agent warns long headline (90) must work alone when description may not show, from `ads-service-matrix.md` § Google Display / Demand Gen.

## Validation

- [ ] `npm run validate` exits 0
- [ ] `research/distillation-queue.md` shows RQ-006–008 distilled; open queue empty
