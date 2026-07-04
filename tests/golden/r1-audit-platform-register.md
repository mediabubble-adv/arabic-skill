# Golden Test R1 — Platform register audit distill

Manual checklist for Research R1 (`feat/research-r1-distill`). Proves `audit-mode.md` platform register targets work when `--platform` is set.

## G-R1-01 — TikTok register drift flagged

**Input (paste or `--file`):**

```text
يرجى التواصل معنا للحصول على عرض حصري. نحن نقدم حلولاً مبتكرة تلبي احتياجاتكم.
```

**Command:** `/arabic audit --platform tiktok`

**Expected:**
- Check #1 (register) scores **0 or 1** — detected L4–L5 vs target L1–L2
- Header shows `Target: L1–L2 (tiktok)` and detected register
- Issue cites stiff MSA / formal tone for TikTok

## G-R1-02 — LinkedIn register pass

**Input:**

```text
بنشتغل مع فرق التسويق في مصر على حملات أداء قابلة للقياس. لو حابب نراجع أرقامك الحالية، راسلنا.
```

**Command:** `/arabic audit --platform linkedin`

**Expected:**
- Check #1 scores **2** — L3 polite Masri within L3–L4 target
- No false positive for "too casual" on LinkedIn

## G-R1-03 — Blog mixed register (per-section scoring)

**Input:** Article with MSA H1 (`كيف تختار أفضل تكييف في مصر`) + Masri L3 body paragraphs + L2 FAQ.

**Command:** `/arabic audit --platform blog`

**Expected:**
- Header uses Mixed form: `Target: Mixed — MSA H1 · L3 body · L2 FAQ (blog)`
- Per-section detected registers reported (H1 L4–L5 OK; body L3; FAQ L2)
- Check #1 scores **2/2** — MSA H1 is **not** flagged as drift against L3 body
- Issue only if a **section** fails its role target (e.g. L5 MSA in body, or L1 slang in H1)

## G-R1-04 — Google Search register (meta/google ad platforms)

**Input (RSA-style headline):**

```text
تكييفات بسعر الجملة — تركيب مجاني في القاهرة خلال 24 ساعة
```

**Command:** `/arabic audit --platform google`

**Expected:**
- Header shows `Target: L3–L4 (google)` (Search/RSA default)
- Check #1 scores against L3–L4, not an ambiguous non-L label

**Input (Meta feed ad, casual Masri):**

```text
بتدفع كل شهر في حاجة مش بتستخدمها؟ كلّمنا على واتساب 👇
```

**Command:** `/arabic audit --platform meta`

**Expected:**
- Header shows `Target: L2–L3 (meta)`
- Check #1 passes for L2–L3 copy

## Validation

- [ ] `npm run validate` exits 0
- [ ] `research/distillation-queue.md` shows RQ-001 distilled
- [ ] `research/index.json` lists gap-scan KB file
