import { handleEvents } from "@/api/slack/events";

export async function POST(req: Request) {
  const rawBody = await req.text();

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const mockReq = {
    rawBody,
    body: parsedBody,
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

  await handleEvents(mockReq as any, mockRes as any);

  return Response.json(responseBody, { status: statusCode });
}
