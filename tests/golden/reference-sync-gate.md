# Golden Test — Reference sync gate

Manual checklist for `scripts/validate-reference-sync.sh` (1.2.x CI gate).

## G-REF-SYNC-01 — Gate passes locally

- [ ] `npm run validate:reference-sync` exits 0
- [ ] Output reports 38 reference packs and INDEX runtime file count matches disk

## G-REF-SYNC-01b — INDEX parity

- [ ] `arabic/references/INDEX.md` **Total built** matches `references/` + `dialects/` + `domains/` + `conversations/` + `professional-docs/` + SKILL + voice
- [ ] Every runtime `.md` under those dirs appears in INDEX tables
- [ ] No orphan runtime files outside INDEX

## G-REF-SYNC-02 — Distillation map

- [ ] `scripts/reference-distillation-map.json` lists every non–canonical-only `reference/arabic-*` pack (explicit mapping, dialect auto-pair, or `canonical_only`)
- [ ] Each mapped runtime target path exists on disk

## G-REF-SYNC-03 — Queue exclusivity

- [ ] No `RQ-###` id appears in more than one of Open / In progress / Distilled / Deferred
- [ ] Distilled rows cite existing runtime paths

## G-REF-SYNC-04 — CI wiring

- [ ] `.github/workflows/validate.yml` runs `validate-reference-sync.sh`
- [ ] `npm run validate` includes the gate

## Validation

- [ ] `npm run validate` exits 0
