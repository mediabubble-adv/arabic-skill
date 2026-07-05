# 🔍 SEO & AEO — Gulf / Khaliji Search

**Load when:** Blog, SEO, AEO, or website-copy task targeting the Gulf (UAE, Kuwait, Qatar, Bahrain, Oman), or `/arabic seo` / `/arabic aeo` for the Gulf market.
**Pair with:** `dialects/khaliji.md`, `references/engines.md` (SEO + AEO engines), `domains/` file if an industry applies.

---

## 1. Gulf Search Behavior

- **Mobile-first, luxury-driven:** Gulf search is mobile-dominant; queries often reflect premium/aspirational intent and wealth-adjacent categories (real estate, travel, high-tech).
- **Typed search skews MSA:** Keyboards and formal contexts push typed queries toward MSA, even from native Khaliji speakers.
- **Voice/long-tail skews Khaliji:** Spoken queries use colloquial Khaliji ("شنو الأحسن…", "كيفاش أشتري…"). Growing voice search in Khaliji opens new ranking surface.
- **English & Franco-Arabic:** Expat populations and tech-forward audiences search in English or Franco ("gulf properties", "شقه dubai"). Cover both.
- **Local + brand intent:** "قريب مني", emirate/city names ("في دبي", "في الكويت"), and neighborhood markers ("في الخليج") drive high-conversion local search. Brand recognition is high (clients often search brand + "prices" or "reviews").

---

## 2. The MSA vs Khaliji Query Split

Map every target keyword on this split before writing:

| Intent type | Typical form | Example | Use in |
|---|---|---|---|
| Informational (typed) | MSA / mixed | "كيفية اختيار العقار المناسب" | Titles, H1, body |
| Informational (voice/long-tail) | Khaliji | "شنو الأحسن عقار في الإمارات" | H2s, FAQ, AEO answers |
| Commercial | MSA + brand/category | "أسعار العقارات في دبي" | Titles, meta, landing |
| Local | MSA + emirate/city | "عقارات للبيع في الكويت" | Title, NAP, schema |
| English/Franco | Latin / English | "luxury apartments Dubai" | Secondary keywords, tags |

### MSA vs Khaliji long-tail forms

Cover **both** MSA-leaning and Khaliji forms in H2/FAQ blocks, not only the title/H1.

- **Orthographic variants** — same word, alternate spelling (hamza/alef, etc.)
- **Khaliji equivalents** — colloquial word for the same search intent (not a spelling difference)

#### Orthographic variants

| Form A | Form B | SEO use |
|---|---|---|
| إيه / إيش | ايه / ايش | FAQ questions |
| إمتى | امتى | Long-tail |
| كيفاش | كيفش | FAQ + HowTo schema |

#### Khaliji equivalents

| MSA / standard | Khaliji equivalent | SEO use |
|---|---|---|
| ماذا | شنو، إيش | Include in body; Khaliji in FAQ |
| أين | وين | Long-tail headings |
| كيف | كيفاش، كيفة | FAQ + HowTo |
| أريد | أبي، أبغى | Conversational queries |
| متى | إمتى، متى | Long-tail |
| جيد | زين، حلو | High-volume Khaliji term |
| جميل | حلو، ناعم | Reviews, praise, product copy |
| أيضاً | كمان، برضه | Conversational FAQ phrasing |

**Local queries:** keep **قريب** in "قريب مني" and emirate/city names — same lemma in MSA and Khaliji; no alternate spelling to target.

**Rule:** Write **titles/meta in MSA-leaning Arabic** (matches typed search), but **answer in Khaliji** inside FAQ/AEO blocks (matches voice + feels local). This dual-register approach captures both surfaces.

---

## 3. Title & Description Formulas

### Title tag (≤60 chars practical Arabic)
```
[الكلمة المفتاحية] + [زاوية القيمة] + [محدد محلي/سنة]
```
- `أسعار العقارات في دبي 2026 — دليل الشراء الكامل`
- `أفضل 7 مطاعم في المرينا (تقييم حقيقي)`

### Meta description (≤155 chars)
```
[وعد واضح] + [دليل/رقم] + [دعوة لطيفة]
```
- `اعرف أسعار العقارات في الإمارات وشنو الخيار الأحسن لك. مقارنة كاملة + نصايح توفير. اقرأ الدليل دلوقتي.`

### Heading rules
- **H1:** one, MSA-leaning, contains the primary keyword.
- **H2/H3:** mix MSA keywords with Khaliji question phrasing ("طب كيفاش أعرف…").

---

## 4. AEO — Answer Engine Optimization

AI overviews and voice assistants extract **direct answers**. Structure for extraction:

- **Lead with the answer** in 40–55 words, then expand. No throat-clearing.
- **FAQ blocks in Khaliji** — write questions exactly as people *say* them:
  - "الفيلا بتستهلك كهربا قد إيه؟"
  - "شقتي كم حجم أختار؟"
- **One question = one self-contained answer.** Don't require the previous answer for context.
- **Use lists and tables** — AI overviews lift structured data first.
- **Entity clarity:** name brands, places, and prices explicitly; ambiguity gets skipped.

### AEO answer block template
```
س: [السؤال بالخليجي زي ما الناس بتقوله]
ج: [إجابة مباشرة في جملة أو اتنين] — [تفصيلة داعمة قصيرة].
```

---

## 5. Schema Patterns (priority for Gulf SERPs)

| Schema | Use for | Wins |
|---|---|---|
| `FAQPage` | Articles, product, service pages | FAQ rich result + AEO extraction |
| `LocalBusiness` | Any business with a location | Map pack, "قريب مني" |
| `Product` + `AggregateRating` | E-commerce | Price + stars in SERP |
| `Article` / `BlogPosting` | Content | Eligibility for overviews |
| `BreadcrumbList` | Site structure | Cleaner SERP path |
| `HowTo` | Tutorials ("كيفاش…") | Step results + voice |

- Keep visible Arabic text and schema values consistent.
- Mark prices in AED/KWD/QAR/BHD/OMR as appropriate; include `priceCurrency` matching the market.

---

## 6. AI-Overview Optimization Notes

- **Match conversational queries:** overviews trigger on natural-language questions — your H2s should mirror them in Khaliji.
- **Be quotable:** one crisp, self-contained sentence per key claim is more liftable than a dense paragraph.
- **Freshness signals:** include the year and update dates; Gulf commercial queries reward recency (but never fake recency — see `references/trends-and-hooks.md`).
- **E-E-A-T in Arabic:** author bylines, real credentials, and named local experience ("بخبرة 10 سنين في السوق الخليجي") build trust signals.
- **Don't keyword-stuff:** modern Arabic SEO rewards semantic coverage (synonyms, MSA+Khaliji variants) over repetition.

---

## 7. Pre-Delivery SEO Checklist

- [ ] Primary keyword in title, H1, first 100 words, meta
- [ ] Title MSA-leaning; FAQ answers in Khaliji
- [ ] Each FAQ answer self-contained (AEO-ready)
- [ ] Local terms / emirate included if local intent
- [ ] Schema chosen and consistent with visible copy
- [ ] Year/recency present and truthful
- [ ] Humanization pass applied (`references/humanization-protocol.md`)
