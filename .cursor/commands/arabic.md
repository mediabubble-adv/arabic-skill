# `/arabic`

Use the Awesome Arabic Skill as the root router for Arabic content tasks.

## Routing rules

- Bare `/arabic` and `/arabic guide` use Advisory Mode.
- `/arabic write ...` routes through `arabic/references/command-router.md`.
- `/arabic plan ...` routes through Project Mode and writes plans under `.arabic/projects/` when the workflow calls for persistence.
- `/arabic audit ...` reviews existing Arabic copy.
- `/arabic coach ...` repairs weak prompts.
- `/arabic research ...` runs the research-intelligence workflow — load `arabic/references/research-mode.md`.
- `/arabic voice ...` loads or saves brand voice memory.
- `/arabic auto ...` scans the workspace and infers the right command.
- `/arabic init` creates the `.arabic/` scaffold.

## Before you answer

1. Load `arabic/SKILL.md`.
2. Load `arabic/references/command-router.md`.
3. Load only the task-relevant dialect, domain, or project file.
4. Keep command syntax, filenames, and flags unchanged.
5. Do not invent repo facts when the command asks for project-aware output.

## Copy-ready examples

```text
/arabic
/arabic write caption --dialect masri --platform instagram --count 12
/arabic plan website --brief .arabic/briefs/site.yaml
/arabic audit --file content/landing.ar.md
/arabic research status
/arabic research distill
/arabic research tiktok-ads
/arabic voice save
/arabic auto explain
```
