---
name: humanization-pattern-mining
version: 2026-07-04
purpose: Mine native Arabic texture patterns for anti-AI humanization rules
output: research/distillation-queue.md → arabic/references/humanization-protocol.md
---

# Humanization pattern mining

## Inputs

- `samples`: real native Arabic copy (URLs, pasted text, or reference/arabic-qa fixtures)
- `channel`: caption | ad | landing | blog | script
- `dialect`: masri | msa | …
- `source_tier`: A | B only

## Task

From the samples, mine texture patterns:

- Fillers, rhythm, sentence length variation
- Self-correction, scene-based emotion, idioms
- Channel-specific hooks (first 3 words, CTA tone)
- **Anti-AI tells** — stiff MSA, translationese, banned lexicon matches

For each pattern provide **before / after** micro-examples (≤2 lines each).

## Output

1. Optional `research/knowledge-base/humanization/{slug}.md` if findings are large
2. Queue items proposing ≤30-line additions to `arabic/references/humanization-protocol.md`
3. Cross-reference `arabic/references/taboos.md` if sensitivity issues appear

## Guardrails

- Tier C patterns → `deferred` with human-review flag
- Align with existing `humanization-protocol.md` — extend, don't duplicate Audit Mode rubric
- Golden test: at least one before/after fixture per distill PR
