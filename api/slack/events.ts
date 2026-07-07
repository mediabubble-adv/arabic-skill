import { VercelRequest, VercelResponse } from "@vercel/node";
import { verifySlackRequest, getWorkspaceByTeamId } from "./auth";

interface SlackEvent {
  token: string;
  team_id: string;
  api_app_id: string;
  event: {
    type: string;
    user: string;
    text: string;
    ts: string;
    channel: string;
    event_ts: string;
  };
  type: string;
  event_id: string;
  event_time: number;
  challenge?: string;
}

/**
 * Slack Events API handler
 * POST /api/slack/events
 *
 * Handles:
 * - URL verification challenges
 * - app_mention events (mention in channels)
 * - message.app_home events (app home tab messages)
 */
export async function handleEvents(
  req: VercelRequest,
  res: VercelResponse
) {
  // Verify Slack request signature
  if (!verifySlackRequest(req)) {
    console.warn("Invalid Slack request signature");
    return res.status(401).json({ error: "Invalid request signature" });
  }

  const body: SlackEvent = req.body;

  // Handle URL verification challenge (Slack's handshake)
  if (body.type === "url_verification") {
    console.log("✓ Slack URL verification challenge");
    return res.status(200).json({ challenge: body.challenge });
  }

  // Handle event callbacks
  if (body.type === "event_callback") {
    const workspace = await getWorkspaceByTeamId(body.team_id);
    if (!workspace) {
      console.warn(`Workspace not found: ${body.team_id}`);
      return res.status(200).json({}); // Still acknowledge to prevent retries
    }

    // Route based on event type
    switch (body.event.type) {
      case "app_mention":
        await handleAppMention(body.event as any, workspace);
        break;

      case "message":
        if (body.event.channel === "app_home") {
          await handleAppHomeMessage(body.event as any, workspace);
        }
        break;

      default:
        console.log(`Unhandled event type: ${body.event.type}`);
    }

    // Always return 200 OK to acknowledge receipt
    return res.status(200).json({});
  }

  // Unknown request type
  console.warn(`Unknown request type: ${body.type}`);
  return res.status(200).json({});
}

/**
 * Handle @app_mention events
 *
 * When bot is mentioned in a channel, respond with a helpful message
 */
async function handleAppMention(
  event: {
    type: string;
    user: string;
    text: string;
    ts: string;
    channel: string;
    event_ts: string;
  },
  workspace: any
) {
  try {
    const { WebClient } = await import("@slack/web-api");
    const client = new WebClient(workspace.bot_token);

    // Send a helpful response
    await client.chat.postMessage({
      channel: event.channel,
      thread_ts: event.ts,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "👋 Hi! I'm Awesome Arabic Skill.\n\nUse `/arabic help` to see available commands:",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "• `/arabic write` - Generate Arabic content\n• `/arabic audit` - Audit Arabic content\n• `/arabic research` - Research a topic\n• `/arabic status` - Check workspace quota",
          },
        },
      ],
    });

    console.log(`✓ Responded to mention in channel ${event.channel}`);
  } catch (error) {
    console.error("Error handling app mention:", error);
  }
}

/**
 * Handle message.app_home events
 *
 * When user opens app home tab, show a welcome view
 */
async function handleAppHomeMessage(
  event: {
    type: string;
    user: string;
    text: string;
    ts: string;
    channel: string;
    event_ts: string;
  },
  workspace: any
) {
  try {
    const { WebClient } = await import("@slack/web-api");
    const client = new WebClient(workspace.bot_token);

    // Publish view to app home (this is typically done via views.publish, not chat.postMessage)
    // But since we got a message event, we can respond if needed
    console.log(`App home message from user ${event.user}`);

    // TODO: If needed, update app home view here
  } catch (error) {
    console.error("Error handling app home message:", error);
  }
}

/**
 * Publish app home view
 * Called to update the app home tab with workspace info
 */
export async function publishAppHome(
  workspace: any,
  userId: string
): Promise<void> {
  try {
    const { WebClient } = await import("@slack/web-api");
    const client = new WebClient(workspace.bot_token);

    const view = {
      type: "home",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🎯 Awesome Arabic Skill",
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Write, audit, and research Arabic content for your brand.",
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*✍️ Write*\nGenerate Arabic content with your brand voice",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*🔍 Audit*\nCheck Arabic content for quality and authenticity",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*📚 Research*\nDiscover terminology and cultural insights",
          },
        },
        {
          type: "divider",
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Learn More",
              },
              url: "https://arabic-skill.vercel.app/docs",
              action_id: "learn_more_btn",
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "View Settings",
              },
              action_id: "view_settings_btn",
            },
          ],
        },
      ],
    };

    await client.views.publish({
      user_id: userId,
      view,
    });

    console.log(`✓ Published app home for user ${userId}`);
  } catch (error) {
    console.error("Error publishing app home:", error);
  }
}
