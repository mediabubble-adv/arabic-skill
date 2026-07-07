# Golden Test P2 — City-Level Dialect Intelligence Routing Contract (v1.2.7)

Behavioral contract for Phase 2 (City-Level Dialect Expansion) — operational blocks for 18+ cities across 4 dialect files, with uncertainty tracking and research queue integration.

## P2-Contract-01 — File structure & city blocks (audit manifest)

### masri.md §8 (7 cities, 455 total lines)
- [ ] Cairo block: prestige, fast-paced, commercial default
- [ ] Alexandria block: Mediterranean softness, coastal markers
- [ ] Saeid (Upper Egypt) block: tradition, family-centered
- [ ] Delta block: agrarian warmth, agricultural register
- [ ] Suez/Ismailia/Port Said block: canal cities, port merchant accent
- [ ] Sharkia block: rural northeastern, agricultural
- [ ] Sinai block: distinct markers (⚠ verify flagged)

### levantine.md §1 (8 cities, 335 total lines)
- [ ] Beirut block: cosmopolitan, fashion/prestige
- [ ] Tripoli block: northern coastal, mercantile (⚠ verify)
- [ ] South Lebanon block: conservative, agricultural
- [ ] Bekaa Valley block: agricultural, rural (⚠ verify)
- [ ] Mountain/Metn block: traditional, village (⚠ verify)
- [ ] Damascus block: lyrical, diaspora emotional
- [ ] Amman block: urban-educated, modern
- [ ] Palestine: retained as overview (classical, emotional)

### ksa.md §1 (5 regions, 297 total lines)
- [ ] Najdi block: prestige, conservative, direct
- [ ] Hejazi block: softer, cosmopolitan, merchant heritage
- [ ] Qassimi block: conservative, religious, traditional
- [ ] Eastern Province block: tech/oil influence (⚠ verify)
- [ ] Southern Aseeri block: mountain culture, heritage (⚠ verify)

### khaliji.md §1 (6 countries → Dubai/Abu Dhabi, Kuwait, Qatar, Bahrain, Oman, 307 total lines)
- [ ] Dubai block: global, cosmopolitan, business
- [ ] Abu Dhabi block: formal, governmental (⚠ verify distinction)
- [ ] Kuwait block: warm, humorous, consumer-culture
- [ ] Qatar block: reserved, formal, diplomatic
- [ ] Bahrain block: warm, casual, open (⚠ verify loanwords)
- [ ] Oman block: polite, formal, classical

## P2-Contract-02 — Standard block template (verify per city)

Each city block follows:
```
### <City/Region (AR + EN)>
Register: <tone> · When to use: <audience/brand type>
Markers: 5–10 lexicon items | meaning | contrast with capital-city form
Sample line: 1 native commercial line
Avoid: 2–3 outsider markers
```

**Audit checklist per city:**
- [ ] Register note is 1 line (not vague descriptor)
- [ ] When to use is 1 line (concrete audience/brand type)
- [ ] 5–10 markers listed with contrasts
- [ ] Sample commercial line is native, not invented
- [ ] Avoid list is 2–3 specific items

## P2-Contract-03 — ⚠ Verify markers tracked

**11 uncertain markers flagged and queued:**
- [ ] Distillation-queue entries P2-001 through P2-011 created
- [ ] Each entry has: finding | target | trust tier (B/C) | notes | revisit timeline
- [ ] Canal cities (Suez/Ismailia/Port Said) — trade jargon verification pending
- [ ] Sharkia — phonetic hybrid specificity verification pending
- [ ] Sinai — tribal/political sensitivity verification pending
- [ ] Tripoli — port vocabulary verification pending
- [ ] Bekaa — agricultural jargon verification pending
- [ ] Mountain/Metn — tribal heritage context verification pending
- [ ] Eastern Province — petroleum/tech terminology verification pending
- [ ] Aseeri — phoneme preservation verification pending
- [ ] Abu Dhabi formal register — government speech patterns verification pending
- [ ] Bahrain Persian loanwords — community-specific verification pending
- [ ] Qatar formal features — diplomatic register verification pending

## P2-Contract-04 — No invented markers (validation rule)

- [ ] Zero unmarked guesses — all uncertain items flagged ⚠ verify
- [ ] No city block contains a marker that reads as "probably accurate"
- [ ] All markers either: (a) native-speaker intuition + observation, or (b) flagged ⚠ verify

## P2-Contract-05 — Load discipline & file integrity

- [ ] INDEX.md dialect count updated (11 files unchanged, but expanded content noted)
- [ ] No new load-discipline rows added (cities stay within dialect files, not new load slots)
- [ ] All 4 files under ~450 lines (masri 455, levantine 335, ksa 297, khaliji 307 — acceptable)
- [ ] File compression maintained markers, never cut them

## P2-Contract-06 — Research integration

- [ ] research/distillation-queue.md "Open" section has P2-001 through P2-011 entries
- [ ] Each entry ties back to specific dialect file + section
- [ ] Trust tier: B (solid/confident) or C (needs review)
- [ ] Revisit timeline specified per item

## Validation

- [ ] `npm run validate` exits 0 (reference sync, frontmatter, load-discipline OK)
- [ ] All 4 dialect files read and audit checklist passed
- [ ] Distillation-queue reflects all ⚠ verify flags
- [ ] Zero silent guesses, 100% transparent uncertainty

## Out of scope (Manual research phase)

Real community validation (do Sharkia speakers actually use these markers? Do Eastern Province tech workers really mix English this way?) requires fieldwork/community interviews — Phase 5 research loop. This contract verifies wiring + transparent flagging only.

## Golden scenario (manual)

**Setup:** User writes copy targeting Tripoli, Lebanon (small northern city, maritime heritage, business audience).
**Expected flow:** System loads levantine.md, recommends Tripoli block, presents markers (port vocabulary, merchant cosmopolitanism), advises caution on ⚠ verify items. Copy output acknowledges that Tripoli markers are *candidate* pending field validation.
**Acceptance:** System surfaces uncertainty, doesn't false-positively claim Tripoli accuracy.
