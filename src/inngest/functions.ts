import { WebClient } from "@slack/web-api"
import { inngest } from "./client";
import { sampleData } from "./sample";

const token = process.env.NEXT_PUBLIC_SLACK_TOKEN;

// Initialize
const slackClient = new WebClient(token);



const getMatch = inngest.createFunction(
	{id: "create-match"},
	// {cron: "TZ=Europe/Paris */1 * * * *"},
	{event: "hunting/candidate.match"},
	async ({step}) => {
		const minutes = new Date().getMinutes()
		const index = minutes % 10
		// console.log(sampleData[index])
		return {match: sampleData[index]}
	}
)

const sendSlackMessage = inngest.createFunction(
	{id: "send-slack-message"},
	{event: "slack/message.send"},
	async ({event}) => {
		const result = await slackClient.chat.postMessage({
			channel: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID as string,
			blocks: [
			  {
				type: "section",
				text: {
				  type: "mrkdwn",
				  text: `${event.data.message}`,
				},
			  },
			],
		  });
	
		  return result;
	
	}
)

export const functions = [getMatch, sendSlackMessage]