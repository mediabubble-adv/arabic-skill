import { handleInteractive } from "@/api/slack/interactive";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const params = new URLSearchParams(rawBody);
  const payload = params.get("payload");

  const mockReq = {
    rawBody,
    body: { payload },
    headers: Object.fromEntries(req.headers),
    method: "POST",
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

  await handleInteractive(mockReq as any, mockRes as any);

  return Response.json(responseBody, { status: statusCode });
}
