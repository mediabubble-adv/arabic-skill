# Golden Test RQ-010 — Masri platform specs distill

Manual checklist for reference-gap distill `feat/research-rq010-distill`.

**Source:** `reference/arabic-masri/reference/platform-specs.md`  
**Runtime:** `arabic/dialects/masri.md` §5

## G-RQ010-01 — Runtime slice present

- [ ] `masri.md` §5 includes caption length table (Optimal + Max per platform)
- [ ] §5 includes hashtag count table (Instagram, Facebook, LinkedIn, TikTok)
- [ ] §5 includes Egypt posting windows (UTC+2/+3)
- [ ] Arabic ~35% length note appears in caption section

## G-RQ010-02 — Write task behavior

**Command:** `/arabic write instagram` for an Egyptian lifestyle product caption.

**Expected:** Agent respects 50–150 char optimal band and 5–10 hashtag guidance from `dialects/masri.md` §5 without loading full `reference/arabic-masri/`.

**Command:** `/arabic write tiktok` for the same brief.

**Expected:** Agent targets 20–50 char caption band and 3–5 hashtags from §5.

## G-RQ010-03 — Queue closed

- [ ] `research/distillation-queue.md` — RQ-010 moved to **Distilled (recent)**; not in Open

## Validation

- [ ] `npm run validate` exits 0
