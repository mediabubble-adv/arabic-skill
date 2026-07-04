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

## G-R1-03 — Blog mixed register noted

**Input:** Article with MSA H1 + Masri L3 body paragraphs.

**Command:** `/arabic audit --platform blog`

**Expected:**
- Audit acknowledges **mixed** target (MSA H1 + L3 body)
- Does not penalize intentional MSA headline if body is L3

## Validation

- [ ] `npm run validate` exits 0
- [ ] `research/distillation-queue.md` shows RQ-001 distilled
- [ ] `research/index.json` lists gap-scan KB file
