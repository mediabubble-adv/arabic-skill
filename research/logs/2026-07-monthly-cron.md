# Research monthly cron — July 2026

**Run date:** 2026-07-05  
**Owner:** Product + content engineering  
**Spec:** [research-monthly-cron.md](../../docs/planning/research-monthly-cron.md)

---

## W1 — Status

```text
## Research status — 2026-07-05
**KB topics:** 4 (collected: 0, curated: 3, distilled: 1, deferred: 0)
**Queue:** open 0 · in-progress 0 · deferred 5
**Orphans:** NONE — index.json ↔ knowledge-base in sync (validate-research-scaffold)
**Stale sources:** CLEAN — 8/8 sources accessed 2026-07-04 (≤90d)
**Next suggested:** reference-gap rotation (masri + seo-aeo-masri)
```

Checklist:

- [x] `/arabic research status` — stale sources: **CLEAN**
- [x] `distillation-queue.md` — open rows **0** (≤20 cap)
- [x] `index.json` matches every `knowledge-base/*.md` file
- [x] `npm run validate` — passed at run time

---

## W2 — Platform changelog check

Spot-check of registered Tier A URLs (HTTP HEAD via curl):

| Source ID | URL | Status |
|-----------|-----|--------|
| `meta-text-best-practices-2026` | facebook.com/business/help/223409425500940 | 200 OK |
| `google-rsa-specs-2026` | support.google.com/google-ads/answer/7684791 | 200 OK |
| `tiktok-infeed-specs-2026` | ads.tiktok.com/help/article/tiktok-auction-in-feed-ads | 200 OK |

**Action:** No spec drift queued — re-run full platform sweep before August distill if Meta/Google/TikTok release notes move.

---

## W3 — Distill PR

No open queue items at W1 start → **skipped**. Three items queued below for August W3.

---

## W4 — Reference gap scan

**Pack:** `reference/arabic-masri/` vs `arabic/dialects/masri.md`  
**Secondary:** `reference/arabic-seo-optimizer/` vs `arabic/references/seo-aeo-masri.md`

| ID | Finding | Target | Action |
|----|---------|--------|--------|
| **RQ-010** | Egypt platform caption limits + posting windows + hashtag counts | `dialects/masri.md` §5 | **Open** — distill next |
| **RQ-011** | L4 business address titles (حضرتك/أستاذ/باشا/مهندس) | `dialects/masri.md` §13 | **Open** — distill next |
| **RQ-012** | Masri grammar error quick-check | `dialects/masri.md` | **Deferred** — overlaps RQ-002 |
| **RQ-013** | Masri spelling variants table for long-tail SEO | `references/seo-aeo-masri.md` §2 | **Open** — distill next |

---

## Next month (August 2026)

1. **Distill PR:** RQ-010 + RQ-013 (≤2 items per cron W3 rule)
2. **Optional:** RQ-011 if masri line budget allows after consolidation
3. **Rotation:** Dialect freshness audit (`dialect-freshness-audit.md`) on masri register drift
4. **Platform:** Full Meta/Google/TikTok changelog pass before next ads-matrix distill

---

## Artifacts updated this run

- `research/distillation-queue.md` — RQ-010, RQ-011, RQ-013 open; RQ-012 deferred
- `research/index.json` — `updated` field
- `research/logs/2026-07-monthly-cron.md` — this file
