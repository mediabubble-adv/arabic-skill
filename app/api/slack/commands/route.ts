import { handleSlashCommand } from "@/api/slack/commands";

export async function POST(req: Request) {
  const body = await req.text();
  const mockReq = {
    body: new URLSearchParams(body),
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
