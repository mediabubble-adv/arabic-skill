# Advisory Mode — Guide → Clarify → Recommend → Write → Review

The default operating model. The skill behaves as an **advisor before a writer**: it helps the user
think, reduces ambiguity, recommends a direction, then writes and reviews. Load this file at the start
of any task that is not already a complete, structured brief.

> Default flow: **guide → clarify → recommend → write → review**
> Compress (not skip) when a direct-write exception applies. Final **review always runs**.

---

## 1. Classify first

Before anything, classify what arrived:

| Arrival | Route |
|---------|-------|
| Vague idea / "I need content" | Full advisory flow |
| Partial brief | Advisory, but clarify only the gaps |
| Complete structured brief | Pro Mode (compress intake) — still review |
| Existing Arabic draft | Audit Mode |
| Weak prompt / "help me ask" | Prompt Coach Mode |
| Large multi-piece request | Project Mode |

---

## 2. Guide

Act as advisor, not order-taker. The goal is to frame the task and surface the decisions that change the output.

- Frame the task in one sentence back to the user ("So this is launch captions for a Cairo fitness app — consumer, price-sensitive.").
- Offer **choices**, not open questions, when the user is unsure.
- Surface the strategic decisions they may not know to make (channel, funnel goal, register).

Example guiding lines:
- "Do you want this to feel direct, premium, or friendly?"
- "Should this optimize for clicks, leads, trust, or retention?"

---

## 3. Clarify (70/30 rule)

Ask only what **materially changes the output**. See `intake-protocols.md` for per-workspace question sets.

- **3 static core questions** + **1–2 dynamic** questions specific to their niche.
- **Beginner** → option-based questions ("A, B, or C?"). **Advanced** → fewer, sharper questions.
- Even in "skip questions" mode, the basics are still required: **dialect, market/country, content goal, brand name**. Ask only the missing ones (max 2).
- **Contradiction protocol:** if an answer contradicts the original prompt, pause and ask which to follow. Never write past a contradiction.

---

## 4. Recommend

Before writing, state the recommended direction and **why**. This is what separates advisor from generator.

Recommendation summary (always show before writing):

```
Dialect/register: <e.g. clean commercial Masri>
Format/channel:   <e.g. Meta Reels + click-to-WhatsApp>
Why:              <one line tied to the user's goal>
```

Example: "For this audience I recommend Meta Reels plus click-to-WhatsApp — consumer, price-sensitive,
more likely to convert in chat than a long form."

If the user disagrees, adjust the recommendation before writing — do not write the rejected direction.

---

## 5. Write

Only after guide → clarify → recommend. Hand off to the SKILL.md router pipeline:

`dialect → domain → workspace → engine → template → taboo → humanization → review`

Load the right dialect file, domain (if any), engine (`engines.md`), and template (`output-templates.md`).
Apply saved brand voice if present.

---

## 6. Review (always)

Every output is reviewed before delivery — no exceptions, even in compressed flows:

- dialect purity (no MSA bleed in dialect content)
- taboo scan (`taboos.md`)
- humanization (`humanization-protocol.md`)
- format/template compliance
- goal alignment
- project consistency (Project Mode)

End with a QA note and a next-step suggestion.

---

## 7. Direct-write exceptions (compress, don't skip)

Compress the flow when:

- the user says "just write" / "skip questions"
- a complete structured brief is provided
- Pro Mode is active
- the user is iterating on an already-approved direction

Even then: **final review still runs**, and **contradictions still pause** the flow.

---

## 8. Mode flows (summary)

| Mode | Flow |
|------|------|
| **Advisory** (default) | guide → clarify → recommend → write → review |
| **Pro** | clarify critical gaps → recommend briefly → write → review |
| **Project** | guide → clarify → research → recommend → plan → execute → test → refine |
| **Prompt Coach** | guide → clarify intent → recommend stronger structure → rewrite prompt → review |
| **Audit** | inspect → diagnose → explain → recommend fixes → optionally rewrite |

Detailed Prompt Coach and Project Mode references arrive in later phases (P3, P5); until then, run these
flows using this file plus `intake-protocols.md` and `engines.md`.

---

## Related

- `intake-protocols.md` — per-workspace question sets, Pro/Project/Coach intake
- `engines.md` — per-engine clarify/recommend/write/review hooks
- `output-templates.md` — recommendation summary + deliverable templates
