import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { redirect } from "next/navigation";
import db from "@/db/client";
import { user } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "./auth";
import { MatchesTable } from "@/components/MatchTable";
import { toast, Toaster } from "sonner";

const MatchesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return redirect("/login");

  const me = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  if (!me) {
    return redirect("/");
  }

  if (!user) return redirect("/login");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${me.id}/matches`,
    {
      method: "GET",
      credentials: "same-origin",
    }
  );
  if (!response.ok) {
    console.log("response:", response);
  }
  const matches = (await response.json()).matches;

  return (
    <div>
      {me.slack_access_token ? (
        <MatchesTable matches={matches} />
      ) : (
        <div className="h-screen flex items-center justify-center">
          <a href="https://slack.com/oauth/v2/authorize?client_id=2754441662130.8550992065332&scope=channels:history,channels:read,chat:write,chat:write.public,groups:history,im:history,im:write,mpim:history,users.profile:read,users:read&user_scope=">
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </a>
        </div>
      )}
      <Toaster />
    </div>
  );
};

const App = () => <MatchesPage />;

export default App;
