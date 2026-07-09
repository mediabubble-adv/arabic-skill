# Design Spec: Full Site Redesign — Masri RTL Unification

> **Status:** Approved (plan execution)  
> **Branch:** `feat/website-full-redesign`  
> **Gates:** G13–G18 preserved · G14 byte-match unchanged

## 1. Summary

Unify all public marketing routes under one **dark-first RTL design system** with optional light theme. Page chrome is **مصري أولاً**; blog article bodies may remain English where technical. Install funnel and dogfood transparency (choice D) unchanged in function.

## 2. Route map

| Route | Chrome | Body |
|-------|--------|------|
| `/` … `/docs` (core 8) | Masri | Masri |
| `/blog` | Masri | Masri index; post titles Masri in metadata where added |
| `/blog/posts/[slug]` | Masri shell | MDX (EN or AR) via `.prose-site` |
| `/newsletter` | Masri | Masri + Latin email fields |
| `/privacy`, `/terms` | Masri | Masri prose |

## 3. Section inventory (image comps)

See [`docs/planning/website-redesign-comps/INDEX.md`](../../planning/website-redesign-comps/INDEX.md).

## 4. Component deltas

| Component | Change |
|-----------|--------|
| `pill-tabs.tsx` | New — shared ARIA tablist |
| `theme-toggle.tsx` | New — `data-theme` on `<html>` |
| `stat-strip.tsx` | New — home trust strip |
| `before-after-card.tsx` | Desktop side-by-side + mobile PillTabs; default **بعد** |
| `sticky-install-bar.tsx` | Dismiss, copy CTA, `data-testid` hooks |
| `mode-flow.tsx` | PillTabs + `aria-label` |
| `site-header.tsx` | Theme toggle, blog nav, skip target |
| `site-footer.tsx` | Masri columns + G16 SSOT row |
| `page-shell.tsx` | Skip link, `id="main"` |

## 5. Gate impact

| Gate | Impact |
|------|--------|
| G13 | Unchanged (8 routes) |
| G14 | No install string changes |
| G15 | Update selectors: tablist testids, sticky bar testids, before/after default **بعد** |
| G16 | Footer must keep `اتبنى بـ`, `/arabic`, `إزاي اتبنى؟`, GitHub, `الوثائق` |
| G17 | `npm run build` |
| G18 | Unchanged |

## 6. Non-goals

- CMS, user accounts, live skill demo, English mirror site, G13 expansion to blog
