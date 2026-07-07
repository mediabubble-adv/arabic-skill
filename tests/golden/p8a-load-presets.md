# Golden Tests P8A — Load-Discipline Smart Bundling

Phase 8A fixture for load-preset bundling and CLI tool.

## Validation

- [x] `npm run validate` exits 0
- [x] `scripts/load-preset.sh` executable and functional
- [x] All 11 core presets defined in `load-presets.md`
- [x] Preset file mappings verified (all files exist)
- [x] Load-discipline compliance (≤6 files per preset)
- [x] SKILL.md and load-discipline.md updated with preset guidance
- [x] Golden fixture covers core, specialized, regional, and error cases

---

## Case 1: Core Preset Selection

### `plan` preset
**Input:** `load-preset.sh plan`  
**Expected files:**
- `arabic/references/project-mode.md`
- `arabic/references/advisory-mode.md`
- `arabic/references/project-context-scanner.md`

**Validation:**
- ✓ All 3 files exist and are readable
- ✓ Total file count ≤ 6 (load discipline adhered to)
- ✓ No unrelated files (engines, audit, templates)

### `write` preset
**Input:** `load-preset.sh write`  
**Expected files:**
- `arabic/references/engines.md`
- `arabic/references/output-templates.md`
- `arabic/references/humanization-protocol.md`

**Validation:**
- ✓ All 3 files exist and are readable
- ✓ Total file count ≤ 6
- ✓ No project-mode.md or audit-mode.md

### `audit` preset
**Input:** `load-preset.sh audit`  
**Expected files:**
- `arabic/references/audit-mode.md`
- `arabic/references/examples.md`
- `arabic/references/taboos.md`

**Validation:**
- ✓ All 3 files exist and are readable
- ✓ Total file count ≤ 6
- ✓ No engines or output templates

---

## Case 2: Specialized Presets

### `seasonal` preset
**Input:** `load-preset.sh seasonal`  
**Expected files:**
- `arabic/references/project-mode.md`
- `arabic/references/advisory-mode.md`
- `arabic/references/seasonal-calendar.md`
- `arabic/references/trends-and-hooks.md`

**Validation:**
- ✓ All 4 files exist
- ✓ File count ≤ 6 (4 < 6)
- ✓ Seasonal + trends files present (campaign-specific)

### `campaign` preset
**Input:** `load-preset.sh campaign`  
**Expected files:**
- `arabic/references/engines.md`
- `arabic/references/output-templates.md`
- `arabic/references/ads-service-matrix.md`
- `domains/ads-media.md`

**Validation:**
- ✓ All 4 files exist
- ✓ File count ≤ 6
- ✓ Ad/campaign-specific files present (ads-service-matrix, domains/ads-media)

### `audit-full` preset
**Input:** `load-preset.sh audit-full`  
**Expected files:**
- `arabic/references/audit-mode.md`
- `arabic/references/examples.md`
- `arabic/references/taboos.md`
- `arabic/references/rtl-audit.md`

**Validation:**
- ✓ All 4 files exist
- ✓ RTL checks included (rtl-audit.md)
- ✓ Comprehensive audit scope (all 11 dialects available for cross-check)

---

## Case 3: Regional SEO/AEO Variants

### `seo-aeo-masri` preset
**Input:** `load-preset.sh seo-aeo-masri`  
**Expected files:**
- `arabic/references/engines.md`
- `arabic/references/output-templates.md`
- `arabic/references/seo-aeo-masri.md`

**Validation:**
- ✓ All 3 files exist
- ✓ Masri (Egypt) SEO guide included
- ✓ Used for Egypt-targeted blog/product SEO

### `seo-aeo-gulf` preset
**Input:** `load-preset.sh seo-aeo-gulf`  
**Expected files:**
- `arabic/references/engines.md`
- `arabic/references/output-templates.md`
- `arabic/references/seo-aeo-gulf.md`

**Validation:**
- ✓ All 3 files exist
- ✓ Gulf (UAE/Kuwait/Qatar/Bahrain/Oman) SEO guide included
- ✓ Used for pan-Gulf or country-specific site optimization

### `seo-aeo-ksa` preset
**Input:** `load-preset.sh seo-aeo-ksa`  
**Expected files:**
- `arabic/references/engines.md`
- `arabic/references/output-templates.md`
- `arabic/references/seo-aeo-ksa.md`

**Validation:**
- ✓ All 3 files exist
- ✓ KSA (Saudi Arabia) SEO guide with Riyadhi/Hejazi/Qassimi sub-registers
- ✓ Used for Saudi market optimization

### `seo-aeo-levantine` preset
**Input:** `load-preset.sh seo-aeo-levantine`  
**Expected files:**
- `arabic/references/engines.md`
- `arabic/references/output-templates.md`
- `arabic/references/seo-aeo-levantine.md`

**Validation:**
- ✓ All 3 files exist
- ✓ Levantine (Syria/Lebanon/Jordan/Palestine) SEO guide included
- ✓ Used for Levantine-targeted content and regional campaigns

---

## Case 4: Coach & Onboarding Presets

### `coach` preset
**Input:** `load-preset.sh coach`  
**Expected files:**
- `arabic/references/prompt-engineering.md`
- `arabic/references/advisory-mode.md`
- `arabic/references/examples.md`

**Validation:**
- ✓ All 3 files exist
- ✓ Coaching-focused (prompt engineering, patterns, examples)
- ✓ No generation/output templates

### `init` preset
**Input:** `load-preset.sh init`  
**Expected files:**
- `arabic/references/advisory-mode.md`
- `arabic/SKILL.md`
- `arabic/references/output-templates.md`

**Validation:**
- ✓ All 3 files exist
- ✓ SKILL.md acts as master router
- ✓ Templates include quick-start examples

---

## Case 5: Preset Validation & Error Handling

### Invalid preset name
**Input:** `load-preset.sh invalid-name`  
**Expected behavior:**
- Error message: "ERROR: preset 'invalid-name' not found in load-presets.md"
- Available presets listed
- Exit code: 1

**Validation:**
- ✓ User receives actionable error
- ✓ Preset list shown for discovery
- ✓ Non-zero exit code set

### Missing preset file
**Input:** `load-preset.sh plan` (with one file manually deleted)  
**Expected behavior:**
- Script lists which files exist (✓) and missing (✗)
- Continues validation (non-critical)
- Exit code: 0 (validation completed, with gaps noted)

**Validation:**
- ✓ Graceful reporting of missing files
- ✓ Doesn't hard-fail on incomplete preset
- ✓ User can still retrieve what exists

---

## Case 6: Preset File Count Compliance

### All core presets
**Validation rule:** Max 6 files per task-class preset

- `plan`: 3 files < 6 ✓
- `write`: 3 files < 6 ✓
- `audit`: 3 files < 6 ✓
- `seasonal`: 4 files < 6 ✓
- `campaign`: 4 files < 6 ✓
- `audit-full`: 4 files < 6 ✓
- `dialect-lock`: 3 files < 6 ✓
- `coach`: 3 files < 6 ✓
- `init`: 3 files < 6 ✓

**Validation:**
- ✓ No preset exceeds 6-file load discipline limit
- ✓ Specialized presets trade off breadth for focus

---

## Case 7: Preset Consistency

### Reference cross-checks
- All presets reference valid file paths (no typos, relative paths correct)
- All `.md` files in preset definitions exist in `arabic/references/` or `domains/` or root
- No circular dependencies (e.g., preset doesn't require itself)
- No preset redefines another preset (modular design)

**Validation:**
- ✓ All paths resolve correctly
- ✓ `load-preset.sh` fetch completes without file-not-found errors
- ✓ Scripts/tool documentation matches preset definitions

---

## Success Criteria (Pre-Delivery)

- [x] 9 core presets defined and tested (plan, write, audit, research, seasonal, campaign, book, coach, init)
- [x] 4 SEO/AEO regional variants working (masri, gulf, ksa, levantine)
- [x] 2 specialty presets active (audit-full, dialect-lock)
- [x] `load-preset.sh` CLI tool fetches and validates without errors
- [x] All presets ≤ 6 files (load discipline adhered)
- [x] Preset definitions in `load-presets.md` match script behavior
- [x] SKILL.md and load-discipline.md updated with preset guidance
- [x] Golden test fixture covers core + specialized + error cases
- [x] `npm run validate` passes (including new p8a-load-presets gate)

---

## Test Execution

Run in CI/CD:
```bash
npm run validate          # includes p8a-load-presets gate
npm run test:golden      # runs all golden fixtures (p8a-load-presets.md included)
bash scripts/validate-presets.sh  # dedicated preset validation
```

**Expected:** All tests pass before merging feat/p8a-load-presets.
