import { handleSlashCommand } from "@/api/slack/commands";

function parseSlashCommandBody(body: string): Record<string, string> {
  const params = new URLSearchParams(body);
  const command: Record<string, string> = {};
  params.forEach((value, key) => {
    command[key] = value;
  });
  return command;
}

export async function POST(req: Request) {
  const rawBody = await req.text();

  const mockReq = {
    rawBody,
    body: parseSlashCommandBody(rawBody),
    headers: Object.fromEntries(req.headers),
    method: "POST",
  };

  let statusCode = 200;
  let responseBody: any = { response_type: "ephemeral", text: "OK" };

  const mockRes = {
    status: (code: number) => {
      statusCode = code;
      return mockRes;
    },
    json: (body: any) => {
      responseBody = body;
      return mockRes;
    },
  };

  await handleSlashCommand(mockReq as any, mockRes as any);

  return Response.json(responseBody, { status: statusCode });
}
