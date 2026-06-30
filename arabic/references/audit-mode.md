# Audit Mode — 9-Point QA Pipeline

Distilled from `reference/arabic-qa`. Load when the task is **reviewing** existing Arabic copy
(`/arabic audit`, Audit Mode) or as the final review pass before delivery. Generalize the Masri
examples to the **target dialect** locked for the piece.

> Audit Mode never rewrites silently — it **scores, explains, then offers fixes**.
> Flow: inspect → diagnose → explain → recommend fixes → optionally rewrite.

---

## The four dimensions

1. **Linguistic accuracy** — grammar, sound shifts, negation, gender
2. **Register consistency** — right formality level for platform + audience
3. **Cultural fitness** — taboos, humor boundaries, religious expression (`taboos.md`)
4. **Brand compliance** — approved lexicon, voice constraints, forbidden words (`voice.md` if present)

## The 9 checks (score each 0/1/2 → max 18)

| # | Check | Looks for | 2/2 when |
|---|-------|-----------|----------|
| 1 | **Register scan** | Every sentence within ±1 of target level (L1 street → L5 MSA) | all sentences in range |
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

## Related
- `humanization-protocol.md` — apply before auditing generated copy (anti-translationese, channel rules)
- `taboos.md` — cultural red-lines for the cultural-fitness dimension
- Deep cuts (error catalog, brand lexicon, platform registers): `reference/arabic-qa/`
