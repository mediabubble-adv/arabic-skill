# Branching Strategy

## Default Branch

`main` — always deployable. Protected.

---

## Branch Types

| Prefix | Purpose | Example | Merges to |
|--------|---------|---------|-----------|
| `feat/` | New capability | `feat/advisory-mode` | `main` |
| `fix/` | Bug or broken link | `fix/khaliji-routing` | `main` |
| `docs/` | Documentation only | `docs/cursor-adapter` | `main` |
| `release/` | Release prep | `release/1.1.0` | `main` |
| `chore/` | CI, scripts, tooling | `chore/validate-skill` | `main` |

---

## Workflow

```
main ─────────────────────────────────────────────►
       ╲                    ╱
        feat/advisory-mode ─
```

1. Branch from latest `main`
2. Open PR early — draft OK for large work
3. CI must pass before merge
4. Squash merge preferred for feature branches
5. Delete branch after merge

---

## Release Branches

For minor/major releases:

1. `release/1.1.0` from `main`
2. Bump `VERSION`, `CHANGELOG.md`, `SKILL.md` version on release branch
3. Final QA — golden tests if available
4. Merge to `main`
5. Tag `v1.1.0` on `main`
6. GitHub Actions creates release

Hotfixes:

1. `fix/critical-taboo` from `main`
2. Merge to `main`
3. Tag `v1.1.1` (patch bump)

---

## Protection Rules (GitHub)

Recommended settings for `main`:

- Require PR before merge
- Require status checks: `validate` workflow
- Require linear history (optional)
- No force push
- Require CODEOWNERS review for `arabic/SKILL.md` changes

---

## Related Documents

- [Collaboration Rules](./collaboration-rules.md)
- [Versioning and Releases](./versioning-and-releases.md)
- [CI Pipeline](./ci-pipeline.md)
