# Website Dogfood Plan — G13–G18 (v1.1.0 / P7)

> **Status:** PLAN — awaiting approval (`approve plan` / `وافق على الخطة`) before `website/` scaffold or Stitch export execution.  
> **Product:** Awesome Arabic Skill (`arabic`) · **Register:** مصري أولاً for all page chrome  
> **Branch target:** `feat/website-v1.1.0`  
> **Gate:** G13–G18 must pass before `v1.1.0` tag

---

## 1. Goal

Ship an **Arabic-first RTL marketing + install site** that dogfoods the skill: copy is grounded in this repo, install strings match README, and the build deploys to a documented preview URL.

**Benchmark:** [impeccable.style](https://impeccable.style/) editorial bar.  
**Design source of truth:** [stitch-DESIGN.md](./stitch-DESIGN.md) (Stitch) → ported to [website-design-system.md](./website-design-system.md) tokens in `website/`.

---

## 2. Golden tests (acceptance)

| ID | Criterion | How to verify |
|----|-----------|---------------|
| **G13** | **8 routes render** | `/`, `/features`, `/install`, `/commands`, `/tutorials`, `/examples`, `/about`, `/docs` — no 404 in dev or static export |
| **G14** | **Install copy matches README** | `npx @mediabubble-adv/arabic-skill install` targets and examples byte-match root `README.md` Install section |
| **G15** | **3+ interactive components on mobile** | e.g. dialect switcher preview, copy-to-clipboard install, tabbed snippets, before/after toggle, mode-flow diagram (see [website-design-system.md §7](./website-design-system.md#7-component-inventory-behavior-specs)) |
| **G16** | **Masri UI copy passes audit** | `/arabic audit` on exported copy blocks; legacy + AI-likelihood per [audit-mode.md](../../arabic/references/audit-mode.md) |
| **G17** | **`npm run build` passes** | From `website/` package; TypeScript + Next.js App Router |
| **G18** | **Deploy preview URL documented** | Vercel (or chosen host) preview link in `website/README.md` + release playbook |

Fixtures (when implemented): `tests/golden/g13-g18-website.md` — manual checklist until automated runner ships.

---

## 3. Sitemap + SEO + AEO

| Route | Purpose | SEO title (Masri) | Meta description (Masri) | AEO intent |
|-------|---------|-------------------|--------------------------|------------|
| `/` | Positioning + flow + CTA | مهارة العربية الرائعة — شريكك المصري لكتابة المحتوى | ثبّت المهارة في Cursor وClaude وCodex. استشارة → توضيح → توصية → كتابة → مراجعة. مش ترجمة. | What is Awesome Arabic Skill? |
| `/features` | Capability bento | مميزات مهارة العربية — لهجات، تأنيس، مشروع، تدقيق | ١١+ لهجة، وعي المشروع، `/arabic audit`، خطط لمواقع وحملات وكتب. | What can the skill do? |
| `/install` | Install paths (G14) | ثبّت المهارة — npx وCursor وClaude وCodex | سطر واحد من التيرمنال. ٢٤ أداة مدعومة. أوامر التثبيت من README. | How to install arabic skill? |
| `/commands` | `/arabic` reference | أوامر `/arabic` — دليل سريع | guide، write، audit، plan، coach، voice، auto — مع أمثلة جاهزة للنسخ. | arabic skill commands list |
| `/tutorials` | Arabic-first walkthroughs | دروس عربية — ابدأ من هنا | شرح المشروع، التثبيت، وأول أوامر بالمصري الطبيعي. | How to use arabic skill tutorial |
| `/examples` | Before/after + samples | أمثلة — قبل وبعد التأنيس | شوف الفرق بين نص مترجم جامد ونص مصري طبيعي. | Arabic content examples skill |
| `/about` | MediaBubble + architecture | عن المهارة — MediaBubble | `arabic/` runtime، ٣٨ حزمة مرجعية، فلسفة المستشار قبل الكاتب. | Who makes Awesome Arabic Skill? |
| `/docs` | Hub → GitHub | الوثائق والمصادر | README، CHANGELOG، ٢٤ أداة، مساهمة — النسخة الكاملة على GitHub. | arabic skill documentation |

**Global SEO:** `lang="ar"` `dir="rtl"`; canonical per route; Open Graph Masri title + description; `robots` allow index on marketing routes.  
**AEO:** FAQ blocks on `/install` and `/features`; command tables as structured prose on `/commands`; no fake stats.

---

## 4. Stack + repo layout

**Stack:** Next.js App Router + TypeScript (see [website-design-system.md §1](./website-design-system.md#1-stack-recommended)).

```text
website/                    # created on Execute — not in repo until plan approved
├── app/
│   ├── layout.tsx          # dir=rtl, fonts, tokens
│   ├── page.tsx            # Home
│   ├── features/
│   ├── install/
│   ├── commands/
│   ├── tutorials/
│   ├── examples/
│   ├── about/
│   └── docs/
├── components/             # design-system components §7
├── content/                # Masri copy (from stitch prompts / /arabic write)
├── public/
├── package.json
└── README.md               # G18 preview URL lives here
```

---

## 5. Execution phases (plan-first)

| Phase | Work | Output | Gate |
|-------|------|--------|------|
| **A — Design (Stitch)** | Attach [stitch-DESIGN.md](./stitch-DESIGN.md); run [stitch-generation-runbook.md](./stitch-generation-runbook.md) §0–8 | 8 screens × desktop + mobile | Visual review |
| **B — Copy QA** | `/arabic audit` on [stitch-website-prompts-masri.md](./stitch-website-prompts-masri.md) tables; fix in place | G16 prep | Audit pass |
| **C — Scaffold** | `feat/website-v1.1.0`: Next.js in `website/` | `npm run dev` | Local render |
| **D — Port** | Map Stitch → React components; wire copy from `content/` | G13 routes | 8 routes |
| **E — Install sync** | Copy install block from README programmatically or CI check | G14 | String match |
| **F — Build + deploy** | `npm run build`; Vercel preview | G17, G18 | Green build + URL |

**Hard rule:** Phase C does not start until this plan is approved.

---

## 6. Stitch asset map

| Stitch screen | Next route | Prompt + copy |
|---------------|------------|---------------|
| Home | `/` | [stitch-website-prompts-masri.md §4.1](./stitch-website-prompts-masri.md#41-home-) |
| Features | `/features` | §4.2 |
| Install | `/install` | §4.3 (G14) |
| Commands | `/commands` | §4.4 |
| Tutorials | `/tutorials` | §4.5 |
| Examples | `/examples` | §4.6 |
| About | `/about` | §4.7 |
| Docs | `/docs` | §4.8 |

Mega-prompt (all screens): [stitch-website-prompts-masri.md §5](./stitch-website-prompts-masri.md#5-mega-prompt-كل-الصفحات-مرة-واحدة).

---

## 7. Dogfood commands

```text
/arabic plan website --dialect masri
/arabic write page --brief .arabic/briefs/website-home.yaml
/arabic audit --file docs/planning/stitch-website-prompts-masri.md
/arabic audit rtl --dir website/
```

Persist plan: `.arabic/projects/awesome-arabic-website/plan.md` (on Execute).

---

## 8. Out of scope (v1.1.0)

- Full `npx skills add` registry (deferred)
- Browser/screenshot RTL tier (tier-1 source only per P8)
- i18n locale switcher (site chrome stays Masri; dialect switcher is preview-only)
- CMS or user accounts

---

## 9. Related

- [website-design-system.md](./website-design-system.md) · [stitch-DESIGN.md](./stitch-DESIGN.md) · [stitch-generation-runbook.md](./stitch-generation-runbook.md)
- [implementation-plan.md §0.3](./implementation-plan.md#03-golden-test-master-table-g1g18) · [release-playbook.md](../engineering/release-playbook.md)
- [roadmap.md P7](./roadmap.md#p7--distribution-v110)
