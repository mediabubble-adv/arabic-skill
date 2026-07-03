# ليه مهارة العربية الرائعة؟

## الرسالة

وكالة محتوى عربي جوه الـ IDE بتاعك. بيستشير قبل ما يكتب. **مش مجرد ترجمة.**

## إيه اللي بنعمله — وإيه لأ

**نعم:** لهجات، تدقيق، مشاريع كبيرة، فهم المشروع من الملفات.

**لأ:** ترجمة حرفية، تخمين من غير سياق، ٣٨ أمر منفصل.

## مسار البناء (dogfood)

1. `/arabic plan website --dialect masri` → `.arabic/projects/awesome-arabic-website/plan.md`
2. Briefs → `.arabic/briefs/website-*.yaml`
3. `/arabic write page` → `website/content/*.md`
4. `/arabic audit --file website/content/` → snapshot below
5. Next.js port → deploy

## مسار الأوامر

```text
/arabic plan website --dialect masri
/arabic write page --brief .arabic/briefs/website-home.yaml
/arabic audit --file website/content/
```

## ملخص التدقيق (G16 — frozen)

**Overall:** 17/18 ✅ PASS · **Register:** L3 Masri · **Date:** 2026-07-04

**Legacy register:** clean  
**AI-likelihood:** minor (symmetric FAQ bullets — acceptable for AEO)

**Verdict:** PUBLISH — see `.arabic/audits/website-2026-07-04.md` for full report.

## المعمارية

- `arabic/` — runtime pack
- `reference/` — ٣٨ حزمة مرجعية
- `docs/` — وثائق المنتج
- CLI — `npx @mediabubble-adv/arabic-skill install`

## الجدول الزمني

- **1.0.0** — اتنشر
- **1.1.0** — موقع + توزيع (جاري)

## مصادر

- [website-dogfood.md](../../docs/planning/website-dogfood.md)
- [stitch-website-prompts-masri.md](../../docs/planning/stitch-website-prompts-masri.md)
- [SKILL.md](../../arabic/SKILL.md)

## MediaBubble

منتج من MediaBubble — شريك محتوى عربي للفرق اللي بتبني بأدوات AI.

**ثبّت المهارة** — وجرّب بنفسك.
