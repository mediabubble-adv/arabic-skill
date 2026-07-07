# Golden Tests P5 — KSA SEO/AEO Reference Integration

Phase 5 reference fixture for Saudi Arabia market SEO/AEO optimization (Riyadhi, Hejazi, Qassimi sub-registers).

## Validation

- [x] `npm run validate` exits 0
- [x] File structure mirrors Masri/Gulf references
- [x] Cross-references verified
- [x] Skill routing wired

---

## 1. File Structure

✅ **File exists:** `arabic/references/seo-aeo-ksa.md`
✅ **File size:** ~325 lines (Masri: ~142 lines; KSA adds tech-forward search behavior, hyperlocal intent, sub-register specifics)
✅ **Frontmatter:** Load conditions clearly specified (Saudi Arabia market)

---

## 2. Section Parity with Masri/Gulf

KSA reference mirrors both Masri and Gulf structures exactly:

| Section | Masri | Gulf | KSA | Parity |
|---------|-------|------|-----|--------|
| 1. Search Behavior | Mobile-first, voice, MSA vs Masri split | Mobile-first, luxury, MSA vs Khaliji split | Mobile-first, tech-forward, MSA vs KSA split | ✅ |
| 2. Query Split (table + variants) | Masri orthographic + equivalents | Khaliji orthographic + equivalents | KSA orthographic + equivalents | ✅ |
| 3. Title & Description Formulas | Egyptian examples | Gulf examples | Saudi examples | ✅ |
| 4. AEO Answer Blocks | Masri-phrased questions | Khaliji-phrased questions | KSA-phrased questions | ✅ |
| 5. Schema Patterns | FAQPage, LocalBusiness, etc. | FAQPage, LocalBusiness, etc. | FAQPage, LocalBusiness, etc. | ✅ |
| 6. AI-Overview Optimization | Egypt-specific signals | Gulf-specific signals | Saudi-specific signals | ✅ |
| 7. Pre-Delivery Checklist | 7 checkpoints | 7 checkpoints | 7 checkpoints | ✅ |

---

## 3. Regional Customization

### KSA-Specific Content

✅ **Search behavior:**
- Mobile-first, tech-forward market context
- High English/Arabic code-switching in tech searches
- Highlights commercial intent (e-commerce, real estate, automotive, luxury)
- References voice search emergence

✅ **Query split table:**
- Examples replace Masri/Gulf with Saudi context:
  - Title: "أفضل الهواتف الذكية في السعودية 2026" (tech/smartphone focus)
  - KSA forms: "شنو الأحسن"/"كيفاش" (KSA-specific colloquialisms)

✅ **KSA equivalents:**
- ماذا → شنو، إيش (KSA-specific)
- أين → وين (KSA form)
- كيف → كيفاش، كيفة (KSA-specific variants)
- جيد → زين (KSA term, distinct from Masri "كويس" and Gulf "زين")
- أريد → أبي، أبغى (KSA sub-register forms)

✅ **Schema pricing:**
- References SAR (Saudi Riyal), not EGP or AED/KWD/QAR/BHD/OMR

✅ **Authority signals:**
- "بخبرة 10 سنين في السوق السعودي" (Saudi market experience, not Egypt/Gulf)

✅ **Local examples:**
- City names: الرياض (Riyadh), جدة (Jeddah), الدمام (Dammam)
- Commercial categories: real estate, automotive, tech (reflecting KSA economy)

---

## 4. Cross-References

✅ **Masri pointer updated:** seo-aeo-masri.md now lists all three:
   > Regional references: For the Gulf [...], load `seo-aeo-gulf.md`. For Saudi Arabia, load `seo-aeo-ksa.md`.

✅ **Gulf pointer updated:** seo-aeo-gulf.md now lists all three:
   > Regional references: For Egypt, load `seo-aeo-masri.md`. For Saudi Arabia, load `seo-aeo-ksa.md`.

✅ **KSA pointer:** seo-aeo-ksa.md specifies:
   > Regional references: For Egypt, load `seo-aeo-masri.md`. For the Gulf [...], load `seo-aeo-gulf.md`.

✅ **Pair with:** seo-aeo-ksa.md specifies:
   - `dialects/ksa.md` (Saudi dialect with Riyadhi/Hejazi/Qassimi sub-registers)
   - `references/engines.md` (SEO + AEO engines)
   - `domains/` file if industry applies

---

## 5. Skill Routing

✅ **INDEX.md updated:**
   - Line 18: References file count increased to 24
   - Line 40–41: `seo-aeo-ksa.md` added to load table
   - Build status: P5 (KSA SEO/AEO) row added
   - Totals: 24 refs (61 total files)

---

## 6. Pre-Delivery Checklist Verification

The Golden Test verifies each checklist item is actionable in KSA context:

- [ ] **Primary keyword in title, H1, first 100 words, meta** — KSA examples use city names (الرياض, جدة), not Egypt/Gulf-specific terms ✅
- [ ] **Title MSA-leaning; FAQ answers in KSA** — Section 3 shows "أفضل الهواتف" (MSA) with KSA FAQ phrasing ✅
- [ ] **Each FAQ answer self-contained (AEO-ready)** — Template in §4 self-contained ✅
- [ ] **Local terms / city included if local intent** — Schema section (§5) specifies city names ✅
- [ ] **Schema chosen and consistent with visible copy** — All schemas documented ✅
- [ ] **Year/recency present and truthful** — Example includes "2026" with freshness note ✅
- [ ] **Humanization pass applied** — References `references/humanization-protocol.md` ✅

---

## 7. Deliverable Verification

**Phase 5 Scope Met:**
- [x] Create `seo-aeo-ksa.md` mirroring `seo-aeo-masri.md` and `seo-aeo-gulf.md` structure
- [x] KSA-specific examples (tech, real estate, Saudi cities, SAR pricing, KSA sub-registers)
- [x] Wiring: INDEX.md updated (file count 23→24, reference table, build status, totals 60→61)
- [x] Cross-pointers: Masri/Gulf/KSA all reference each other
- [x] Golden test created (this file)

**Geography Trinity Complete:**
- 🇪🇬 Egypt / Masri (seo-aeo-masri.md)
- 🇦🇪 Gulf / Khaliji (seo-aeo-gulf.md) — UAE, Kuwait, Qatar, Bahrain, Oman
- 🇸🇦 Saudi Arabia / KSA (seo-aeo-ksa.md)

**Ready for:** PR #72 (feat/p5-ksa-seo-aeo)
