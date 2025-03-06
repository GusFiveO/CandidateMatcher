import db from "@/db/client";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  secret: process.env.NEXT_PUBLIC_BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      slack_access_token: {
        type: "string",
        required: false,
        defaultValue: "",
        input: false, // don't allow user to set role
      },
      slack_user_id: {
        type: "string",
        required: false,
        defaultValue: "",
        input: false, // don't allow user to set role
      },
    },
  },
  plugins: [nextCookies()],
});
