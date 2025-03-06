"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { MatchesTable } from "@/components/MatchTable";
import { toast, Toaster } from "sonner";
import LogoutButton from "@/components/LogoutButton";
import { Card, CardContent } from "@/components/ui/card";

const MatchesPage = () => {
  const [me, setMe] = useState<{
    slack_access_token: string;
    name: string;
  } | null>(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMe = async () => {
      const { data: session, error } = await authClient.getSession();
      if (session && session.user) {
        setMe({
          name: session.user.name,
          // @ts-ignore
          slack_access_token: session.user.slack_access_token,
        });
      }
    };

    const getMatches = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/matches`,
          {
            method: "GET",
            credentials: "same-origin",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch matches");
        }

        const data = await response.json();
        setMatches(data.matches);
      } catch (error) {
        toast.error("Failed to fetch matches");
      } finally {
        setLoading(false);
      }
    };

    getMe();
    getMatches();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      {!me || !me.slack_access_token ? (
        <Card className="">
          <CardContent>
            <div className="h-screen flex flex-col items-center justify-center">
              <h1 className="font-extrabold mb-5 text-2xl">
                INSTALL THE BOT TO START MONITORING YOUR MATCHES
              </h1>
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
          </CardContent>
        </Card>
      ) : (
        <div>
          <div className="flex justify-end items-center bg-slate-50 p-2">
            <div className="p-2 pr-5">{me.name}</div>
            <LogoutButton />
          </div>
          <hr className="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          <MatchesTable matches={matches} />
        </div>
      )}
      <Toaster />
    </div>
  );
};

const App = () => <MatchesPage />;

export default App;
