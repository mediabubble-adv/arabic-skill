import { handleWebhookReceive } from "@/api/webhooks/handler";

export async function POST(req: Request) {
  const rawBody = await req.text();

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const mockReq = {
    method: "POST",
    headers: Object.fromEntries(req.headers),
    rawBody,
    body: parsedBody,
    query: Object.fromEntries(new URL(req.url).searchParams),
  };

  let statusCode = 200;
  let responseBody: any = {};

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

  await handleWebhookReceive(mockReq as any, mockRes as any);

  return Response.json(responseBody, { status: statusCode });
}
