import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { verifySlackSignature, getWorkspaceByTeamId, SlackInteractive } from "./auth";

function parseInteractivePayload(rawBody: string): SlackInteractive {
  const params = new URLSearchParams(rawBody);
  const payload = params.get("payload");
  if (!payload) {
    throw new Error("missing_payload");
  }
  return JSON.parse(payload);
}

/**
 * Slack interactive component handler (buttons, modals, select menus).
 * POST /api/slack/interactive
 */
export async function handleInteractive(req: NextRequest): Promise<NextResponse> {
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

  let payload: SlackInteractive;
  try {
    payload = parseInteractivePayload(rawBody);
  } catch {
    return NextResponse.json({ error: "missing_payload" }, { status: 400 });
  }

  const workspace = await getWorkspaceByTeamId(payload.team.id);
  if (!workspace) {
    return NextResponse.json(
      { error: "workspace_not_found", message: "Workspace not found or inactive" },
      { status: 404 }
    );
  }

  switch (payload.type) {
    case "block_actions":
      return handleBlockActions(payload);
    case "view_submission":
      return handleViewSubmission(payload);
    case "view_closed":
      return NextResponse.json({});
    default:
      return NextResponse.json(
        { error: "unknown_interaction_type", message: `Unknown interaction type: ${payload.type}` },
        { status: 400 }
      );
  }
}

function handleBlockActions(payload: SlackInteractive): NextResponse {
  if (!payload.actions) {
    return NextResponse.json({ error: "missing_actions" }, { status: 400 });
  }

  const action = payload.actions[0];
  const response_url = payload.response_url;

  if (response_url) {
    waitUntil(
      (async () => {
        switch (action.action_id) {
          case "approve_content":
            await sendResponse(response_url, { response_type: "in_channel", text: "✅ Content approved!" });
            break;
          case "reject_content":
            await sendResponse(response_url, {
              response_type: "ephemeral",
              text: "❌ Content rejected. Please revise and try again.",
            });
            break;
          case "regenerate_content":
            await sendResponse(response_url, { response_type: "ephemeral", text: "🔄 Regenerating content..." });
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

  return NextResponse.json({});
}

function handleViewSubmission(payload: SlackInteractive): NextResponse {
  if (!payload.view) {
    return NextResponse.json({ error: "missing_view" }, { status: 400 });
  }

  return NextResponse.json({ response_action: "clear" });
}

/**
 * Slack signs the request that carries response_url, but signature verification
 * doesn't constrain response_url's value itself — pin it to Slack's own domain
 * and expected path shape so this fetch cannot be abused as an SSRF primitive.
 */
function isSlackResponseUrl(url: string): boolean {
  try {
    const parsed = new URL(url);

    if (parsed.protocol !== "https:") return false;
    if (parsed.hostname !== "hooks.slack.com") return false;
    if (parsed.port) return false;
    if (parsed.username || parsed.password) return false;
    if (parsed.search || parsed.hash) return false;

    // Slack interactive response URLs are expected under /actions/...
    return /^\/actions\/[A-Za-z0-9/_-]+$/.test(parsed.pathname);
  } catch {
    return false;
  }
}

async function sendResponse(responseUrl: string, payload: unknown): Promise<void> {
  if (!isSlackResponseUrl(responseUrl)) {
    console.error("Refusing to send response to non-Slack response_url:", responseUrl);
    return;
  }

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
