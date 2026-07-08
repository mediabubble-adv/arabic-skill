# 🏗 Project Mode — Staged Execution for Large Deliverables

**Load when:** The task is multi-piece or long-form — a website, a campaign bundle, an editorial/content system, a book, or a **series** (YouTube/podcast). Triggered by the **Project** row in the SKILL.md Mode Router, or `/arabic plan website` / `/arabic plan campaign` / `/arabic plan series` / `/arabic book`.
**Pair with:** `references/advisory-mode.md` (operating posture), `references/intake-protocols.md` (clarify), `references/engines.md` (write), `references/output-templates.md` (deliverable shapes), and the project type's specialist file (below).

> **Why staged:** Large Arabic deliverables fail when written in one shot — dialect drifts, structure loses MECE discipline, and continuity breaks. Project Mode trades one big generation for seven small, reviewable steps. **Never one-shot a website, campaign, or book.**

---

## 1. The Seven Stages

| # | Stage | Goal | Gate to advance |
|---|---|---|---|
| 1 | **Discuss** | Understand intent, audience, scope | User confirms the goal in one sentence |
| 2 | **Research** | Gather evidence (repo, brand, market) | Evidence summary shown; no invented facts |
| 3 | **Recommend** | Propose direction + structure | User picks a direction |
| 4 | **Plan** | MECE outline of all pieces | User approves the plan |
| 5 | **Execute** | Write piece by piece, in order | Each piece passes its mini-review |
| 6 | **Test** | QA the whole against the plan | Audit + taboo + continuity pass |
| 7 | **Refine** | Apply fixes, finalize, hand off | User signs off |

**Rule:** Advance only when the current gate is met. If the user says "just write it," compress stages 1–4 into a single confirm — but **never skip stage 6 (Test)**.

---

## 2. Stage Detail

### 1. Discuss
- Apply the 70/30 rule from `intake-protocols.md` (3 core + 1–2 dynamic questions).
- Lock: objective, target dialect/register, audience, market(s), scope size, deadline/season.
- Output: a one-line restatement the user confirms.

### 2. Research
- **Brand/voice:** load `voice.md` if present.
- **Project/repo:** if the deliverable describes a real product or codebase, run `references/project-context-scanner.md` first — write only from evidence.
- **Market/season:** check `references/seasonal-calendar.md` and the relevant `domains/` file.
- Output: a short **evidence summary** ("here's what I know, here's what I'm assuming, here's what I still need").

### 3. Recommend
- Propose 1–2 directions with a clear rationale, not a menu of ten.
- Recommend structure (sitemap / channel mix / chapter arc) and register.
- Output: a recommendation summary (see `output-templates.md` Template H).

### 4. Plan
- Build a **MECE outline** of every piece: no overlaps, no gaps.
- Label each piece with type, register, length, and its job.
- Output: the project plan (see `output-templates.md` Template I) for approval.

### 5. Execute
- Write **one piece at a time, in dependency order** (e.g. homepage before subpages; premise before chapters).
- Carry a **continuity ledger** (terms, names, tone, claims) between pieces.
- Run a mini humanization + dialect-purity pass after each piece.

### 6. Test
- Run the full Audit (`references/audit-mode.md`, 9-point QA).
- Run the taboo scan (`references/taboos.md`) on every piece.
- Run **continuity QA**: consistent terminology, register, names, and no contradicting claims across pieces.

### 7. Refine
- Apply fixes, resolve any flagged uncertainties, deliver the bundle with an index.
- Offer next-step options (translate summary, variants, schedule).

---

## 3. Project Types

### 🌐 Website (`/arabic plan website`)
- **Research:** scan the real product/repo (`project-context-scanner.md`) — do not invent features.
- **Plan:** sitemap as MECE outline (home, product/service, about, pricing, FAQ, contact, blog hubs). Map pages to `references/website-ui-system.md` page types + section/block IDs.
- **Language order:** load `references/bilingual-pipeline.md`. Default `--lang-order ar_en`; support `en_ar`. Persist `lang_order` + `languages` on the plan continuity ledger.
- **Execute order:** home → core offer pages → trust pages (about/FAQ) → blog/SEO (apply `seo-aeo-masri.md` for Egypt). For each page, write the first locale fully, then the twin from the intent map (never literal translate).
- **Continuity:** one brand lexicon and register across all pages **and** both locales (shared component IDs).

### 📣 Campaign bundle (`/arabic plan campaign`)
- Run the **Campaign Bundle Builder** in `references/ads-service-matrix.md` §3 as stages 3–5.
- Map channels to funnel; one core message adapted per platform; seasonal check; per-asset taboo scan.

### 🗂 Editorial / content system
- **Plan:** content pillars + cadence + format mix as MECE outline.
- **Execute:** templates first, then a sample set per pillar; define the repeatable voice rules.

### 📚 Book / long-form (`/arabic book`)
- Run `references/book-writing.md` as stages 3–6 (premise → outline → chapter blueprint → continuity QA).
- **Execute order:** premise + promise → full outline → chapter-by-chapter, carrying the voice/continuity ledger.

### 📺 Series (`/arabic plan series`)
- **Use for:** YouTube series, podcast seasons, multi-episode educational arcs — not single videos (use `write youtube` / `write video`).
- **Hard gate:** No episode scripts until the user approves the series plan (`approve plan` / `وافق على الخطة`).
- **Plan must include (narrative bible):**
  - **Characters / hosts** — who speaks, persona, register
  - **Locations / settings** — recurring visual or thematic anchors
  - **Key beats** — arc across the season (hook → tension → payoff)
  - **Opening** — how episode 1 earns the next click
  - **Ending** — series finale promise and CTA
- **Research:** audience platform norms, episode length, publishing cadence.
- **Execute order:** bible → episode outline table → pilot episode brief → episode-by-episode (each gated).
- **Continuity:** series lexicon, recurring hooks, forbidden drift in host voice.

---

## 4. Continuity Ledger (carry across every piece)

Track and reuse, never re-decide mid-project:

- **Lexicon:** chosen term for each key concept (one term, used everywhere).
- **Names & entities:** product, people, places — exact spelling.
- **Register:** the locked L-level and dialect.
- **Language order:** `lang_order` (`ar_en` | `en_ar`) and `languages` (`ar`, `en`, or both) for bilingual website/UI work.
- **Claims:** every factual/marketing claim made, so later pieces don't contradict earlier ones.
- **Voice markers:** the 1–2 humanization markers chosen for this project.

---

## 5. Project Mode Checklist

- [ ] Goal restated and confirmed (Discuss)
- [ ] Evidence summary shown; nothing invented (Research)
- [ ] Direction + structure recommended and chosen (Recommend)
- [ ] MECE plan approved (Plan)
- [ ] Pieces written in order with continuity ledger (Execute)
- [ ] Full audit + taboo + continuity QA passed (Test)
- [ ] Fixes applied, bundle delivered with index, sign-off (Refine)
