## Learned User Preferences

- Prefer runtime skill folder names without redundant `-skill` suffix; `SKILL.md` lives inside the folder and `name:` should match the install folder (e.g. `arabic`, not `arabic-skill`).
- Chose `arabic` as the skill ID/folder over `awesome-arabic` because the skill is for Arabic content creation, not brand-first naming.
- GitHub repo can stay `mediabubble-adv/arabic-skill` while the portable runtime pack uses the shorter skill id.
- Do not tag or market `v1.0.0` until PRD §12 success criteria and implementation plan Phases 1–5 are complete (not on a docs-only baseline).
- Version policy: `0.1.x` = development; `v1.0.0` = first public release when the plan ships; distribution (website, `npx skills add`) deferred to v1.1.0.
- Defer the install website to a post-v1 test project—the website scaffold was removed intentionally.
- Install docs live in README + `docs/supported/` until the website ships.

## Learned Workspace Facts

- **Awesome Arabic Skill** — MediaBubble product for Arabic content creation.
- GitHub org/repo: `mediabubble-adv/arabic-skill` (clone folder `arabic-skill`).
- Runtime skill pack: `arabic/` with `SKILL.md` frontmatter `name: arabic` and `display_name: Awesome Arabic Skill`.
- Install: `git clone https://github.com/mediabubble-adv/arabic-skill.git && cp -r arabic ~/.cursor/skills/arabic`.
- `reference/` holds 38 canonical specialist skills; runtime `arabic/` is the distilled product—do not delete `reference/` casually.
- Current product version is `0.1.0` (dev baseline) in root `VERSION`, `CHANGELOG.md`, and `arabic/SKILL.md`.
- Repo layout: `arabic/` (runtime), `reference/` (canonical library), `docs/` (product, planning, engineering, supported), `scripts/` (validation); no active `website/` folder.
