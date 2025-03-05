import db from "../../db/client"
import { matches } from "../../db/schema"
import { sampleData } from "./sample"

export const storeMatch = async (candidateName: string, analysis: string) => {
	const match = (await db.insert(matches).values({candidateName, analysis}).returning())[0]
	console.log(match)
	return match
}

export const generateMatch = () => {
	const minutes = new Date().getMinutes()
	const index = minutes % 10
	const match = sampleData[index]
	return match
}