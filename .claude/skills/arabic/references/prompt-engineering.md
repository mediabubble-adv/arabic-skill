# Prompt Coach — Arabic Prompt Engineering

Load for **Prompt Coach Mode** (`/arabic coach`) and whenever a user arrives with a weak prompt.
The job is to **diagnose → upgrade → teach**: rewrite their Arabic prompt into stronger versions and
explain *why* each is better so they brief better next time.

> Flow: guide → clarify intent → recommend structure → rewrite prompt → review.
> Coach the prompt; do **not** secretly answer it. Show the upgraded prompt(s) first.

---

## 1. Weak-prompt diagnosis

A prompt is weak when any of these are missing or vague:

| Dimension | Weak signal | What to recover |
|-----------|-------------|-----------------|
| **Dialect/register** | "اكتبلي بوست" (no dialect) | target dialect + formality level |
| **Audience** | "للناس" | who exactly — market, age, awareness stage |
| **Goal** | "حلو" | clicks / leads / trust / sales / retention |
| **Format/channel** | unstated | platform + asset type + length |
| **Voice** | unstated | brand tone, must-use / must-avoid words |
| **Constraints** | unstated | CTA, taboos, deadlines, length cap |
| **Success** | unstated | what "good" looks like / an example they like |

If 3+ are missing → it's a Coach case, not a write case.

## 2. Prompt anatomy (the frame to teach)

```
[Role]      You are a <senior Egyptian ad copywriter>…
[Context]   Product = X, audience = Y, market = Z
[Dialect]   Clean commercial Masri, L3
[Goal]      Drive WhatsApp leads
[Format]    3 Meta caption variants, ≤2 lines each, 1 CTA
[Voice]     Warm, confident; avoid hype words
[Examples]  Like this one we liked: "…"
[Review]    Run dialect + taboo + humanization before delivering
```

Not every prompt needs all 8 — but **dialect, audience, goal, format** are the non-negotiable core.

## 3. Repair workflow

1. **Diagnose** — name the 2–3 biggest gaps (don't lecture).
2. **Clarify intent** — ask only what changes the output (max 2 questions; option-based for beginners).
3. **Recommend structure** — show the anatomy that fits their case.
4. **Rewrite** — produce upgraded versions (below).
5. **Explain why** — one line per upgrade tying the change to a better result.

## 4. Three upgrade tiers (always offer at least 2)

- **Beginner** — plain Arabic, fill-in-the-blanks, 1–2 lines. Lowest friction.
- **Standard** — the full anatomy, ready to paste.
- **Pro** — anatomy + examples + review instructions + voice reference (`/arabic voice load`).

## 5. Bad → good (examples)

| ❌ Weak | ✅ Upgraded (Standard) | Why |
|--------|------------------------|-----|
| "اكتبلي كابشن" | "اكتب 3 كابشنات مصري (L3) لإعلان جيم في القاهرة، الهدف ليدز واتساب، سطرين كحد أقصى، CTA واحد" | adds dialect + audience + goal + format + CTA |
| "محتوى عن منتجنا" | "بوست لينكدإن بالعربي الفصيح الاحترافي يشرح ميزة X لمديري التسويق، نبرة واثقة، رقم واقعي واحد، بدون مبالغة" | adds channel + register + audience + tone + constraint |
| "خليه احترافي" | "اكتبه L4 مصري رسمي، من غير سلانج، وبدون كلمات هايب زي (الأفضل/الأقوى)" | converts vague 'professional' into a register + ban list |

## 6. Output format

```markdown
**Prompt diagnosis:** missing <dialect, goal, format>
**Upgraded — Standard:**
<the rewritten prompt>
**Upgraded — Pro:**
<the rewritten prompt + examples + review note>
**Why better:** <one line per key change>
**Next:** want me to run the Pro prompt now?
```

## Related
- `advisory-mode.md` — Coach is a mode of the same guide→clarify→recommend flow
- `intake-protocols.md` — Prompt Coach intake questions
- `../voice.md` — load saved brand voice into the Pro tier
