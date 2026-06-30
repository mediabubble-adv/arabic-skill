# CI Pipeline

## Overview

Automated quality gates keep the skill pack internally consistent and the docs linkable.

```
PR / push to main
       │
       ▼
┌──────────────────┐
│  validate.yml    │
│  - skill refs    │
│  - doc links     │
│  - version sync  │
└──────────────────┘
       │
       ▼ (tag v*.*.*)
┌──────────────────┐
│  release.yml     │
│  - GitHub Release│
└──────────────────┘
```

---

## Workflows

### `validate.yml` (every PR and push to `main`)

| Job | Script | Fails when |
|-----|--------|------------|
| skill-integrity | `scripts/validate-skill.sh` | SKILL.md references missing files |
| docs-links | `scripts/validate-docs.sh` | Broken relative markdown links |
| version-sync | inline check | VERSION ≠ SKILL.md version |

### `release.yml` (on tag `v*.*.*`)

| Job | Action |
|-----|--------|
| create-release | GitHub Release from tag + generated release notes |

---

## Local Validation

Before opening a PR:

```bash
./scripts/validate-skill.sh
./scripts/validate-docs.sh
```

---

## Future Additions

| Gate | Phase | Purpose |
|------|-------|---------|
| Golden prompt tests (G1–G12) | **v1.0.0 gate** | Skill acceptance scenarios — see [implementation-plan §0.3](../planning/implementation-plan.md#03-golden-test-master-table-g1g18) |
| Golden prompt tests (G13–G18) | v1.1.0 | Website acceptance scenarios |
| Frontmatter lint (`validate-frontmatter.sh`) | v1.1.0 | SKILL.md YAML schema |
| Reference sync check | v1.2.0 | Distillation drift detection |
| `npx arabic detect` | v2.0.0 | AI-ism scanner for output |
| Install website + Pages deploy | Post-v1 test | Public install site at `website/` |

---

## GitHub Pages (deferred)

The `website/` folder is intentionally empty for now. Building and deploying the install site is planned as the **first test project** after the skill baseline ships. When ready, restore `website/` and re-enable the Pages job in `release.yml`.

---

## Related Documents

- [Versioning and Releases](./versioning-and-releases.md)
- [Branching Strategy](./branching-strategy.md)
- [Collaboration Rules](./collaboration-rules.md)
