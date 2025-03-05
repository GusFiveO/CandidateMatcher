import db from "../../db/client";
import { eq } from "drizzle-orm";
import { feedbacks, matches } from "../../db/schema";

export interface SlackMessage {
	text?: string;
	user?: string;
	ts?: string;
	// Add other fields as needed
}

export const storeFeedbacks = async (replies: SlackMessage[], matchId: number) => {
	console.log(replies)
	for (const replie of replies) {
		await db.insert(feedbacks).values({feedback: replie.text, matchId: matchId})
	}
	await db.update(matches).set({status: "done"}).where(eq(matches.id, matchId))
}

export const cancelFeedbacks = async (matchId: number) => {
	console.log("cancel")
	await db.update(matches).set({status: 'canceled'}).where(eq(matches.id, matchId))
}