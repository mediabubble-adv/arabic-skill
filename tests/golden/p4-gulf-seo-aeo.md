# Golden Tests P4 — Gulf SEO/AEO Reference Integration

Phase 4 reference fixture for Gulf market SEO/AEO optimization (UAE, Kuwait, Qatar, Bahrain, Oman).

## Validation

- [x] `npm run validate` exits 0
- [x] File structure mirrors Masri reference
- [x] Cross-references verified
- [x] Skill routing wired

---

## 1. File Structure

✅ **File exists:** `arabic/references/seo-aeo-gulf.md`
✅ **File size:** ~320 lines (Masri: ~142 lines; Gulf adds regional examples and MSA vs Khaliji split forms)
✅ **Frontmatter:** Load conditions clearly specified (Gulf market: UAE, Kuwait, Qatar, Bahrain, Oman)

---

## 2. Section Parity with Masri

Gulf reference mirrors Masri structure exactly:

| Section | Masri | Gulf | Parity |
|---------|-------|------|--------|
| 1. Search Behavior | Mobile-first, voice, MSA vs Masri split | Mobile-first, voice, MSA vs Khaliji split | ✅ |
| 2. Query Split (table + variants) | Masri orthographic + equivalents | Khaliji orthographic + equivalents | ✅ |
| 3. Title & Description Formulas | Egyptian examples (AC, restaurants) | Gulf examples (real estate, dining) | ✅ |
| 4. AEO Answer Blocks | Masri-phrased questions | Khaliji-phrased questions | ✅ |
| 5. Schema Patterns | FAQPage, LocalBusiness, etc. | FAQPage, LocalBusiness, etc. | ✅ |
| 6. AI-Overview Optimization | Egypt-specific signals | Gulf-specific signals (emirate/city markers) | ✅ |
| 7. Pre-Delivery Checklist | 7 checkpoints | 7 checkpoints | ✅ |

---

## 3. Regional Customization

### Gulf-Specific Content

✅ **Search behavior:**
- Mentions Gulf market context (UAE, Kuwait, Qatar, Bahrain, Oman)
- Highlights luxury/aspirational intent and wealth-adjacent categories
- References expat populations and English/Franco search patterns

✅ **Query split table:**
- Examples replace Masri with Gulf context:
  - Title: "أسعار العقارات في دبي 2026" (real estate instead of AC)
  - Khaliji forms: "شنو الأحسن"/"كيفاش" (Gulf-specific colloquialisms)

✅ **Khaliji equivalents:**
- ماذا → شنو، إيش (Khaliji-specific, not Masri)
- أين → وين (Gulf form)
- كيف → كيفاش، كيفة (Gulf-specific variants)
- جيد → زين (Gulf term, not Masri "كويس")

✅ **Schema pricing:**
- References AED/KWD/QAR/BHD/OMR (not EGP)

✅ **Authority signals:**
- "بخبرة 10 سنين في السوق الخليجي" (Gulf market experience, not Egypt)

---

## 4. Cross-References

✅ **Masri pointer:** seo-aeo-masri.md now includes:
   > Gulf reference: For SEO/AEO targeting the Gulf (UAE/Kuwait/Qatar/Bahrain/Oman), load `seo-aeo-gulf.md` instead.

✅ **Pair with:** seo-aeo-gulf.md specifies:
   - `dialects/khaliji.md` (Gulf dialect)
   - `references/engines.md` (SEO + AEO engines)
   - `domains/` file if industry applies

---

## 5. Skill Routing

✅ **INDEX.md updated:**
   - Line 18: References file count increased to 22
   - Line 39–40: `seo-aeo-gulf.md` added to load table
   - Build status row added: P4 (Gulf SEO/AEO) complete

✅ **load-discipline.md:** No changes required (Gulf reference lives in INDEX.md load table; load-discipline.md routes by task class, not by dialect/market)

---

## 6. Pre-Delivery Checklist Verification

The Golden Test verifies each checklist item is actionable in Gulf context:

- [ ] **Primary keyword in title, H1, first 100 words, meta** — Gulf examples use emirate names, not Egypt-specific terms ✅
- [ ] **Title MSA-leaning; FAQ answers in Khaliji** — Section 3 shows "أسعار العقارات" (MSA) with Khaliji FAQ phrasing ✅
- [ ] **Each FAQ answer self-contained (AEO-ready)** — Template in §4 self-contained ✅
- [ ] **Local terms / emirate included if local intent** — Schema section (§5) specifies emirate names ✅
- [ ] **Schema chosen and consistent with visible copy** — All schemas documented ✅
- [ ] **Year/recency present and truthful** — Example includes "2026" with freshness note ✅
- [ ] **Humanization pass applied** — References `references/humanization-protocol.md` ✅

---

## 7. Deliverable Verification

**Phase 4 Scope Met:**
- [x] Create `seo-aeo-gulf.md` mirroring `seo-aeo-masri.md` structure
- [x] Gulf-specific examples (real estate, emirate names, AED/KWD pricing, Khaliji forms)
- [x] Wiring: INDEX.md updated (file count, reference table, build status)
- [x] Cross-pointer in `seo-aeo-masri.md`
- [x] Golden test created (this file)

**Ready for:** PR #71 (feat/p4-gulf-seo-aeo)

