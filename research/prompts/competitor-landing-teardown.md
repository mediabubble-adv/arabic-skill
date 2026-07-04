---
name: competitor-landing-teardown
version: 2026-07-04
purpose: Teardown competitor landing or ad copy for reusable Arabic patterns
output: research/knowledge-base/marketing-psychology/competitor-{name}.md
---

# Competitor landing teardown

## Inputs

- `competitor`: brand or product name (slug for filename)
- `source`: URL or pasted copy (Arabic or bilingual)
- `channel`: landing | meta-ad | google-ad | tiktok | email | whatsapp
- `dialect`: masri | msa | khaliji | …

## Task

Teardown the supplied copy for:

- Hook and above-the-fold promise
- Value prop and proof (social proof, numbers, authority)
- CTA placement and friction
- Objection handling
- Register and dialect choices

Extract **reusable patterns**, not copy-paste text. Write in English notes with Arabic examples quoted briefly.

## Output

1. `research/knowledge-base/marketing-psychology/competitor-{name}.md` with KB frontmatter
2. Cite source URL + access date in `research/sources/sources.yaml` (trust tier **B** unless official)
3. Optional distill queue rows targeting `engines.md`, `domains/ads-media.md`, or `examples.md`

## Guardrails

- Do not reproduce full competitor copy — patterns and short quotes only
- Label research date; no live trend claims in runtime
- Tier C anecdotes → vocabulary hints only, flagged for review
