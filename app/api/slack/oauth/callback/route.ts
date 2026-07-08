import { handleOAuthCallback } from "@/api/slack/oauth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const mockReq = {
    query: Object.fromEntries(url.searchParams),
    method: "GET",
  };

  let statusCode = 200;
  let responseBody: any = {};
  let redirectUrl: string | null = null;

  const mockRes = {
    status: (code: number) => {
      statusCode = code;
      return mockRes;
    },
    json: (body: any) => {
      responseBody = body;
      return mockRes;
    },
    redirect: (code: number, url: string) => {
      statusCode = code;
      redirectUrl = url;
      return mockRes;
    },
  };

  await handleOAuthCallback(mockReq as any, mockRes as any);

  if (redirectUrl) {
    return Response.redirect(redirectUrl, statusCode);
  }

  return Response.json(responseBody, { status: statusCode });
}
