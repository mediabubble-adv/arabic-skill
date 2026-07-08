import { handleOAuthStart } from "@/api/slack/oauth";

export async function GET(req: Request) {
  // Create a mock VercelRequest-like object
  const url = new URL(req.url);
  const mockReq = {
    query: Object.fromEntries(url.searchParams),
    method: "GET",
  };

  let statusCode = 200;
  let responseBody: any = {};

  // Create mock response object
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

  // Call the handler
  handleOAuthStart(mockReq as any, mockRes as any);

  return Response.json(responseBody, { status: statusCode });
}
