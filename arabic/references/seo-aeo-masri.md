# 🔍 SEO & AEO — Egyptian / Masri Search

**Load when:** Blog, SEO, AEO, or website-copy task targeting Egypt, or `/arabic seo` / `/arabic aeo` for the Egyptian market.
**Pair with:** `dialects/masri.md`, `references/engines.md` (SEO + AEO engines), `domains/` file if an industry applies.

---

## 1. Egyptian Search Behavior

- **Mobile-first, voice-growing:** Most Egyptian search is mobile; voice search is rising and is **more Masri/colloquial** than typed search.
- **Typed search skews MSA:** Keyboards, formality, and habit push typed queries toward MSA even from Masri speakers.
- **Voice/long-tail skews Masri:** Spoken queries use everyday Masri ("إزاي أعمل…", "إيه أحسن…").
- **English & Franco-Arabic:** Tech/younger audiences search in English or Franco ("3arabi" / Latin-script Arabic). Cover key English terms too.
- **Local intent is huge:** "قريب مني", city names, and neighborhood names ("في المعادي") drive high-conversion local search.

---

## 2. The MSA vs Masri Query Split

Map every target keyword on this split before writing:

| Intent type | Typical form | Example | Use in |
|---|---|---|---|
| Informational (typed) | MSA / mixed | "كيفية اختيار تكييف مناسب" | Titles, H1, body |
| Informational (voice/long-tail) | Masri | "إزاي أختار تكييف كويس" | H2s, FAQ, AEO answers |
| Commercial | MSA + brand/category | "أسعار تكييفات في مصر" | Titles, meta, landing |
| Local | MSA + place | "صيانة تكييف القاهرة" | Title, NAP, schema |
| English/Franco | Latin / English | "best AC Egypt" | Secondary keywords, tags |

### Masri spelling variants (long-tail coverage)

Egyptian search uses inconsistent spelling — cover **both** MSA and Masri forms in H2/FAQ blocks, not only the title/H1.

| MSA / standard | Masri variants | SEO use |
|---|---|---|
| ماذا | إيه، ايه | Include both in body; Masri in FAQ |
| أين | فين | Long-tail headings |
| كيف | إزاي، ازاي | FAQ + HowTo schema |
| أريد | عايز، عاوز | Conversational queries |
| متى | إمتى، امتى | Long-tail |
| جيد | كويس | High-volume Masri term — target explicitly |
| جميل | نضيف | Masri colloquial — target explicitly |
| قريب | قرّب | Local + voice ("قريب مني") |
| أيضاً | كمان | Conversational FAQ phrasing |

**Rule:** Write **titles/meta in MSA-leaning Arabic** (matches typed search), but **answer in Masri** inside FAQ/AEO blocks (matches voice + feels human). This dual-register approach captures both surfaces.

---

## 3. Title & Description Formulas

### Title tag (≤60 chars practical Arabic)
```
[الكلمة المفتاحية] + [زاوية القيمة] + [محدد محلي/سنة]
```
- `أسعار التكييفات في مصر 2026 — دليل الشراء الكامل`
- `أفضل 7 مطاعم في الزمالك (تقييم حقيقي)`

### Meta description (≤155 chars)
```
[وعد واضح] + [دليل/رقم] + [دعوة لطيفة]
```
- `اعرف أسعار التكييفات في مصر وإزاي تختار الأنسب لبيتك. مقارنة كاملة + نصايح توفير. اقرأ الدليل دلوقتي.`

### Heading rules
- **H1:** one, MSA-leaning, contains the primary keyword.
- **H2/H3:** mix MSA keywords with Masri question phrasing ("طب إزاي أعرف…").

---

## 4. AEO — Answer Engine Optimization

AI overviews and voice assistants extract **direct answers**. Structure for extraction:

- **Lead with the answer** in 40–55 words, then expand. No throat-clearing.
- **FAQ blocks in Masri** — write questions exactly as people *say* them:
  - "التكييف بيستهلك كهربا قد إيه؟"
  - "أنزّل أوضة كام حصان؟"
- **One question = one self-contained answer.** Don't require the previous answer for context.
- **Use lists and tables** — AI overviews lift structured data first.
- **Entity clarity:** name brands, places, and prices explicitly; ambiguity gets skipped.

### AEO answer block template
```
س: [السؤال بالمصري زي ما الناس بتقوله]
ج: [إجابة مباشرة في جملة أو اتنين] — [تفصيلة داعمة قصيرة].
```

---

## 5. Schema Patterns (priority for Egyptian SERPs)

| Schema | Use for | Wins |
|---|---|---|
| `FAQPage` | Articles, product, service pages | FAQ rich result + AEO extraction |
| `LocalBusiness` | Any business with a location | Map pack, "قريب مني" |
| `Product` + `AggregateRating` | E-commerce | Price + stars in SERP |
| `Article` / `BlogPosting` | Content | Eligibility for overviews |
| `BreadcrumbList` | Site structure | Cleaner SERP path |
| `HowTo` | Tutorials ("إزاي…") | Step results + voice |

- Keep visible Arabic text and schema values consistent.
- Mark prices in EGP; include `priceCurrency: "EGP"`.

---

## 6. AI-Overview Optimization Notes

- **Match conversational queries:** overviews trigger on natural-language questions — your H2s should mirror them in Masri.
- **Be quotable:** one crisp, self-contained sentence per key claim is more liftable than a dense paragraph.
- **Freshness signals:** include the year and update dates; Egyptian commercial queries reward recency (but never fake recency — see `references/trends-and-hooks.md`).
- **E-E-A-T in Arabic:** author bylines, real credentials, and named local experience ("بخبرة 10 سنين في السوق المصري") build trust signals.
- **Don't keyword-stuff:** modern Arabic SEO rewards semantic coverage (synonyms, MSA+Masri variants) over repetition.

---

## 7. Pre-Delivery SEO Checklist

- [ ] Primary keyword in title, H1, first 100 words, meta
- [ ] Title MSA-leaning; FAQ answers in Masri
- [ ] Each FAQ answer self-contained (AEO-ready)
- [ ] Local terms / city included if local intent
- [ ] Schema chosen and consistent with visible copy
- [ ] Year/recency present and truthful
- [ ] Humanization pass applied (`references/humanization-protocol.md`)
