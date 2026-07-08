# Install CLI output shape (golden reference)

Fixture for structural checks on `bin/arabic-skill.js` install UX — no LLM run required.
Validated by `scripts/validate-install-targets.sh`.

## `install --list`

- Two grouped sections: `skills_home (7)` then `print (17)`
- Each section has column header: `id`, `mode`, `path / notes`
- Footer: `Total: 24 targets`
- Footer: `--target all installs skills_home presets only.`

## `install --target all --dry-run`

- Summary line: `Installing 7 skills_home presets (skipping 17 print tools)...`
- Includes Cursor integration paths: `commands/arabic.md`, `rules/arabic.mdc`, `skills/arabic`
- Footer: `Skipped by --target all (not skills_home):`
- Lists all 17 print tool ids

## `install --target <id> --dry-run` (skills_home)

- Line: `Would install (skill): <resolved>/arabic`
- Hermes example: `~/.hermes/skills/arabic`

## `install --target opencode --scope workspace --dry-run`

- Resolves cwd-relative path containing `.opencode/skills/arabic`

## `install --target chatgpt --dry-run` (print)

- Header: `Install guide: chatgpt`
- Numbered steps from registry `printSteps`
- Masri footer: `ملاحظة: اسم المجلد لازم يكون arabic`
- Profile link: GitHub URL when `docs/supported/` not on disk

## Error cases

- Unknown target: `Unknown target: bogus` + grouped id list; exit non-zero
- Missing `--target` value: `Missing value for --target`
- `--scope workspace` on cursor: `Target cursor has no workspace path`
