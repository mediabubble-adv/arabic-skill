---
topic: arabic-qa-gap-scan
last_reviewed: 2026-07-04
trust_tier: A
sources:
  - reference-arabic-qa-v1
runtime_targets:
  - arabic/references/audit-mode.md
status: distilled
---

# arabic-qa gap scan (2026-07-04)

**Reference pack:** `reference/arabic-qa/`  
**Runtime targets:** `arabic/references/audit-mode.md`, `arabic/references/humanization-protocol.md`

## Already distilled (no action)

| Reference file | Runtime coverage |
|----------------|------------------|
| 9-point QA pipeline | `audit-mode.md` — checks, scoring matrix, output format |
| Legacy register scan | `audit-mode.md` § Legacy register |
| AI-likelihood scan | `audit-mode.md` § AI-likelihood |
| Anti-translationese / channel rules | `humanization-protocol.md` v2 |
| Cultural red-lines (regional) | `taboos.md` — KSA, UAE, Egypt, etc. |
| Per-check thresholds (summary) | `audit-mode.md` — pointer to full catalog |

## Gaps found

### 1. Platform register targets — **distilled in RQ-001**

Reference `platform-registers.md` lists target L-level per channel (Facebook L2–L3, TikTok L1–L2, LinkedIn L3–L4, blog mixed MSA/Masri, etc.). Runtime audit-mode had register check #1 but no actionable platform table when `--platform` is set.

**Action:** Compact register matrix added to `audit-mode.md`.

### 2. Masri error before/after examples — **deferred**

`error-catalog.md` has 200+ lines of wrong/right pairs. Runtime already encodes check logic; full catalog duplication would bloat load. Keep deep cuts in `reference/arabic-qa/`.

**Revisit:** v1.3 if agents repeatedly miss negation/demonstrative fixes without examples.

### 3. YAML machine-readable audit output — **deferred**

Reference supports structured YAML export for CI. Runtime uses markdown report template only. No `/arabic audit --format yaml` flag yet.

**Revisit:** R3 command wiring or when CI integration is requested.

### 4. Egypt cultural-red-lines supplement — **deferred**

`cultural-red-lines.md` has Egypt-specific humor/religion boundaries not fully mirrored in `taboos.md` Egypt section. Partial overlap exists.

**Revisit:** Next taboos.md distill after platform registers land.

### 5. Brand lexicon full table — **deferred**

`brand-lexicon.md` is client-specific template. Runtime correctly routes to `.arabic/voice.md` + reference deep cut.

**Revisit:** Only if default lexicon ships in product.

## Safe-to-distill excerpt (RQ-001 source)

From `reference/arabic-qa/reference/platform-registers.md` — register targets only (not character limits / posting times):

- Facebook: L2–L3
- Instagram: L2 (Stories L1–L2)
- LinkedIn: L3–L4
- TikTok: L1–L2
- Email: L3
- WhatsApp: L2–L3
- Landing: L3 (CTA L2–L3)
- Blog: Mixed MSA H1 + Masri L3 body + L2 FAQ
