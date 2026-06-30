# Brand Voice Memory — `voice.md`

Persistence layer so a brand's voice is **saved once and reused** without full re-intake.
This file is both the **schema** (how the runtime reads/writes voice) and a **fillable template**.

> Commands: `/arabic voice save` (intake → write), `/arabic voice load` (inject into next write/plan),
> `/arabic voice show` (display summary). In a project, a per-project copy lives at `.arabic/voice.md`.

---

## Schema

```yaml
---
brand: ""                  # brand / product name
dialect: ""                # masri | khaliji | levantine | … (primary)
register: ""               # L1–L5 default (e.g. L3 polite)
market: ""                 # country/region (e.g. Egypt, KSA, pan-Gulf)
audience: ""               # who they speak to (segment, awareness stage)
tone_axes:                 # 4 axes, 0–10 each
  formal_casual: 5         # 0 = street casual, 10 = formal
  warm_bold: 5             # 0 = warm/intimate, 10 = bold/direct
  playful_serious: 5
  premium_accessible: 5
lexicon:
  use: []                  # must-use words/phrases (e.g. حضرتك, تواصل معانا)
  avoid: []                # forbidden words (e.g. هايب words, من فضلك)
cta_style: ""              # how CTAs sound (e.g. "soft, chat-first: كلّمنا واتساب")
do: []                     # voice do's (short rules)
dont: []                   # voice don'ts
samples: []                # 1–3 short lines that exemplify the voice
last_updated: ""           # YYYY-MM-DD
---
```

## Detection sources (to populate on `save`)

In priority order:
1. **Existing `voice.md`** (this file or `.arabic/voice.md`) — load and confirm.
2. **Pasted samples** — infer tone axes + lexicon from real brand copy.
3. **Website / social questionnaire** — short option-based intake (see `references/intake-protocols.md`).
4. **Manual axes** — ask the 4 tone-axis questions only if nothing above is available.

Never invent a voice — confirm inferred axes with the user before saving.

## Save protocol

1. Gather from the highest-priority source available.
2. Fill the schema; show a one-screen summary.
3. Confirm with the user, then write `voice.md` (project: `.arabic/voice.md`) with `last_updated`.

## Load protocol

On `/arabic voice load` or when a write/plan task starts and a `voice.md` exists:
- Inject `dialect`, `register`, `tone_axes`, `lexicon`, `cta_style` into the write step **before** the engine runs.
- `lexicon.avoid` feeds the humanization banned-list; `lexicon.use` is enforced in review.
- If the task's brief contradicts saved voice, pause and clarify (contradiction protocol).

## Example (filled)

```yaml
brand: "FitCairo"
dialect: "masri"
register: "L3"
market: "Egypt"
audience: "25–40 urban, price-sensitive, chat-first buyers"
tone_axes: { formal_casual: 3, warm_bold: 7, playful_serious: 4, premium_accessible: 8 }
lexicon: { use: ["كلّمنا", "جرّب"], avoid: ["الأفضل", "الأقوى", "من فضلك"] }
cta_style: "chat-first WhatsApp: ابعتلنا واتساب وهنرتبلك"
do: ["scene-based emotion", "one concrete number"]
dont: ["hype adjectives", "MSA bleed"]
samples: ["جسمك هيتغير، وهتحس بيه قبل ما حد يلاحظه"]
last_updated: "2026-06-30"
```

## Related
- `references/intake-protocols.md` — voice intake questions
- `references/humanization-protocol.md` — `avoid` list feeds the banned scan
- `SKILL.md` — Pro/Project modes load voice before writing
