# Golden Tests P6

## Validation

- [x] `arabic/references/seo-aeo-levantine.md` exists and contains 7 sections (search behavior, MSA vs Levantine split, title formulas, AEO, schema, overview optimization, checklist)
- [x] Cross-pointer added to `seo-aeo-masri.md` referencing Levantine
- [x] Cross-pointer added to `seo-aeo-gulf.md` referencing Levantine
- [x] Cross-pointer added to `seo-aeo-ksa.md` referencing Levantine
- [x] All four regional files (Masri, Gulf, KSA, Levantine) include complete cross-references to each other
- [x] Levantine-specific query equivalents (وين, بدي, كيفاش, زين, حلو, برضه) documented in section 2
- [x] Cities section covers Beirut, Amman, Damascus, Ramallah (section 1)
- [x] Currency split documented for SYP/LBP/JOD/ILS (section 5)
- [x] INDEX.md references count incremented: 24→25
- [x] INDEX.md total file count incremented: 61→62
- [x] P6 (Levantine SEO/AEO) row added to Build Status table
- [x] Breakdown line updated: "Breakdown: SKILL.md (1) + voice.md (1) + references/ (25, incl. this INDEX) + dialects/ (11) + domains/ (14) + conversations/ (6) + professional-docs/ (4) = 62."

## Verification Checklist

- [x] `scripts/validate-golden.sh` passes (golden fixture structure valid)
- [x] All path references in fixture resolve: `arabic/references/seo-aeo-levantine.md`, `arabic/references/seo-aeo-masri.md`, `arabic/references/seo-aeo-gulf.md`, `arabic/references/seo-aeo-ksa.md`, `arabic/references/INDEX.md`
- [x] Regional variant coverage complete: Egypt (Masri), Gulf (Khaliji), Saudi Arabia (KSA), Levantine (Shami)
- [x] Cross-pointer pattern consistent across all four regional files
- [x] File added to git tracking (no uncommitted state blocking CI)

