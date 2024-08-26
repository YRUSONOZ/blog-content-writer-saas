import { NextRequest, NextResponse } from "next/server"; // Updated imports for NextRequest and NextResponse
import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSPagesRouterEndpoint,
} from "@copilotkit/runtime";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const POST = async (req: NextRequest) => {
  const serviceAdapter = new OpenAIAdapter({ openai });
  const runtime = new CopilotRuntime();

  // Instead of using NextApiRequest and NextApiResponse, we work directly with the request object and return a response
  const handleRequest = copilotRuntimeNextJSPagesRouterEndpoint({
    endpoint: "/api/copilotkit",
    runtime,
    serviceAdapter,
  });

  // Call the handler and return a NextResponse
  const response = await handleRequest(req);
  return NextResponse.json(response);
};
