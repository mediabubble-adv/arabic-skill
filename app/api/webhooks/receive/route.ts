import { handleWebhookReceive } from "@/api/webhooks/handler";

export async function POST(req: Request) {
  const body = await req.text();
  const mockReq = {
    method: "POST",
    headers: Object.fromEntries(req.headers),
    body: JSON.parse(body),
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
