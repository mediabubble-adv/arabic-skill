# 🔍 SEO & AEO — Saudi / KSA Search

> **Regional references:** For Egypt, load `seo-aeo-masri.md`. For the Gulf (UAE/Kuwait/Qatar/Bahrain/Oman), load `seo-aeo-gulf.md`. For Levantine (Syria/Lebanon/Jordan/Palestine), load `seo-aeo-levantine.md`.

**Load when:** Blog, SEO, AEO, or website-copy task targeting Saudi Arabia, or `/arabic seo` / `/arabic aeo` for the KSA market.
**Pair with:** `dialects/ksa.md`, `references/engines.md` (SEO + AEO engines), `domains/` file if an industry applies.

---

## 1. Saudi Search Behavior

- **Mobile-first, tech-forward:** Saudi search is mobile-dominant; high English/Arabic code-switching, especially in tech/SaaS queries.
- **Typed search skews MSA:** Formal contexts (commerce, professional) push typed queries toward MSA; sub-register choice is regional (Riyadhi most common in search).
- **Voice/long-tail skews KSA colloquial:** Spoken queries use everyday KSA ("شنو الأحسن…", "كيفاش أشتري…"). Voice search is emerging rapidly.
- **English dominance in tech:** B2B and B2C tech searches lean heavily English; Arabic covers traditional, e-commerce, and services.
- **Local + commercial intent:** "قريب مني", city names ("في الرياض"), and commercial intent ("أسعار", "عروض") drive high-conversion search. Real-estate, automotive, and luxury goods are major categories.

---

## 2. The MSA vs KSA Query Split

Map every target keyword on this split before writing:

| Intent type | Typical form | Example | Use in |
|---|---|---|---|
| Informational (typed) | MSA / mixed | "كيفية اختيار الهاتف المناسب" | Titles, H1, body |
| Informational (voice/long-tail) | KSA | "شنو أحسن موبايل في السعودية" | H2s, FAQ, AEO answers |
| Commercial | MSA + brand/category | "أسعار الهواتف في السعودية" | Titles, meta, landing |
| Local | MSA + city | "محلات هواتف في جدة" | Title, NAP, schema |
| English/Tech | Latin / English | "best smartphone Saudi Arabia" | Secondary keywords, tags |

### MSA vs KSA long-tail forms

Cover **both** MSA-leaning and KSA forms in H2/FAQ blocks, not only the title/H1.

- **Orthographic variants** — same word, alternate spelling (hamza/alef, etc.)
- **KSA equivalents** — colloquial word for the same search intent (not a spelling difference)

#### Orthographic variants

| Form A | Form B | SEO use |
|---|---|---|
| إيه / إيش | ايه / ايش | FAQ questions |
| إمتى | امتى | Long-tail |
| كيفاش | كيفش | FAQ + HowTo schema |

#### KSA equivalents

| MSA / standard | KSA equivalent | SEO use |
|---|---|---|
| ماذا | شنو، إيش | Include in body; KSA in FAQ |
| أين | وين | Long-tail headings |
| كيف | كيفاش، كيفة | FAQ + HowTo |
| أريد | أبي، أبغى | Conversational queries |
| متى | إمتى، متى | Long-tail |
| جيد | زين، حلو | High-volume KSA term |
| جميل | حلو، ناعم | Reviews, praise, product copy |
| أيضاً | كمان، برضه | Conversational FAQ phrasing |

**Local queries:** keep **قريب** in "قريب مني" and city names (الرياض, جدة, الدمام) — same lemma in MSA and KSA; no alternate spelling to target.

**Rule:** Write **titles/meta in MSA-leaning Arabic** (matches typed search), but **answer in KSA** inside FAQ/AEO blocks (matches voice + feels local). This dual-register approach captures both surfaces.

---

## 3. Title & Description Formulas

### Title tag (≤60 chars practical Arabic)
```
[الكلمة المفتاحية] + [زاوية القيمة] + [محدد محلي/سنة]
```
- `أفضل الهواتف الذكية في السعودية 2026 — دليل الشراء`
- `أسعار العقارات في الرياض (تحديث يونيو 2026)`

### Meta description (≤155 chars)
```
[وعد واضح] + [دليل/رقم] + [دعوة لطيفة]
```
- `اعرف أسعار الهواتف في السعودية وشنو الأحسن لاحتياجاتك. مقارنة شاملة + نصايح توفير. اقرأ الدليل اليوم.`

### Heading rules
- **H1:** one, MSA-leaning, contains the primary keyword.
- **H2/H3:** mix MSA keywords with KSA question phrasing ("طب كيفاش أعرف…").

---

## 4. AEO — Answer Engine Optimization

AI overviews and voice assistants extract **direct answers**. Structure for extraction:

- **Lead with the answer** in 40–55 words, then expand. No throat-clearing.
- **FAQ blocks in KSA** — write questions exactly as people *say* them:
  - "الموبايل بيستهلك بطارية قد إيه؟"
  - "الفيلا فيها كم غرفة أختار؟"
- **One question = one self-contained answer.** Don't require the previous answer for context.
- **Use lists and tables** — AI overviews lift structured data first.
- **Entity clarity:** name brands, places, and prices explicitly; ambiguity gets skipped.

### AEO answer block template
```
س: [السؤال بالسعودي زي ما الناس بتقوله]
ج: [إجابة مباشرة في جملة أو اتنين] — [تفصيلة داعمة قصيرة].
```

---

## 5. Schema Patterns (priority for Saudi SERPs)

| Schema | Use for | Wins |
|---|---|---|
| `FAQPage` | Articles, product, service pages | FAQ rich result + AEO extraction |
| `LocalBusiness` | Any business with a location | Map pack, "قريب مني" |
| `Product` + `AggregateRating` | E-commerce | Price + stars in SERP |
| `Article` / `BlogPosting` | Content | Eligibility for overviews |
| `BreadcrumbList` | Site structure | Cleaner SERP path |
| `HowTo` | Tutorials ("كيفاش…") | Step results + voice |

- Keep visible Arabic text and schema values consistent.
- Mark prices in SAR; include `priceCurrency: "SAR"`.

---

## 6. AI-Overview Optimization Notes

- **Match conversational queries:** overviews trigger on natural-language questions — your H2s should mirror them in KSA.
- **Be quotable:** one crisp, self-contained sentence per key claim is more liftable than a dense paragraph.
- **Freshness signals:** include the year and update dates; Saudi commercial queries reward recency (but never fake recency — see `references/trends-and-hooks.md`).
- **E-E-A-T in Arabic:** author bylines, real credentials, and named local experience ("بخبرة 10 سنين في السوق السعودي") build trust signals.
- **Don't keyword-stuff:** modern Arabic SEO rewards semantic coverage (synonyms, MSA+KSA variants) over repetition.

---

## 7. Pre-Delivery SEO Checklist

- [ ] Primary keyword in title, H1, first 100 words, meta
- [ ] Title MSA-leaning; FAQ answers in KSA
- [ ] Each FAQ answer self-contained (AEO-ready)
- [ ] Local terms / city included if local intent
- [ ] Schema chosen and consistent with visible copy
- [ ] Year/recency present and truthful
- [ ] Humanization pass applied (`references/humanization-protocol.md`)
