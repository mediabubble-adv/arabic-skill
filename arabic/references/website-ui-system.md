# Website UI System — Pages, Blocks, Components, Microcopy

**Load when:** `/arabic plan website`, `write landing|page|website|ui`, `/arabic audit website` / `--surface website`, or improve targeting a marketing/React site.

> Content-facing catalog for website construction. Pair with Website Content Engine (persuasion structure), UI/UX Microcopy Engine (char limits), `bilingual-pipeline.md` (EN↔AR), and `rtl-audit.md` (markup).

---

## 0. Layers (top → bottom)

| Layer | What it is | ID prefix |
|-------|------------|-----------|
| **Chrome** | Persistent shell | `chrome.*` |
| **Page type** | URL/job of the screen | `page.*` |
| **Section / block** | Full-width narrative unit | `block.*` |
| **Component** | Reusable UI unit inside a block | `comp.*` |
| **Microcopy slot** | Single string field | `slot.*` |

Always assign stable IDs so audit issues and bilingual twins map 1:1.

### Instance disambiguation (repeated components)

Type-level IDs (`comp.button`, `block.features`) name the **pattern**. When the same pattern appears more than once on a page, add an **instance suffix**:

```text
{prefix}.{type}#{instance}
```

| Pattern | Example | When to use |
|---------|---------|-------------|
| Semantic slug from job/label | `comp.button#install`, `comp.button#learn-more` | Preferred — derived from CTA text, route, or `data-arabic-id` |
| Block + page role | `block.features#pricing`, `block.cta_band#footer` | Repeated section types on one page |
| Ordinal (last resort) | `comp.card#2`, `block.features#3` | Only when labels are identical and no stable semantic slug exists |

**Rules:**
1. One instance suffix per audited row in the component map — no duplicate `#install` on the same page.
2. Bilingual twins share the same base ID (`comp.button#install` in AR and EN).
3. Audit issues cite the **full** ID (`comp.button#install`, not bare `comp.button`) when targeting a specific instance.
4. `/arabic improve --from-audit` uses these full IDs in `scope_paths` / failing-component list so rewrites hit the right button/card, not every instance of the type.

---

## 1. Chrome

| ID | Job | Content fields | Arabic / RTL notes | Audit fails when |
|----|-----|----------------|--------------------|------------------|
| `chrome.header` | Brand + primary nav + primary CTA | logo alt, nav labels, header CTA | Nav: short Masri/MSA-appropriate labels; CTA ≤25 chars | Nav labels English-only on AR site; CTA longer than button |
| `chrome.nav` | Wayfinding | item labels, current-page aria | Prefer "من نحن" / "تواصل معنا" patterns per brand formality | Inconsistent register vs page body |
| `chrome.footer` | Trust + legal + secondary links | columns, dogfood line, legal | Keep legal clearer; marketing tone lighter | Missing required legal links; broken dogfood SSOT |
| `chrome.sticky_cta` | Persistent install/buy bar | short CTA, dismiss aria | Mobile-first; one action | Competing secondary CTAs |

---

## 2. Page types (in scope)

| ID | Job | Typical blocks (order) |
|----|-----|-------------------------|
| `page.home` | Positioning + proof + path to install/buy | hero → logos/proof → features → before/after or demo → CTA |
| `page.landing` | Single offer conversion | hero → proof → benefits → objection/FAQ → CTA |
| `page.thank_you` | Confirm action + next step | confirmation → what happens next → secondary link |
| `page.blog_index` | Discover articles | intro → post cards → filters optional |
| `page.blog_post` | Teach / rank | H1 → body → FAQ → CTA |
| `page.portfolio` | Show work | intro → project cards → CTA |
| `page.gallery` | Visual browse | intro → grid → lightbox labels |
| `page.product` | Sell SKU | hero product → benefits → specs → reviews → purchase CTA |
| `page.checkout` | Complete purchase | steps → form → order summary → pay CTA |
| `page.saas_marketing` | Convert to trial/signup | hero → social proof → features → pricing → FAQ → CTA |
| `page.dashboard` | App shell empty/loaded states | page title → filters → table/cards → empty state |
| `page.analytics` | Metric glance | page title → KPI labels → chart empty/error |

**Out of scope for this file:** deep analytics widget taxonomies (charts taxonomy deferred).

---

## 3. Sections / blocks

| ID | Job | Required slots | Content rules |
|----|-----|----------------|---------------|
| `block.hero` | First-screen promise | eyebrow?, title, subtitle?, primary CTA, secondary CTA? | Problem in reader words + promise; one dominant CTA |
| `block.social_proof` | Trust strip | logos alt / metric labels | Numbers credible; no fake stats |
| `block.features` | Capability grid | 3–8 cards: title + body | Benefits not feature dumps |
| `block.bento` | Highlight mix | as features | One accent card max |
| `block.testimonials` | Social proof stories | quote, name, role | Specific outcomes; dialect-consistent |
| `block.pricing` | Plan choice | plan name, price, bullets, CTA | Gulf: show price often helps; EG: quote OK |
| `block.faq` | Objections / AEO | Q as heading, A first sentence direct | Min ~6 for marketing FAQ |
| `block.cta_band` | Mid/end conversion | title, body?, CTA | Repeat promise; one action |
| `block.newsletter` | Capture email | title, helper, submit CTA, privacy note | Clear value of email |
| `block.logos` | Credibility row | logo alts | Decorative alts empty or brand names |
| `block.before_after` | Contrast proof | before label, after label, samples | Before may be intentional MSA/stiff |
| `block.product_gallery` | Visuals | captions optional | Captions short |
| `block.checkout_steps` | Progress | step labels | Numbered; dialect verbs for actions |

---

## 4. Components

| ID | Also called | Job | Key slots | Length / UI | Fail modes |
|----|-------------|-----|-----------|-------------|------------|
| `comp.button` | CTA, btn | Commit action | label | 15–25 AR chars | Vague ("ارسال"); English on AR UI |
| `comp.link` | text link | Navigate | label | Short | Same as button language |
| `comp.card` | tile | Bite-sized story | title, body, link? | Body 1–3 lines mobile | Feature lists stuffed in |
| `comp.badge` | chip, pill | Status/tag | label | Very short | Sentence-length badges |
| `comp.hero` | hero section | see `block.hero` | — | H1 40–60 | Dual CTAs equally loud |
| `comp.slider` | carousel | Rotate panels | slide title/body/CTA, aria | Keep ≤3 ideas/slide | Autoplay without pause label |
| `comp.tabs` | — | Switch panels | tab labels | Parallel grammar | Mismatched registers |
| `comp.accordion` | collapse | Progressive disclose | trigger, panel | FAQ-friendly | Walls of text |
| `comp.form` | — | Collect input | labels, placeholders, helpers, submit | Helper ≠ placeholder | Placeholder-as-only-label |
| `comp.form_multistep` | wizard | Long flows | step titles, next/back, progress | One topic/step | Unclear progress |
| `comp.modal` | popup, dialog | Interrupt + decide | title, body, confirm, dismiss | Confirm destructive clearly | No dismiss / focus trap gaps (UX) |
| `comp.toast` | snackbar | Transient feedback | message | ≤80 chars | Blameful errors |
| `comp.empty_state` | — | No data yet | title, body, CTA | Human, invitational | "No results found" tone |
| `comp.table` | — | Dense data | headers, empty cell | Headers nouns | Verb headers |
| `comp.product_card` | — | Merch unit | title, price, CTA | Price clarity | Hidden currency |
| `comp.sticky_cta` | see chrome | — | — | — | — |
| `comp.chart_label` | KPI label | Dashboard metric | name, unit, empty | Short MSA/L3 OK | Poetic slang on metrics |

### Buttons vs links vs blocks

- **Button:** primary/secondary action that *changes state* or submits (ثبّت، اشتري، ابعت).
- **Link:** navigates without committing (شوف الأمثلة، الوثائق).
- **Block:** full-width section composed of components; owns narrative order.
- **Component:** reusable piece; owns slots; may appear in many blocks.

---

## 5. Microcopy slots

| Slot | Use | Rules |
|------|-----|-------|
| `slot.label` | Visible field name | Always present for inputs (a11y) |
| `slot.placeholder` | Example value | Never the only instruction |
| `slot.helper` | How/why | Calm; under field |
| `slot.error` | Validation fail | Specific fix; no blame |
| `slot.success` | Completed | Confirm + next step |
| `slot.aria` | Screen reader | Descriptive; dialect-light OK |
| `slot.cta` | Action | Verb-led; RTL critical word first |

---

## 6. Content creation recipe (per component)

1. Name the **job** (one sentence).
2. List **slots** with IDs.
3. Draft first locale per `bilingual-pipeline.md`.
4. Check char limits (UI/UX engine).
5. Twin locale from intent map.
6. Audit against fail modes in this table.

---

## 7. Website audit map

When auditing a site, emit:

```markdown
### Component map
| ID | Locale | Verdict | Note |
|----|--------|---------|------|
| block.hero | ar | fail | translationese title |
| comp.button#install | ar | pass | — |
```

Feed failing IDs into the saved audit report and `/arabic improve --from-audit`.

---

## Related

- `engines.md` — Website Content Engine · UI/UX Microcopy Engine
- `bilingual-pipeline.md` — `ar_en` / `en_ar`
- `audit-mode.md` — scores + report handoff
- `rtl-audit.md` — markup direction
- `project-mode.md` — staged website plans
