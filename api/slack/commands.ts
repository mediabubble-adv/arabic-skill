import { VercelRequest, VercelResponse } from "@vercel/node";
import { waitUntil } from "@vercel/functions";
import {
  verifySlackRequest,
  getWorkspaceByTeamId,
  checkWorkspaceQuota,
  incrementQuotaUsage,
  logCommandExecution,
  getWorkspaceSettings,
  SlackCommand,
} from "./auth";

/**
 * Slack slash command handler
 * POST /api/slack/commands
 */
export async function handleSlashCommand(
  req: VercelRequest,
  res: VercelResponse
) {
  const startTime = Date.now();

  // Verify Slack request signature
  if (!verifySlackRequest(req)) {
    console.warn("Invalid Slack request signature");
    return res.status(401).json({ error: "Invalid request signature" });
  }

  const command: SlackCommand = req.body;
  const { team_id, user_id, trigger_id, text, response_url, channel_id } =
    command;

  // Get workspace
  const workspace = await getWorkspaceByTeamId(team_id);
  if (!workspace) {
    return res.status(404).json({
      error: "workspace_not_found",
      message: "Workspace not found or inactive",
    });
  }

  // Check quota
  const quota = await checkWorkspaceQuota(workspace.id);
  if (!quota.allowed) {
    const errorMessage = `Quota exceeded (0/${quota.limit} remaining). Upgrade to Pro for 100+ requests/day.`;

    // Log failed command
    waitUntil(
      logCommandExecution(
        workspace.id,
        user_id,
        "write",
        "unknown",
        Date.now() - startTime,
        false,
        "Quota exceeded"
      )
    );

    return res.status(429).json({
      response_type: "ephemeral",
      text: `❌ ${errorMessage}`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `❌ *Quota Exceeded*\n${errorMessage}`,
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Upgrade to Pro",
              },
              url: "https://arabic-skill.vercel.app/pricing",
              action_id: "upgrade_button",
            },
          ],
        },
      ],
    });
  }

  // Immediately acknowledge the request
  res.status(200).json({
    response_type: "ephemeral",
    text: "⏳ Processing your request...",
  });

  // Process command in background
  waitUntil(
    (async () => {
      try {
        // Parse command text
        const args = parseCommandArgs(text);
        const subcommand = args[0] || "help";

        // Get workspace settings
        const settings = await getWorkspaceSettings(workspace.id);

        // Route to appropriate handler
        let result;
        switch (subcommand.toLowerCase()) {
          case "write":
            result = await handleWriteCommand(args, workspace, settings, user_id);
            break;
          case "audit":
            result = await handleAuditCommand(args, workspace, settings, user_id);
            break;
          case "research":
            result = await handleResearchCommand(args, workspace, settings, user_id);
            break;
          case "help":
            result = await handleHelpCommand();
            break;
          case "status":
            result = await handleStatusCommand(workspace, quota);
            break;
          case "settings":
            result = await handleSettingsCommand(args, workspace);
            break;
          default:
            result = {
              response_type: "ephemeral",
              text: `Unknown command: ${subcommand}. Use \`/arabic help\` for options.`,
            };
        }

        // Send response to Slack
        await sendResponse(response_url, result);

        // Log successful command
        const duration = Date.now() - startTime;
        await logCommandExecution(
          workspace.id,
          user_id,
          subcommand,
          settings?.default_dialect || "masri",
          duration,
          true
        );

        // Increment quota usage
        await incrementQuotaUsage(workspace.id);
      } catch (error) {
        console.error("Error processing command:", error);
        await sendResponse(response_url, {
          response_type: "ephemeral",
          text: "❌ An error occurred processing your command. Please try again.",
        });

        const duration = Date.now() - startTime;
        await logCommandExecution(
          workspace.id,
          user_id,
          "unknown",
          "unknown",
          duration,
          false,
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    })()
  );
}

/**
 * Parse command arguments
 * Example: "write caption --dialect masri --count 3"
 * Returns: ["write", "caption", "--dialect", "masri", "--count", "3"]
 */
function parseCommandArgs(text: string): string[] {
  return text
    .trim()
    .split(/\s+/)
    .filter((arg) => arg.length > 0);
}

/**
 * Handle /arabic write command
 */
async function handleWriteCommand(
  args: string[],
  workspace: any,
  settings: any,
  userId: string
): Promise<any> {
  const contentType = args[1] || "caption";
  const dialect = extractArgValue(args, "--dialect") || settings?.default_dialect || "masri";
  const count = parseInt(extractArgValue(args, "--count") || "1");

  // TODO: Implement actual content generation
  const placeholderContent = `Generated ${contentType} in ${dialect} (count: ${count})...`;

  return {
    response_type: "in_channel",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "✍️ Arabic Skill — Write Mode",
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Type:* ${contentType}\n*Dialect:* ${dialect}\n*Count:* ${count}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: placeholderContent,
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "👍 Approve",
            },
            action_id: "approve_content",
            style: "primary",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "👎 Reject",
            },
            action_id: "reject_content",
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "🔄 Regenerate",
            },
            action_id: "regenerate_content",
          },
        ],
      },
    ],
  };
}

/**
 * Handle /arabic audit command
 */
async function handleAuditCommand(
  args: string[],
  workspace: any,
  settings: any,
  userId: string
): Promise<any> {
  const dialect = extractArgValue(args, "--dialect") || settings?.default_dialect || "masri";

  // TODO: Implement actual audit logic
  const placeholderIssues = [
    { type: "translationese", suggestion: "Use more natural phrasing" },
    { type: "tone", suggestion: "Match brand voice more closely" },
  ];

  return {
    response_type: "in_channel",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🔍 Arabic Skill — Audit Results",
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Dialect:* ${dialect}\n*Quality Score:* 82/100`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Issues Found:* ${placeholderIssues.length}\n${placeholderIssues.map((issue) => `• ${issue.type}: ${issue.suggestion}`).join("\n")}`,
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "📋 View Full Report",
            },
            action_id: "view_full_report",
          },
        ],
      },
    ],
  };
}

/**
 * Handle /arabic research command
 */
async function handleResearchCommand(
  args: string[],
  workspace: any,
  settings: any,
  userId: string
): Promise<any> {
  const topic = args.slice(1).join(" ") || "general";
  const dialect = extractArgValue(args, "--dialect") || settings?.default_dialect || "masri";

  // TODO: Implement actual research logic
  const placeholderResults = [
    "Research result 1",
    "Research result 2",
    "Research result 3",
  ];

  return {
    response_type: "in_channel",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "📚 Arabic Skill — Research Results",
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Topic:* ${topic}\n*Dialect:* ${dialect}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: placeholderResults.map((r) => `• ${r}`).join("\n"),
        },
      },
    ],
  };
}

/**
 * Handle /arabic help command
 */
async function handleHelpCommand(): Promise<any> {
  return {
    response_type: "ephemeral",
    text: "Awesome Arabic Skill Commands",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "Awesome Arabic Skill Commands",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Available Commands:*\n\n`/arabic write <type> --dialect <dialect> --count <n>` — Generate Arabic content\n`/arabic audit --dialect <dialect>` — Audit Arabic content\n`/arabic research <topic>` — Research a topic\n`/arabic status` — Show workspace quota\n`/arabic settings` — Configure workspace defaults\n`/arabic help` — Show this message",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "*Dialects:* masri, khaliji, levantine, msa, and more\n*Content Types:* caption, ad, ui-copy, blog, script, email, social, landing-page",
        },
      },
    ],
  };
}

/**
 * Handle /arabic status command
 */
async function handleStatusCommand(workspace: any, quota: any): Promise<any> {
  return {
    response_type: "ephemeral",
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "📊 Workspace Status",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Workspace:* ${workspace.team_name}\n*Plan:* ${workspace.plan}\n*Daily Limit:* ${quota.limit}\n*Remaining Today:* ${quota.remaining}/${quota.limit}`,
        },
      },
    ],
  };
}

/**
 * Handle /arabic settings command
 */
async function handleSettingsCommand(
  args: string[],
  workspace: any
): Promise<any> {
  // TODO: Implement settings modal
  return {
    response_type: "ephemeral",
    text: "Settings modal not yet implemented",
  };
}

/**
 * Extract argument value from args array
 * Example: extractArgValue(["--dialect", "masri"], "--dialect") => "masri"
 */
function extractArgValue(args: string[], flag: string): string | null {
  const index = args.indexOf(flag);
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  return null;
}

/**
 * Send response to Slack via response_url
 */
async function sendResponse(responseUrl: string, payload: any): Promise<void> {
  try {
    await fetch(responseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Error sending response to Slack:", error);
  }
}
