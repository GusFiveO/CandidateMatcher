import db from "@/db/client";
import { isNotNull } from "drizzle-orm";
import { user } from "@/db/schema/schema";

export const getConnectedUsers = async () => {
  return await db
    .select({
      slack_user_id: user.slack_user_id,
      slack_access_token: user.slack_access_token,
    })
    .from(user)
    .where(isNotNull(user.slack_user_id))
    .groupBy(user.slack_user_id, user.slack_access_token);
};
