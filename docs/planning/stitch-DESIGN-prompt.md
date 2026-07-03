# Stitch DESIGN.md Prompt — Awesome Arabic Skill

> **Skill:** `/stitch-design-taste` · **Output:** `DESIGN.md` for Google Stitch  
> **Hero signature:** **B** — abstract Arabic typographic composition (no inline photos)  
> **Register:** مصري طبيعي كامل · **Copy source:** [stitch-website-prompts-masri.md](./stitch-website-prompts-masri.md)  
> **Tokens:** [website-design-system.md](./website-design-system.md)

---

## How to use

1. Copy the prompt block below into a chat running **stitch-design-taste** (or use the pre-generated file).
2. Output is saved at **[stitch-DESIGN.md](./stitch-DESIGN.md)** — paste that into Stitch as project context.
3. Generate each page using section 4 of [stitch-website-prompts-masri.md](./stitch-website-prompts-masri.md).

---

## Prompt (copy from here)

```markdown
Generate a complete DESIGN.md for Google Stitch screen generation.

## Project
**Awesome Arabic Skill** (`arabic`) — MediaBubble product. Arabic-first RTL marketing + install + tutorial website (v1.1.0). Natural Egyptian Arabic (Masri) for ALL UI copy. NOT a translation tool. User flow: guide → clarify → recommend → write → review.

## Taste spectrum (enforce strictly)
- Density: 4/10 — gallery-airy, generous whitespace, editorial calm
- Variance: 8/10 — asymmetric layouts, offset grids, split heroes — NO centered heroes
- Motion: 6/10 — spring physics, staggered reveals, subtle perpetual micro-loops on interactive demos

## Benchmark
impeccable.style bar + dark editorial dev-tool marketing. Anti-AI-slop. No purple/neon AI aesthetic.

## Locked color tokens (semantic name + hex + role)
- **Void Canvas** (#0B0B0F) — page background (never pure #000000)
- **Elevated Slate** (#141419) — cards, code blocks, panels
- **Warm Paper** (#F5F5F2) — primary Arabic text
- **Muted Zinc** (#A1A1AA) — secondary, captions
- **Structural Line** (#26262E) — 1px borders, dividers
- **Arabic Teal** (#1FB28A) — SINGLE primary accent: CTAs, links, focus rings (saturation <80%)
- **Warm Gold** (#E7C873) — highlight ONLY: dialect tags, diff highlights, typographic accents (not a second CTA color)
- **Success** (#2FBF71) · **Warning** (#E0A82E) · **Danger** (#E5484D) — semantic states only

## Typography
- **Arabic display + body:** IBM Plex Sans Arabic — body line-height 1.8, max ~68ch reading width
- **Latin UI:** Satoshi — English tool names, nav labels where Latin appears
- **Mono (always LTR):** JetBrains Mono — install commands, `/arabic` snippets, versions
- **Scale (rem):** 0.875 · 1 · 1.125 · 1.25 · 1.5 · 2 · 2.75 · 3.75 — clamp display on mobile
- **Display hierarchy:** weight and color over oversized type — track-tight headlines
- **BANNED:** Inter, generic serif (Times, Georgia, Garamond), gradient text on large headlines, emojis

## RTL rules (non-negotiable)
- `dir="rtl"` · `lang="ar"` for all page chrome
- Code/command blocks stay LTR in isolated elevated panels
- Mode flow diagram mirrors RTL: استشارة → توضيح → توصية → كتابة → مراجعة
- Nav labels (Masri): المميزات · التثبيت · الأمثلة · الأوامر · عن المهارة

## Hero signature — Option B: Abstract typographic composition

**Do NOT use inline photos between headline words.** No stock photography. No robot/AI mascots.

Instead, build the hero visual from **abstract Arabic letterform composition**:
- Large deconstructed Arabic glyphs (ع · ر · ب · ي) or word fragments as graphic shapes — cropped, rotated slightly, layered with clear spatial separation (NO overlapping readable text)
- Color: Warm Paper letterforms on Void Canvas, with Arabic Teal and Warm Gold as accent strokes, underlines, or dot diacritic highlights
- Feel: editorial print poster meets dev-tool precision — cultural, not clipart
- Layout: asymmetric RTL split — copy block weighted to the start (right in RTL), typographic composition occupies the opposite zone with generous negative space between zones
- Headline (Masri): «شريكك المصري لكتابة المحتوى جوه أدوات الذكاء الاصطناعي»
- Subhead: «بيقرأ السياق، يوضّح الفكرة، يوصي بالاتجاه، يكتب، ويراجع — قبل ما يسلّم. مش ترجمة.»
- ONE primary CTA only: «ثبّت المهارة» — Arabic Teal fill, tactile -1px active state
- NO secondary "Learn more". NO scroll chevrons. NO "Scroll to explore"
- Below headline: dialect switcher pills (مصري · خليجي · شامي) crossfading sample caption text — preview only; site chrome stays Masri

Optional subtle motion on letterform composition: slow float or shimmer on gold accent strokes only — respect prefers-reduced-motion.

## Component inventory (shape, shadow, interaction)

| Component | Spec |
|-----------|------|
| Sticky RTL header | Logo right, nav center-right, CTA left; collapses to hamburger <768px |
| Primary button | Flat teal, no glow, 44px min height, -1px translateY on active |
| Install block | Elevated Slate panel, LTR JetBrains Mono, copy icon, toast «تم النسخ» |
| Tabbed snippets | bash / Cursor / Claude — keyboard-navigable, teal active underline |
| Before/after cards | Toggle or split — stiff MSA vs natural Masri; gold diff highlights |
| Bento grid | 2-column asymmetric zig-zag — NEVER 3 equal horizontal cards |
| Mode flow stepper | 5 nodes RTL; expand detail on hover/tap |
| Dialect switcher | Pill tabs, crossfade text, pauses on reduced-motion |
| Tool logo strip | Muted row: Cursor, Claude, Codex, ChatGPT, Gemini, Qwen, Windsurf, VS Code |
| Command palette mock | Static search + `/arabic` verb list for /commands page |
| Loaders | Skeletal shimmer matching layout dimensions — no circular spinners |
| Cards | radius 14–24px, shadow 0 8px 30px rgba(0,0,0,.35); use only when elevation signals hierarchy |

## Layout
- Container max 1200px centered
- Section vertical gaps: clamp(3rem, 8vw, 6rem)
- Spacing scale (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
- CSS Grid over flexbox percentage hacks. No overlapping absolute text stacks.
- Single column collapse <768px. No horizontal scroll on mobile.
- Full-height sections: min-h 100dvh — not h-screen

## Motion
- Spring physics default: stiffness 100, damping 20 — no linear easing on interactive elements
- Ease fallback: cubic-bezier(.22,1,.36,1)
- Duration: 150ms hover · 280ms enter/exit · 600ms hero reveal
- Staggered cascade on bento items and logo strip
- Animate transform and opacity only — never top/left/width/height
- @media (prefers-reduced-motion: reduce) → opacity-only or static

## Pages (8 screens this system must support)
/ Home · /features · /install · /commands · /tutorials · /examples · /about · /docs

Install command (always LTR):
npx @mediabubble-adv/arabic-skill install --target cursor

## Anti-patterns (encode as NEVER DO)
No emojis. No Inter. No #000000. No neon outer glows. No purple/blue AI buttons. No 3-column equal feature cards. No centered heroes. No overlapping readable text on visuals. No inline stock photos in headlines. No "Elevate / Seamless / Unleash / Next-Gen". No fake stats (99.99%). No John Doe / Acme. No broken Unsplash — picsum.photos or SVG only. No custom cursors. No filler scroll UI.

## Output format
Produce DESIGN.md using the exact 7-section structure:
1. Visual Theme & Atmosphere
2. Color Palette & Roles
3. Typography Rules
4. Component Stylings
5. Layout Principles
6. Motion & Interaction
7. Anti-Patterns (Banned)

Be descriptive, opinionated, and precise. Every color entry: descriptive name + hex + functional role. Translate any Tailwind shorthand into natural language for Stitch.
```

---

## Hero B — visual reference (for Stitch)

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]          المميزات · التثبيت · الأمثلة    [ثبّت المهارة] │
├──────────────────────────────┬──────────────────────────────┤
│                              │                              │
│   شريكك المصري لكتابة         │     ╭──╮                     │
│   المحتوى جوه أدوات           │    │ ع │  ← large abstract    │
│   الذكاء الاصطناعي            │     ╰──╯    glyph shapes      │
│                              │        ـ──  gold accent stroke │
│   بيقرأ السياق، يوضّح...      │   ┌─┐ ┌─┐                     │
│                              │   │ر│ │ب│  teal + paper tones  │
│   [ثبّت المهارة]              │   └─┘ └─┘   NO photos        │
│                              │                              │
│   [مصري][خليجي][شامي]        │                              │
│   «اكتب ١٢ كابشن...»         │                              │
└──────────────────────────────┴──────────────────────────────┘
         RTL text zone              Typographic art zone
```

---

## Related

- [stitch-website-prompts-masri.md](./stitch-website-prompts-masri.md) — per-page Stitch prompts + Masri copy
- [website-design-system.md](./website-design-system.md) — implementation tokens for Next.js build
