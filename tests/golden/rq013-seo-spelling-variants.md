# Golden Test RQ-013 — Masri SEO spelling variants distill

Manual checklist for reference-gap distill `feat/research-rq013-distill`.

**Source:** `reference/arabic-seo-optimizer/reference/keyword-research.md` § Egyptian Spelling Variations  
**Runtime:** `arabic/references/seo-aeo-masri.md` §2

## G-RQ013-01 — Runtime slice present

- [ ] `arabic/references/seo-aeo-masri.md` §2 includes Masri spelling variants table
- [ ] Table covers إزاي/ازاي, عايز/عاوز, كويس, فين, إمتى/امتى
- [ ] Guidance: cover both MSA and Masri in H2/FAQ (not title-only)

## G-RQ013-02 — Write task behavior

**Command:** `/arabic write seo` for an Egypt-targeted AC buying guide with FAQ block.

**Expected:** FAQ questions use Masri long-tail forms (e.g. إزاي، عايز، كويس) from `arabic/references/seo-aeo-masri.md` §2 while title/H1 stays MSA-leaning per dual-register rule.

**Command:** `/arabic aeo` for the same topic.

**Expected:** AEO answers include spelling-variant coverage — not MSA-only FAQ phrasing.

## G-RQ013-03 — Queue closed

- [ ] `research/distillation-queue.md` — RQ-013 moved to **Distilled (recent)**; Open queue empty

## Validation

- [ ] `npm run validate` exits 0
