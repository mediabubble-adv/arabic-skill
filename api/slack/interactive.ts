import { VercelRequest, VercelResponse } from "@vercel/node";
import {
  verifySlackRequest,
  getWorkspaceByTeamId,
  getWorkspaceSettings,
  SlackInteractive,
} from "./auth";

/**
 * Slack interactive component handler (buttons, modals, select menus)
 * POST /api/slack/interactive
 */
export async function handleInteractive(
  req: VercelRequest,
  res: VercelResponse
) {
  // Verify Slack request signature
  if (!verifySlackRequest(req)) {
    console.warn("Invalid Slack request signature");
    return res.status(401).json({ error: "Invalid request signature" });
  }

  const payload: SlackInteractive = JSON.parse(req.body.payload);
  const team_id = payload.team.id;

  // Get workspace
  const workspace = await getWorkspaceByTeamId(team_id);
  if (!workspace) {
    return res.status(404).json({
      error: "workspace_not_found",
      message: "Workspace not found or inactive",
    });
  }

  // Route based on interaction type
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

/**
 * Handle block actions (button clicks, select menu changes, etc.)
 */
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

  // Route based on action_id
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

    case "upgrade_button":
      // Redirect handled by Slack client
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

  // Acknowledge the action (must respond within 3 seconds)
  return res.status(200).json({});
}

/**
 * Handle view submissions (modal form submissions)
 */
async function handleViewSubmission(
  payload: SlackInteractive,
  workspace: any,
  res: VercelResponse
) {
  if (!payload.view) {
    return res.status(400).json({ error: "missing_view" });
  }

  const view = payload.view;
  const callback_id = view.id;

  // TODO: Validate form inputs and save settings
  // For now, just acknowledge

  // Send success response (closes the modal)
  return res.status(200).json({
    response_action: "clear",
  });
}

/**
 * Handle view closed (modal dismissed)
 */
async function handleViewClosed(
  payload: SlackInteractive,
  workspace: any,
  res: VercelResponse
) {
  // Nothing special to do when a modal is closed
  return res.status(200).json({});
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
