# Stitch Generation Runbook — Awesome Arabic Skill

> **Prerequisite:** [stitch-DESIGN.md](./stitch-DESIGN.md) attached as Stitch project context  
> **Order:** Home → Features → Install → Commands → Tutorials → Examples → About → Docs  
> **Per screen:** generate **Desktop 1440px** then **Mobile 390px**

---

## Step 0 — Attach design system in Stitch

1. Open [Google Stitch](https://labs.google.com/stitch)
2. Create or open project: **arabic-skill-website**
3. Add **project context / design system** → paste the **full** contents of `docs/planning/stitch-DESIGN.md`
4. Confirm Stitch sees: Void Canvas `#0B0B0F`, Arabic Teal `#1FB28A`, hero Option B (abstract letterforms), RTL Masri

---

## Step 1 — Home `/` (Desktop 1440px)

Paste this prompt:

```markdown
Design the HOME page for Awesome Arabic Skill. Follow the attached DESIGN.md exactly.

Viewport: Desktop 1440px wide. dir="rtl" lang="ar". Natural Egyptian Arabic (Masri) for ALL UI text.

## Sections (top to bottom)

### 1. Sticky header
- Logo/wordmark start (right): مهارة العربية الرائعة
- Nav: المميزات · التثبيت · الأمثلة · الأوامر · عن المهارة
- End (left): primary button «ثبّت المهارة» — Arabic Teal #1FB28A

### 2. Hero — asymmetric RTL split (Option B)
- Copy zone (~55%, start/right):
  - Headline: شريكك المصري لكتابة المحتوى جوه أدوات الذكاء الاصطناعي
  - Subhead (Muted Zinc): بيقرأ السياق، يوضّح الفكرة، يوصي بالاتجاه، يكتب، ويراجع — قبل ما يسلّم. مش مجرد ترجمة.
  - ONE CTA: «ثبّت المهارة»
  - Dialect pills: مصري · خليجي · شامي — preview text below: «اكتب ١٢ كابشن إنستغرام لإطلاق أبليكيشن رياضة في القاهرة»
- Art zone (~45%, opposite): abstract deconstructed Arabic glyphs ع · ر · ب · ي — Warm Paper on Void Canvas, teal strokes, gold diacritic dots. NO photos. NO overlap with copy.

### 3. Mode flow strip
- RTL stepper: استشارة → توضيح → توصية → كتابة → مراجعة
- Active first node Arabic Teal

### 4. Tool logo strip
- Muted SVG row: Cursor, Claude, Codex, ChatGPT, Gemini, Qwen, Windsurf, VS Code
- Label: +14 أداة

### 5. Bento capabilities — 2-col asymmetric zig-zag (NOT 3 equal cards)
| Title | Body |
| محتوى | منشورات، إعلانات، صفحات هبوط، مدونات، سكريبتات |
| لهجات | ١١+ لهجة. مصري أولاً. |
| تأنيس | بيشيل أسلوب الترجمة والجمل اللي شكلها AI |
| مشروع | `/arabic auto` بيمسح المشروع ويشرحه بعربي يفهمه أي حد |
| تدقيق | `/arabic audit` يراجع النص ويقولك فيه إيه |
| مشاريع كبيرة | موقع، حملة، كتاب — خطة الأول، تنفيذ بعد الموافقة |

### 6. Before/after humanization
- Toggle: «نص مترجم جامد» vs «نص مصري طبيعي»
- Gold diff highlights on improved phrases

### 7. Footer
- Links: GitHub · الوثائق · عن المهارة
- Credit: منتج من MediaBubble

## Banned
No centered hero. No secondary hero CTA. No scroll chevrons. No emojis. No purple AI glow. No Inter font.
```

---

## Step 1b — Home `/` (Mobile 390px)

```markdown
Same HOME page as previous screen. Reflow for Mobile 390px.

- Hamburger nav replaces horizontal links
- Hero: copy block first, typographic art below (48px gap)
- Bento: single column
- Before/after: stacked
- 44px min touch targets
- No horizontal scroll
```

---

## Step 2 — Features `/features`

**Desktop 1440px:**

```markdown
Design FEATURES page. DESIGN.md. RTL Masri. Desktop 1440px.

- Hero: title «المهارة دي بتعمل إيه؟» + intro «مش مجرد ترجمة ولا لصق من ChatGPT. شريك محتوى عربي بيفهم السياق وبيعرف يكتب بصوت طبيعي.»
- Asymmetric bento (8 cells, zig-zag): كتابة المحتوى · اللهجات · التأنيس · وعي المشروع · البحث · الأوامر · مشاريع كبيرة · SEO و AEO — use Masri copy from stitch-website-prompts-masri.md §4.2
- Section «شكل العربي على الموقع»: RTL typography specimen IBM Plex Arabic, mixed AR/EN line
- Dialect preview tabs: مصري / خليجي / شامي sample paragraphs
- Static audit scorecard mock titled «معاينة التدقيق»
- CTA band: «جرّب على مشروعك» → links to install + examples
```

**Mobile 390px:** same content, single column, tabs scroll horizontally if needed.

---

## Step 3 — Install `/install`

**Desktop 1440px:**

```markdown
Design INSTALL page. DESIGN.md. RTL Masri. Desktop 1440px.

- Title: ثبّت المهارة في دقيقة
- Subhead: سطر واحد من التيرمنال — والمهارة تشتغل في Cursor أو Claude أو Codex.
- Badge: الإصدار 1.0.0
- Primary install block (LTR mono, Elevated Slate): npx @mediabubble-adv/arabic-skill install --target cursor — copy button, toast «تم النسخ»
- Tabs: سريع (npx) · Cursor · Claude · Codex · يدوي · الكل
- Post-install checklist (3 steps Masri)
- 24-tool logo grid
- Accordion troubleshooting: مش ظاهرة · تحديث --force · clone كامل؟
- FAQ 2 items from §4.3
```

**Mobile 390px:** sticky bottom «نسخ الأمر» button.

---

## Step 4 — Commands `/commands`

**Desktop 1440px:**

```markdown
Design COMMANDS page. DESIGN.md. RTL Masri. Desktop 1440px.

- Title: سطح الأوامر · Subhead: أمر واحد — `/arabic` — وتحته كل اللي محتاجه
- Static command palette: search «ابحث عن أمر…» + verb list
- 6 copy cards with Masri description + LTR command (guide, write meta, audit, plan website, auto explain, research)
- Mode table: استشارة · Pro · مشروع · تدقيق · Coach — when to use (Masri)
- CTA: ابدأ بـ `/arabic guide`
```

**Mobile 390px:** stacked cards, full-width search.

---

## Step 5 — Tutorials `/tutorials`

**Desktop 1440px:**

```markdown
Design TUTORIALS page. DESIGN.md. RTL Masri. Desktop 1440px.

- Title: اتعلّم بالعربي · Subhead: دروس من شغل المهارة نفسها — مش مجرد ترجمة من إنجليزي
- Filter pills: الكل · مصري · خليجي · شامي · فصحى
- 5 vertical lesson cards (not equal grid) — titles from §4.5, meta ~١٠ دقايق, level pills
- Expanded walkthrough: 4 steps guide→write→audit + side panel Masri sample output
- Footer links: /examples · /install
```

**Mobile 390px:** walkthrough steps stack, sample below.

---

## Step 6 — Examples `/examples`

**Desktop 1440px:**

```markdown
Design EXAMPLES page. DESIGN.md. RTL Masri. Desktop 1440px.

- Title: أمثلة من الشغل الحقيقي
- Subhead: كابشنز، إعلانات، صفحات هبوط، سكريبتات، نصوص واجهة
- Filter bar: الكل · سوشيال · إعلانات · موقع · فيديو · كتاب · واجهة
- 5 before/after zig-zag items with gold diff highlights — titles from §4.6
- LTR command tag under each example
- CTA: انسخ الأمر وجرّب
```

**Mobile 390px:** filters wrap, examples single column.

---

## Step 7 — About `/about`

**Desktop 1440px:**

```markdown
Design ABOUT page. DESIGN.md. RTL Masri. Desktop 1440px. Minimal motion.

- Title: ليه مهارة العربية الرائعة؟
- Mission: وكالة محتوى عربي جوه الـ IDE بتاعك. بيستشير قبل ما يكتب. مش مجرد ترجمة.
- Yes/No offset columns: نعم (لهجات، تدقيق…) vs لا (ترجمة حرفية…)
- Architecture diagram: arabic/ · reference/ · docs/ · CLI
- Timeline: 1.0.0 اتنشر → 1.1.0 موقع + توزيع (جاري)
- Credit: منتج من MediaBubble
```

**Mobile 390px:** yes/no stacks vertically.

---

## Step 8 — Docs `/docs`

**Desktop 1440px:**

```markdown
Design DOCS hub page. DESIGN.md. RTL Masri. Desktop 1440px.

- Title: الوثائق والمصادر
- Search mock: «ابحث في الوثائق…»
- 6 asymmetric doc cards: بدء سريع · أوامر · ٢٤ أداة · GitHub README · CHANGELOG · مساهمة
- Tool logo quick grid
- Banner: النسخة الكاملة على GitHub — outline button
```

**Mobile 390px:** cards single column.

---

## Checklist after generation

| # | Screen | Desktop | Mobile | Notes |
|---|--------|---------|--------|-------|
| 1 | Home | ☐ | ☐ | Hero letterforms, dialect switcher |
| 2 | Features | ☐ | ☐ | Bento + typography showcase |
| 3 | Install | ☐ | ☐ | Copy block matches README (G14) |
| 4 | Commands | ☐ | ☐ | Palette mock |
| 5 | Tutorials | ☐ | ☐ | Walkthrough expanded |
| 6 | Examples | ☐ | ☐ | Before/after toggles |
| 7 | About | ☐ | ☐ | Architecture diagram |
| 8 | Docs | ☐ | ☐ | GitHub banner |

**QA:** Run `/arabic audit` on any Arabic text Stitch changed. Verify 3+ interactive components on mobile (G15). After Next.js port: `npm run build` (G17), document preview URL (G18).

---

## Related

- [stitch-DESIGN.md](./stitch-DESIGN.md) — design system (Step 0)
- [stitch-website-prompts-masri.md](./stitch-website-prompts-masri.md) — full Arabic copy tables
