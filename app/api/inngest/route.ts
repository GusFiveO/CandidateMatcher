import { Hono } from "hono";
import { handle } from "hono/vercel";
import { serve } from "inngest/hono";
import { inngest } from "../../../src/inngest/client";
import { functions } from "../../../src/inngest/functions"

const app = new Hono();

app.on(
  ["GET", "PUT", "POST"],
  "/api/inngest",
  serve({
    client: inngest,
	functions,
  })
);

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
