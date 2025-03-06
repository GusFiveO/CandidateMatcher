import db from "../../db/client";
import { matches } from "../../db/schema/schema";
import { sampleData } from "./sample";
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
  console.log(match);
  return match;
};

export const generateMatch = async () => {
  const minutes = new Date().getSeconds();
  const index = minutes % 10;
  const name = sampleData[index].candidate.name;

  const apiKey = process.env.NEXT_PUBLIC_MISTRAL_API_KEY;

  const client = new Mistral({ apiKey: apiKey });

  const chatResponse = await client.chat.complete({
    model: "mistral-large-latest",
    messages: [
      {
        role: "user",
        content: `provide me a json with a candidate field conataining a name field with the name ${name} and a separated analysis field with a short sentence describig the candidate skills the post they apply is Customer Support @Doctolib`,
      },
    ],
    responseFormat: {
      type: "json_object",
    },
  });

  const match = JSON.parse(chatResponse.choices[0].message.content);
  return match;
};
