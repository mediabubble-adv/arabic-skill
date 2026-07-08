import { VercelResponse } from "@vercel/node";
import { waitUntil } from "@vercel/functions";
import {
  verifySlackRequest,
  getWorkspaceByTeamId,
  getWorkspaceSettings,
  SlackInteractive,
  SlackRequest,
} from "./auth";

function parseInteractivePayload(req: SlackRequest): SlackInteractive {
  if (typeof req.body === "object" && req.body !== null && "payload" in req.body) {
    return JSON.parse(String((req.body as { payload: string }).payload));
  }

  if (typeof req.body === "string") {
    const params = new URLSearchParams(req.body);
    const payload = params.get("payload");
    if (!payload) {
      throw new Error("missing_payload");
    }
    return JSON.parse(payload);
  }

  throw new Error("missing_payload");
}

/**
 * Slack interactive component handler (buttons, modals, select menus)
 * POST /api/slack/interactive
 */
export async function handleInteractive(
  req: SlackRequest,
  res: VercelResponse
) {
  if (!verifySlackRequest(req)) {
    console.warn("Invalid Slack request signature");
    return res.status(401).json({ error: "Invalid request signature" });
  }

  let payload: SlackInteractive;
  try {
    payload = parseInteractivePayload(req);
  } catch {
    return res.status(400).json({ error: "missing_payload" });
  }

  const team_id = payload.team.id;
  const workspace = await getWorkspaceByTeamId(team_id);
  if (!workspace) {
    return res.status(404).json({
      error: "workspace_not_found",
      message: "Workspace not found or inactive",
    });
  }

  switch (payload.type) {
    case "block_actions":
      return handleBlockActions(payload, workspace, res);
    case "view_submission":
      return handleViewSubmission(payload, workspace, res);
    case "view_closed":
      return handleViewClosed(payload, workspace, res);
    default:
      return res.status(400).json({
        error: "unknown_interaction_type",
        message: `Unknown interaction type: ${payload.type}`,
      });
  }
}

async function handleBlockActions(
  payload: SlackInteractive,
  workspace: any,
  res: VercelResponse
) {
  if (!payload.actions) {
    return res.status(400).json({ error: "missing_actions" });
  }

  const action = payload.actions[0];
  const response_url = payload.response_url;

  res.status(200).json({});

  if (response_url) {
    waitUntil(
      (async () => {
        switch (action.action_id) {
          case "approve_content":
            await sendResponse(response_url, {
              response_type: "in_channel",
              text: "✅ Content approved!",
            });
            break;
          case "reject_content":
            await sendResponse(response_url, {
              response_type: "ephemeral",
              text: "❌ Content rejected. Please revise and try again.",
            });
            break;
          case "regenerate_content":
            await sendResponse(response_url, {
              response_type: "ephemeral",
              text: "🔄 Regenerating content...",
            });
            break;
          case "view_full_report":
            await sendResponse(response_url, {
              response_type: "ephemeral",
              text: "📊 Full audit report:\n(Report data would be displayed here)",
            });
            break;
          default:
            console.warn(`Unknown action: ${action.action_id}`);
        }
      })()
    );
  }

  return res;
}

async function handleViewSubmission(
  payload: SlackInteractive,
  workspace: any,
  res: VercelResponse
) {
  if (!payload.view) {
    return res.status(400).json({ error: "missing_view" });
  }

  return res.status(200).json({
    response_action: "clear",
  });
}

async function handleViewClosed(
  payload: SlackInteractive,
  workspace: any,
  res: VercelResponse
) {
  return res.status(200).json({});
}

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
