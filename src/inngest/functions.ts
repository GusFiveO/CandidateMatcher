import { inngest } from "./client";
import { retrieveSlackResponses, sendSlackMessage } from "./slack";
import { cancelFeedbacks, SlackMessage, storeFeedbacks } from "./feedback";
import { generateMatch, storeMatch } from "./match";
import { getConnectedUsers } from "./utils";

const periodicMatch = inngest.createFunction(
  { id: "periodic-match" },
  { cron: "*/5 * * * *" },
  async ({ step }) => {
    const connectedUsers = await step.run("get-connected-users", async () => {
      return getConnectedUsers();
    });

    if (connectedUsers.length === 0) return;

    const match = await step.run("generate-match", async () => {
      return generateMatch();
    });

    const candidate = match.candidate;

    const matchInstances = await step.run("store-matches", async () => {
      const matchInstances = [];
      for (const user of connectedUsers) {
        if (!user.slack_user_id) continue;
        const matchInstance = await storeMatch(
          candidate.name,
          match.analysis,
          user.slack_user_id
        );
        matchInstances.push(matchInstance);
      }
      return matchInstances;
    });

    const messages = await step.run("send-slack-message", async () => {
      const messages = [];
      for (const user of connectedUsers) {
        const newMessage = await sendSlackMessage(
          `${candidate.name} : ${match.analysis}`,
          user.slack_user_id!,
          user.slack_access_token!
        );
        messages.push(newMessage);
      }
      return messages;
    });

    await step.sleep("wait-for-feedbacks", "2m");

    const responses = await step.run("retrieve-slack-response", async () => {
      const responses = [];
      for (const [index, message] of messages.entries()) {
        const channelId = message.channel as string; //TODO ADD ERROR HANDLING
        const messageTs = message.message?.ts as string;
        const response = await retrieveSlackResponses(
          channelId,
          messageTs,
          connectedUsers[index].slack_access_token!
        );
        responses.push(response);
      }
      return responses;
    });

    for (const [index, response] of responses.entries()) {
      const replies = (response.messages as SlackMessage[])?.slice(1);
      if (!replies || replies.length === 0) {
        await step.run("cancel-feedback", async () => {
          await cancelFeedbacks(matchInstances[index].id);
        });
      } else {
        await step.run("store-feedback", async () => {
          await storeFeedbacks(replies, matchInstances[index].id);
        });
      }
    }
  }
);

export const functions = [periodicMatch];
