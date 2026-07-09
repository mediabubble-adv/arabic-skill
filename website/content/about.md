# لماذا مهارة العربية الرائعة؟

## الرسالة

وكالة محتوى عربي داخل الـ IDE. تستشير قبل الكتابة. **مش مجرد ترجمة.**

## ما نفعله — وما لا نفعله

| نعم | لا |
|-----|-----|
| لهجات (مصري أولاً) | ترجمة حرفية |
| تدقيق قبل التسليم | تخمين من غير سياق |
| مشاريع كبيرة بخطة | ٣٨ أمر منفصل بلا نظام |
| فهم المشروع من الملفات | شات عام من غير أدلة |

## الجدول الزمني

| المرحلة | ما حدث |
|---------|--------|
| **خطة** | `/arabic plan website --dialect masri` → `.arabic/projects/awesome-arabic-website/plan.md` |
| **برّيفات** | `.arabic/briefs/website-*.yaml` — ٨ صفحات |
| **كتابة** | `/arabic write page` → `website/content/*.md` |
| **تدقيق** | `/arabic audit` → `.arabic/audits/website-2026-07-04.md` |
| **بناء** | Next.js + G14 validator → deploy |

**الإصدارات:** **1.0.0** اتنشر · **1.1.0** موقع + توزيع

## مسار البناء (dogfood)

```text
plan → briefs → write → audit → Next.js port → deploy
```

كل نص عربي على الموقع ناتج عن `/arabic write` على أدلة من الريبو. مفيش copywriter خارجي.

## مسار الأوامر (frozen)

```text
/arabic plan website --dialect masri
/arabic write page --brief .arabic/briefs/website-home.yaml
/arabic write page --brief .arabic/briefs/website-install.yaml
/arabic write page --brief .arabic/briefs/website-features.yaml
/arabic write page --brief .arabic/briefs/website-commands.yaml
/arabic write page --brief .arabic/briefs/website-tutorials.yaml
/arabic write page --brief .arabic/briefs/website-examples.yaml
/arabic write page --brief .arabic/briefs/website-about.yaml
/arabic write page --brief .arabic/briefs/website-docs.yaml
/arabic audit website/content --dialect masri
```

## ملخص التدقيق (G16 — frozen)

> **Snapshot date:** 2026-07-04 · **Register:** L3 Masri · **Verdict:** PUBLISH  
> Full report: [`.arabic/audits/website-2026-07-04.md`](../../.arabic/audits/website-2026-07-04.md)

**Overall:** 17/18 ✅ PASS

| الصفحة | النتيجة | ملاحظة |
|--------|---------|--------|
| home | 17/18 | **مش مجرد ترجمة** ✓ |
| install | 16/18 | fork + FAQ (AEO) |
| features | 17/18 | — |
| commands | 18/18 | أقوى نبرة dev |
| tutorials | 16/18 | — |
| examples | 17/18 | «قبل» متعمد MSA |
| about | 17/18 | meta/dogfood متوقع |
| docs | 18/18 | — |

**Legacy register:** clean — مفيش MSA جامد في UI  
**AI-likelihood:** low–medium — FAQ/bento متوازية (AEO by design)

**Brand ledger:** **المهارة** · **ثبّت المهارة** · **مش مجرد ترجمة** — ✓ على كل الصفحات

## المعمارية

```text
arabic/          ← runtime pack (SKILL.md + engines)
reference/       ← ٣٨ حزمة مرجعية
docs/            ← PRD، planning، engineering
website/content/ ← نسخ Masri (dogfood)
CLI              ← npx @mediabubble-adv/arabic-skill install
```

**٢٤ أداة مدعومة** — Cursor · Claude · Codex · ChatGPT · Gemini · Qwen · Windsurf · VS Code · +١٦ ([الفهرس](../../docs/supported/README.md))

## مصادر

- [website-dogfood.md](../../docs/planning/website-dogfood.md) — sitemap + G13–G18
- [stitch-website-prompts-masri.md](../../docs/planning/stitch-website-prompts-masri.md) — برومبتات Stitch
- [SKILL.md](../../arabic/SKILL.md) — runtime behavior
- [Design spec §4.5](../../docs/superpowers/specs/2026-07-03-website-marketing-dogfood-design.md) — dogfood transparency (choice D)

## MediaBubble

منتج من MediaBubble — شريك محتوى عربي للفرق التي تبني بأدوات AI. الموقع نفسه إثبات: اتبنى بـ `/arabic`، اتدقق، واتنشر.

**ثبّت المهارة** — وجرّب بنفسك.
