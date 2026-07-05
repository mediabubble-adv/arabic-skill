# Golden Test RQ-013 — Masri SEO long-tail forms distill

Manual checklist for reference-gap distill `feat/research-rq013-distill`.

**Source:** `reference/arabic-seo-optimizer/reference/keyword-research.md` § Egyptian Spelling Variations  
**Runtime:** `arabic/references/seo-aeo-masri.md` §2

## G-RQ013-01 — Runtime slice present

- [ ] `arabic/references/seo-aeo-masri.md` §2 includes orthographic variants + Masri equivalents tables
- [ ] Orthographic table covers إزاي/ازاي, إمتى/امتى, إيه/ايه
- [ ] Equivalents table covers فين, عايز/عاوز, كويس, حلو (not نضيف for جميل)
- [ ] Guidance distinguishes spelling variants vs word-choice equivalents

## G-RQ013-02 — Write task behavior

**Command:** `/arabic write seo` for an Egypt-targeted AC buying guide with FAQ block.

**Expected:** FAQ questions use Masri long-tail forms (e.g. إزاي، عايز، كويس) from `arabic/references/seo-aeo-masri.md` §2 while title/H1 stays MSA-leaning per dual-register rule.

**Command:** `/arabic aeo` for the same topic.

**Expected:** AEO answers include Masri equivalent coverage — not MSA-only FAQ phrasing.

## G-RQ013-03 — Queue state

- [ ] `research/distillation-queue.md` — RQ-013 in **In progress** until PR merges; then **Distilled (recent)** only

## Validation

- [ ] `npm run validate` exits 0
