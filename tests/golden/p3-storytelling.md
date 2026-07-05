# Golden Test P3 — Commercial Storytelling Routing Contract (v1.2.7)

Behavioral contract for Phase 3 (Commercial Storytelling Reference) — narrative device selection, format frameworks, dialect pacing, and archetype integration for emotional commercial copy.

## P3-Contract-01 — File structure & content completeness

### storytelling.md (327 lines) — all 4 sections present

- [ ] **§1 Arab Narrative Devices (5 patterns):**
  - [ ] Proverb-anchored opening (why + example structure)
  - [ ] Hakawati cadence (oral-rhythm pacing, markers)
  - [ ] Nested reveal (1001-Nights adaptation, 4-layer structure)
  - [ ] Communal "We" arc (shift from I → We → You join us)
  - [ ] Honor-restoration arc (shame/dignity/reclaimed worth)

- [ ] **§2 Narrative Frameworks by Format (5 formats, 10–20 lines each):**
  - [ ] 30-second ad story (beat sheet: hook, escalation, turn, transformation, CTA)
  - [ ] Landing-page origin story (founder struggle, why existing solutions failed, We decision, proof, CTA)
  - [ ] Testimonial arc (before/honest struggle, turning point, after/transformation, specific proof)
  - [ ] Founder story (personal why, moment of refusal, journey, team & values, invitation)
  - [ ] Before/after without shame (dignity-based before, upgrade narrative)

- [ ] **§3 Dialect Story Rhythm (3 dialects, 10–15 lines each):**
  - [ ] Masri (punchline-first, rapid, irony-friendly, example)
  - [ ] Levantine (lyrical build, crescendo, poetic, example)
  - [ ] Khaliji (dignified reveal, formal, measured, example)

- [ ] **§4 Integration Hooks:**
  - [ ] Content Planner hook (5-point story spine check)
  - [ ] Archetype-to-narrative device pairing table (5 archetypes → best device + why)
  - [ ] Engines that load storytelling (Marketing Funnel, Sales, Video, Content Planner)

## P3-Contract-02 — Wiring verification (4 files edited)

- [ ] **SKILL.md Activation Checklist:**
  - [ ] Line added: "Storytelling framework loaded (if commercial + narrative task) → `references/storytelling.md`"
  - [ ] Position: after output template, before taboo scan

- [ ] **load-discipline.md (2 edits):**
  - [ ] Plan class: storytelling added as item 6 (only for narrative-heavy campaigns)
  - [ ] Write class: storytelling added as item 3 (only for commercial narrative tasks)

- [ ] **INDEX.md:**
  - [ ] File count updated: 21 → 23 files (persuasion + storytelling added in this phase)
  - [ ] Audit reference updated: 9-point → 10-point (reflects Phase 1 change)
  - [ ] New row added: `references/storytelling.md` with "Load when" description
  - [ ] Persuasion row added: `references/persuasion-arab-psychology.md` (Phase 1 integration)

- [ ] **engines.md (2 edits):**
  - [ ] Marketing Funnel Engine: storytelling note added (narrative device + archetype pairing)
  - [ ] Sales Content Engine: storytelling note added (founder story, testimonial, dignity-based narrative)

## P3-Contract-03 — Format accuracy verification

**30-sec ad beat sheet (§2):**
- [ ] Hook: 0–5s (1 relatable moment)
- [ ] Escalation: 5–15s (personal stakes)
- [ ] Turn: 15–20s (product entry, subtle)
- [ ] Transformation: 20–28s (benefit shown, not told)
- [ ] CTA: 28–30s (one action only)

**Landing-page origin story (§2):**
- [ ] Founder struggle section present (personal loss, insight)
- [ ] Why existing solutions failed section (specific rejection, not generic)
- [ ] "We" decision section (team, shared vision)
- [ ] Proof section (real customer transformation)
- [ ] CTA section (low friction, one action)

**Archetype pairing table (§4):**
- [ ] Family Guardian → Honor-Restoration
- [ ] Generous Host → Communal "We"
- [ ] Faithful Steward → Proverb-Anchored
- [ ] Ambitious Achiever → Nested Reveal
- [ ] Community Pillar → Communal "We"
- [ ] Heritage Keeper → Proverb-Anchored

## P3-Contract-04 — Dialect pacing authenticity

**Masri example (§3):**
- [ ] Short sentences opening
- [ ] Staccato rhythm marker (repetition of short phrases)
- [ ] Punchline/reveal at end
- [ ] Native tone (not translated)

**Levantine example (§3):**
- [ ] Medium building sentences
- [ ] Lyrical/musical quality markers
- [ ] Emotional crescendo, then release
- [ ] Poetic disclosure tone

**Khaliji example (§3):**
- [ ] Measured, complete thoughts
- [ ] Dignity marker (والله, respect for audience)
- [ ] Slow reveal, dignified pacing
- [ ] Conversation-like but formal

## P3-Contract-05 — Load discipline compliance

- [ ] Storytelling added to write task-class (item 3, before templates)
- [ ] Storytelling added to plan task-class (item 6, narrative-heavy only)
- [ ] Conditional loading rule clear: "only for commercial narrative tasks"
- [ ] No new task-class sets created (storytelling fits within existing write/plan)

## P3-Contract-06 — No invented examples

- [ ] All narrative device examples are believable (not AI-polished)
- [ ] All beat sheets are practical templates (not prescriptive formulas)
- [ ] Archetype pairings rest on Phase 1 persuasion framework (cross-reference check)
- [ ] Dialect examples sound native (not translated/constructed)

## Validation

- [ ] `npm run validate` exits 0 (frontmatter, load-discipline syntax, file count)
- [ ] INDEX.md counts updated: 23 files in references
- [ ] Wiring checklist passed: 4 files edited, 6 specific locations verified
- [ ] No circular references: storytelling.md doesn't reference engines.md features section

## Out of scope (Manual user testing)

Real campaign performance (does the proverb-anchored device actually increase conversion? Does Masri punchline rhythm outperform Levantine in 30-sec ads?) requires live A/B testing. This contract verifies the framework is complete, wired, and internally consistent only.

## Golden scenario (manual)

**Setup:** User plans a 3-piece KSA campaign targeting Family Guardian buyers (heritage, dignity).
**Expected flow:** System loads SKILL.md, recognizes commercial narrative task, loads storytelling.md. Recommends Honor-Restoration device (matches Family Guardian + KSA register). Suggests founder story for awareness, testimonial for consideration, before/after (dignity-based) for conversion. User accepts; writes follow-up matches recommendation.
**Acceptance:** Storytelling framework properly routes to archetype + device without user asking explicitly.
