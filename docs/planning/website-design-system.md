# Website Design System (v1.1.0 / P7)

> **Spec only — no `website/` code until v1.1.0 (P7).** Defines tokens, typography, color, spacing, and motion for the Arabic-first install/tutorial site. The site is a **dogfood project**: the skill generates the Arabic copy from the repo itself.

**Status:** Planning · **Owner:** Maintainer · **Last updated:** 2026-06-30
**Phase:** [P7 Website & Distribution](./implementation-plan.md#0-canonical-phase-map--golden-tests-source-of-truth) · **Tests:** G13–G18 · **Benchmark:** [impeccable.style](https://impeccable.style/)

---

## 1. Stack (recommended)

**Next.js App Router + TypeScript** (over plain Vite React).

Justification: marketing routes benefit from file-based routing + static generation; first-class **RTL/i18n** via the App Router `dir`/`lang` per-segment; image/font optimization out of the box; trivial deploy. Vite+React is the fallback if a fully static SPA is preferred. Decision is finalized in the P7 plan, not here.

---

## 2. Design Principles

- **Arabic-first, RTL-native** — Arabic is the primary language; English is secondary. Layout mirrors correctly (`dir="rtl"`).
- **Editorial, high-contrast, calm** — impeccable.style as the bar: generous whitespace, restrained palette, confident type.
- **Motion with intent** — subtle, never decorative; respects `prefers-reduced-motion`.
- **Copy is dogfooded** — every Arabic block on the site is produced by `/arabic` from repo evidence.

---

## 3. Color Tokens

```css
/* Neutral (dark-first editorial) */
--bg:            #0B0B0F;   --bg-elev:   #141419;
--fg:            #F5F5F2;   --fg-muted:  #A1A1AA;
--border:        #26262E;

/* Brand */
--brand:         #1FB28A;   /* Arabic green-teal */
--brand-strong:  #0E8C6B;
--accent:        #E7C873;   /* warm gold for highlights */

/* Semantic */
--ok: #2FBF71;  --warn: #E0A82E;  --danger: #E5484D;
```

Light theme mirrors with inverted neutrals; brand/accent unchanged. Maintain **WCAG AA** (≥4.5:1 body, ≥3:1 large text).

---

## 4. Typography (AR + EN)

| Role | Arabic | Latin | Notes |
|------|--------|-------|-------|
| Display | **IBM Plex Sans Arabic** / Tajawal | General Sans / Inter | Headlines, hero |
| Body | **IBM Plex Sans Arabic** | Inter | 16–18px base, line-height 1.8 for Arabic |
| Mono | — | JetBrains Mono | Install/command blocks (LTR even in RTL pages) |

- Arabic line-height is looser (1.7–1.9) than Latin (1.4–1.6).
- Numerals: default Western digits in code/version; allow Eastern-Arabic in prose where natural.
- `font-display: swap`; subset Arabic + Latin ranges.

### Type scale (rem)

`0.875 · 1 · 1.125 · 1.25 · 1.5 · 2 · 2.75 · 3.75` — clamp display sizes for mobile.

---

## 5. Spacing, Radius, Shadow

```css
/* 4px base scale */
--space: 4,8,12,16,24,32,48,64,96,128;  /* px steps */
--radius-sm: 8px;  --radius-md: 14px;  --radius-lg: 24px;
--shadow-1: 0 1px 2px rgba(0,0,0,.4);
--shadow-2: 0 8px 30px rgba(0,0,0,.35);
--container-max: 1200px;  --reading-max: 68ch;
```

---

## 6. Motion

| Token | Value | Use |
|-------|-------|-----|
| `--ease` | `cubic-bezier(.22,1,.36,1)` | default |
| `--dur-fast` | 150ms | hovers, taps |
| `--dur-base` | 280ms | enter/exit |
| `--dur-slow` | 600ms | hero, scroll reveals |

All motion gated behind `@media (prefers-reduced-motion: reduce)` → fall back to opacity-only or none.

---

## 7. Component Inventory (behavior specs)

| Component | Behavior |
|-----------|----------|
| Animated hero + dialect switcher preview | Cycles dialect samples (masri/khaliji/levantine); RTL-correct; pauses on reduced-motion |
| Mode flow diagram (interactive) | `guide → clarify → recommend → write → review` steps expand on hover/tap |
| Copy-to-clipboard install blocks | One-click copy; LTR mono; toast confirm |
| Tabbed snippets | bash / Cursor / Claude tabs; keyboard-navigable |
| Before/after humanization cards | Toggle MSA-bleed vs humanized; highlight diffs |
| Feature bento grid | Motion on scroll-in; collapses to 1-col mobile |
| RTL Arabic typography showcase | Demonstrates scale, line-height, mixed AR/EN |
| Command palette demo (static) | Non-functional visual of `/arabic` verbs |

---

## 8. Routes (min) → golden tests

`/` · `/features` · `/install` · `/commands` · `/tutorials` · `/examples` · `/about` · `/docs` (8 routes — see [website-dogfood.md](./website-dogfood.md)).

| Test | Gate |
|------|------|
| G13 routes render (8) · G14 install copy matches README · G15 3+ interactive components on mobile | v1.1.0 |
| G16 Masri + MSA blocks pass audit · G17 `npm run build` · G18 deploy preview URL | v1.1.0 |

---

## 9. Content Workflow

```
Scan repo → discuss audience → sitemap → per-page Arabic brief → /arabic writes copy → apply design system → React build → QA (G16) → deploy (G18)
```

---

## 10. Global footer (dogfood transparency — choice D)

Every route renders `SiteFooter` with Masri copy from [`website/content/footer.md`](../../website/content/footer.md).

| Fragment | Link / element |
|----------|----------------|
| Lead | `اتبنى بـ` + `<code dir="ltr">/arabic</code>` |
| About | `إزاي اتبنى؟` → `/about` |
| GitHub | `https://github.com/mediabubble-adv/arabic-skill` |
| Docs | `الوثائق` → `/docs` |

**Cross-links (spec §4.5):**

| Route | Dogfood touchpoint |
|-------|-------------------|
| `/` | Footer only — no case-study hero |
| `/install` | Trust strip → `/about` (§4.3) |
| `/examples` | Card tag → `/about` |
| `/tutorials` | Closing link → `/about` |
| `/about` | Full command trail + G16 frozen snapshot |

**Install familiarity fork:** `/install` splits **أنا مطور** vs **أول مرة** — see [website-dogfood.md §3.1](./website-dogfood.md#31-dogfood-transparency-choice-d) and [design spec §4.3](../superpowers/specs/2026-07-03-website-marketing-dogfood-design.md).

---

## 11. Related

- [Roadmap P7](./roadmap.md) · [Implementation Plan §0](./implementation-plan.md#0-canonical-phase-map--golden-tests-source-of-truth) · [Command Surface](./command-surface.md)
