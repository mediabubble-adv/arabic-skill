# RTL Audit — Source-Based UI Checks (Tier 1)

**Load when:** `/arabic audit rtl` or RTL/UI review of markup, components, or styles in a repo.
**Pair with:** `references/project-context-scanner.md` (safe scan + `--dir` cap), `references/audit-mode.md` (Arabic string QA).

> **Scope (v1.1):** Tier 1 = static source inspection only. No browser, screenshots, or visual regression in this release.

---

## 1. Command

```text
/arabic audit rtl [--dir <path>] [--file <path>]
```

| Flag | Behavior |
|---|---|
| (none) | Audit open/selected UI source files in the workspace |
| `--file` | Single file (`.tsx`, `.jsx`, `.vue`, `.html`, `.css`, `.md` with UI) |
| `--dir` | Capped directory scan (see §2) |

Arabic copy within audited files still runs through `audit-mode.md` when strings are in scope.

---

## 2. Directory scan cap (`--dir`)

Reuse safe-scan rules from `project-context-scanner.md` with these limits:

| Limit | Value |
|---|---|
| Max files scanned | **40** |
| Max depth from `--dir` root | **4** |
| Max file size | **256 KB** per file |
| Allowed extensions | `.html`, `.htm`, `.tsx`, `.jsx`, `.vue`, `.svelte`, `.css`, `.scss`, `.md`, `.mdx` |

**Exclude always:** `node_modules/`, `vendor/`, `.venv/`, `dist/`, `build/`, `.next/`, `coverage/`, `.git/`, secrets, lockfiles.

If the cap is hit, report: *"Capped at 40 files — narrow `--dir` or audit specific files with `--file`."*

---

## 3. Tier-1 checklist (source-based)

Score each item **pass / warn / fail** for the audited set.

| # | Check | Pass when |
|---|---|---|
| 1 | **Document direction** | Root layout or `html` sets `dir="rtl"` (or equivalent) for Arabic-primary pages |
| 2 | **Logical CSS** | Prefer `margin-inline-*`, `padding-inline-*`, `inset-inline-*`, `text-align: start` over hard `left`/`right` on RTL surfaces |
| 3 | **Icon / chevron mirroring** | Directional icons (arrows, back, forward) flip or use RTL-aware assets |
| 4 | **Bidirectional isolation** | LTR islands (code, URLs, commands) wrapped in `dir="ltr"` or `unicode-bidi: isolate` |
| 5 | **Font stack** | Arabic-capable fonts declared for Arabic UI text |
| 6 | **Mixed numerals** | Phone numbers, versions, and IDs in LTR islands; body Arabic in RTL flow |
| 7 | **Form labels** | Labels and inputs align to start edge; error text follows field direction |
| 8 | **Table / list alignment** | Lists and tables use start/end alignment, not fixed left |
| 9 | **Hardcoded asymmetry** | No `float: left`, `text-left`, `ml-*`/`mr-*` (Tailwind) on RTL-primary components without `rtl:` mirror |
| 10 | **Arabic string QA** | Visible Arabic passes register scan from `audit-mode.md` when strings are present |

---

## 4. Output format

```markdown
## RTL Audit Report
**Scope:** 12 files under `src/components/` (capped: no)
**Tier:** 1 — source only

| Check | Result | Notes |
|---|---|---|
| Document direction | ✅ pass | `app/layout.tsx` sets dir from locale |
| Logical CSS | ⚠️ warn | 3 uses of `margin-right` in `Header.tsx` |
| … | | |

**Top fix:** Replace `margin-right` with `margin-inline-end` in `Header.tsx` (lines 42, 58, 71).

**Arabic copy issues:** (if any — link to audit-mode findings)

**Deferred:** visual/screenshot tier not run in v1.1.
```

---

## 5. When to escalate

- User needs pixel-perfect visual proof → note browser tier is deferred past v1.1
- Mixed EN/AR marketing site → audit Arabic routes separately from LTR developer docs
- Component library with no RTL variant → recommend `rtl:` utilities or logical properties, do not guess runtime behavior
