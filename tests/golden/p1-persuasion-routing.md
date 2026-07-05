# Golden Test P1 — Persuasion-Psychology Routing Contract (v1.2.7)

Behavioral contract for Phase 1 (Arab Persuasion Psychology Layer) — archetype identification, lever activation, and commercial-task routing.

## P1-Contract-01 — File integration manifest

- [ ] `arabic/references/persuasion-arab-psychology.md` exists with all 6 archetypes, 8 levers, protocol
- [ ] `arabic/voice.md` has `archetype: primary/secondary` schema fields
- [ ] `arabic/references/advisory-mode.md` includes archetype/lever recommendation line (commercial tasks)
- [ ] `arabic/references/audit-mode.md` has 10-point QA (check #10 = persuasion-lever consistency)
- [ ] `arabic/references/intake-protocols.md` has archetype dynamic slot option
- [ ] `arabic/SKILL.md` includes archetype identification + persuasion-lever consistency checklist items
- [ ] `arabic/references/load-discipline.md` lists persuasion file for commercial write tasks
- [ ] `arabic/references/engines.md` has Persuasion Overlay section for commercial engines
- [ ] `arabic/references/INDEX.md` includes persuasion file (22 files total)

## P1-Contract-02 — Routing markers (detect in copy/recommendation)

**Archetype Detection Markers:**
- Family Guardian: طيب، عيلة، تعتمد، حماية، مسؤول
- Generous Host: كريم، أهلا، ضيف، استضيف، مقدّم
- Faithful Steward: أمين، مسؤول، ثقة، الدين، أداء
- Ambitious Achiever: طموح، إنجاز، نجاح، تفوّق، عالي
- Community Pillar: مجتمع، قيادة، دور، مسؤولية اجتماعية
- Heritage Keeper: تراث، تقليد، أصل، حفظ، ذاكرة

**Lever Activation Markers (8 levers × intensity mapping):**
- Thiqa (Trust): "موثوق", "أمين", "اختبار", "ضمان"
- Barakah (Blessing): "بركة", "خير", "زيادة", "رزق"
- Reciprocity: "للك", "تبادل", "مقابل", "جزاء"
- Fomo (Social Proof): "الناس", "الكل", "المشهور", "الجميع"
- Nostalgia: "الأول", "الأصلي", "زمان", "كانت"
- Collective Pride: "عربي", "إحنا", "أهلنا", "ديننا"
- Halal Assurance: "حلال", "قانوني", "شرعي", "إسلامي"
- Narrative Arc: "قصة", "حكاية", "تطور", "مسار"

## P1-Contract-03 — Commercial task detection

**Tasks requiring archetype routing:**
- `/arabic write ad|ads|campaign|sales|funnel|landing|caption` (with CTA)
- `/arabic plan campaign`
- Brand voice guidance for commercial use

**Tasks skipping persuasion (editorial only):**
- `/arabic write blog|article|tutorial|guide` (without CTA)
- `/arabic plan website` (informational)
- `/arabic research`

## P1-Contract-04 — Recommendation format

**Expected recommendation (commercial tasks):**
```
Dialect/register:   <e.g. clean commercial Masri>
Format/channel:     <e.g. Meta Reels + click-to-WhatsApp>
Archetype/lever:    <e.g. Family Guardian + Thiqa (Trust)>
Why:                <one line tied to the user's goal>
```

## P1-Contract-05 — Audit check #10 scoring

**Check #10: Persuasion-lever consistency (commercial tasks only)**
- 2/2 if copy activates declared archetype + lead lever, no contradictory levers
- 1/2 if partial activation or minor lever inconsistency
- 0/2 if archetype undermined or levers contradict
- Skipped for editorial/blog tasks

**Scoring matrix (max 20):**
| Score | Rating | Action |
|-------|--------|--------|
| 18–20 | ✅ PASS | Publish |
| 14–17 | ⚠️ CONDITIONAL | Approve with noted exceptions |
| 10–13 | 🔄 REVISE | Required fixes before re-audit |
| < 10 | 🚫 BLOCKED | Full rewrite |

## P1-Contract-06 — Integration hooks (wiring complete)

- [ ] Intake asks archetype confirmation (dynamic slot) → user selects from 6 + secondary option
- [ ] Recommendation summary shows `Archetype/lever: <primary> + <lever> + <why>` (commercial only)
- [ ] Engines label output sections: `[Awareness] Ambitious Achiever + FOMO`
- [ ] Audit checklist runs persuasion consistency (check #10) before delivery
- [ ] Voice.md persists archetype for brand continuity

## Validation

- [ ] `npm run validate` exits 0 (all references synced)
- [ ] `npm run validate:cursor-sync` exits 0 (.cursor/skills/arabic/ matches root)
- [ ] Golden test markers found in persuasion-arab-psychology.md (all 6 archetypes + 8 levers)
- [ ] Load discipline includes persuasion for write/plan commercial tasks
- [ ] Audit-mode.md check #10 passes syntax validation

## Out of scope (Manual LLM harness future)

Real routing validation (does the archetype truly match the user's buyer? Does copy actually activate the declared lever?) requires agent LLM runner — not this gate. This contract verifies wiring + file integration only.
