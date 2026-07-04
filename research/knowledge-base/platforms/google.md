---
topic: google-ads-specs
last_reviewed: 2026-07-04
trust_tier: A
sources:
  - google-rsa-specs-2026
  - google-search-campaign-specs-2026
runtime_targets:
  - arabic/references/ads-service-matrix.md
status: curated
---

# Google Ads — search & display specs

**Market default:** Egypt / Masri-first with MSA-leaning search queries.  
**Runtime distill target:** `arabic/references/ads-service-matrix.md` § Google Search / Display.

## Responsive Search Ads (RSA) — official limits

| Asset | Max count | Character limit |
|-------|-----------|-----------------|
| Headlines | **15** (min 3 to serve well) | **30 each** |
| Descriptions | **4** | **90 each** |
| Display path | 2 fields | **15 each** |
| Final URL | 1 | 2,048 |

Source: [About responsive search ads](https://support.google.com/google-ads/answer/7684791) · [Search campaign specs](https://support.google.com/google-ads/answer/17092074)

**Pinning:** Pin only legal disclaimers or must-show offers to position 1. Over-pinning hurts Ad Strength.

## Display / Demand Gen (summary)

| Asset | Limit |
|-------|-------|
| Short headline | 30 |
| Long headline | 90 |
| Description | 90 |

Responsive display may show **without** description text — long headline must stand alone.

## Arabic / Egypt notes

- **Query language split:** Egyptian users often search in MSA or mixed forms on mobile keyboards — mirror query literally in Headline 1. See `arabic/references/seo-aeo-masri.md`.
- **Register:** L3–L4 for Search; action + reassurance in description ("احجز دلوقتي — زيارة في نفس اليوم").
- **Character counting:** Arabic is not double-width like CJK, but wide glyphs + diacritics can cause visual truncation before the 30-char API limit — keep headlines short.
- **Keywords >30 chars:** Move full phrase to the 90-char description field (Google best practice).

## Gaps vs runtime

| Gap | Queue |
|-----|-------|
| Display path fields (15 chars) not in matrix | **Closed** — in Google Search §2 |
| Demand Gen long-headline standalone rule | **Distilled RQ-008** |
| RSA pinning guidance | deferred — advisory only |

## Distill candidates

- Add path field row to Google Search §2
- Note Demand Gen "description may not show" under Display section
