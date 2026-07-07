import { handleInteractive } from "@/api/slack/interactive";

export async function POST(req: Request) {
  const body = await req.text();
  const mockReq = {
    body,
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
