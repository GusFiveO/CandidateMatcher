import db from "../../db/client";
import { matches } from "../../db/schema/schema";
import { candidateNames } from "./sample";
import { Mistral } from "@mistralai/mistralai";

export const storeMatch = async (
  candidateName: string,
  analysis: string,
  authorId: string
) => {
  const match = (
    await db
      .insert(matches)
      .values({ candidateName, analysis, authorId })
      .returning()
  )[0];
  return match;
};

export const generateMatch = async () => {
  const minutes = new Date().getMinutes();
  const seed = minutes;
  const index = Math.floor(seed / 5) % 10;
  console.log(index);
  const name = candidateNames[index];

  const apiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;

  const client = new Mistral({ apiKey: apiKey });

  const chatResponse = await client.chat.complete({
    model: "mistral-large-latest",
    messages: [
      {
        role: "user",
        content: `provide me a json with a candidate field conataining a name field with the name ${name} and a separated analysis field with a short sentence with the candidate skills, the post they apply is Customer Support @Doctolib in this format {"candidate": {"name": string }, "analysis": string}`,
      },
    ],
    randomSeed: seed,
    responseFormat: {
      type: "json_object",
    },
  });

  // @ts-ignore
  const match = JSON.parse(chatResponse.choices[0].message.content);
  return match;
};
