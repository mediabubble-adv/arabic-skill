# 🔍 SEO & AEO — Levantine / Shami Search

> **Regional references:** For Egypt, load `seo-aeo-masri.md`. For the Gulf (UAE/Kuwait/Qatar/Bahrain/Oman), load `seo-aeo-gulf.md`. For Saudi Arabia, load `seo-aeo-ksa.md`. For Levantine (Syria/Lebanon/Jordan/Palestine), this is your file.

**Load when:** Blog, SEO, AEO, or website-copy task targeting Levantine region (Syria, Lebanon, Jordan, Palestine), or `/arabic seo` / `/arabic aeo` for the Levantine market.
**Pair with:** `dialects/levantine.md`, `references/engines.md` (SEO + AEO engines), `domains/` file if an industry applies.

---

## 1. Levantine Search Behavior

- **Mobile-first, cross-border:** Levantine search is mobile-dominant; high cross-border commerce (Lebanon tech hubs, Jordan e-commerce), Palestinian online markets. VPN/diaspora searches common.
- **Typed search skews MSA:** Professional and formal contexts push toward MSA; e-commerce and social searches lean Levantine.
- **Voice/long-tail skews Levantine:** Spoken queries use lyrical, poetic Levantine ("كيفاش أعمل…", "شنو الأحسن…"). Voice search emerging rapidly.
- **English & diaspora:** Tech-fluent, diaspora, and young audiences mix English liberally; cross-language queries (English + Arabic brand names).
- **Local + resilience intent:** "قريب مني", city names (Beirut, Amman, Damascus, Ramallah), and economic resilience (recovery-focused, local-first purchasing).

---

## 2. The MSA vs Levantine Query Split

Map every target keyword on this split before writing:

| Intent type | Typical form | Example | Use in |
|---|---|---|---|
| Informational (typed) | MSA / mixed | "كيفية اختيار المنتج المناسب" | Titles, H1, body |
| Informational (voice/long-tail) | Levantine | "كيفاش أختار منتج حلو" | H2s, FAQ, AEO answers |
| Commercial | MSA + brand/category | "أسعار المنتجات في الشام" | Titles, meta, landing |
| Local | MSA + city | "محلات في بيروت" | Title, NAP, schema |
| English/Cross-lang | Latin / English | "best products Levant" | Secondary keywords, tags |

### MSA vs Levantine long-tail forms

Cover **both** MSA-leaning and Levantine forms in H2/FAQ blocks, not only the title/H1.

- **Orthographic variants** — same word, alternate spelling (hamza/alef, etc.)
- **Levantine equivalents** — colloquial word for the same search intent (not a spelling difference)

#### Orthographic variants

| Form A | Form B | SEO use |
|---|---|---|
| إيه / إيش | ايه / ايش | FAQ questions |
| إمتى | امتى | Long-tail |
| كيفاش | كيفش | FAQ + HowTo schema |

#### Levantine equivalents

| MSA / standard | Levantine equivalent | SEO use |
|---|---|---|
| ماذا | شنو، إيش، كيف | Include in body; Levantine in FAQ |
| أين | وين | Long-tail headings |
| كيف | كيفاش، كيف | FAQ + HowTo |
| أريد | أبي، أبغى، بدي | Conversational queries |
| متى | إمتى، متى | Long-tail |
| جيد | زين، حلو، ناعم | High-volume Levantine terms |
| جميل | حلو، ناعم | Reviews, praise, product copy |
| أيضاً | كمان، برضه | Conversational FAQ phrasing |

**Local queries:** keep **قريب** in "قريب مني" and city names (بيروت, عمّان, دمشق, رام الله) — same lemma in MSA and Levantine; no alternate spelling to target.

**Rule:** Write **titles/meta in MSA-leaning Arabic** (matches typed search), but **answer in Levantine** inside FAQ/AEO blocks (matches voice + feels poetic/local). This dual-register approach captures both surfaces.

---

## 3. Title & Description Formulas

### Title tag (≤60 chars practical Arabic)
```
[الكلمة المفتاحية] + [زاوية القيمة] + [محدد محلي/سنة]
```
- `أفضل المتاجر الإلكترونية في الشام 2026 — دليل شامل`
- `أسعار الخدمات في بيروت (تحديث يونيو 2026)`

### Meta description (≤155 chars)
```
[وعد واضح] + [دليل/رقم] + [دعوة لطيفة]
```
- `اعرف أفضل المتاجر في الشام وكيفاش تختار الحلو منها. مقارنة شاملة + نصايح توفير. اقرأ الدليل اليوم.`

### Heading rules
- **H1:** one, MSA-leaning, contains the primary keyword.
- **H2/H3:** mix MSA keywords with Levantine question phrasing ("طب كيفاش أعرف…").

---

## 4. AEO — Answer Engine Optimization

AI overviews and voice assistants extract **direct answers**. Structure for extraction:

- **Lead with the answer** in 40–55 words, then expand. No throat-clearing.
- **FAQ blocks in Levantine** — write questions exactly as people *say* them:
  - "المتجر بيوصّل فين؟"
  - "الأسعار بتنخفض كام؟"
- **One question = one self-contained answer.** Don't require the previous answer for context.
- **Use lists and tables** — AI overviews lift structured data first.
- **Entity clarity:** name brands, places, and prices explicitly; ambiguity gets skipped.

### AEO answer block template
```
س: [السؤال بالشامي زي ما الناس بتقول]
ج: [إجابة مباشرة في جملة أو اتنين] — [تفصيلة داعمة قصيرة].
```

---

## 5. Schema Patterns (priority for Levantine SERPs)

| Schema | Use for | Wins |
|---|---|---|
| `FAQPage` | Articles, product, service pages | FAQ rich result + AEO extraction |
| `LocalBusiness` | Any business with a location | Map pack, "قريب مني" |
| `Product` + `AggregateRating` | E-commerce | Price + stars in SERP |
| `Article` / `BlogPosting` | Content | Eligibility for overviews |
| `BreadcrumbList` | Site structure | Cleaner SERP path |
| `HowTo` | Tutorials ("كيفاش…") | Step results + voice |

- Keep visible Arabic text and schema values consistent.
- Mark prices in SYP/LBP/JOD/ILS as appropriate; include `priceCurrency` matching the market.

---

## 6. AI-Overview Optimization Notes

- **Match conversational queries:** overviews trigger on natural-language questions — your H2s should mirror them in Levantine.
- **Be quotable:** one crisp, self-contained sentence per key claim is more liftable than a dense paragraph.
- **Freshness signals:** include the year and update dates; Levantine markets (especially Lebanon) reward recency (but never fake recency — see `references/trends-and-hooks.md`).
- **E-E-A-T in Arabic:** author bylines, real credentials, and named local experience ("بخبرة 10 سنين في السوق الشامي") build trust signals.
- **Don't keyword-stuff:** modern Arabic SEO rewards semantic coverage (synonyms, MSA+Levantine variants) over repetition.

---

## 7. Pre-Delivery SEO Checklist

- [ ] Primary keyword in title, H1, first 100 words, meta
- [ ] Title MSA-leaning; FAQ answers in Levantine
- [ ] Each FAQ answer self-contained (AEO-ready)
- [ ] Local terms / city included if local intent
- [ ] Schema chosen and consistent with visible copy
- [ ] Year/recency present and truthful
- [ ] Humanization pass applied (`references/humanization-protocol.md`)
