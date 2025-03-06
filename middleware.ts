import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { betterFetch } from "@better-fetch/fetch";
import { auth } from "./app/auth";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  // console.log(request);
  // const sessionCookie = getSessionCookie(request, {
  //   cookieName: "better-auth.session_token",
  // }); // Optionally pass config as the second argument if cookie name or prefix is customized.
  // console.log(sessionCookie);
  // if (!sessionCookie) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  // return NextResponse.next();
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
      },
    }
  );
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Specify the routes the middleware applies to
};
