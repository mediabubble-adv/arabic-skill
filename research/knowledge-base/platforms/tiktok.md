---
topic: tiktok-ads-specs
last_reviewed: 2026-07-04
trust_tier: A
sources:
  - tiktok-infeed-specs-2026
  - tiktok-topview-specs-2026
runtime_targets:
  - arabic/references/ads-service-matrix.md
status: curated
---

# TikTok — in-feed & Spark ad specs

**Market default:** Egypt / Masri-first (L1–L2).  
**Runtime distill target:** `arabic/references/ads-service-matrix.md` § TikTok.

## Official video specs (auction in-feed)

| Spec | Value |
|------|-------|
| Aspect ratio | **9:16** recommended; also 1:1, 16:9 |
| Min resolution | 540×960 (9:16) |
| Duration | Up to 10 min auction; **9–15s recommended** |
| Formats | .mp4, .mov, .mpeg, .3gp, .avi |
| Max file size | 500 MB |
| Min bitrate | 516 kbps (in-feed) |

Source: [TikTok Auction In-Feed Ads](https://ads.tiktok.com/help/article/video-ads-specifications)

## Caption & account text

| Element | Limit | Display |
|---------|-------|---------|
| Ad caption (Non-Spark) | **100 characters** | White system font; no @, hashtags, or links in caption |
| Visible lines | **4 lines max** | Then "See more" |
| Account name | **20 characters** (non-CJK) | 10 chars CJK |
| Spark Ads caption | From organic post | **Not editable** in Ads Manager; fix before authorization |

Source: [TopView ad specifications](https://ads.tiktok.com/help/article/tiktok-reservation-topview) (caption rules shared across in-feed)

**Production rule:** Keep caption to **1 line (~30–40 chars)** — long captions shrink the visible safe zone over the video.

## Spark vs Non-Spark

| Type | Caption | Creative |
|------|---------|----------|
| **Spark (Pull)** | Organic post caption, up to 4 lines + emojis | Boost authorized organic video |
| **Non-Spark** | Set in Ads Manager, 100 chars max | Upload net-new creative |

Spark: ~30% higher completion when native-feeling (third-party benchmarks — treat as directional).

## Arabic / RTL safe zones

TikTok publishes **separate safe-zone templates for Arabic (RTL)** vs standard LTR:

- Download: **In-Feed — Arabic Version RTL** from the in-feed specs help article
- Anchor variants: **In Feed with Anchor — Arabic Version RTL**
- All non-Arabic regions use LTR templates; **Egypt campaigns must use RTL packs**

Overlay stack (profile, CTA, caption) sits on the **bottom** — place hooks and on-screen text in the upper safe band. Caption length directly reduces visible creative area.

## Egypt / Masri creative notes

- **Register:** L1–L2; polished brand voice = scroll-past
- **Hook:** First 2 seconds, face + claim; verbal CTA ("اطلب من اللينك")
- **Sound:** Trending audio + Egyptian humor outperform silent logo slates
- **CTA:** Platform button + verbal repeat; don't rely on caption links (not supported)

## Gaps vs runtime

| Gap | Status |
|-----|--------|
| RTL safe-zone template requirement | **Distilled RQ-006** → `ads-service-matrix.md` |
| 4-line caption display limit | RQ-006 |
| Spark caption immutability | RQ-006 |
| Non-Spark caption ban on @/#/links | RQ-006 |
