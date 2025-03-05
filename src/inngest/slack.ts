import { WebClient } from "@slack/web-api"

const token = process.env.NEXT_PUBLIC_SLACK_TOKEN;
const slackClient = new WebClient(token);


export const sendSlackMessage = async ({message}: {message: string}) => {
	const response = await slackClient.chat.postMessage({
		channel: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID as string,
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
	return response
}

export const retrieveSlackResponses = async ({channelId, messageTs} : {channelId: string, messageTs: string}) => {
	const response = await slackClient.conversations.replies({
		channel: channelId,
		ts: messageTs
	})
	return response
}