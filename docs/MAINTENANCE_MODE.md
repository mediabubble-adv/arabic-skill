# Maintenance Mode Plan

**Status:** Active (Post-Phase 9A)  
**Activation Date:** 2026-07-07  
**Version:** v1.2.9 (runtime hardening complete)

---

## Overview

Awesome Arabic Skill has completed core product development through **Phase 9A (Distribution & Marketing)**. The project now enters **Maintenance Mode**: focus shifts from feature development to stability, monitoring, and community support.

**Core mission:** Keep the product running, fix bugs quickly, respond to user feedback, track metrics, and maintain high quality.

---

## Operating Principles

1. **Stability First** — No breaking changes without explicit user request
2. **Responsive Support** — Answer community questions within 24-48 hours
3. **Data-Driven** — Let metrics guide priorities (usage patterns, user feedback)
4. **Minimal Overhead** — Automate repetitive tasks, focus manual effort on high-impact work
5. **Long-Term Viability** — Maintain dependencies, keep documentation current

---

## Weekly Cadence

### Sunday Evening (6 PM UTC)
- **Marketplace Snapshot** (15 min)
  - Log Codex, ChatGPT, Gemini install counts
  - Update: docs/metrics/marketplace-tracker.md
  - Check for anomalies (sudden drops/spikes)

- **Community Check** (10 min)
  - Discord: Member count, active discussions
  - GitHub Discussions: Unanswered questions
  - Newsletter: Subscriber count, open rate

### Monday Morning
- **Weekly Metrics Report** (30 min)
  - Compile GA4 data, marketplace data, community stats
  - Write: docs/metrics/weekly-report-[YYYY-MM-DD].md
  - Identify trends & action items

### Throughout Week
- **Community Support** (as-needed, <1h/day)
  - Answer questions in Discord #help
  - Respond to GitHub Discussions
  - Review feature requests (GitHub Issues)

- **Bug Triage** (as-needed, <1h/day)
  - Check GitHub Issues for new bugs
  - Reproduce & categorize by severity
  - Assign priority (P0 = critical, P3 = nice-to-have)

---

## Monthly Cadence

### Month-End Review (1-2 hours)

**Metrics Review:**
- Compare against Phase 9A targets
  - NPM installs trending toward 1K?
  - Website organic traffic growing?
  - Community growth on track?
- Identify wins & gaps
- Adjust next month's priorities

**Dependency Updates:**
- `npm outdated` — Check for updates
- Update non-breaking dependencies
- Run full test suite
- Commit: `chore(deps): update dependencies [version]`

**Documentation Audit:**
- Check for stale docs/links
- Update README if needed
- Verify all links are live

---

## Critical Path: What Needs Attention

### P0 (Critical — Fix ASAP)
- Installation broken (e.g., CLI errors)
- Security vulnerability discovered
- Data loss or corruption
- Community platform down (Discord, etc.)

### P1 (High Priority — Fix This Week)
- Feature completely broken
- Major user-facing bug
- Performance regression
- Marketplace listing issues

### P2 (Normal — Schedule Next Sprint)
- Minor bugs (workaround exists)
- Feature request with 5+ upvotes
- Documentation gaps
- Performance optimization (non-critical)

### P3 (Low — Backlog)
- Edge case bugs
- "Nice to have" features
- Code cleanup/refactoring
- Cosmetic issues

---

## Quarterly Reviews (Every 3 Months)

### Full State Assessment
1. **Metrics Report** — 3-month trend analysis
2. **User Feedback** — Top feature requests, pain points
3. **Dependency Health** — Security patches, major updates available
4. **Community Health** — Engagement, churn, NPS (Net Promoter Score)
5. **Technical Debt** — Performance, test coverage, documentation

### Decision Points
- **Continue Maintenance?** (Yes/No based on metrics)
- **Invest in Phase 9B?** (Advanced features, if demand justifies)
- **Archive the Project?** (If usage declines below threshold)

---

## Support Responsibilities

### Community Channels
| Channel | Owner | Response Time | Role |
|---------|-------|---|---|
| Discord #help | MediaBubble team | 24h | Answer Q&A, troubleshoot |
| GitHub Discussions | MediaBubble team | 24-48h | Answer Q&A, route feature requests |
| GitHub Issues | MediaBubble team | 48-72h | Triage bugs, assign priority |
| Email (support@...) | MediaBubble team | 24-48h | Handle direct support requests |
| Twitter mentions | MediaBubble team | 24h | Acknowledge & link to help |

### Escalation
- **Can't reproduce:** Ask for steps to reproduce + environment details
- **Complex issue:** Invite to Discord for real-time debugging
- **Feature request:** Link to GitHub Issues, invite vote/comment
- **Security issue:** Email security@mediabubble-adv.com (private)

---

## Metrics to Monitor

### Leading Indicators (Watch Weekly)
- NPM installs/week (trend toward 1K?)
- Website sessions/week (growing?)
- Discord new members/week (community growth?)
- Newsletter open rate (engagement?)

### Lagging Indicators (Review Monthly)
- Total cumulative installs
- Cumulative website users
- Total Discord members
- Total newsletter subscribers
- Customer NPS (if surveys conducted)

### Health Indicators (Check Monthly)
- GitHub Issue response time (< 48h?)
- Discord response time (< 24h?)
- Dependency security vulnerabilities (any P0?)
- Test suite pass rate (100%?)
- Website uptime (99.9%+?)

---

## Maintenance Tasks Checklist

### Weekly
- [ ] Marketplace snapshot (Codex, ChatGPT, Gemini)
- [ ] Community metrics (Discord, GitHub, newsletter)
- [ ] Answer Discord #help questions
- [ ] Review GitHub Issues (new bugs)
- [ ] Check website uptime

### Monthly
- [ ] Generate weekly metrics report
- [ ] Month-end metrics review
- [ ] Dependency updates (if safe)
- [ ] Documentation audit
- [ ] Security patches (if any)

### Quarterly
- [ ] 3-month trend analysis
- [ ] Collect user feedback
- [ ] Assess technical debt
- [ ] Plan next quarter priorities
- [ ] Review long-term viability

---

## When to Escalate to Development

### Scenarios That Warrant a New Version

- **P0 Bug:** Installation broken, security issue
- **High-Demand Feature:** 10+ upvotes, repeated requests
- **Dependency Blocker:** Critical security patch, major breaking update
- **Performance Crisis:** Website slow (LCP > 3s), CLI hangs
- **User Churn:** Drop in weekly installs, community decline

### Version Bump Strategy
- **Patch (v1.2.10):** Bug fixes, security patches
- **Minor (v1.3.0):** New features, performance improvements
- **Major (v2.0.0):** Breaking changes (avoid unless critical)

---

## Off-Season & Vacation

### Before Going Away
1. **Hand-off Document** — Current state, active issues, next priorities
2. **On-Call Coverage** — Designate someone to handle P0/P1 issues
3. **Auto-Response** — Set on Discord, GitHub, email
4. **Metrics Snapshot** — Document baseline before leave

### During Away
- On-call person handles P0/P1 only (fixes, not new features)
- Weekly metrics collection can pause
- Community can continue conversations (async)

### Upon Return
- Review any P0/P1 fixes applied
- Catch up on Discord/GitHub backlog
- Resume normal cadence

---

## Success Criteria for Maintenance Mode

**Phase 9A succeeded if we achieve:**

| Metric | Target | Check |
|--------|--------|-------|
| NPM installs | 1,000+ cumulative | [ ] |
| Website organic traffic | 500+ monthly users | [ ] |
| Discord community | 50+ members | [ ] |
| Newsletter subscribers | 100+ | [ ] |
| Blog traffic | 200+ impressions/month | [ ] |
| Lighthouse score | ≥90 | [ ] |
| Response time (support) | <48h | [ ] |
| Test suite | 100% pass | [ ] |
| Security issues | 0 unpatched P0 | [ ] |

**If targets met:** Maintenance mode is sustainable and project is healthy.  
**If targets miss:** Consider Phase 9B investment or sunset plan.

---

## Resources

- **Weekly Report Template:** docs/metrics/weekly-report-template.md
- **Marketplace Tracker:** docs/metrics/marketplace-tracker.md
- **GA4 Setup:** docs/metrics/GA4_SETUP.md
- **Phase 9A Plan:** docs/planning/p9a-distribution-marketing.md
- **Roadmap:** docs/planning/roadmap.md

---

## Next Steps

1. ✅ **Phase 9A Complete** — All distribution & marketing components live
2. ⏳ **Maintenance Mode Active** — Begin weekly/monthly cadence
3. 📊 **Monitor Metrics** — Track against 6-month targets
4. 🔄 **Quarterly Review** — Assess viability & plan next steps (9B vs. sustain vs. sunset)

---

**Maintenance Mode Activation:** 2026-07-07  
**Next Quarterly Review:** 2026-10-07  
**Owner:** MediaBubble Team  
**Contact:** support@mediabubble-adv.com
