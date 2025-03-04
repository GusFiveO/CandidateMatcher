import { inngest } from "./client";
import { sampleData } from "./sample";

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

export const functions = [getMatch]