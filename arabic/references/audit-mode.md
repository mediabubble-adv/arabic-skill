# Audit Mode — 9-Point QA Pipeline

Distilled from `reference/arabic-qa`. Load when the task is **reviewing** existing Arabic copy
(`/arabic audit`, Audit Mode) or as the final review pass before delivery. Generalize the Masri
examples to the **target dialect** locked for the piece.

> Audit Mode never rewrites silently — it **scores, explains, then offers fixes**.
> Flow: inspect → diagnose → explain → recommend fixes → optionally rewrite.
>
> **Load discipline:** Use `references/load-discipline.md` audit class. Legacy-register and
> AI-likelihood scoring (§ below) apply to **`/arabic audit` deliveries only** — not every write.

---

## Command variants

| Command | Loads | Behavior |
|---|---|---|
| `/arabic audit` | This file | 9-point QA on pasted text or `--file` |
| `/arabic audit --platform <name>` | This file + § Platform register targets | Score check #1 against channel L-level |
| `/arabic audit rtl` | `rtl-audit.md` + this file | Tier-1 RTL/UI source audit + Arabic string QA |
| `/arabic audit --dir <path>` | `project-context-scanner.md` + this file | Capped scan (40 files) of Arabic copy in tree |

RTL specifics: `references/rtl-audit.md`. Directory cap rules: same file + scanner safe exclusions.

---

## The four dimensions

1. **Linguistic accuracy** — grammar, sound shifts, negation, gender
2. **Register consistency** — right formality level for platform + audience
3. **Cultural fitness** — taboos, humor boundaries, religious expression (`taboos.md`)
4. **Brand compliance** — approved lexicon, voice constraints, forbidden words (`voice.md` if present)

## Platform register targets (`--platform`)

When `--platform` is set (or the copy is clearly for one channel), score **check #1** against this table.
For **L-level and L-range targets**, **±1** still passes; **≥2** levels off = fail register scan for that section.
**`Mixed` targets** (`blog`) use **per-section scoring** — see § Mixed register scoring below; do not apply one global ±1 band to the whole piece.
Organic/social channels distilled from `reference/arabic-qa`; **`meta` / `google`** registers align with `references/ads-service-matrix.md` §1.

| Platform | Target register | Audit notes |
|----------|-----------------|-------------|
| `facebook` | L2–L3 | Broad age mix — avoid L1 slang |
| `instagram` | L2 | Stories/polls may dip to L1 |
| `linkedin` | L3–L4 | Masri expert tone — not stiff MSA |
| `tiktok` | L1–L2 | Friend-talking energy; imperfect = authentic |
| `email` | L3 | No L1; single clear CTA |
| `whatsapp` | L2–L3 | Intimate — one topic per message |
| `landing` | L3 | Hero may mix MSA; CTA L2–L3 |
| `blog` | Mixed | Per-section targets — § Mixed register scoring |
| `meta` | L2–L3 | Paid Meta (FB/IG/Reels); same band as organic Meta placements |
| `google` | L3–L4 | Search/RSA default; Display or Demand Gen → use **L2–L3** instead |

**Mixed register scoring (`blog`):** Split the piece by structural role before scoring check #1. Intentional register shifts between roles are **expected**, not drift.

| Section | Target register | Pass rule |
|---------|-----------------|-----------|
| H1 / title / meta title | **L4–L5 (MSA)** | MSA OK by design; fail only if L1–L2 slang or clearly wrong for SEO title |
| H2 / subheads | **L3** | ±1 of L3 |
| Body paragraphs | **L3** | ±1 of L3 |
| FAQ / People Also Ask blocks | **L2** | ±1 of L2 |

**Check #1 aggregate for `blog`:** **2/2** when every section passes its row; **1/2** when one section is ±2 off or one role is ambiguous; **0/2** when multiple sections fail or body is uniformly wrong register (e.g. L5 MSA body under Masri-first brief). Do **not** penalize an MSA H1 when body is L3.

**Header example:** `Target: Mixed — MSA H1 · L3 body · L2 FAQ (blog) · Detected: H1 L5 · body L3 · FAQ L2`

**Fallback:** If `--platform` is absent from this table, infer register from copy or load `references/ads-service-matrix.md` for the matching ad channel. If no L-level applies, skip check #1 scoring and note in the header: *Register target: unspecified — internal consistency only*.

Report **target** and **detected** register in the QA header (e.g. `Target: L1–L2 (tiktok) · Detected: L3–L4`, or the Mixed blog form above).

## The 9 checks (score each 0/1/2 → max 18)

| # | Check | Looks for | 2/2 when |
|---|-------|-----------|----------|
| 1 | **Register scan** | Every sentence within ±1 of target level (L1 street → L5 MSA); **`blog`:** per-section Mixed scoring (§ Platform register targets) | all sentences in range, or all blog sections pass role targets |
| 2 | **Sound-shift / lexical choice** | MSA word choices revealing MSA thinking (يريد vs عاوز, سيفعل vs حيعمل) | zero MSA-holdover words |
| 3 | **Verb conjugation** | dialect patterns (Masri: بـ habitual, حـ future, عاوز, في) not MSA (سـ, أريد, هناك) | zero MSA-conjugated verbs |
| 4 | **Negation pattern** | verb → ما…ش (ماعملتش); non-verb → مش (مش عاوز); not mixed | zero negation errors |
| 5 | **Gender consistency** | no masc/fem switches addressing the same person | fully consistent |
| 6 | **Demonstratives** | dialect forms (دا/دي/دول) not MSA (هذا/هذه/هؤلاء) | zero MSA demonstratives |
| 7 | **English overload** | ≤2 loanwords/sentence, zero full English clauses | clean |
| 8 | **Back-translation gut check** | literal back-translation that reads as natural English marketing = translationese | reads awkward in English, meaning intact = native |
| 9 | **Brand lexicon compliance** | forbidden words present / approved words missing / register-disallowed vocab | fully compliant |

Per-check scoring: **0/2** if many violations (≥3, or any gender switch / translationese), **1/2** if 1–2, **2/2** if clean. (Full per-check thresholds + error catalog: `reference/arabic-qa`.)

## Scoring matrix (max 18)

| Score | Rating | Action |
|-------|--------|--------|
| 16–18 | ✅ PASS | Publish |
| 13–15 | ⚠️ CONDITIONAL | Approve with noted exceptions |
| 9–12 | 🔄 REVISE | Required fixes before re-audit |
| < 9 | 🚫 BLOCKED | Full rewrite |

## Output format

```markdown
## Arabic QA Report
**Overall:** 16/18 ✅ PASS   **Target register:** L3   **Detected:** L2–L3

**Issues:**
1. (minor) Line 3 — translationese: "اكتشف كيف يمكن…" reads as English marketing → rewrite native
   → Fix: <concrete dialect-native rewrite>

**Passed:** Register ✓ Conjugation ✓ Negation ✓ Gender ✓ Demonstratives ✓ English ✓ Brand ✓
**Cultural scan:** CLEAN ✓   **Verdict:** PUBLISH
```

Always end with the **single highest-impact fix** first, and offer: *"Want me to apply these and re-audit?"*

## Legacy register + AI-likelihood (audit-only)

Run these **only** on `/arabic audit` (and `audit rtl` when Arabic strings are in scope) — **not** on standard write deliveries.

### Legacy register scan

Flag copy that reads like pre-2020 formal Arabic marketing or MSA holdover in a dialect-locked piece:

| Signal | Example | Action |
|---|---|---|
| Stiff MSA connectors | "علاوة على ذلك"، "فضلاً" in Masri ad copy | Suggest dialect-native bridge |
| Archaic CTAs | "لا تتردد في"، "يسعدنا أن" | Rewrite to current native CTA |
| Bureaucratic openings | "نود أن نلفت انتباهكم" | Replace with direct hook |

Rate: **clean / minor legacy / heavy legacy** (one line).

### AI-likelihood scan

Flag patterns associated with LLM-generated Arabic (orthogonal to the 9-point score):

| Signal | Example |
|---|---|
| Symmetric list rhythm | Every bullet same length and structure |
| Hedge stacking | "من المهم أن نذكر" + "في سياق" + "بشكل عام" |
| Empty intensifiers | "بشكل فريد"، "رحلة استثنائية" without proof |
| Translationese calques | "اكتشف كيف يمكنك"، "في قلب هذا" |

Rate: **low / medium / high** AI-likelihood. Do not block publish on this alone — pair with 9-point score.

---

## 10. RTL & Bidirectional Text Audit (Tier 1)

When the copy is HTML/UI/code markup, check bidirectional text structure:

| Issue | Signal | Fix |
|-------|--------|-----|
| **Orphaned RLE** | RLE (U+202A) without matching PDF (U+202C) | Close with PDF |
| **Unbalanced nesting** | RLE count ≠ PDF count | Match pairs |
| **Missing LRM** | Arabic word followed directly by Latin (e.g., "كويس123") | Insert LRM (U+200F) between them |
| **Broken fallback** | No bidirectional marks in critical UI strings | Add RLE/PDF or LRM as appropriate |

**Run:** `scripts/validate-rtl.sh <file>` for automated tier-1 checks (RLE/PDF balance, LRM detection).

**Score:** 0–10 RTL balance score; pair with grammar/register scores for overall audit.

---

## 11. Dialect Purity Audit

Prevent MSA bleed and cross-dialect mixing:

| Issue | Signal | Fix |
|-------|--------|-----|
| **MSA bleed** | Formal words like "بموجب", "نظراً لـ", "يتعين" in colloquial sections | Replace with dialect form or restructure |
| **Cross-dialect mixing** | Khaliji "زين" in Masri section or vice versa | Lock to one dialect per section |
| **Register drift** | Mix of L1 slang + L4 formality without intent | Align register to section role |

**Run:** `scripts/validate-dialect-bleed.sh <file>` for automated dialect consistency checks (MSA markers, cross-dialect words).

**Score:** 0–10 dialect consistency score; integrate into overall 9-point audit.

**Pre-delivery checklist:**
- [ ] Dialect locked (Masri / Khaliji / Levantine / KSA / MSA / other)
- [ ] No MSA formal words in dialect sections
- [ ] No cross-dialect vocabulary mixing
- [ ] Register consistent with platform / audience

---

## Related
- `humanization-protocol.md` — apply before auditing generated copy (anti-translationese, channel rules)
- `taboos.md` — cultural red-lines for the cultural-fitness dimension
- `rtl-audit.md` — source-based RTL/UI checks (tier 1 for `/arabic audit rtl`)
- Deep cuts (error catalog, brand lexicon, platform registers): `reference/arabic-qa/`
