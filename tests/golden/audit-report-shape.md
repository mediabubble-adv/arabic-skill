# Golden Test — audit report shape (structure only)

Fixture for agents and validators: a saved `/arabic audit` report under `.arabic/audits/` must expose these headings/fields. Values here are placeholders.

```markdown
# Audit Report — {slug}
**Date:** YYYY-MM-DD
**Source:** path-or-paste
**Dialect / register target:** L3 masri
**Surface:** copy | website
**Overall:** 0/18 · Verdict: REVISE
**Legacy register:** clean · **AI-likelihood:** low

## Issues (ranked)
1. **[block.hero]** major — placeholder issue
   - Evidence: …
   - Fix direction: …

## Component map
| ID | Locale | Verdict | Note |
|----|--------|---------|------|
| block.hero | ar | fail | placeholder |

## Locks to preserve
- مثال قفل براند

## Improve seeds
- primary_job: tone
- voice_hint: agency cool
- lang_order: ar_en
- scope_paths: website/content/home.md

## Copy-ready
/arabic improve --from-audit .arabic/audits/{slug}-{date}.md
```

Required sections: title `# Audit Report`, **Overall**, `## Issues (ranked)`, `## Locks to preserve`, `## Improve seeds`, `## Copy-ready`.  
`## Component map` required when **Surface:** website.

## Validation

- [ ] Saved audit reports under `.arabic/audits/` include every required section above
- [ ] `## Component map` is present whenever **Surface:** is website
