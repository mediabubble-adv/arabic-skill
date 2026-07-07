# Discord Community Setup Guide

## Creating the Discord Server

### Step 1: Create Server
1. Go to [Discord](https://discord.com)
2. Click "+" → "Create a server"
3. Name: **Awesome Arabic Skill Community**
4. Region: EU (Frankfurt) or US (Virginia) for low latency
5. Create with default settings

### Step 2: Set Up Channels

Delete default channels and create:

#### Announcements
- **#announcements** (type: Announcement)
  - Description: "Release notes, feature updates, important news"
  - Permissions: Everyone can view, only admins post

#### Community
- **#general** (text)
  - Description: "Off-topic chat, introductions, random discussions"
- **#showcase** (text)
  - Description: "Share your Arabic content projects! Screenshots, links, results welcome."
- **#help** (text)
  - Description: "Ask questions about installation, usage, troubleshooting"

#### Development
- **#feature-requests** (text)
  - Description: "Suggest features. React 👍 to upvote ideas!"
- **#dev** (text)
  - Description: "Technical discussions, API integration, plugin development"

#### Optional
- **#marketplace** (text) - Share services, job postings, collaboration opportunities
- **#locales** (text) - Language-specific channels can be added later

### Step 3: Configure Server Settings

**Server Settings:**
- Verification level: Medium (requires email verification)
- Default notifications: Mentions only
- NSFW level: Restricted

**Roles:**
- Create role: **Moderator** (blue badge)
- Create role: **Contributor** (green badge) - for active community members
- Create role: **Verified User** (gray badge)

**Welcome Message:**
Post in #general:
```
Welcome to Awesome Arabic Skill Community! 🚀

We're here to help you scale Arabic content across 11 dialects.

📚 **Resources:**
• [Install Guide](https://arabic-skill.vercel.app/install)
• [Blog & Tutorials](https://arabic-skill.vercel.app/blog)
• [GitHub Repo](https://github.com/mediabubble-adv/arabic-skill)
• [GitHub Discussions](https://github.com/mediabubble-adv/arabic-skill/discussions)

💬 **How to get help:**
1. Check #help channel for FAQs
2. Ask in #help or open a GitHub Discussion
3. Feature ideas? Post in #feature-requests

✨ **Share your work in #showcase!**

Let's build together.
```

### Step 4: Invite Members

**Initial Setup:**
- Invite core team as moderators
- Generate public invite link (Settings → Invites)
- Copy link: `https://discord.gg/[code]`

**Distribution:**
- Add to README
- Add to install site footer
- Share in launch announcement
- Include in blog articles
- Link from GitHub Discussions

### Step 5: Automation (Optional - Phase 9B)

**Bots to consider:**
- **Dyno** or **MEE6** — moderation, welcome messages
- **Zapier** — forward Discord #announcements to Twitter/LinkedIn
- **GitHub** bot — post release notifications

---

## Monthly Community Metrics

Track in `docs/metrics/community-dashboard.md`:
- Member count (growing?)
- Messages/day in #help (engagement?)
- Feature requests (monthly vote)
- User spotlights (interview highlights)

---

## Next Steps

1. ✅ Create server
2. ✅ Set up channels
3. Link from README, install site, blog
4. Post launch announcement
5. Monitor for 50+ members by Q3 end

See: `docs/planning/9a4-community-feedback.md`
