import db from "@/db/client";
import { isNotNull } from "drizzle-orm";
import { user } from "@/db/schema/schema";

export const getConnectedUsers = async () => {
  return await db.query.user.findMany({
    where: isNotNull(user.slack_access_token),
  });
};
