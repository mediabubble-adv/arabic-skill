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
**±1** of target still passes; **≥2** levels off = fail register scan. Distilled from `reference/arabic-qa`.

| Platform | Target register | Audit notes |
|----------|-----------------|-------------|
| `facebook` | L2–L3 | Broad age mix — avoid L1 slang |
| `instagram` | L2 | Stories/polls may dip to L1 |
| `linkedin` | L3–L4 | Masri expert tone — not stiff MSA |
| `tiktok` | L1–L2 | Friend-talking energy; imperfect = authentic |
| `email` | L3 | No L1; single clear CTA |
| `whatsapp` | L2–L3 | Intimate — one topic per message |
| `landing` | L3 | Hero may mix MSA; CTA L2–L3 |
| `blog` | Mixed | MSA H1 + L3 body + L2 FAQ |
| `google` / `meta` ads | Platform write rules first | Fall back to ad-platform register from write engine |

Report **target** and **detected** register in the QA header (e.g. `Target: L1–L2 (tiktok) · Detected: L3–L4`).

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

## Related
- `humanization-protocol.md` — apply before auditing generated copy (anti-translationese, channel rules)
- `taboos.md` — cultural red-lines for the cultural-fitness dimension
- Deep cuts (error catalog, brand lexicon, platform registers): `reference/arabic-qa/`
