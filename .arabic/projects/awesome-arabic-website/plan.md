# Website Project Plan — Awesome Arabic Skill (v1.1.0)

> **Command:** `/arabic plan website --dialect masri`  
> **Status:** Approved (`approve plan` / `وافق على الخطة` — 2026-07-04)  
> **Register:** مصري أولاً (L3) · **Audience:** mixed (dev + skill-new)  
> **North star:** Install copy conversion (G14)

---

## 1. Goal (confirmed)

Ship an Arabic-first RTL marketing site whose primary job is **ثبّت المهارة** conversion, with dogfood transparency on `/about` and footer. Positioning lock: **مش مجرد ترجمة**.

---

## 2. Evidence summary

| Source | Facts used |
|--------|------------|
| `README.md` | Install commands (G14), 24 tools, flow diagram, v1.0.0 |
| `arabic/SKILL.md` | Modes, commands, dialect router, project mode |
| `docs/planning/website-dogfood.md` | 8 routes, SEO titles, G13–G18 |
| Design spec | Familiarity fork on `/install`, footer transparency |

**Assumptions:** Site chrome stays Masri; dialect switcher on home is preview-only. No fake stats.

---

## 3. MECE sitemap (8 routes)

| # | Route | Job | CTA |
|---|-------|-----|-----|
| 1 | `/` | Positioning + one proof widget + bento | → `/install` |
| 2 | `/install` | Familiarity fork + G14 + tabs + FAQ | copy G14 |
| 3 | `/features` | Capability bento | → `/install` |
| 4 | `/commands` | Verb table + copy buttons | → `/install` |
| 5 | `/tutorials` | 3 walkthroughs (v1.1 cap) | G14 at end |
| 6 | `/examples` | Before/after toggles | → `/install` |
| 7 | `/about` | Dogfood dossier + audit snapshot | trust → `/install` |
| 8 | `/docs` | GitHub hub + install card | → `/install` |

Every route links to `/install` above fold, sticky band, or end CTA.

---

## 4. Continuity ledger

| Concept | Locked term |
|---------|-------------|
| Product | **المهارة** |
| Full name | **مهارة العربية الرائعة** |
| Install CTA | **ثبّت المهارة** |
| User address | **إنت** |
| Flow | استشارة → توضيح → توصية → كتابة → مراجعة |
| Positioning | **مش مجرد ترجمة** |
| Copy toast | **تم النسخ** |

---

## 5. Execute order

1. Briefs → `.arabic/briefs/website-*.yaml`
2. Copy → `website/content/*.md` (via `/arabic write page`)
3. Audit → `.arabic/audits/website-2026-07-04.md`
4. Stitch reference (Phase A — manual)
5. Next.js scaffold (Phase C — after Tasks 0–2)
6. Port + G14 validator + build + deploy

---

## 6. Golden tests

| ID | Blocker |
|----|---------|
| G13 | 8 routes render |
| G14 | Install matches README |
| G15 | 3+ mobile interactives |
| G16 | Masri audit pass (this plan) |
| G17 | `npm run build` |
| G18 | Preview URL documented |

Fixture: `tests/golden/g13-g18-website.md`

---

## 7. Out of scope (v1.1.0)

English mirror, CMS, live skill demo, browser RTL tier, PostHog wiring, `npx skills add` registry.
