---
topic: meta-ads-specs
last_reviewed: 2026-07-04
trust_tier: A
sources:
  - meta-text-best-practices-2026
  - meta-lead-ads-specs-2026
  - meta-ads-guide-2026
runtime_targets:
  - arabic/references/ads-service-matrix.md
status: curated
---

# Meta (Facebook & Instagram) — ad specs

**Market default:** Egypt / Masri-first (L2–L3).  
**Runtime distill target:** `arabic/references/ads-service-matrix.md` § Meta.

## Official text limits (Tier A)

| Field | Recommended | Notes |
|-------|-------------|-------|
| Primary text | **125 characters** | 1–3 lines; longer copy truncates by placement/device |
| Headline | **40 characters** | May truncate further on mobile feed |
| Description | **25–30 characters** | Often hidden on mobile; treat as optional |

Source: [Creative best practices for text in ads](https://www.facebook.com/business/help/223409425500940) · [Lead ads instant form specs](https://www.facebook.com/business/help/908491205873167)

## Placement-aware practical limits

| Placement | Primary text (visible) | Headline | Description |
|-----------|------------------------|----------|-------------|
| Facebook / Instagram Feed | ~125 before "عرض المزيد" | 27–40 | 25–30 (often hidden mobile) |
| Stories / Reels overlay | ~72 shorter overlay | Often N/A | N/A |
| Marketplace / Search | 125 | 40 | 30 |

**Production rule:** Write for the *shortest* placement in the ad set. Front-load hook + offer in the first line.

## Key formats (paid)

- Feed image/video, Reels, Stories, Carousel, Collection
- Click-to-WhatsApp (high conversion for Egyptian SMEs)
- Lead ads with Instant Form

Full creative specs: [Meta Ads Guide](https://www.facebook.com/business/ads-guide/update)

## Arabic / RTL notes (Egypt)

- **Glyph width:** Arabic renders wider than Latin — treat headline budget as ~20–25 Latin-equivalent chars for safe display.
- **Truncation direction:** Hook must survive mobile "see more" — meaning in the **first 80–100 Arabic chars**, not the end of the line.
- **Register:** L2–L3 Masri for feed; Reels may use L2; avoid L1 in comments-heavy Facebook posts (older skew).
- **Trust signals:** COD reassurance, WhatsApp handoff, local proof (من القاهرة، توصيل لكل المحافظات).
- **Comments as sales:** Write primary text to invite questions — Egyptian users negotiate in comments.

## Gaps vs runtime (`ads-service-matrix.md`)

| Gap | Queue |
|-----|-------|
| Placement-specific headline (27 FB vs 40 IG) | RQ-007 open |
| Reels ~72-char overlay limit called out explicitly | RQ-007 open |
| Carousel intro-card Reels exclusion | deferred — niche |

## Distill candidates

- Pin placement table row for Reels primary ≤72 chars
- Add Arabic glyph-width note to Meta §2 (partial overlap exists)
