# GitHub Discussions FAQ — Pinned Response

Use this template for a pinned "Getting Started" discussion in GitHub Discussions.

---

## Getting Started with Awesome Arabic Skill

Welcome! 👋 This is the official Q&A space for Awesome Arabic Skill. Browse below for common questions, or [open a new discussion](https://github.com/mediabubble-adv/arabic-skill/discussions/new?category=question) if you can't find your answer.

### Installation

**Q: How do I install Awesome Arabic Skill?**

A: Depends on your tool:

```bash
# Cursor (recommended)
npx @mediabubble-adv/arabic-skill@latest install --target cursor

# Claude Code
npx @mediabubble-adv/arabic-skill@latest install --target claude

# Codex
npx @mediabubble-adv/arabic-skill@latest install --target codex

# Or use the open skills registry
npx skills add mediabubble-adv/arabic-skill
```

See: [Install Guide](https://arabic-skill.vercel.app/install)

---

**Q: I got "command not found: arabic-skill"**

A: Use `@latest` to install from npm, not from the local repo:

```bash
# ✅ Correct
npx @mediabubble-adv/arabic-skill@latest install --target cursor

# ❌ Wrong (resolves locally if in a cloned repo)
npx arabic-skill install --target cursor
```

---

### First Run

**Q: What's the first command I should run?**

A: After install, run:

```bash
/arabic guide
```

This walks you through how the skill works, no repo setup needed.

---

**Q: Do I need to run `/arabic init` in my project?**

A: Only if you want to use project-aware features. For one-off content:

```bash
# One-off (no init needed)
/arabic write caption --dialect masri --count 3

# Project mode (needs init)
cd my-project && /arabic init
/arabic auto   # ← scans project files
```

---

### Dialects & Load Presets

**Q: Which dialect should I use?**

A: It depends on your audience:

- **Masri** — Social media, ads, customer support (casual, warm)
- **MSA** — Official docs, news, formal announcements (formal, authoritative)
- **Gulf** — Saudi Arabia, UAE, Kuwait (regional flavor)
- **Levantine** — Syria, Lebanon, Palestine (regional flavor)

See: [Masri vs. MSA Guide](https://arabic-skill.vercel.app/blog/posts/masri-vs-msa-dialect-guide)

---

**Q: What are load presets? How do I use them?**

A: Load presets bundle reference files for specific tasks, saving context and cost:

```bash
# Ramadan campaign (seasonal preset)
/arabic write caption --dialect masri --preset seasonal --count 20

# Website audit (audit preset)
/arabic audit page.md --preset audit

# Gulf market optimization
/arabic plan website --preset seo-aeo-gulf
```

**Available presets:**
- `seasonal` — Holiday campaigns (Ramadan, Eid, etc.)
- `campaign` — Marketing ads and landing pages
- `audit` — Copy review and quality checks
- `seo-aeo-masri`, `seo-aeo-gulf`, `seo-aeo-ksa`, `seo-aeo-levantine` — Regional SEO
- `book` — Long-form content (chapters, guides)
- `write` — General content creation
- `plan` — Strategic planning
- `coach` — Prompt improvement
- `audit-full` — Complete audit (all reference files)
- `dialect-lock` — Enforce single dialect

See: [Load Presets Guide](https://arabic-skill.vercel.app/blog/posts/load-presets-task-bundling)

---

### Content Quality

**Q: How do I avoid translationese?**

A: Use the `--tone native` flag:

```bash
/arabic write caption \
  --dialect masri \
  --tone native \
  --brief "Ramadan discount announcement for fitness app"
```

The skill will rewrite from scratch in natural Arabic instead of translating.

---

**Q: What's RTL validation? Do I need it?**

A: RTL validation checks bidirectional text (Arabic + English mixing). Use it for:

```bash
# Check a caption mix for RTL issues
/arabic audit text.md --check rtl
```

**When you need it:** Mixed-script content (e.g., "تطبيق Fitness" = Arabic + English brand name).

See: [RTL & Bidirectional Text Guide](https://arabic-skill.vercel.app/blog/posts/rtl-bidirectional-text-guide)

---

**Q: How do I audit my content before shipping?**

A: Three-step workflow:

```bash
# 1. Write
/arabic write caption --dialect masri --brief "..."

# 2. Audit (check quality, RTL, translationese)
/arabic audit my-caption.md --preset audit

# 3. Ship (approved for production)
```

---

### Support & Feedback

**Q: I found a bug. Where do I report it?**

A: [Open an issue](https://github.com/mediabubble-adv/arabic-skill/issues) with:
- What you tried
- What happened
- Expected behavior
- Your Cursor/Claude/Codex version

---

**Q: I have a feature request. Where does it go?**

A: [Start a discussion](https://github.com/mediabubble-adv/arabic-skill/discussions/new?category=idea) and describe:
- Problem you're solving
- Proposed solution
- Why it matters to you

---

**Q: Where can I chat with the community?**

A: [Join our Discord](https://discord.gg/[invite-code])! Channels:
- `#general` — Off-topic chat
- `#help` — Quick questions
- `#showcase` — Share your projects
- `#feature-requests` — Vote on ideas
- `#dev` — Technical deep dives

---

### More Resources

- **Blog:** [Tips, guides, case studies](https://arabic-skill.vercel.app/blog)
- **Docs:** [Full documentation](https://arabic-skill.vercel.app/docs)
- **Newsletter:** [Monthly updates](https://arabic-skill.vercel.app/newsletter)
- **GitHub:** [Source code & roadmap](https://github.com/mediabubble-adv/arabic-skill)

---

### Still stuck?

- Check our [blog tutorials](https://arabic-skill.vercel.app/blog)
- Ask in [#help on Discord](https://discord.gg/[invite-code])
- [Open a new discussion](https://github.com/mediabubble-adv/arabic-skill/discussions/new?category=question)

We're here to help! 🚀

---

**Last updated:** 2026-07-07  
**Next review:** Monthly
