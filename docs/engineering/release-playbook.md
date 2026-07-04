# Release Playbook

> Step-by-step release procedure for **Awesome Arabic Skill** (`arabic`). Complements [versioning-and-releases.md](./versioning-and-releases.md) (policy) and [branching-strategy.md](./branching-strategy.md) (branches). This doc is the **operational checklist**.

**Status:** Active · **Owner:** Maintainer · **Last updated:** 2026-07-04
**Applies to:** v1.0.0 (first public release) and v1.1.0 (website + distribution)

---

## 0. Pre-flight (any release)

- [ ] `main` is green (latest `validate` workflow passed)
- [ ] Target phases complete per [implementation-plan §0](../planning/implementation-plan.md#0-canonical-phase-map--golden-tests-source-of-truth)
- [ ] Required golden tests pass (gate below)
- [ ] `VERSION` = `arabic/SKILL.md` `version` (CI enforces; confirm locally)
- [ ] `CHANGELOG.md` `[Unreleased]` reflects all user-visible changes

### Release gates by version

| Version | Phases required | Golden tests | Other gates |
|---------|-----------------|--------------|-------------|
| **1.0.0** | P1–P6 complete | **G1–G12** pass | PRD §12 (11 criteria) verified; install tested on Cursor + Claude |
| **1.1.0** | P7 complete | **G13–G18** pass (G1–G12 still green) | Deploy preview URL documented; install copy matches README (G14) |

---

## 1. v1.0.0 — first public release

```bash
# 1. Open release branch from green main
git checkout main && git pull origin main
git checkout -b release/1.0.0

# 2. Bump version in all three synced locations
#    - VERSION                -> 1.0.0
#    - arabic/SKILL.md        -> version: "1.0.0"
#    - arabic/references/INDEX.md build status (if counts changed)
#    Move CHANGELOG [Unreleased] -> [1.0.0] - <date>

# 3. Validate locally (must be clean)
./scripts/validate-skill.sh
./scripts/validate-docs.sh
#    Run golden tests G1–G12 (manual or tests/golden runner when available)

# 4. PR release/1.0.0 -> main; CI must pass; CODEOWNERS review
# 5. Squash-merge to main

# 6. Tag on main (annotated)
git checkout main && git pull origin main
git tag -a v1.0.0 -m "v1.0.0: first public release"
git push origin main && git push origin v1.0.0

# 7. Verify GitHub Release created by release.yml
# 8. Post-release: reopen CHANGELOG [Unreleased] for next cycle
```

**Do not** tag `v1.0.0` until every gate above is true. No plan-label tags (no `v5.2`) — product semver only.

---

## 2. v1.1.0 — website + distribution

**Website preview (G18):** https://arabic-skill.vercel.app — all 8 routes live; documented in `website/README.md`.

Same shape as §1 with these differences:

1. Branch `release/1.1.0` from `main`.
2. Gate on **P7 + G13–G18** (and G1–G12 still green).
3. Confirm website `npm run build` (G17) and a documented deploy preview URL (G18).
4. Tag `v1.1.0`; `release.yml` publishes the GitHub Release.

---

## 3. Patch / hotfix (v1.0.x)

```bash
git checkout -b fix/<short-name> main
# fix + update CHANGELOG [Unreleased]
# PR -> main -> squash merge
git checkout main && git pull
git tag -a v1.0.1 -m "v1.0.1: <summary>"
git push origin main && git push origin v1.0.1
```

---

## 4. Rollback

A release is just a tag + GitHub Release. To roll back:

1. `git revert` the offending merge commit on `main` (preferred — keeps history) **or** ship a forward `v1.0.x` patch.
2. If a bad tag was pushed: delete the GitHub Release, then `git push --delete origin vX.Y.Z` and re-tag after the fix. Avoid deleting tags users may already have pulled — prefer a patch.

---

## 5. Related documents

- [Versioning and Releases](./versioning-and-releases.md)
- [Branching Strategy](./branching-strategy.md)
- [Collaboration Rules](./collaboration-rules.md)
- [CI Pipeline](./ci-pipeline.md)
- [Implementation Plan §0 (phase map + golden tests)](../planning/implementation-plan.md#0-canonical-phase-map--golden-tests-source-of-truth)
