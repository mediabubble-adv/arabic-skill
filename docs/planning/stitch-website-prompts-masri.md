# Stitch Website Prompts — مصري أولاً

> **Status:** Planning · **Phase:** P7 / v1.1.0 · **Register:** مصري طبيعي كامل (بما فيها صفحات المطورين)  
> **Design tokens:** [website-design-system.md](./website-design-system.md)  
> **Stitch DESIGN.md prompt:** [stitch-DESIGN-prompt.md](./stitch-DESIGN-prompt.md) (hero: abstract Arabic typography)  
> **Generated DESIGN.md:** [stitch-DESIGN.md](./stitch-DESIGN.md)  
> **Stitch runbook (copy-paste steps):** [stitch-generation-runbook.md](./stitch-generation-runbook.md)  
> **Workflow:** Paste `stitch-DESIGN.md` in Stitch → follow runbook §1–8 → `/arabic audit` on output

---

## 1. قاموس الاستمرارية (Continuity Ledger)

| المفهوم | المصطلح المقفول | ممنوع |
|---------|-----------------|-------|
| المنتج | **المهارة** | سكيل، tool لوحده |
| الاسم الكامل | **مهارة العربية الرائعة** / Awesome Arabic Skill | — |
| التثبيت | **ثبّت المهارة** | حمّل، نزّل |
| المستخدم | **إنت** | أنتم (رسمي) |
| المسار الافتراضي | استشارة → توضيح → توصية → كتابة → مراجعة | — |
| التمييز | **مش أداة ترجمة** | شريك ذكاء اصطناعي، حلول مبتكرة |
| النجاح بعد النسخ | **تم النسخ** | تم بنجاح، Copied |

**قواعد تقنية (ثابتة في كل الصفحات):**
- واجهة الموقع: `dir="rtl"` · `lang="ar"`
- الأوامر والكود: LTR · JetBrains Mono
- أسماء الأدوات: إنجليزي (Cursor، Claude، Codex)

---

## 2. مسار `/arabic` (dogfood)

```text
/arabic plan website --dialect masri
/arabic write page --brief .arabic/briefs/stitch-home.yaml
/arabic write ui --file docs/planning/stitch-website-prompts-masri.md
/arabic audit --file docs/planning/stitch-website-prompts-masri.md
```

---

## 3. Prompt 0 — Master Design System

> **Use this file as Stitch project context:** [stitch-DESIGN.md](./stitch-DESIGN.md) (generated · hero Option B · 7-section DESIGN.md)

Paste the full contents of `stitch-DESIGN.md` into Google Stitch before generating any page from section 4 below.

<details>
<summary>Legacy compact Prompt 0 (fallback only)</summary>

```markdown
# Design System: Awesome Arabic Skill (arabic)

## 1. Visual Theme & Atmosphere

Dark-first editorial marketing site. Arabic-primary, RTL-native. Voice: natural Egyptian Arabic (Masri) — professional dev-tool tone, not street slang, not stiff MSA news.

Product: Awesome Arabic Skill (`arabic`) by MediaBubble. Flow: guide → clarify → recommend → write → review. NOT a translation tool.

Density: 4/10 · Variance: 8/10 · Motion: 6/10

## 2. Color Palette

- Void Canvas #0B0B0F — background
- Elevated Slate #141419 — cards, code blocks
- Warm Paper #F5F5F2 — Arabic text
- Muted Zinc #A1A1AA — secondary
- Structural Line #26262E — borders
- Arabic Teal #1FB28A — primary CTA, links
- Teal Deep #0E8C6B — hover
- Warm Gold #E7C873 — dialect tags, highlights (sparing)

Banned: #000000, neon purple/blue, AI-purple glow, oversaturated accents.

## 3. Typography

- Arabic: IBM Plex Sans Arabic — body line-height 1.8
- Latin UI: General Sans
- Mono (LTR): JetBrains Mono — commands, versions
- Banned: Inter, generic serif, emojis, gradient headlines

## 4. Components

- Buttons: flat teal, 44px touch, -1px active translate
- Install blocks: LTR mono, copy icon, toast «تم النسخ»
- Tabbed snippets: bash / Cursor / Claude
- Dialect switcher: مصري · خليجي · شامي (preview only — site chrome stays Masri)
- Before/after humanization cards
- Asymmetric bento grid (NOT 3 equal columns)
- Mode flow RTL: استشارة → توضيح → توصية → كتابة → مراجعة
- Tool logo strip: Cursor, Claude, Codex, ChatGPT, Gemini, Qwen, Windsurf, VS Code

## 5. Layout

RTL-first. Asymmetric hero (no centered hero). Container max 1200px. Mobile single column <768px. No horizontal scroll.

## 6. Motion

cubic-bezier(.22,1,.36,1) · 150ms hover · 280ms enter · respects prefers-reduced-motion

## 7. Anti-Patterns

No emojis. No Inter. No pure black. No 3-column equal features. No «Elevate / Seamless / Unleash». No scroll chevrons. No fake stats. No purple AI aesthetic.

Install command (LTR):
npx @mediabubble-adv/arabic-skill install --target cursor
```

</details>

---

## 4. Page Prompts + Arabic Copy

### 4.1 Home `/`

**Stitch prompt:**

```markdown
Design the Home page for Awesome Arabic Skill. Apply DESIGN.md. RTL. Natural Egyptian Arabic (Masri) for ALL UI copy including nav and CTAs.

Sections:
1. Sticky header — nav (RTL): المميزات · التثبيت · الأمثلة · الأوامر · عن المهارة · CTA «ثبّت المهارة»
2. Asymmetric hero — headline, subhead, CTA, dialect switcher preview, abstract Arabic typography visual
3. Flow strip — 5-step mode diagram
4. Supported tools icon row — +14 أداة
5. Bento capabilities — 6 asymmetric cards
6. Before/after humanization toggle
7. Footer — MediaBubble, GitHub, docs

Desktop 1440px + Mobile 390px.
```

**Arabic copy:**

| Element | Text |
|---------|------|
| Hero headline | شريكك المصري لكتابة المحتوى جوه أدوات الذكاء الاصطناعي |
| Hero subhead | بيقرأ السياق، يوضّح الفكرة، يوصي بالاتجاه، يكتب، ويراجع — قبل ما يسلّم. مش ترجمة. |
| Primary CTA | ثبّت المهارة |
| Secondary | شوف على GitHub |
| Flow steps | استشارة → توضيح → توصية → كتابة → مراجعة |
| Bento: محتوى | منشورات، إعلانات، صفحات هبوط، مدونات، سكريبتات |
| Bento: لهجات | ١١+ لهجة. مصري أولاً. |
| Bento: تأنيس | بيشيل أسلوب الترجمة والجمل اللي شكلها AI |
| Bento: مشروع | `/arabic auto` بيمسح المشروع ويشرحه بعربي يفهمه أي حد |
| Bento: تدقيق | `/arabic audit` يراجع النص ويقولك فيه إيه |
| Bento: مشاريع كبيرة | موقع، حملة، كتاب — خطة الأول، تنفيذ بعد الموافقة |
| Before label | نص مترجم جامد |
| After label | نص مصري طبيعي |

---

### 4.2 Features `/features`

**Stitch prompt:**

```markdown
Design Features page. RTL. Masri UI copy. Dark editorial. Asymmetric bento, typography showcase, dialect preview tabs, static audit scorecard mock. CTA to /install and /examples.
```

**Arabic copy:**

| Element | Text |
|---------|------|
| Title | المهارة دي بتعمل إيه؟ |
| Intro | مش ترجمة ولا لصق من ChatGPT. شريك محتوى عربي بيفهم السياق وبيعرف يكتب بصوت طبيعي. |
| كتابة المحتوى | منشورات، إعلانات، صفحات هبوط، مدونات، سكريبتات — حسب اللي محتاجه |
| اللهجات | ١١+ لهجة. مصري أولاً، وخليجي وشامي وغيرهم لما تحتاج |
| التأنيس | بيشيل أسلوب الترجمة والجمل اللي شكلها AI |
| وعي المشروع | `/arabic auto` بيمسح المشروع ويشرحه بعربي يفهمه أي حد |
| البحث | `/arabic research` بيجمع مصادر قبل ما يكتب |
| الأوامر | `write`، `audit`، `plan`، `coach` — من غير ما تلف في شات طويل |
| مشاريع كبيرة | موقع، حملة، كتاب — بخطة أولاً، وبعدين تنفيذ |
| SEO و AEO | محتوى عربي مظبوط للبحث ومحركات الإجابة |
| Typography section title | شكل العربي على الموقع |
| Audit preview title | معاينة التدقيق |
| CTA | جرّب على مشروعك |

---

### 4.3 Install `/install`

**Stitch prompt:**

```markdown
Design Install page. RTL Masri copy. Copy-to-clipboard install block (LTR). Tabbed paths: npx, Cursor, Claude, Codex, manual, all. Post-install checklist. 22-tool grid. Troubleshooting accordion. Sticky copy button on mobile.
```

**Arabic copy:**

| Element | Text |
|---------|------|
| Title | ثبّت المهارة في دقيقة |
| Subhead | سطر واحد من التيرمنال — والمهارة تشتغل في Cursor أو Claude أو Codex. |
| Version badge | الإصدار 1.0.0 |
| Tabs | سريع (npx) · Cursor · Claude · Codex · يدوي · الكل |
| Post-install 1 | افتح المشروع اللي شغال عليه |
| Post-install 2 | اكتب `/arabic guide` وابدأ |
| Post-install 3 | لو عندك براند ثابت: `/arabic voice save` |
| FAQ: clone؟ | لأ — `npx install` بينسخ `arabic/` بس. للـ rules والـ commands محتاج clone يدوي |
| FAQ: عربي بس؟ | الواجهة مصري. المحتوى اللي بتولّده يقدر يكون بأي لهجة. |
| Troubleshoot: مش ظاهرة | اتأكد من المسار — Cursor: `~/.cursor/skills/arabic/` |
| Troubleshoot: تحديث | شغّل تاني بـ `--force` |
| Copy toast | تم النسخ |

**Install command (LTR, unchanged):**

```bash
npx @mediabubble-adv/arabic-skill install --target cursor
```

---

### 4.4 Commands `/commands`

**Stitch prompt:**

```markdown
Design Commands reference page. Static command palette mock. Search «ابحث عن أمر…». Command tree collapsible. 6 copy-ready example cards. Mode router table (Advisory / Pro / Project / Audit / Coach). Masri descriptions, LTR commands.
```

**Arabic copy:**

| Command | الشرح المصري |
|---------|----------------|
| `/arabic guide` | مش فاهم عايز إيه؟ ابدأ هنا — هيوضّح ويسأل ويوصي |
| `/arabic write meta --dialect masri` | اكتب إعلان ميتا بالمصري من برّيف جاهز |
| `/arabic audit --file content.md` | راجع نص عربي موجود وقولك فيه إيه |
| `/arabic plan website` | موقع متعدد الصفحات — خطة الأول، تنفيذ بعد الموافقة |
| `/arabic auto explain` | امسح المشروع واشرحه بعربي بسيط |
| `/arabic research meta-ads` | ابحث وجمع مصادر قبل ما تكتب |
| `/arabic coach` | حسّن البرومبت بتاعك قبل ما تكتب |
| `/arabic voice save` | احفظ صوت البراند عشان كل الكتابة تبقى على نفس النغمة |

| Mode | متى تستخدمه |
|------|-------------|
| استشارة | الفكرة لسه مش واضحة |
| Pro | عندك برّيف كامل وعايز تكتب على طول |
| مشروع | موقع، حملة، أو كتاب — خطة + تنفيذ على مراحل |
| تدقيق | عندك نص عربي محتاج مراجعة |
| Coach | البرومبت ضعيف ومحتاج تصليح |

| Element | Text |
|---------|------|
| Page title | سطح الأوامر |
| Subhead | أمر واحد — `/arabic` — وتحته كل اللي محتاجه |
| CTA | ابدأ بـ `/arabic guide` |

---

### 4.5 Tutorials `/tutorials`

**Stitch prompt:**

```markdown
Design Tutorials page. Arabic-first Masri. Vertical lesson cards (not equal grid). One expanded walkthrough with 4 steps + side panel sample output. Dialect filter pills (الكل · مصري · خليجي · شامي · فصحى). Links to /examples, /install.
```

**Arabic copy:**

| Element | Text |
|---------|------|
| Title | اتعلّم بالعربي |
| Subhead | دروس من شغل المهارة نفسها — مش ترجمة من إنجليزي |
| Lesson 1 | أول منشور إنستغرام مصري لإطلاق أبليكيشن |
| Lesson 2 | راجع صفحة هبوط شكلها مترجم |
| Lesson 3 | اشرح مشروعك بـ `/arabic auto` |
| Lesson 4 | خطّط موقع متعدد الصفحات بـ `plan website` |
| Lesson 5 | حملة إعلانية على أكتر من منصة |
| Walkthrough step 1 | اكتب الفكرة بشكل جزئي — مش لازم برّيف كامل |
| Walkthrough step 2 | `/arabic guide` هيوضّح ويسأل |
| Walkthrough step 3 | `/arabic write` يولّد المحتوى |
| Walkthrough step 4 | `/arabic audit` يراجع قبل التسليم |
| Meta: وقت | ~١٠ دقايق |
| Meta: مستوى | مبتدئ · متوسط · متقدم |

---

### 4.6 Examples `/examples`

**Stitch prompt:**

```markdown
Design Examples page. Filter bar by content type. Before/after zig-zag gallery. Each example shows LTR command tag underneath. Masri plausible marketing copy. Toggle or split view with gold diff highlights.
```

**Arabic copy:**

| Element | Text |
|---------|------|
| Title | أمثلة من الشغل الحقيقي |
| Subhead | كابشنز، إعلانات، صفحات هبوط، سكريبتات، نصوص واجهة |
| Filters | الكل · سوشيال · إعلانات · موقع · فيديو · كتاب · واجهة |
| Example 1 title | ١٢ كابشن إنستغرام — أبليكيشن رياضة في القاهرة |
| Example 2 title | إعلان ميتا — SaaS خليجي |
| Example 3 title | هيرو صفحة هبوط — مصري vs فصحى جامدة |
| Example 4 title | افتتاحية يوتيوب + مقطع من السكريبت |
| Example 5 title | أزرار ورسائل واجهة المستخدم |
| CTA | انسخ الأمر وجرّب |

---

### 4.7 About `/about`

**Stitch prompt:**

```markdown
Design About page. Trust and story. Mission block. Yes/No contrast columns. Simple architecture diagram (arabic/ runtime, reference/ library, docs, CLI). Version timeline 1.0.0 → 1.1.0. MediaBubble footer band. Calm editorial, minimal motion.
```

**Arabic copy:**

| Element | Text |
|---------|------|
| Title | ليه مهارة العربية الرائعة؟ |
| Mission | وكالة محتوى عربي جوه الـ IDE بتاعك. بيستشير قبل ما يكتب. مش ترجمة. |
| نعم | لهجات، تدقيق، مشاريع كبيرة، فهم المشروع من الملفات |
| لا | ترجمة حرفية، تخمين من غير سياق، ٣٨ أمر منفصل |
| Architecture labels | `arabic/` تشغيل · `reference/` مكتبة · `docs/` وثائق · CLI تثبيت |
| Timeline | 1.0.0 اتنشر · 1.1.0 موقع + توزيع (جاري) |
| Credit | منتج من MediaBubble |

---

### 4.8 Docs `/docs`

**Stitch prompt:**

```markdown
Design Docs hub. 2-column asymmetric doc cards linking to install, commands, supported tools, GitHub README, CHANGELOG, contributing. Tool logo quick grid. Static search mock. Banner: full docs on GitHub.
```

**Arabic copy:**

| Element | Text |
|---------|------|
| Title | الوثائق والمصادر |
| Card: بدء سريع | دليل البدء → /install |
| Card: أوامر | الأوامر الكاملة → /commands |
| Card: أدوات | ٢٢ أداة مدعومة |
| Card: GitHub | README على GitHub |
| Card: إصدارات | CHANGELOG · 1.0.0 |
| Card: مساهمة | ساهم في المشروع |
| Banner | النسخة الكاملة على GitHub |
| Search placeholder | ابحث في الوثائق… |

---

## 5. Mega-prompt (كل الصفحات مرة واحدة)

```markdown
Generate 8 cohesive screens for "Awesome Arabic Skill" marketing website.

Screens: Home, Features, Install, Commands, Tutorials, Examples, About, Docs.

Global: RTL, natural Egyptian Arabic (Masri) for ALL UI copy. Dark #0B0B0F, IBM Plex Sans Arabic, Arabic Teal #1FB28A, General Sans Latin, JetBrains Mono commands (LTR). Asymmetric layouts. No centered heroes. No purple AI aesthetic. No emojis. No 3 equal feature columns.

Shared: sticky RTL nav, dialect switcher in hero (preview only), mode flow diagram, copy-to-clipboard install, tabbed CLI snippets, before/after cards, bento grid, tool logos.

Product: MediaBubble skill `arabic`. Install: npx @mediabubble-adv/arabic-skill install --target cursor

Deliver desktop 1440px and mobile 390px per screen. Use Arabic copy from stitch-website-prompts-masri.md section 4.
```

---

## 6. Golden test alignment

| Test | How this doc helps |
|------|-------------------|
| G13 | 8 routes defined with copy |
| G14 | Install strings match README |
| G15 | Interactive components listed per page |
| G16 | Masri copy intended for audit pass via `/arabic audit` |

---

## 7. Related

- [website-design-system.md](./website-design-system.md)
- [command-surface.md](./command-surface.md)
- [implementation-plan.md](./implementation-plan.md) — P7 / G13–G18
