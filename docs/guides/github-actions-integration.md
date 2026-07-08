# GitHub Actions Integration Guide

**Phase 9B-2: Webhooks & Automation**  
**Version:** 1.0  
**Last Updated:** 2026-07-07

## Overview

Integrate Awesome Arabic Skill with GitHub Actions to automate Arabic content workflows directly in your CI/CD pipeline. This guide covers:

- Setting up webhook authentication
- Creating workflow files
- Triggering Slack bot commands from GitHub
- Automating content generation and auditing
- Storing results as artifacts

## Prerequisites

- GitHub repository with Actions enabled
- Slack workspace with Awesome Arabic Skill bot installed
- GitHub Actions secrets configured
- Webhook signing secret from Slack app

## Step 1: Configure GitHub Secrets

Add these secrets to your GitHub repository at **Settings → Secrets and variables → Actions**:

```
SLACK_WEBHOOK_URL     https://hooks.slack.com/services/YOUR/WEBHOOK/URL
SLACK_BOT_TOKEN       xoxb-your-bot-token-here
SLACK_CHANNEL_ID      C123456789ABC
SLACK_SIGNING_SECRET  your-signing-secret-here
```

To get these values:
1. **SLACK_WEBHOOK_URL** — Go to Slack bot → **Incoming Webhooks** → Create new webhook
2. **SLACK_BOT_TOKEN** — From bot installation (starts with `xoxb-`)
3. **SLACK_CHANNEL_ID** — Right-click channel in Slack → Copy ID
4. **SLACK_SIGNING_SECRET** — From Slack app → **Basic Information** → Signing Secret

## Example 1: Auto-Audit Pull Requests

Automatically audit Arabic content in PRs before merge:

**File:** `.github/workflows/audit-arabic-content.yml`

```yaml
name: Audit Arabic Content

on:
  pull_request:
    paths:
      - 'content/**/*.md'
      - 'src/**/*.ts'
      - 'i18n/**/*.json'

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Find changed content files
        id: changed-files
        uses: tj-actions/changed-files@v40
        with:
          files: |
            content/**/*.md
            src/**/*.ts
            i18n/**/*.json

      - name: Extract Arabic text
        if: steps.changed-files.outputs.any_changed == 'true'
        id: extract
        run: |
          : > /tmp/arabic_text.txt
          for file in ${{ steps.changed-files.outputs.all_changed_files }}; do
            echo "Auditing: $file"
            grep -oP '[؀-ۿ]+' "$file" >> /tmp/arabic_text.txt || true
          done
          wc -l /tmp/arabic_text.txt

      - name: Audit via Slack
        if: steps.extract.outputs.text_found == 'true'
        uses: slackapi/slack-github-action@v1.24.0
        with:
          payload: |
            {
              "text": "🔍 Auditing Arabic content in PR #${{ github.event.pull_request.number }}",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*PR Review: Arabic Content Audit*\n\nFiles: ${{ steps.changed-files.outputs.all_changed_files }}\n\n/arabic audit --dialect masri"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK

      - name: Comment audit results
        if: always()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🔍 Arabic content audit initiated in Slack. Check #content-audit channel for results.'
            })
```

## Example 2: Generate Content for New Features

Automatically generate Arabic content when new features are added:

**File:** `.github/workflows/generate-feature-copy.yml`

```yaml
name: Generate Arabic Feature Copy

on:
  pull_request:
    paths:
      - 'features/**/*.ts'
      - 'components/**/*.tsx'
    types: [opened, reopened]

jobs:
  generate-copy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Extract feature description
        id: feature
        run: |
          # Extract feature name from branch
          FEATURE_NAME=$(echo "${{ github.head_ref }}" | sed 's/feature\///g')
          echo "feature_name=$FEATURE_NAME" >> $GITHUB_OUTPUT
          echo "Feature: $FEATURE_NAME"

      - name: Request content generation
        uses: slackapi/slack-github-action@v1.24.0
        with:
          payload: |
            {
              "text": "📝 Generate Arabic copy for new feature",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*New Feature: ${{ steps.feature.outputs.feature_name }}*\n\nGenerate Arabic marketing copy:\n\n`/arabic write landing-page --dialect masri --count 3`\n\nThen save results to PR."
                  }
                },
                {
                  "type": "actions",
                  "elements": [
                    {
                      "type": "button",
                      "text": {
                        "type": "plain_text",
                        "text": "Generate Now"
                      },
                      "action_id": "generate_copy_btn"
                    }
                  ]
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK

      - name: Save feature name as artifact
        run: |
          mkdir -p /tmp/artifacts
          echo "${{ steps.feature.outputs.feature_name }}" > /tmp/artifacts/feature.txt

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: feature-info
          path: /tmp/artifacts/feature.txt
```

## Example 3: Scheduled Content Review

Daily automated content review across all supported dialects:

**File:** `.github/workflows/daily-content-review.yml`

```yaml
name: Daily Content Review

on:
  schedule:
    # Run every day at 10 AM UTC
    - cron: '0 10 * * *'
  workflow_dispatch:

jobs:
  review:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        dialect: [masri, khaliji, levantine, msa]
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Find content files
        id: find-files
        run: |
          FILES=$(find content -name "*.md" -type f | head -5)
          echo "files<<EOF" >> $GITHUB_OUTPUT
          echo "$FILES" >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT

      - name: Notify Slack - Review Starting
        uses: slackapi/slack-github-action@v1.24.0
        with:
          payload: |
            {
              "text": "🔄 Daily content review starting for ${{ matrix.dialect }}",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Daily Content Review: ${{ matrix.dialect }}*\n\nFiles: ${{ steps.find-files.outputs.files }}\n\nRunning: `/arabic audit --dialect ${{ matrix.dialect }}`"
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK

      - name: Store review date
        run: |
          echo "Review Date: $(date -u +'%Y-%m-%d %H:%M:%S UTC')" > review.log
          echo "Dialect: ${{ matrix.dialect }}" >> review.log
          echo "Files Reviewed: ${{ steps.find-files.outputs.files }}" >> review.log

      - name: Upload review log
        uses: actions/upload-artifact@v4
        with:
          name: content-review-${{ matrix.dialect }}
          path: review.log
          retention-days: 7
```

## Example 4: Validate Arabic Text Encoding

Pre-commit validation for proper Arabic text encoding:

**File:** `.github/workflows/validate-arabic-encoding.yml`

```yaml
name: Validate Arabic Text Encoding

on:
  pull_request:
    paths:
      - 'content/**'
      - 'i18n/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Install validation tools
        run: |
          sudo apt-get update
          sudo apt-get install -y file

      - name: Check Arabic character encoding
        id: validate
        run: |
          ISSUES=0
          for file in $(find . -name "*.md" -o -name "*.json" -o -name "*.ts"); do
            if grep -q "[^\x00-\x7F]" "$file"; then
              ENCODING=$(file "$file" | grep -o 'UTF-8\|ISO-8859-6\|Windows-1256')
              if [[ "$ENCODING" != "UTF-8" ]]; then
                echo "❌ Non-UTF-8 encoding in: $file"
                ISSUES=$((ISSUES + 1))
              fi
            fi
          done
          echo "issues=$ISSUES" >> $GITHUB_OUTPUT

      - name: Report issues
        if: steps.validate.outputs.issues > 0
        run: |
          echo "❌ Found ${{ steps.validate.outputs.issues }} encoding issues"
          exit 1

      - name: Report success
        if: steps.validate.outputs.issues == 0
        run: |
          echo "✅ All files are properly UTF-8 encoded"

      - name: Notify Slack
        if: always()
        uses: slackapi/slack-github-action@v1.24.0
        with:
          payload: |
            {
              "text": "✅ Arabic encoding validation passed",
              "blocks": [
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*PR #${{ github.event.pull_request.number }}*\n✅ Arabic text encoding validation: PASSED\n\nAll files are properly UTF-8 encoded."
                  }
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK
```

## Example 5: Release Announcement with Multi-Dialect Copy

Generate multi-dialect release notes automatically:

**File:** `.github/workflows/release-announcement.yml`

```yaml
name: Release Announcement

on:
  release:
    types: [published]

jobs:
  announce:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Extract release notes
        id: release
        run: |
          RELEASE_TAG=${{ github.event.release.tag_name }}
          RELEASE_NAME=${{ github.event.release.name }}
          RELEASE_BODY=${{ github.event.release.body }}
          
          echo "tag=$RELEASE_TAG" >> $GITHUB_OUTPUT
          echo "name=$RELEASE_NAME" >> $GITHUB_OUTPUT

      - name: Generate Arabic announcement
        uses: slackapi/slack-github-action@v1.24.0
        with:
          payload: |
            {
              "text": "🚀 New Release: ${{ steps.release.outputs.name }}",
              "blocks": [
                {
                  "type": "header",
                  "text": {
                    "type": "plain_text",
                    "text": "🚀 Release: ${{ steps.release.outputs.name }}"
                  }
                },
                {
                  "type": "section",
                  "text": {
                    "type": "mrkdwn",
                    "text": "*Generate Arabic release announcement:*\n\n`/arabic write landing-page --dialect masri`\n\n*Tag:* ${{ steps.release.outputs.tag }}\n*Link:* ${{ github.event.release.html_url }}"
                  }
                },
                {
                  "type": "actions",
                  "elements": [
                    {
                      "type": "button",
                      "text": {
                        "type": "plain_text",
                        "text": "Generate Copy"
                      },
                      "url": "${{ github.server_url }}/${{ github.repository }}/releases/tag/${{ steps.release.outputs.tag }}"
                    }
                  ]
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK
```

## Best Practices

### 1. Authenticate Securely
Always use GitHub Secrets for sensitive data:
```yaml
env:
  SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

Never hardcode tokens or secrets in workflow files.

### 2. Use Conditional Steps
Only run audit/generation when relevant:
```yaml
if: steps.changed-files.outputs.any_changed == 'true'
```

### 3. Store Results as Artifacts
Keep audit results and generated content:
```yaml
- name: Upload artifact
  uses: actions/upload-artifact@v4
  with:
    name: audit-results
    path: results/
    retention-days: 30
```

### 4. Notify on Failures
Alert the team when content validation fails:
```yaml
if: failure()
  uses: slackapi/slack-github-action@v1.24.0
```

### 5. Schedule Regular Reviews
Run content audits on a schedule:
```yaml
on:
  schedule:
    - cron: '0 10 * * *'  # Daily at 10 AM UTC
```

## Troubleshooting

### Workflow fails with "Slack webhook not found"
- Verify `SLACK_WEBHOOK_URL` is set in repository secrets
- Check webhook is still active in Slack app settings

### Arabic text not being detected
- Verify files are UTF-8 encoded
- Use proper regex for Arabic characters: `[؀-ۿ]`

### Artifacts not uploading
- Ensure upload action comes after content generation
- Check artifact path is correct

## Next Steps

- **Webhooks:** See [webhooks-setup.md](./webhooks-setup.md)
- **Templates:** See [template-author-guide.md](./template-author-guide.md)
- **Slack Bot:** See [slack-bot-setup.md](./slack-bot-setup.md)

---

**Questions?** Open an issue or email support@mediabubble-adv.com
