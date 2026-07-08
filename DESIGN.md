---
name: Awesome Arabic Skill — Marketing Site
description: Dark-first Masri RTL marketing site for Arabic content creation skill
colors:
  bg: "#0b0b0f"
  bg-elev: "#141419"
  fg: "#f5f5f2"
  fg-muted: "#a1a1aa"
  border: "#26262e"
  brand: "#1fb28a"
  brand-strong: "#0e8c6b"
  accent: "#e7c873"
  ok: "#2fbf71"
  warn: "#e0a82e"
  danger: "#e5484d"
  bg-light: "#f5f5f0"
  fg-light: "#121214"
typography:
  display:
    fontFamily: "Almarai, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.8vw, 2.85rem)"
    fontWeight: 700
    lineHeight: 1.35
  body:
    fontFamily: "Almarai, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.8
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "8px"
  md: "14px"
  lg: "24px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.bg}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.fg}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.bg-elev}"
    textColor: "{colors.fg}"
    rounded: "{rounded.md}"
    padding: "24px"
---

## Overview

Next.js App Router marketing site. **Dark-first** editorial RTL shell with optional light theme (`data-theme` on `<html>`). Color strategy: **Committed** — brand teal `#1FB28A` on dark neutrals; gold accent `#E7C873` sparingly for emphasis. Scene: Egyptian creator evaluating a dev tool at night on a laptop — dim ambient, focused mood.

Tokens live in `website/app/globals.css`. Components in `website/components/`. Copy SSOT in `website/content/`.

## Colors

Neutrals are tinted dark editorial (`#0B0B0F` / `#141419`), never pure black. Brand green-teal carries CTAs, links, active tabs. Accent gold for positioning lock and highlights only.

Light theme inverts neutrals; brand shifts to `#0E8C6B` for contrast. Hero uses radial `hero-gradient` (brand at 8–12% mix), not full-bleed color wash.

Canonical OKLCH migration is a future polish; hex values above match shipped CSS.

## Typography

**Almarai** for all Arabic UI. **JetBrains Mono** for install commands and code (always `dir="ltr"`). Display hierarchy via scale + weight (≥1.25 ratio): hero two-line title, section heads `text-xl`/`text-2xl`, body `text-base` with `line-height: 1.8` for Arabic.

Reading measure capped at `--reading-max: 68ch`. Prose in `.prose-site` for legal bodies.

## Elevation

Minimal shadow system. Depth via `bg-elev` cards, `border` outlines, and hero gradient — not drop shadows. Sticky header uses `backdrop-blur-sm` + semi-transparent bg (purposeful, not decorative glass).

## Components

| Pattern | Usage |
|---------|--------|
| `PageShell` | Skip link, header, main, footer on every route |
| `CopyBlock` | Install command as designed artifact |
| `PillTabs` | Mobile before/after, mode flow, tool tabs |
| `StatStrip` | Home trust strip (version, tools, MIT, `/arabic`) |
| `StickyInstallBar` | Mobile-only post-scroll install CTA |
| `btn-primary` / `btn-secondary` | Global CTA classes |
| `card` | Bento, FAQ — not nested |
| `bento-grid` | Asymmetric 2-span tile on home |

## Do's and Don'ts

**Do:** Masri page chrome; centered hero with full-bleed keyboard illustration; short install snippet in hero (`install` without `--target`); G14 full target copy only on `/install`; respect G16 contracts; stagger motion with `--ease` and reduced-motion fallback.

**Don't:** Gradient text; side-stripe borders; identical icon+heading+card grids; English nav on Masri routes; hero-metric template; modal-first patterns; pure `#000`/`#fff`; change G14 install strings; nested cards in before/after.
