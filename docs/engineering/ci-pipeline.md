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
│  - frontmatter   │
│  - doc links     │
│  - supported     │
│  - npm pack      │
│  - cursor install│
│  - version sync  │
└──────────────────┘
       │
       ▼ (tag v*.*.*)
┌──────────────────┐
│  release.yml     │
│  - GitHub Release│
└──────────────────┘
       │
       ▼ (tag v*.*.*)
┌──────────────────┐
│ npm-publish.yml  │
│  - npm registry  │
└──────────────────┘
```

---

## Workflows

### `validate.yml` (every PR and push to `main`)

| Job | Script | Fails when |
|-----|--------|------------|
| skill-integrity | `scripts/validate-skill.sh` | SKILL.md references missing files |
| frontmatter | `scripts/validate-frontmatter.sh` | SKILL.md YAML schema invalid |
| docs-links | `scripts/validate-docs.sh` | Broken relative markdown links |
| supported-tools | `scripts/validate-supported.sh` | Tool profile / matrix drift |
| npm-pack | `scripts/validate-npm-pack.sh` | Pack missing required files |
| cursor-install | `scripts/validate-cursor-install.sh` | Full Cursor install dry-run fails |
| version-sync | inline check | VERSION ≠ SKILL.md ≠ package.json |

### `release.yml` (on tag `v*.*.*`)

| Job | Action |
|-----|--------|
| create-release | GitHub Release from tag + generated release notes |

---

## Local Validation

Before opening a PR:

```bash
npm run validate
```

Or individual gates:

```bash
./scripts/validate-skill.sh
./scripts/validate-frontmatter.sh
./scripts/validate-docs.sh
./scripts/validate-research.sh
./scripts/validate-reference-sync.sh
./scripts/validate-onboarding.sh
./scripts/validate-golden.sh
./scripts/validate-website-playwright.sh
```

Research and onboarding gates are included in `npm run validate` locally; CI runs the subset listed in `.github/workflows/validate.yml` plus the `website-e2e` job for G15–G16 Playwright tests.

---

## Future Additions

| Gate | Phase | Purpose |
|------|-------|---------|
| Golden prompt tests (G13–G18) | v1.1.0 | Website acceptance scenarios |
| Golden fixture gate | **1.2.x ✅** | `validate-golden.sh` — structure, path refs, G13 route smoke |
| Website Playwright (G15–G16) | **1.2.x ✅** | `validate-website-playwright.sh` — mobile UX + audit/footer smoke |
| Reference sync check | **1.2.x ✅** | `validate-reference-sync.sh` — INDEX, distillation map, queue exclusivity |
| Golden prompt tests (G1–G12) | **v1.0.0 gate** | Skill acceptance scenarios — see [implementation-plan §0.3](../planning/implementation-plan.md#03-golden-test-master-table-g1g18) |
| `npx arabic detect` | v2.0.0 | AI-ism scanner for output |
| Install website + Pages deploy | Post-v1 test | Public install site at `website/` |

---

## GitHub Pages / website deploy

The marketing site lives in `website/` and deploys to Vercel (https://arabic-skill.vercel.app). G14 install copy is enforced by `scripts/validate-website-install.sh` against root `README.md`.

---

## Related Documents

- [Versioning and Releases](./versioning-and-releases.md)
- [Branching Strategy](./branching-strategy.md)
- [Collaboration Rules](./collaboration-rules.md)
