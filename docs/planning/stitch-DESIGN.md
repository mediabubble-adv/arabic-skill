# Design System: Awesome Arabic Skill

> **Product:** `arabic` · **MediaBubble** · **v1.1.0 website**  
> **Language:** RTL Arabic-primary · Natural Egyptian Arabic (Masri) UI copy  
> **Hero signature:** Abstract Arabic typographic composition (Option B)  
> **Generated from:** [stitch-DESIGN-prompt.md](./stitch-DESIGN-prompt.md)  
> **Page prompts:** [stitch-website-prompts-masri.md](./stitch-website-prompts-masri.md)

---

## 1. Visual Theme & Atmosphere

A dark-first, gallery-airy editorial marketing site for a developer-facing Arabic content skill. The atmosphere is calm and confident — like a well-lit Cairo design studio at night, not a neon SaaS landing page or a generic AI product brochure.

**Taste spectrum (locked):**
- **Density 4/10** — generous whitespace, breathing room between sections, prose-friendly reading zones
- **Variance 8/10** — asymmetric splits, offset grids, zig-zag bento rows; centered heroes are forbidden
- **Motion 6/10** — weighty spring physics, staggered reveals, subtle perpetual shimmer on hero typographic accents only

**Cultural posture:** Arabic is primary. The site speaks natural Masri to developers and content teams. Tool names (Cursor, Claude, Codex) stay in Latin. Commands and install strings stay LTR in isolated panels. The product is an Arabic content partner inside AI coding tools — explicitly **not** a translation shortcut.

**Visual identity:** Abstract deconstructed Arabic letterforms (ع · ر · ب · ي) as poster-grade graphic shapes — Warm Paper glyphs on Void Canvas, accented with Arabic Teal strokes and Warm Gold diacritic dots. Editorial print meets dev-tool precision. No stock photos, no robot mascots, no purple AI glow.

**Screens supported:** Home · Features · Install · Commands · Tutorials · Examples · About · Docs

---

## 2. Color Palette & Roles

Maximum one primary accent (Arabic Teal). Warm Gold is a highlight token only — never used for primary buttons.

| Token | Hex | Role |
|-------|-----|------|
| **Void Canvas** | `#0B0B0F` | Primary page background. Deep off-black. Never use pure `#000000`. |
| **Elevated Slate** | `#141419` | Cards, code blocks, install panels, elevated surfaces |
| **Warm Paper** | `#F5F5F2` | Primary Arabic text, headline letterforms in hero composition |
| **Muted Zinc** | `#A1A1AA` | Secondary text, captions, metadata, muted tool labels |
| **Structural Line** | `#26262E` | 1px borders, dividers, card outlines, tab separators |
| **Arabic Teal** | `#1FB28A` | **Single primary accent** — CTAs, links, focus rings, active tab underline, mode-flow active node (saturation <80%) |
| **Teal Deep** | `#0E8C6B` | CTA hover, pressed button fill, link hover |
| **Warm Gold** | `#E7C873` | Dialect pill borders, diff highlights in before/after cards, hero typographic accent strokes and diacritic dots — not for CTAs |
| **Success Green** | `#2FBF71` | Copy-success toast, positive audit indicators |
| **Warning Amber** | `#E0A82E` | Caution banners, medium audit flags |
| **Danger Red** | `#E5484D` | Error text, failed copy states, critical audit flags |

**Contrast:** Maintain WCAG AA — body text ≥4.5:1 against Void Canvas; large display ≥3:1.

**Banned colors/patterns:** Pure black, neon purple, neon blue gradients, oversaturated accent glows, gradient-filled headline text.

---

## 3. Typography Rules

### Font stacks

| Role | Family | Usage |
|------|--------|-------|
| **Arabic display + body** | IBM Plex Sans Arabic | All RTL UI copy, headlines, body, nav, tutorials |
| **Latin UI** | Satoshi | English tool names in logo strip, mixed inline labels |
| **Monospace (LTR only)** | JetBrains Mono | Install commands, `/arabic` snippets, version badges, file paths |

### Scale (rem)

`0.875 · 1 · 1.125 · 1.25 · 1.5 · 2 · 2.75 · 3.75`

- Display headlines: `clamp(2rem, 5vw, 3.75rem)` — track-tight, hierarchy through weight and color not screaming size
- Body: 16–18px (1–1.125rem), line-height **1.8** for Arabic prose
- Latin in mixed lines: line-height 1.5–1.6
- Reading max-width: **68 characters** for long prose blocks

### Hierarchy rules

- Headlines: semibold to bold Warm Paper on Void Canvas
- Subheads and descriptions: regular weight Muted Zinc
- Code/commands: JetBrains Mono 0.875rem inside Elevated Slate panels, always LTR `direction: ltr; text-align: left`
- Numerals in code/versions: Western digits (`1.0.0`). Eastern-Arabic optional in marketing prose where natural

### Banned

Inter, system-ui as primary display, generic serif (Times New Roman, Georgia, Garamond, Palatino), gradient text on large headers, emojis anywhere in UI

---

## 4. Component Stylings

### Global header (sticky)

- Position: sticky top, Void Canvas background with subtle bottom Structural Line border
- RTL layout: logo/wordmark at the **start** (right), nav links center-start, primary CTA at the **end** (left)
- Nav links (Masri): المميزات · التثبيت · الأمثلة · الأوامر · عن المهارة
- CTA in header: «ثبّت المهارة» — compact primary button
- Below 768px: hamburger at end, full-screen overlay menu, 44px tap targets

### Primary button

- Fill: Arabic Teal, text Warm Paper, generously rounded corners (14px radius)
- No outer glow, no neon shadow
- Height minimum 44px; horizontal padding 24–32px
- Hover: Teal Deep fill
- Active: translateY -1px tactile press, Teal Deep
- One primary CTA per hero section — no secondary ghost «اعرف أكتر» links

### Hero — abstract typographic composition (Home)

- **Layout:** asymmetric RTL split — copy zone occupies ~55% at the start; typographic art zone ~45% opposite, separated by generous negative space. Never centered.
- **Copy block:** Masri headline «شريكك المصري لكتابة المحتوى جوه أدوات الذكاء الاصطناعي», subhead in Muted Zinc, single CTA «ثبّت المهارة»
- **Art zone:** large cropped Arabic glyphs (ع · ر · ب · ي) as abstract shapes — slight rotation (±3–8°), Warm Paper fill, Arabic Teal underline strokes, Warm Gold diacritic dots. Shapes must not overlap readable headline text in the copy zone.
- **Dialect switcher:** pill tabs below subhead — مصري · خليجي · شامي — crossfade sample caption preview; site chrome stays Masri
- **Banned in hero:** inline photos between words, stock imagery, AI robot illustrations, scroll chevrons, «اسحب للأسفل»

### Mode flow stepper

- Five nodes RTL: استشارة → توضيح → توصية → كتابة → مراجعة
- Connected by Structural Line segments; active node filled Arabic Teal; inactive Muted Zinc
- Hover/tap expands node with one-line Masri description in Elevated Slate tooltip panel
- Used on Home and Features pages

### Install block

- Elevated Slate panel, Structural Line border, 14px radius
- JetBrains Mono LTR command: `npx @mediabubble-adv/arabic-skill install --target cursor`
- Copy icon button top-end of panel; on success show toast «تم النسخ» in Success Green
- Sticky duplicate copy button on mobile Install page

### Tabbed snippets

- Tabs: سريع (npx) · Cursor · Claude · Codex · يدوي
- Active tab: Arabic Teal 2px bottom border; inactive Muted Zinc text
- Keyboard navigable; focus ring Arabic Teal 2px offset
- Panel content: numbered steps in Masri + LTR code blocks per tab

### Before/after humanization cards

- Toggle or side-by-side split: «نص مترجم جامد» vs «نص مصري طبيعي»
- Diff words highlighted Warm Gold background at 20% opacity
- Elevated Slate card, 24px radius, whisper shadow `0 8px 30px rgba(0,0,0,0.35)`

### Bento feature grid

- **Asymmetric 2-column zig-zag** — alternate image/visual and text vertical offset by 32–48px
- **Never** three equal-width cards in one row
- Each cell: Arabic title Warm Paper, 2-line Masri description Muted Zinc, optional teal icon stroke
- Scroll-in stagger animation (see Motion)
- Collapses to single column below 768px

### Dialect switcher pills

- Inactive: Structural Line border, Muted Zinc text
- Active: Arabic Teal border, Warm Paper text
- Crossfade sample text below with 280ms opacity transition
- Pauses all motion when `prefers-reduced-motion: reduce`

### Tool logo strip

- Horizontal row of muted SVG logos (~24px): Cursor, Claude, Codex, ChatGPT, Gemini, Qwen, Windsurf, VS Code
- Labels optional Muted Zinc; «+14 أداة» at end
- Opacity 0.7 default, 1.0 on hover

### Command palette mock (Commands page)

- Static non-functional UI: search field «ابحث عن أمر…», results list of `/arabic` verbs
- Selected row: Elevated Slate background, Masri description right, LTR command left in mono
- Focus ring Arabic Teal

### Cards (general)

- Use only when elevation communicates hierarchy — not for every list item
- Radius 14px (medium) or 24px (large marketing cards)
- Shadow: `0 8px 30px rgba(0,0,0,0.35)` tinted to Void Canvas hue
- High-density lists: prefer Structural Line top dividers instead of card wrappers

### Inputs and search

- Label above field (Masri), never floating labels
- Background Elevated Slate, border Structural Line, focus border Arabic Teal
- Error text below in Danger Red
- Minimum height 44px

### Loaders

- Skeletal shimmer blocks matching exact layout dimensions of target content
- Shimmer: Warm Paper at 8% opacity sweeping left-to-right (or static when reduced-motion)
- **No** generic circular spinners

### Empty states

- Composed layout: simple line illustration of Arabic letterform + Masri instruction text — not bare «مفيش بيانات»

### Footer

- Structural Line top border, Void Canvas background
- Links: GitHub, الوثائق, عن المهارة, المساهمة
- Credit: «منتج من MediaBubble» in Muted Zinc

---

## 5. Layout Principles

### Grid and containment

- Page max-width **1200px** centered with 24px side padding mobile, 48px desktop
- CSS Grid for page sections — avoid flexbox `calc()` percentage hacks
- Prose blocks max **68ch** for Arabic body copy

### RTL architecture

- Root: `dir="rtl"` `lang="ar"` on `<html>` or layout wrapper
- Mirror flex/grid start/end for nav, bento, stepper, footer
- Code panels: explicit `dir="ltr"` isolated — never inherit RTL into mono strings

### Asymmetry rules (variance 8)

- Heroes: split screen or left-weighted (RTL: copy at start) — **never** centered headline + centered illustration
- Feature sections: 2-column zig-zag or horizontal scroll on mobile — **never** 3 equal cards
- About page: yes/no contrast columns offset vertically by 24px

### Spacing scale (px)

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

- Between major sections: `clamp(3rem, 8vw, 6rem)` vertical gap
- Card internal padding: 24–32px
- Stack gap within components: 12–16px

### Responsive

- **Mobile-first collapse <768px:** all multi-column layouts become single column — no exceptions
- **No horizontal scroll** on any viewport — critical failure
- Touch targets minimum **44px** height and width
- Hero typographic art zone stacks **below** copy block on mobile with 48px gap
- Typography scales via `clamp()` — body never below 14px (0.875rem)
- Full viewport sections: `min-height: 100dvh` — never `height: 100vh` (iOS Safari jump)

### Spatial separation

- Every element occupies its own clean zone — **no overlapping** readable text on decorative glyphs or images
- Decorative letterforms live only in the dedicated art zone, never bleeding into copy

---

## 6. Motion & Interaction

### Physics

- **Default spring:** stiffness `100`, damping `20` — premium, weighty feel on buttons, cards, stepper nodes
- **Fallback ease:** `cubic-bezier(0.22, 1, 0.36, 1)` for opacity-only transitions

### Durations

| Token | ms | Use |
|-------|-----|-----|
| Fast | 150 | button hover, pill toggle, link color |
| Base | 280 | tab switch, dialect crossfade, card enter |
| Slow | 600 | hero reveal, section scroll-in |

### Entrance orchestration

- Bento grid items: staggered cascade 80ms delay per item, transform `translateY(16px)` → `0` + opacity `0` → `1`
- Tool logo strip: fade-in sequence left-to-right (RTL: start to end) over 400ms total
- Hero copy: opacity + translateY, 600ms spring once on load — letterform art zone optional slow gold shimmer loop

### Perpetual micro-interactions (allowed, subtle)

- Hero gold diacritic dots: gentle opacity pulse 3s loop — **disabled** on reduced-motion
- Dialect preview text: crossfade only, no typewriter
- Mode flow active node: soft teal glow pulse at 15% opacity — not neon

### Performance rules

- Animate **only** `transform` and `opacity`
- Never animate `top`, `left`, `width`, `height`, `margin`
- Grain/noise texture (if used): fixed pseudo-element, `pointer-events: none`, GPU layer

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  /* All motion → opacity-only or instant; shimmer and float loops off */
}
```

---

## 7. Anti-Patterns (Banned)

**Typography & copy**
- No Inter font
- No generic serif fonts
- No emojis in UI or marketing copy
- No AI copywriting clichés: «ارتقِ»، «سلس»، «أطلق العنان»، «الجيل القادم»
- No fake statistics (`99.99%`، `50%` faster)
- No placeholder names: John Doe, Acme, Nexus

**Color & visual**
- No pure black `#000000`
- No neon purple or blue AI aesthetic
- No outer glow on buttons or cards
- No oversaturated accent colors
- No gradient text on large headlines
- No custom mouse cursors

**Layout & hero**
- No centered hero layouts
- No three equal-width feature cards in a row
- No overlapping readable text on visuals
- No inline stock photos embedded between headline words
- No robot/AI mascot illustrations
- No filler UI: «اسحب للاستكشاف»، scroll arrows، bouncing chevrons

**Content & assets**
- No broken Unsplash links — use `picsum.photos` or inline SVG only
- No presenting the product as a «translation tool»
- No inventing features not in the repo (38 reference packs, 24 supported tools, `/arabic` command tree are real)

**Technical**
- No `height: 100vh` for full-screen sections
- No horizontal overflow on mobile
- No circular loading spinners as default loader
- No LTR layout for page chrome
- No RTL inside monospace command blocks

---

## Appendix: Locked Masri copy (quick reference)

| Element | Text |
|---------|------|
| Product name | مهارة العربية الرائعة |
| Primary CTA | ثبّت المهارة |
| Copy success | تم النسخ |
| Hero headline | شريكك المصري لكتابة المحتوى جوه أدوات الذكاء الاصطناعي |
| Hero subhead | بيقرأ السياق، يوضّح الفكرة، يوصي بالاتجاه، يكتب، ويراجع — قبل ما يسلّم. مش ترجمة. |
| Flow steps | استشارة → توضيح → توصية → كتابة → مراجعة |

**Install (LTR):** `npx @mediabubble-adv/arabic-skill install --target cursor`

---

## Related files

- [stitch-website-prompts-masri.md](./stitch-website-prompts-masri.md) — per-page Stitch generation prompts
- [stitch-DESIGN-prompt.md](./stitch-DESIGN-prompt.md) — source prompt for this file
- [website-design-system.md](./website-design-system.md) — Next.js implementation tokens
