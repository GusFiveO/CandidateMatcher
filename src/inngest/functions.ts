import { inngest } from "./client";
import { sampleData } from "./sample";
import db from "../../db/client";
import { matches } from "../../db/schema";
import { retrieveSlackResponses, sendSlackMessage } from "./slack";
import { cancelFeedbacks, SlackMessage, storeFeedbacks } from "./feedback";
import { generateMatch, storeMatch } from "./match";


const getMatch = inngest.createFunction(
	{id: "create-match"},
	// {cron: "TZ=Europe/Paris */1 * * * *"},
	{event: "hunting/candidate.match"},
	async ({step}) => {
		const match = await step.run("generate-match", async () => {
			return generateMatch();
		});
		const candidate = match.candidate

		const matchInstance = await step.run("store-match", async () => {
			return await storeMatch(candidate.name, match.analysis);
		});

		const message = await step.run("send-slack-message", async () => {
			return await sendSlackMessage({ message: `${candidate.name}` });
		});
		if (message.ok) {
			console.log("message sent")
		} else {
			console.log("error sending message")
		}

		await step.sleep("wait-for-feedbacks", "30s");

		const channelId = message.channel as string	//TODO ADD ERROR HANDLING
		const messageTs = message.message?.ts as string

		const response = await step.run("retrieve-slack-response", async () => {
			return await retrieveSlackResponses({channelId, messageTs});
		});
		
		if (!response.ok) {
			console.error('Failed to retrieve replies:', response.error);
		}
		const replies = (response.messages as SlackMessage[])?.slice(1);

		if (!replies || replies.length === 0) {
			await step.run("cancel-feedback", async () => {
				await cancelFeedbacks(matchInstance.id);
			});
		} else {
			await step.run("store-feedback", async () => {
				await storeFeedbacks(replies, matchInstance.id);
			});
		}
	}
)

export const functions = [getMatch]