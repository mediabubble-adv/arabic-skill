import { handleWebhookHealth } from "@/api/webhooks/handler";

export async function GET() {
  const mockReq = {
    method: "GET",
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

  await handleWebhookHealth(mockReq as any, mockRes as any);

  return Response.json(responseBody, { status: statusCode });
}
