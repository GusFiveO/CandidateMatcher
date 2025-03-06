import { auth } from "@/app/auth";
import db from "@/db/client";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { eq } from "drizzle-orm";
import { user } from "../../../db/schema/schema";
import { headers } from "next/headers";
import { matches } from "../../../db/schema/schema";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>().basePath("/api");

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/matches", async (context) => {
  const session = context.get("session");
  const user = context.get("user");

  if (!session || !user || !user.slack_user_id) {
    return context.json({
      matches: [],
    });
  }

  const myMatches = await db.query.matches.findMany({
    where: eq(matches.authorId, user.slack_user_id),
    with: {
      feedbacks: true,
    },
  });
  return context.json({
    matches: myMatches,
  });
});

app.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

app.get("/slack/install", async (c) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return c.redirect("/");
  }
  const me = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });
  if (!me) {
    return c.redirect("/");
  }
  const code = c.req.query("code");

  if (!code) {
    return c.redirect("/");
  }

  try {
    const response = await fetch("https://slack.com/api/oauth.v2.access", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID ?? "",
        client_secret: process.env.NEXT_PUBLIC_SLACK_CLIENT_SECRET ?? "",
        code,
        redirect_uri: process.env.NEXT_PUBLIC_SLACK_REDIRECT_URI ?? "",
      }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to install bot: ${errorText}`);
    }

    const data = await response.json();

    await db
      .update(user)
      .set({
        slack_access_token: data.access_token,
        slack_user_id: data.authed_user.id,
      })
      .where(eq(user.id, me.id));

    return c.redirect("/");
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export const GET = handle(app);
export const POST = handle(app);
