# Codex Prompt — GitHub Cover for Awesome Arabic Skill

Copy-paste into **Codex** (or any image-capable agent) to generate the repository cover image.

**Output file:** `docs/assets/awesome-arabic-skill-cover.png`  
**Also used as:** GitHub repository social preview (Settings → General → Social preview)

---

## Specs (required)

| Property | Value |
|----------|--------|
| Dimensions | **1280 × 640 px** (GitHub social preview) — also acceptable: **1440 × 560 px** (matches existing HTML mock) |
| Format | PNG, 24-bit, no transparency (or flat warm background) |
| Safe zone | Keep logo, title, and `/arabic` command inside center 80%; avoid critical text near edges (cropping on mobile) |
| Text | Must be sharp and readable at thumbnail size (~400px wide) |
| Style | Premium editorial tech — warm, confident, pan-Arab, **not** generic purple AI gradient slop |

---

## Prompt (copy from here)

```text
Generate a GitHub repository cover image for an open-source AI skill product.

PRODUCT
- Name: Awesome Arabic Skill
- Skill ID / command: /arabic
- Publisher: MediaBubble
- Tagline: Masri-first Arabic content operating system for AI coding tools
- One-line value: guide → clarify → recommend → write → review (not a translation tool)
- Repo: mediabubble-adv/arabic-skill

CANVAS
- Size: 1280×640 pixels, landscape
- Orientation: horizontal banner for GitHub repo header and social preview

VISUAL DIRECTION (match existing brand mock)
- Warm sand / parchment background: #F5EEE6
- Primary text / ink: #2F2924
- Accent terracotta / copper: #C76F45
- Secondary warm neutrals: #6B5D52, #D7C5B4, #E8D2BE
- Subtle geometric Arabic-inspired pattern (diamond lattice, not cliché mosque clipart)
- Light paper grain or fine grid texture — elegant, not noisy
- Pan-Arab landmark silhouette collage on the RIGHT third (minimal line-art / flat illustration style):
  - Egyptian pyramids (Masri-first anchor)
  - Levant / Petra-style facade hint
  - Gulf skyline hint (slim tower silhouette, abstract)
  - Islamic arch geometry (abstract, respectful)
  - Optional playful detail: minimal “cool sun with sunglasses” above landmarks (brand personality — subtle, not cartoonish)
- LEFT two-thirds: typography and command chip

TYPOGRAPHY
- Eyebrow pill (small): "Awesome Arabic Skill · by MediaBubble"
- Main headline (large serif, editorial): "Arabic Intelligence"
  OR alternative approved headline: "Write Arabic Like a Native Agency"
- Subhead (sans-serif, medium): "The AI skill for captions, ads, scripts, SEO, books & brand voice"
- Command chip (monospace, dark pill): /arabic
- Optional tiny Arabic line (RTL, elegant): "محتوى عربي · دارجة · فصحى · إعلانات · سكريبت"
- English primary; Arabic as accent only — must remain legible

LAYOUT
- Left-aligned text block with generous padding (≈8% from left edge)
- Clear hierarchy: eyebrow → headline → subhead → command chip
- Right side: landmark illustration with soft radial glow behind it
- Plenty of whitespace — premium SaaS / developer tool aesthetic
- Do NOT clutter with badges, version numbers, or 22-tool icons

MOOD
- Professional, warm, culturally grounded, modern developer product
- Confident and human — not corporate cold, not childish
- Feels like: impeccable.style meets pan-Arab creative agency meets Cursor skill ecosystem

AVOID
- Purple/blue generic AI gradients
- Stock photo people
- Flags of specific countries as dominant element
- Religious symbols used decoratively
- Misspelled Arabic
- Busy collage of social media logos
- "ChatGPT wrapper" vibes
- Watermarks or "AI generated" text

DELIVERABLE
- Single PNG file ready for GitHub
- Filename: awesome-arabic-skill-cover.png
- Save to: docs/assets/awesome-arabic-skill-cover.png in the repo

If generating via HTML/CSS first (preferred for crisp text), use 1440×560 canvas matching this structure:
- Background radial gradient warm cream
- Left content column with eyebrow, serif headline, sans subtitle, dark monospace /arabic chip
- Right SVG landmark illustration in terracotta/sand line art
Then export to PNG at 2x for sharpness and resize to 1280×640 if needed.
```

---

## Alternative prompt (image model — shorter)

Use if Codex routes to DALL·E / image gen instead of HTML:

```text
1280x640 GitHub repo banner, warm parchment background #F5EEE6, premium developer tool aesthetic. Left side: small pill "Awesome Arabic Skill by MediaBubble", large serif headline "Arabic Intelligence", subtitle "AI skill for Arabic captions ads scripts SEO books", dark monospace button "/arabic". Right side: minimal flat pan-Arab landmark illustration — pyramids, desert arch, slim Gulf tower, geometric Islamic pattern, terracotta #C76F45 and sand tones, subtle paper texture. Editorial typography, lots of whitespace, no purple gradients, no stock photos, no flags. Professional MediaBubble product cover.
```

---

## After generation — checklist

- [ ] File exists at `docs/assets/awesome-arabic-skill-cover.png`
- [ ] Readable at thumbnail size in GitHub repo header
- [ ] Text matches: **Awesome Arabic Skill**, **/arabic**, MediaBubble
- [ ] Colors align with warm sand / terracotta palette
- [ ] Upload to GitHub: **Repo → Settings → General → Social preview → Upload image**
- [ ] README already references `./docs/assets/awesome-arabic-skill-cover.png` — verify image displays

---

## Reference mock (existing)

HTML source of truth for layout and colors:

`docs/assets/awesome-arabic-skill-cover.html`

Open in browser → screenshot or print-to-PNG if Codex prefers refining HTML over pure image gen.

---

## Related documents

- [README](../../README.md)
- [Command Surface](./command-surface.md)
