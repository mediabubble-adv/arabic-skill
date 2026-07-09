# Maintenance Mode Launch Checklist

**Date:** 2026-07-07  
**Status:** In Progress

---

## Phase 9A-5 Complete ✅
- [x] Blog & case studies (5 articles, 5.1K words)
- [x] Community feedback infrastructure (Discord, GitHub, Substack)
- [x] Marketing metrics dashboards (GA4, Vercel, marketplace, community)
- [x] Maintenance Mode plan (weekly/monthly/quarterly cadence)

---

## Setup Checklist: Get to Full Operation

### Discord Setup (10-15 min)
- [x] Create Discord server: [DISCORD_SETUP.md](./community/DISCORD_SETUP.md)
- [ ] Follow channel creation guide (section 2)
- [ ] Create welcome message (section 3)
- [x] Generate public invite link (`https://discord.gg/cjhhJFF5N`)
- [x] Add invite link to README
- [x] Add invite link to install site footer
- [ ] Invite core team to moderator roles

### GitHub Discussions Setup (5-10 min)
- [x] Enable GitHub Discussions (done via CLI)
- [ ] Create discussion templates manually (web UI)
  - Go to: https://github.com/mediabubble-adv/arabic-skill/discussions
  - Create new discussion for each category:
    - "Question" — Use template from `.github/discussion_templates/question.yml`
    - "Idea" — Use template from `.github/discussion_templates/idea.yml`
    - "Announcement" — Use template from `.github/discussion_templates/announcement.yml`
- [ ] Pin "Getting Started — FAQ" discussion (reference doc: [GITHUB_DISCUSSIONS_FAQ.md](./community/GITHUB_DISCUSSIONS_FAQ.md))
- [ ] Update repository description to link to discussions

### Substack Newsletter Setup (15-20 min)
- [ ] Create Substack account: [SUBSTACK_SETUP.md](./community/SUBSTACK_SETUP.md)
- [ ] Follow publication creation guide (section 1)
- [ ] Design email templates (section 2)
- [ ] Set up subscriber segmentation (section 3)
- [ ] Add Substack embed/signup form to website (already coded at `/newsletter` page)
- [ ] Send welcome email sequence
- [ ] Update README with newsletter link

### Google Analytics 4 Setup (20-30 min)
- [ ] Follow [GA4_SETUP.md](./metrics/GA4_SETUP.md) guide
- [ ] Create GA4 property
- [ ] Get Measurement ID (format: `G-XXXXXXXXXX`)
- [ ] Add to `.env.local`: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
- [ ] Deploy site with GA4 tracking
- [ ] Verify in GA4 realtime dashboard (should see users within 30 sec)
- [ ] Create custom events & conversion funnels
- [ ] Set up weekly email reports (optional)

### Marketplace Tracking Setup (10-15 min)
- [ ] Navigate to each marketplace platform:
  - Codex Skills Registry: https://skills.sh
  - ChatGPT Plugin Store: https://openai.com/blog/introducing-the-gpt-store
  - Gemini Extensions: https://ai.google.dev/docs/extensions
- [ ] Manually log first snapshot (install counts, ratings, featured status)
- [ ] Add baseline data to [marketplace-tracker.md](./metrics/marketplace-tracker.md)
- [ ] Set calendar reminder for weekly snapshots (Sundays 6 PM UTC)

### Website Updates (5 min)
- [ ] Verify newsletter form in footer is visible
- [ ] Verify `/newsletter` page renders
- [ ] Verify Discord invite link works (once created)
- [ ] Test GA4 tracking (open DevTools → look for dataLayer)

### Documentation Updates (5 min)
- [ ] Update README with Discord, GitHub Discussions, Newsletter links
- [ ] Add Maintenance Mode status to CONTRIBUTING.md
- [ ] Verify all links in docs/community/ are accurate
- [ ] Update MAINTENANCE_MODE.md with actual Discord/Substack URLs

---

## Weekly Maintenance Template

**Every Sunday 6 PM UTC:**

```markdown
## Weekly Snapshot — Week of [DATE]

### Marketplace
- Codex: X installs (↑/→/↓ since last week)
- ChatGPT: X activations (↑/→/↓)
- Gemini: X users (↑/→/↓)

### Community
- Discord: X members (↑Y this week)
- GitHub Discussions: X total
- Newsletter: X subscribers (↑Y this week)
- Newsletter open rate: X%

### Trends
- [Key observation 1]
- [Key observation 2]

### Action Items
- [ ] [Next week task]
- [ ] [Next week task]
```

### Automated Tasks
- [ ] Set GitHub Actions cron job to remind for weekly report (optional)
- [ ] Set calendar reminders:
  - **Every Sunday 6 PM UTC:** Marketplace snapshot
  - **Every Monday 9 AM UTC:** Generate weekly metrics report
  - **Month-end Monday:** Generate month-end report
  - **First Monday of quarter:** Generate 3-month trend analysis

---

## First 30 Days: Getting Traction

### Week 1 (Jul 7-13)
- [x] Phase 9A complete
- [x] Maintenance mode activated
- [ ] Discord server created
- [ ] GitHub Discussions pinned FAQ posted
- [ ] Substack newsletter launched
- [ ] GA4 property created
- [ ] First marketplace snapshots logged
- **Goal:** All infrastructure live

### Week 2-4 (Jul 14-Aug 3)
- [ ] Generate 2 weekly metrics reports
- [ ] Monitor for first Discord/GitHub/newsletter signups
- [ ] Respond to community questions (<24h)
- [ ] Check GA4 for first website traffic
- [ ] Monitor marketplace install trends
- **Goal:** Establish cadence, identify quick wins

### End of Month (Aug 3)
- [ ] Generate first month-end metrics report
- [ ] Review against 6-month targets
- [ ] Identify top user requests
- [ ] Plan August focus areas
- **Goal:** Assess traction, adjust priorities

---

## Success Criteria for Maintenance Mode Launch

| Milestone | Target | Status |
|-----------|--------|--------|
| Discord created | 1 server | [ ] |
| GitHub Discussions live | 3 templates, 1 pinned FAQ | [ ] |
| Substack launched | 1st welcome email sent | [ ] |
| GA4 tracking | Realtime data flowing | [ ] |
| Weekly report | First report generated | [ ] |
| Website updated | All links live | [ ] |
| Community live | First 5 members/subscribers | [ ] |

---

## Links & Resources

- **Community Setup Guides:**
  - [Discord Setup](./community/DISCORD_SETUP.md)
  - [GitHub Discussions FAQ](./community/GITHUB_DISCUSSIONS_FAQ.md)
  - [Substack Setup](./community/SUBSTACK_SETUP.md)

- **Metrics & Tracking:**
  - [GA4 Setup Guide](./metrics/GA4_SETUP.md)
  - [Weekly Report Template](./metrics/weekly-report-template.md)
  - [Marketplace Tracker](./metrics/marketplace-tracker.md)

- **Maintenance Plan:**
  - [MAINTENANCE_MODE.md](./MAINTENANCE_MODE.md)

---

## Questions?

For setup help, see:
1. **Discord:** DISCORD_SETUP.md (step-by-step)
2. **GitHub Discussions:** Already enabled; use templates in .github/discussion_templates/
3. **Substack:** SUBSTACK_SETUP.md (step-by-step)
4. **GA4:** GA4_SETUP.md (complete walkthrough with troubleshooting)

**Estimated Total Setup Time:** 60-90 minutes  
**Payoff:** Automated weekly metrics, active community, data-driven decisions

---

**Last Updated:** 2026-07-07  
**Status:** Launch Checklist Active  
**Next Milestone:** Complete setup checklist (target: 2026-07-14)
