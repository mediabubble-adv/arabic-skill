# Golden Tests P8B — Audit-mode RTL & Dialect Hardening

Phase 8B fixture for RTL/bidirectional text detection and dialect-purity guardrails.

## Validation

- [x] `scripts/validate-rtl.sh` executable and functional
- [x] `scripts/validate-dialect-bleed.sh` executable and functional
- [x] RTL detection: RLE/LRM/PDF balance, orphaned markers, Arabic→English transitions
- [x] Dialect purity: MSA bleed detection, cross-dialect mixing checks
- [x] `npm run validate` includes new P8B validation gates
- [x] Golden fixture covers RTL structure, dialect consistency, and error cases

---

## 1. RTL Validation — Script Functionality

### Case 1.1: RLE/PDF Pairing
**Input:** `scripts/validate-rtl.sh <file>` on text with RLE (U+202A) and PDF (U+202C)  
**Expected:** No error for balanced RLE/PDF pairs  
**Validation:**
- ✓ Paired RLE/PDF sequences flagged as valid
- ✓ Orphaned RLE (without PDF) detected as ERROR
- ✓ Orphaned RLO (without PDF) detected as ERROR

### Case 1.2: LRM After Arabic Text
**Input:** Files with Arabic text transitioning to English without LRM mark  
**Expected:** WARN for Arabic→English transitions (e.g., "كويسA1" without LRM between them)  
**Validation:**
- ✓ Detects Arabic word followed by Latin characters
- ✓ Warns when no LRM (U+200F) separates them
- ✓ Count of transitions reported per file

### Case 1.3: No False Positives on Code Blocks
**Input:** RTL markers in code examples (`\`\`\` ... \`\`\`)  
**Expected:** Skipped during validation (not live content)  
**Validation:**
- ✓ Script ignores code-fence sections
- ✓ Example RTL issues in doc comments don't trigger errors
- ✓ Real content issues still detected

### Case 1.4: File Type Filtering
**Input:** Mixed file types (.md, .json, .ts, .png, .map)  
**Expected:** Text files scanned, binary/compiled skipped  
**Validation:**
- ✓ .md, .json, .ts, .tsx, .js scanned
- ✓ .png, .jpg, .lock, .map skipped
- ✓ Only relevant files processed

---

## 2. Dialect Purity Validation — Script Functionality

### Case 2.1: MSA Bleed Detection
**Input:** Dialect file (e.g., seo-aeo-masri.md) with MSA-formal markers  
**Expected:** WARN for formal register words in colloquial dialect sections  
**Validation:**
- ✓ Detects MSA markers: "بموجب", "نظراً لـ", "يتعين", "الموضوع", etc.
- ✓ Checks context (skips if in quotes/examples)
- ✓ Reports with file and line context

### Case 2.2: Cross-Dialect Consistency
**Input:** Masri section containing Khaliji markers  
**Expected:** WARN for dialect inconsistency  
**Validation:**
- ✓ Masri file flagged if it contains Khaliji words: "زين", "شنو", "وين"
- ✓ Khaliji file flagged if it contains Masri words: "كويس", "شوية", "بتاع"
- ✓ Levantine files checked against both

### Case 2.3: Dialect-Specific Markers
**Input:** Files with region-specific vocabulary  
**Expected:** Pass validation when consistent with dialect  
**Validation:**
- ✓ Masri files can use "كويس", "تمام", "بالراحة"
- ✓ Khaliji files can use "زين", "كيفاش", "يا لله"
- ✓ No cross-contamination flagged

### Case 2.4: Reference Files Only
**Input:** Mixed content (dialects/, domains/, references/)  
**Expected:** Only references/* scanned for dialect rules  
**Validation:**
- ✓ domains/ files not checked for dialect purity
- ✓ reference files scanned
- ✓ Correct dialect extracted from filename (masri/khaliji/levantine/ksa)

---

## 3. Integration with Audit Mode

### Case 3.1: RTL Checks in `/arabic audit rtl`
**Input:** `/arabic audit rtl` on HTML/code with RTL markup issues  
**Expected:** RTL report includes RLE balance, LRM placement, visual glitches  
**Validation:**
- ✓ audit-mode.md extended with RTL section
- ✓ Tier-1 source audit references validate-rtl.sh output
- ✓ Recommendations provided (fix RLE/PDF, add LRM after Arabic→English)

### Case 3.2: Dialect Purity in Audit Deliveries
**Input:** `/arabic audit` on content with dialect mixing  
**Expected:** Audit report flags MSA bleed and cross-dialect issues  
**Validation:**
- ✓ audit-mode.md includes dialect detection checkpoint
- ✓ validate-dialect-bleed.sh output integrated into report
- ✓ Recommendations for dialect lock or mixing resolution

### Case 3.3: Scoring Integration
**Input:** Audit with RTL + dialect issues  
**Expected:** Issues reflected in QA score (audit-mode 9-point + RTL tier)  
**Validation:**
- ✓ RTL balance score (0–10) calculated
- ✓ Dialect consistency score (0–10) calculated
- ✓ Both weighted in final audit output

---

## 4. Error Cases

### Case 4.1: Unbalanced RLE/PDF
**Input:** Text with 3× RLE, 2× PDF  
**Expected:** ERROR or HIGH WARN  
**Output:** "RLE count (3) > PDF count (2) — unbalanced RTL nesting"  
**Validation:**
- ✓ Condition detected
- ✓ Clear message with counts
- ✓ Exit code: 1 (failure)

### Case 4.2: MSA Formal in Dialect
**Input:** Khaliji content with "نظراً لـ" (formal MSA)  
**Expected:** WARN  
**Output:** "MSA marker 'نظراً لـ' found in khaliji section"  
**Validation:**
- ✓ Detected and reported
- ✓ Not fatal (WARN only)
- ✓ Context available for user review

### Case 4.3: Cross-Dialect Mixing
**Input:** Masri section with "زين" (Khaliji)  
**Expected:** WARN  
**Output:** "Khaliji marker 'زين' found in Masri section (inconsistent dialect)"  
**Validation:**
- ✓ Detected
- ✓ Dialect names clear
- ✓ Actionable suggestion

---

## 5. CLI Integration

### Case 5.1: Manual Invocation
**Input:** `bash scripts/validate-rtl.sh [dir]`  
**Expected:** RTL report, exit code  
**Validation:**
- ✓ Runs without dependencies
- ✓ Returns summary (errors, warnings count)
- ✓ Exit 0 if no errors, 1 if errors

### Case 5.2: CI Integration
**Input:** `npm run validate` (includes P8B gates)  
**Expected:** Both RTL and dialect-bleed scripts run, failures block  
**Validation:**
- ✓ Wired into validate.sh
- ✓ Runs after P8A gates
- ✓ Non-blocking WARNs (info only), blocking ERRORs

### Case 5.3: Audit Invocation
**Input:** `/arabic audit rtl` or `/arabic audit` (with dialect check)  
**Expected:** Scripts invoked, output parsed into report  
**Validation:**
- ✓ audit-mode.md routes to validate-rtl.sh for RTL tier
- ✓ validate-dialect-bleed.sh output included in audit report
- ✓ User receives actionable remediation steps

---

## 6. Documentation Updates

### Case 6.1: audit-mode.md Extension
**Content:**
- New § "4.5 — RTL & Bidirectional Text" with RLE/LRM checks
- New § "4.6 — Dialect Purity Audit" with MSA bleed, cross-dialect checking
- Cross-reference to validate-rtl.sh and validate-dialect-bleed.sh
- Pre-delivery checklist: RTL balance, dialect consistency

**Validation:**
- ✓ Sections added and linked
- ✓ Examples of RTL issues provided
- ✓ Dialect mixing examples shown
- ✓ No duplication with existing 9-point audit

### Case 6.2: load-discipline.md Update
**Content:**
- RTL class (§5) updated to reference P8B scripts
- audit-mode.md extended note added

**Validation:**
- ✓ Cross-reference added
- ✓ No structural changes to load sets
- ✓ RTL task class still ≤ 6 files

---

## Success Criteria (Pre-Delivery)

- [x] `validate-rtl.sh` detects 5+ RTL issues (RLE/PDF, LRM, nesting)
- [x] `validate-dialect-bleed.sh` flags MSA bleed and cross-dialect mixing
- [x] Both scripts executable, exit cleanly, produce actionable output
- [x] Wired into `npm run validate` as P8B gates
- [x] audit-mode.md extended with RTL + dialect sections
- [x] Golden fixture covers RTL structure, dialect purity, error handling, and integration
- [x] No false positives in current codebase (baseline passing)

---

## Test Execution

Run in CI/CD:
```bash
npm run validate          # includes P8A + P8B gates
bash scripts/validate-rtl.sh arabic/
bash scripts/validate-dialect-bleed.sh arabic/
npm run test:golden      # runs all golden fixtures (p8b-rtl-dialect-audit.md included)
```

**Expected:** All tests pass before merging feat/p8b-rtl-dialect-audit.
