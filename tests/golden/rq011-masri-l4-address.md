# Golden Test RQ-011 — Masri L4 address titles distill

Manual checklist for reference-gap distill `feat/research-rq011-distill`.

**Source:** `reference/arabic-masri/SKILL.md` § Business Communication  
**Runtime:** `arabic/dialects/masri.md` §13

## G-RQ011-01 — Runtime slice present

- [ ] `arabic/dialects/masri.md` §13 includes business address title table
- [ ] Table covers حضرتك, أستاذ/أستاذة, باشا, مهندس (and دكتور)
- [ ] Default-when-unsure rule (حضرتك or أستاذ/أستاذة + name) present
- [ ] باشا Gulf-client caveat noted

## G-RQ011-02 — Write task behavior

**Command:** `/arabic write linkedin` for a B2B outreach post addressing a Cairo engineering lead.

**Expected:** Agent uses **مهندس** or **أستاذ** + name at L4 register from `arabic/dialects/masri.md` §13 — not يا عم / حبيبي.

**Command:** `/arabic write` for a formal client email (Egypt, unknown seniority).

**Expected:** Agent defaults to **حضرتك** or **أستاذ/أستاذة + name** per §13 rule of thumb.

## G-RQ011-03 — Queue closed

- [ ] `research/distillation-queue.md` — RQ-011 moved to **Distilled (recent)**; not in Open

## Validation

- [ ] `npm run validate` exits 0
