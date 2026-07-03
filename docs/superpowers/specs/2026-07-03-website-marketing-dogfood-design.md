# Design Spec: Website as Install-First Marketing + Dogfood Proof

> **Status:** Approved (brainstorming 2026-07-03)  
> **Product:** Awesome Arabic Skill (`arabic`) · **Register:** مصري أولاً  
> **Version gate:** v1.1.0 · **Golden tests:** G13–G18  
> **Branch target:** `feat/website-v1.1.0`

---

## 1. Summary

Ship an Arabic-first RTL marketing site whose **primary job is install conversion** (`npx @mediabubble-adv/arabic-skill install`), while **proving the skill** through full transparency: every page[...]

**North star:** A visitor copies the canonical install command with confidence — whether they are a Cursor power user or a founder hearing about “skills” for the first time.

**Tagline lock:** Positioning uses **مش مجرد ترجمة** (not “مش ترجمة”).

**Approach:** Install funnel home (Approach 1) + one selective proof widget on home (from Approach 2). Full dogfood transparency on `../../about.md` + footer (user choice D).

---

## 2. Goals and non-goals

### Goals

- Maximize **install copy events** (G14 block on `/install`)
- Serve **mixed audience** with one hero and a **familiarity fork** on `/install`
- Make dogfood **verifiable** (command trail, audit snapshot, repo links)
- Pass **G13–G18** before `v1.1.0` tag
- Support **SEO/AEO** on `/install`, `/commands`, `/tutorials`, `/features`

### Non-goals (v1.1.0)

- English-primary mirror site
- Live in-browser skill demo or audit re-run
- Blog/changelog on-site (GitHub only)
- Per-dialect landing pages
- Paid ads landing pages or A/B infrastructure
- CMS, user accounts, or public `.arabic/` raw folder

---

## 3. Audience and conversion model

| Segment | Entry | Path | Success |
|---------|-------|------|---------|
| Solo dev (Cursor/Claude/Codex) | README, `/`, `/commands` | `/install` → **أنا مطور** | G14 copied |
| Marketer/founder (skill-new) | Social, `/examples`, `/tutorials` | `/install` → **أول مرة** → G14 | G14 copied |
| Technical evaluator | `/commands`, `/docs` | Tool tabs + GitHub | G14 or docs → install |
| Skeptic | `/examples`, `../../about.md` | Proof → `/install` | Copy after trust |

---

## 4. Information architecture

### 4.1 Routes (G13 — 8 routes)

| Route | Job |
|-------|-----|
| `/` | Install CTA + one proof widget + short bento |
| `/install` | Familiarity fork + G14 + tool tabs + FAQ |
| `/features` | Capability bento → install |
| `/commands` | Verb table + copy buttons → install |
| `/tutorials` | 3 walkthroughs → G14 at end |
| `/examples` | Before/after toggles → install |
| `../../about.md` | Full dogfood dossier |
| `/docs` | GitHub hub + install card |

Every route links to `/install` (above fold, sticky band, or end CTA).

### 4.2 Home (`/`)

**Above the fold**

- Headline: advisor-first Arabic content in IDE — **مش مجرد ترجمة**
- Sub: استشارة → توضيح → توصية → كتابة → مراجعة
- Primary CTA: **ثبّت المهارة** → `/install`
- Secondary: **شوف أمثلة** → `/examples` (text link)
- One interactive proof: dialect switcher preview **or** single before/after card (pick one at build)

**Below the fold**

- Interactive mode-flow diagram
- Feature bento (4 tiles max) → `/features`
- Final CTA band with `npx` teaser (full block only on `/install`)

**Mobile:** sticky install bar after ~40vh scroll (counts toward G15).

**Dogfood on home:** footer only — no case-study hero.

### 4.3 Install (`/install`) — familiarity fork

**Path A — أنا مطور (default on desktop)**

1. Canonical G14 block from README + copy button + toast (**تم النسخ**)
2. Tool tabs: Cursor · Claude · Codex · … (top 6 + “كل الأدوات” → `/docs`)
3. First command teaser: `/arabic guide` + copy
4. Trust strip: «الصفحة دي اتكتبت بـ `/arabic` — [شوف إزاي](../../about.md)»

**Path B — أول مرة أسمع عن المهارات**

1. إيه المهارة؟ — skills explained in ~3 sentences (Masri)
2. هتعمل إيه؟ — one outcome sentence
3. ثبّت دلوقتي — **same G14 block** as Path A
4. Optional: «عايز تشوف قبل ما تثبت؟» → `/examples` · `/tutorials`

**Shared**

- FAQ (3–4 items) for AEO: مجانية؟ · Cursor بس؟ · vs ChatGPT؟ · GitHub؟
- SEO title: ثبّت المهارة — npx وCursor وClaude وCodex

**G14 rule:** Single source of truth = root `README.md` Install section; CI or build-time check prevents drift.

### 4.4 Supporting routes

**`/examples`** — 3–5 before/after cards; toggle MSA-bleed vs humanized; tag *اتولد بـ `/arabic write`*; bottom CTA **ثبّت وجرّب على مشروعك**.

**`/commands`** — verb table with copy buttons; static palette demo; FAQ → `/arabic guide`; not a full manual.

**`/tutorials`** (max 3 for v1.1)

| # | Title | Outcome |
|---|-------|---------|
| 1 | ثبّت المهارة في ٣ دقايق | G14 + `/arabic guide` |
| 2 | اكتب أول بوست مصري | brief → write |
| 3 | راجع نصك قبل ما تنشر | `/arabic audit` |

**`/features`** — bento + mid-page and footer install CTAs.

**`/docs`** — install card first; then GitHub README, CHANGELOG, 24-tool index.

### 4.5 Dogfood transparency

**Footer (every page)**

```text
اتبنى بـ /arabic · [إزاي اتبنى؟ → ../../about.md] · [GitHub] · [الوثائق → /docs]
```

**`../../about.md` sections**

| Section | Source |
|---------|--------|
| Mission | `/arabic write` — includes **مش مجرد ترجمة** |
| Timeline | plan → write → audit → ship |
| Command trail | actual `/arabic` commands run |
| Audit summary | G16 snapshot (legacy + AI-likelihood + date) |
| Repo links | `website-dogfood.md`, stitch prompts, `SKILL.md` |
| Architecture | `arabic/` runtime, 38 reference packs, 24 tools |
| MediaBubble | one paragraph, no hard-sell |

Audit snapshot **frozen at build time** — `../../about.md` does not drift post-deploy.

**Cross-links:** install trust strip; examples card tags; tutorials dogfood link.

---

## 5. Copy and continuity ledger

| Concept | Locked term | Avoid |
|---------|-------------|-------|
| Product | **المهارة** | skill alone |
| Full name | **مهارة العربية الرائعة** | — |
| Install CTA | **ثبّت المهارة** | حمّل، نزّل |
| User address | **إنت** | أنتم |
| Flow | استشارة → توضيح → توصية → كتابة → مراجعة | — |
| Positioning | **مش مجرد ترجمة** | مش ترجمة; “AI partner” fluff |
| Copy toast | **تم النسخ** | Copied, تم بنجاح |

**Technical:** `dir="rtl"` `lang="ar"`; commands/code LTR JetBrains Mono; tool names in English.

---

## 6. `/arabic` production pipeline

```text
0. /arabic plan website --dialect masri
     → .arabic/projects/awesome-arabic-website/plan.md
     → Gate: approve plan / وافق على الخطة

1. Per-route briefs → .arabic/briefs/website-{route}.yaml

2. /arabic write page --brief .arabic/briefs/website-<route>.yaml
     → website/content/<route>.md

3. /arabic audit --file website/content/
     → .arabic/audits/website-<date>.md

4. Stitch (stitch-DESIGN.md) → Next.js port; copy from content/ only

5. /arabic audit rtl --dir website/

6. npm run build → deploy → freeze audit into ../../about.md
```

Design source: [stitch-DESIGN.md](../../planning/stitch-DESIGN.md) → [website-design-system.md](../../planning/website-design-system.md).

---

## 7. Stack and components

**Stack:** Next.js App Router + TypeScript (see website-design-system.md §1).

**Interactive components (G15 — need 3+ on mobile)**

- Copy-to-clipboard install blocks
- Tool tabs on `/install`
- Expandable FAQ
- Before/after toggle on `/examples`
- Sticky install bar (home mobile)
- Dialect switcher preview **or** before/after on home (one only)
- Mode flow diagram

**Design benchmark:** impeccable.style editorial bar; dark-first tokens from design system.

---

## 8. SEO and AEO

- Unique Masri `title` + `description` per route (see [website-dogfood.md §3](../../planning/website-dogfood.md))
- `lang="ar"` `dir="rtl"`; canonical per route; Open Graph Masri
- FAQ blocks: `/install`, `/features`
- Structured prose on `/commands` for AI answers
- No fake stats or superlatives
- Positioning line uses **مش مجرد ترجمة**

**Expected traffic**

| Source | Landing | Funnel |
|--------|---------|--------|
| README | `/` or `/install` | Fast path |
| Search/AEO | `/commands`, `/install`, `/tutorials` | → install |
| Social | `/examples` | proof → install |
| GitHub | `/docs` | hub → install |

---

## 9. Success metrics

| Metric | Track | v1.1 |
|--------|-------|------|
| Install CTA clicks | ثبّت المهارة events | Baseline |
| Copy events | G14 + guide copy | ≥1 on `/install` visit (qualitative) |
| Funnel | `/` → `/install` → copy | By path (مطور vs مبتدئ) |
| Proof | `../../about.md`, `/examples` engagement | Qualitative |
| Quality | G16 audit | Hard block pre-ship |

Event hooks ready (PostHog or Vercel Analytics); dashboards post-launch.

---

## 10. Golden tests (G13–G18)

| ID | Requirement | Verification |
|----|-------------|--------------|
| G13 | 8 routes render | No 404 in dev/export |
| G14 | Install matches README | Byte-match root README Install |
| G15 | 3+ mobile interactives | Copy, tabs, FAQ, toggles, sticky |
| G16 | Masri audit pass | `/arabic audit` before ship; snapshot on ../../about.md |
| G17 | Build passes | `npm run build` in `website/` |
| G18 | Preview URL | `website/README.md` + release playbook |

Fixture (future): `tests/golden/g13-g18-website.md`

---

## 11. Doc sync after implementation

| File | Updates |
|------|---------|
| [website-dogfood.md](../../planning/website-dogfood.md) | Install fork, transparency, **مش مجرد ترجمة** |
| [stitch-website-prompts-masri.md](../../planning/stitch-website-prompts-masri.md) | Hero lines + ledger |
| [website-design-system.md](../../planning/website-design-system.md) | Footer + install fork refs |
| [CHANGELOG.md](../../../CHANGELOG.md) | v1.1.0 website entry |

---

## 12. Execution order (high level)

1. Approve this spec + existing `website-dogfood.md` plan gate
2. Phase A: Stitch generation (runbook)
3. Phase B: `/arabic audit` on copy
4. Phase C: Scaffold `website/` on `feat/website-v1.1.0`
5. Phase D–F: Port, G14 sync, build, deploy (G17–G18)

**Hard rule:** No `website/` scaffold until plan gate cleared (`approve plan`).

---

## 13. Related

- [website-dogfood.md](../../planning/website-dogfood.md)
- [website-design-system.md](../../planning/website-design-system.md)
- [stitch-website-prompts-masri.md](../../planning/stitch-website-prompts-masri.md)
- [implementation-plan.md §0.3](../../planning/implementation-plan.md#03-golden-test-master-table-g1g18)
