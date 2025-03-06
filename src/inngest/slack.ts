import { WebClient } from "@slack/web-api";

export const sendSlackMessage = async (
  message: string,
  slack_user_id: string,
  slack_token: string
) => {
  const slackClient = new WebClient(slack_token);
  const response = await slackClient.chat.postMessage({
    channel: slack_user_id,
    text: `${message}`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${message}`,
        },
      },
    ],
  });
  return response;
};

export const retrieveSlackResponses = async (
  channelId: string,
  messageTs: string,
  slack_token: string
) => {
  const slackClient = new WebClient(slack_token);
  const response = await slackClient.conversations.replies({
    channel: channelId,
    ts: messageTs,
  });
  return response;
};
