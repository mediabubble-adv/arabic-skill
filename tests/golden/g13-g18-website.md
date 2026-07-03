# Golden Tests G13–G18 — Website (v1.1.0)

Manual checklist until automated runner ships. Run before merging `feat/website-v1.1.0`.

## G13 — 8 routes render

- [ ] `/` — 200
- [ ] `/features` — 200
- [ ] `/install` — 200
- [ ] `/commands` — 200
- [ ] `/tutorials` — 200
- [ ] `/examples` — 200
- [ ] `/about` — 200
- [ ] `/docs` — 200

Verify: `cd website && npm run build && npm run start` then curl each path, or `npm run dev` + browser.

## G14 — Install copy matches README

- [ ] `bash scripts/validate-website-install.sh` exits 0

## G15 — 3+ interactive components on mobile (390px)

- [ ] Copy-to-clipboard on `/install` (toast: تم النسخ)
- [ ] Tool tabs on `/install`
- [ ] FAQ accordion on `/install`
- [ ] Before/after toggle on `/examples`
- [ ] Sticky install bar on `/` (mobile scroll)

## G16 — Masri audit pass

- [ ] `/arabic audit --file website/content/` completed; snapshot in `.arabic/audits/website-*.md`
- [ ] `/about` shows frozen audit summary

## G17 — Build passes

- [ ] `cd website && npm run build` exits 0

## G18 — Deploy preview documented

- [ ] `website/README.md` contains live preview URL
- [ ] `docs/engineering/release-playbook.md` §1.1.0 gate checked
