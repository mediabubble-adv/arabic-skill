# 📦 Load Presets — Task-class Bundles

> **Load when:** Using `/arabic` commands or the `load-preset.sh` CLI tool  
> **Pair with:** `load-discipline.md` (task-class definitions), `SKILL.md` (routing logic)

Presets are named file bundles optimized for common workflows. Each preset groups references, dialects, and domains to match a task class with minimal user friction.

---

## 1. Core Presets

### `plan`
**For:** `/arabic plan <project>`  
**Includes:**
- `references/project-mode.md`
- `references/advisory-mode.md`
- `references/project-context-scanner.md`
- 1 dialect (user-selected or default Masri)

**Use:** Website planning, book outlines, campaign strategy

---

### `write`
**For:** `/arabic write <type>`  
**Includes:**
- `references/engines.md`
- `references/output-templates.md`
- `references/humanization-protocol.md`
- 1 dialect (user-selected or default Masri)

**Use:** Blog posts, ad copy, social captions, UI microcopy

---

### `audit`
**For:** `/arabic audit [scope]`  
**Includes:**
- `references/audit-mode.md`
- `references/examples.md`
- `references/taboos.md`
- 1 dialect (user-selected or default Masri)

**Use:** Quality review, compliance check, brand voice alignment

---

### `website`
**For:** `/arabic plan website` · `write landing|page|website`  
**Includes:**
- `references/project-mode.md` (website slice) — plan only
- `references/website-ui-system.md`
- `references/bilingual-pipeline.md` — when dual-language
- Website Content Engine slice in `references/engines.md`
- 1 dialect

**Use:** Multi-page marketing/SaaS site copy with component IDs

---

### `ui`
**For:** `/arabic write ui`  
**Includes:**
- `references/website-ui-system.md`
- UI/UX Microcopy Engine slice in `references/engines.md`
- `references/bilingual-pipeline.md` — when dual-language
- 1 dialect

**Use:** Buttons, forms, empty states, dashboard labels

---

### `audit-website`
**For:** `/arabic audit website` · `--surface website`  
**Includes:**
- `audit` preset
- `references/website-ui-system.md`
- `references/rtl-audit.md` — when markup present

**Use:** Content QA + component map + optional RTL

---

### `research`
**For:** `/arabic research [query]`  
**Includes:**
- `references/research-mode.md`
- `references/trends-and-hooks.md`
- Selected `research/knowledge-base/` subset

**Use:** Market research, competitor analysis, trend spotting

---

## 2. Specialized Presets

### `seasonal`
**For:** Time-sensitive campaigns  
**Includes:**
- `plan` preset
- `references/seasonal-calendar.md`
- `references/trends-and-hooks.md`

**Use:** Holiday campaigns, seasonal promotions, event tie-ins

---

### `campaign`
**For:** Multi-channel ad briefs  
**Includes:**
- `write` preset
- `references/ads-service-matrix.md`
- `domains/ads-media.md`
- `references/output-templates.md` (ads template set)

**Use:** Paid media campaigns, brand launches, product promotions

---

### `book`
**For:** Long-form writing projects  
**Includes:**
- `plan` preset
- `references/book-writing.md`
- `references/humanization-protocol.md`
- 1 dialect (persistent across chapters)

**Use:** Book projects, long guides, manuscript workflows

---

### `seo-aeo`
**For:** Search optimization  
**Includes:**
- `write` preset
- `references/seo-aeo-<region>.md` (region-specific)
- `references/engines.md` (SEO/AEO engine reference)

**Use:** Blog SEO, product page optimization, AEO for AI overviews

**Variants:**
- `seo-aeo-masri` — Egypt market
- `seo-aeo-gulf` — UAE/Kuwait/Qatar/Bahrain/Oman
- `seo-aeo-ksa` — Saudi Arabia
- `seo-aeo-levantine` — Syria/Lebanon/Jordan/Palestine

---

### `audit-full`
**For:** Comprehensive audit workflow  
**Includes:**
- `audit` preset
- `references/rtl-audit.md` (RTL checks)
- `references/audit-mode.md` (full mode)
- All 11 dialects (for cross-dialect consistency check)

**Use:** Full project audit, dialect consistency verification, compliance sweep

---

### `dialect-lock`
**For:** Single-dialect enforcement  
**Includes:**
- `write` preset
- `references/command-router.md` (dialect routing)
- 1 dialect (user-selected, enforced throughout)

**Use:** Regional campaigns, market-specific sites, dialect-pure content

---

## 3. Coach & Onboarding Presets

### `coach`
**For:** `/arabic coach` prompt improvement  
**Includes:**
- `references/prompt-engineering.md`
- `references/advisory-mode.md`
- `references/examples.md` (good/bad patterns)

**Use:** Prompt refinement, technique coaching, workflow optimization

---

### `init`
**For:** First-run onboarding  
**Includes:**
- `references/advisory-mode.md`
- `SKILL.md` (master router)
- `references/output-templates.md` (quick start)
- 1 dialect (default Masri or user pick)

**Use:** New user setup, `.arabic/` scaffold generation

---

## 4. Preset Selection Logic

### Auto-select by command
```
/arabic plan <project>      → load "plan" (website → also "website")
/arabic write <type>        → load "write" (landing/page/website → "website"; ui → "ui")
/arabic audit [scope]       → load "audit" (website → "audit-website")
/arabic research [query]    → load "research"
/arabic coach               → load "coach"
/arabic init                → load "init"
```

### Manual override
```bash
/arabic write caption --preset seasonal  → load "seasonal"
/arabic audit --preset audit-full       → load "audit-full"
```

### CLI tool
```bash
load-preset.sh plan             # fetch "plan" preset files
load-preset.sh seo-aeo-gulf     # fetch region-specific preset
load-preset.sh campaign --dest ./.arabic/presets/
```

---

## 5. Persistence & Project-local Overrides

Each preset respects `.arabic/presets/` overrides:
- User can store custom bundles in `.arabic/presets/<name>.json`
- System checks local presets before falling back to canonical ones
- Presets include `voice.md` reference if it exists in `.arabic/voice.md`

---

## 6. Pre-Delivery Preset Checklist

- [ ] Preset files are symlink-friendly or copy-friendly
- [ ] No preset exceeds 6 files (load discipline adhered to)
- [ ] Each preset has a clear use case and command mapping
- [ ] Regional variants (seo-aeo-*) pick the right dialect
- [ ] `load-preset.sh` fetch completes in <1s for any preset
- [ ] Preset validation passes: `scripts/validate-presets.sh`

