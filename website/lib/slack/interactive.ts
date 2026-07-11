import { NextRequest, NextResponse } from "next/server";
import { waitUntil } from "@vercel/functions";
import { verifySlackSignature, getWorkspaceByTeamId, SlackInteractive } from "./auth";
import { buildWriteResponseBlocks, decodeWriteParams, generateWriteContent } from "./generate";

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

  const teamId = payload.team?.id;
  if (!teamId) {
    return NextResponse.json(
      { error: "unsupported_installation_type", message: "Enterprise Grid org-installed apps are not yet supported" },
      { status: 400 }
    );
  }

  const workspace = await getWorkspaceByTeamId(teamId);
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
          case "reject_content": {
            // Keep the generated content visible; just strip the buttons and
            // append a status line. Re-render from the original message's
            // blocks so the copy the user is acting on is never discarded.
            const approved = action.action_id === "approve_content";
            const preservedBlocks = (payload.message?.blocks ?? []).filter(
              (block) => block.type !== "actions"
            );
            const status = approved
              ? `✅ Approved by <@${payload.user.id}>`
              : `❌ Rejected by <@${payload.user.id}>`;
            await sendResponse(response_url, {
              response_type: "in_channel",
              replace_original: true,
              blocks: [
                ...preservedBlocks,
                { type: "context", elements: [{ type: "mrkdwn", text: status }] },
              ],
            });
            break;
          }
          case "regenerate_content": {
            const params = decodeWriteParams(action.value);
            if (!params) {
              await sendResponse(response_url, {
                response_type: "ephemeral",
                text: "❌ Can't regenerate this message — it's from before this feature was added, or the request expired. Run `/arabic write` again.",
              });
              break;
            }
            const result = await generateWriteContent(params);
            await sendResponse(response_url, buildWriteResponseBlocks(params, result));
            break;
          }
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

const SLACK_RESPONSE_URL_PATH = /^\/actions\/[A-Za-z0-9/_-]+$/;

/**
 * Slack signs the request that carries response_url, but signature verification
 * doesn't constrain response_url's value itself. Validating the string and then
 * still fetching the ORIGINAL string isn't enough to satisfy SSRF taint tracking
 * (the value reaching fetch() is still attacker-influenced regardless of what a
 * boolean check concluded about it) — rebuild the URL from a hardcoded hostname
 * literal plus only the validated path, so the fetch target is provably fixed to
 * hooks.slack.com from the source code itself.
 */
function toSafeSlackResponseUrl(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.protocol !== "https:") return null;
    if (parsed.hostname !== "hooks.slack.com") return null;
    if (parsed.port) return null;
    if (parsed.username || parsed.password) return null;
    if (parsed.search || parsed.hash) return null;
    if (!SLACK_RESPONSE_URL_PATH.test(parsed.pathname)) return null;

    return `https://hooks.slack.com${parsed.pathname}`;
  } catch {
    return null;
  }
}

/** response_url embeds a bearer token in its path — never log the raw value. */
function redactUrlForLogging(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "unparseable_url";
  }
}

async function sendResponse(responseUrl: string, payload: unknown): Promise<void> {
  const safeUrl = toSafeSlackResponseUrl(responseUrl);
  if (!safeUrl) {
    console.error(
      "Refusing to send response to non-Slack response_url, host:",
      redactUrlForLogging(responseUrl)
    );
    return;
  }

  try {
    await fetch(safeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Error sending response to Slack:", error);
  }
}
