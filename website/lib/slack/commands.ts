import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import {
  verifySlackSignature,
  getWorkspaceByTeamId,
  reserveQuotaUsage,
  logCommandExecution,
  getWorkspaceSettings,
  SlackCommand,
  SlackWorkspace,
  WorkspaceSettings,
} from "./auth";

/**
 * Slack slash command handler.
 * POST /api/slack/commands
 */
export async function handleSlashCommand(req: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();

  const rawBody = await req.text();
  const signatureValid = verifySlackSignature(
    rawBody,
    req.headers.get("x-slack-request-timestamp"),
    req.headers.get("x-slack-signature")
  );
  if (!signatureValid) {
    console.warn("Invalid Slack request signature");
    return NextResponse.json({ error: "Invalid request signature" }, { status: 401 });
  }

  const command = Object.fromEntries(
    new URLSearchParams(rawBody).entries()
  ) as unknown as SlackCommand;
  const { team_id, user_id, text, response_url } = command;

  const workspace = await getWorkspaceByTeamId(team_id);
  if (!workspace) {
    return NextResponse.json(
      { error: "workspace_not_found", message: "Workspace not found or inactive" },
      { status: 404 }
    );
  }

  const quota = await reserveQuotaUsage(workspace.id);
  if (!quota.allowed) {
    const errorMessage = `Quota exceeded (0/${quota.limit} remaining). Upgrade to Pro for 100+ requests/day.`;

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

    return NextResponse.json({
      response_type: "ephemeral",
      text: `❌ ${errorMessage}`,
      blocks: [
        {
          type: "section",
          text: { type: "mrkdwn", text: `❌ *Quota Exceeded*\n${errorMessage}` },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: { type: "plain_text", text: "Upgrade to Pro" },
              url: "https://arabic-skill.vercel.app/pricing",
              action_id: "upgrade_button",
            },
          ],
        },
      ],
    });
  }

  // Process command in background; acknowledge immediately per Slack's 3s budget.
  waitUntil(
    (async () => {
      try {
        const args = parseCommandArgs(text);
        const subcommand = args[0] || "help";
        const settings = await getWorkspaceSettings(workspace.id);

        let result;
        switch (subcommand.toLowerCase()) {
          case "write":
            result = await handleWriteCommand(args, settings);
            break;
          case "audit":
            result = await handleAuditCommand(args, settings);
            break;
          case "research":
            result = await handleResearchCommand(args, settings);
            break;
          case "help":
            result = await handleHelpCommand();
            break;
          case "status":
            result = await handleStatusCommand(workspace, quota);
            break;
          case "settings":
            result = await handleSettingsCommand();
            break;
          default:
            result = {
              response_type: "ephemeral",
              text: `Unknown command: ${subcommand}. Use \`/arabic help\` for options.`,
            };
        }

        await sendResponse(response_url, result);

        await logCommandExecution(
          workspace.id,
          user_id,
          subcommand,
          settings?.default_dialect || "masri",
          Date.now() - startTime,
          true
        );
      } catch (error) {
        console.error("Error processing command:", error);
        await sendResponse(response_url, {
          response_type: "ephemeral",
          text: "❌ An error occurred processing your command. Please try again.",
        });

        await logCommandExecution(
          workspace.id,
          user_id,
          "unknown",
          "unknown",
          Date.now() - startTime,
          false,
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    })()
  );

  return NextResponse.json({
    response_type: "ephemeral",
    text: "⏳ Processing your request...",
  });
}

/**
 * Parse command arguments.
 * Example: "write caption --dialect masri --count 3"
 * Returns: ["write", "caption", "--dialect", "masri", "--count", "3"]
 */
function parseCommandArgs(text: string): string[] {
  return text
    .trim()
    .split(/\s+/)
    .filter((arg) => arg.length > 0);
}

/** Handle /arabic write command */
async function handleWriteCommand(
  args: string[],
  settings: WorkspaceSettings | null
): Promise<Record<string, unknown>> {
  const contentType = args[1] || "caption";
  const dialect = extractArgValue(args, "--dialect") || settings?.default_dialect || "masri";
  const count = parseInt(extractArgValue(args, "--count") || "1", 10);

  // TODO: wire to the /arabic CLI write command instead of this placeholder.
  const placeholderContent = `Generated ${contentType} in ${dialect} (count: ${count})...`;

  return {
    response_type: "in_channel",
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "✍️ Arabic Skill — Write Mode", emoji: true },
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Type:* ${contentType}\n*Dialect:* ${dialect}\n*Count:* ${count}` },
      },
      { type: "section", text: { type: "mrkdwn", text: placeholderContent } },
      {
        type: "actions",
        elements: [
          { type: "button", text: { type: "plain_text", text: "👍 Approve" }, action_id: "approve_content", style: "primary" },
          { type: "button", text: { type: "plain_text", text: "👎 Reject" }, action_id: "reject_content" },
          { type: "button", text: { type: "plain_text", text: "🔄 Regenerate" }, action_id: "regenerate_content" },
        ],
      },
    ],
  };
}

/** Handle /arabic audit command */
async function handleAuditCommand(
  args: string[],
  settings: WorkspaceSettings | null
): Promise<Record<string, unknown>> {
  const dialect = extractArgValue(args, "--dialect") || settings?.default_dialect || "masri";

  // TODO: wire to the /arabic CLI audit command instead of this placeholder.
  const placeholderIssues = [
    { type: "translationese", suggestion: "Use more natural phrasing" },
    { type: "tone", suggestion: "Match brand voice more closely" },
  ];

  return {
    response_type: "in_channel",
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "🔍 Arabic Skill — Audit Results", emoji: true },
      },
      { type: "section", text: { type: "mrkdwn", text: `*Dialect:* ${dialect}\n*Quality Score:* 82/100` } },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Issues Found:* ${placeholderIssues.length}\n${placeholderIssues
            .map((issue) => `• ${issue.type}: ${issue.suggestion}`)
            .join("\n")}`,
        },
      },
      {
        type: "actions",
        elements: [{ type: "button", text: { type: "plain_text", text: "📋 View Full Report" }, action_id: "view_full_report" }],
      },
    ],
  };
}

/** Handle /arabic research command */
async function handleResearchCommand(
  args: string[],
  settings: WorkspaceSettings | null
): Promise<Record<string, unknown>> {
  const topic = args.slice(1).join(" ") || "general";
  const dialect = extractArgValue(args, "--dialect") || settings?.default_dialect || "masri";

  // TODO: wire to the /arabic CLI research command instead of this placeholder.
  const placeholderResults = ["Research result 1", "Research result 2", "Research result 3"];

  return {
    response_type: "in_channel",
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "📚 Arabic Skill — Research Results", emoji: true },
      },
      { type: "section", text: { type: "mrkdwn", text: `*Topic:* ${topic}\n*Dialect:* ${dialect}` } },
      { type: "section", text: { type: "mrkdwn", text: placeholderResults.map((r) => `• ${r}`).join("\n") } },
    ],
  };
}

/** Handle /arabic help command */
async function handleHelpCommand(): Promise<Record<string, unknown>> {
  return {
    response_type: "ephemeral",
    text: "Awesome Arabic Skill Commands",
    blocks: [
      { type: "header", text: { type: "plain_text", text: "Awesome Arabic Skill Commands" } },
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

/** Handle /arabic status command */
async function handleStatusCommand(
  workspace: SlackWorkspace,
  quota: { remaining: number; limit: number }
): Promise<Record<string, unknown>> {
  return {
    response_type: "ephemeral",
    blocks: [
      { type: "header", text: { type: "plain_text", text: "📊 Workspace Status" } },
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

/** Handle /arabic settings command */
async function handleSettingsCommand(): Promise<Record<string, unknown>> {
  // TODO: implement a settings modal (trigger_id based) instead of this placeholder.
  return { response_type: "ephemeral", text: "Settings modal not yet implemented" };
}

/**
 * Extract argument value from args array.
 * Example: extractArgValue(["--dialect", "masri"], "--dialect") => "masri"
 */
function extractArgValue(args: string[], flag: string): string | null {
  const index = args.indexOf(flag);
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  return null;
}

/** Send a response to Slack via response_url */
async function sendResponse(responseUrl: string, payload: unknown): Promise<void> {
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
