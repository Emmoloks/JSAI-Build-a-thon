import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";

dotenv.config();

const client = new ModelClient(
  process.env.AZURE_INFERENCE_SDK_ENDPOINT,
  new AzureKeyCredential(process.env.AZURE_INFERENCE_SDK_KEY)
);

var messages = [
  { role: "system", content: "You are a tour guide" },
  { role: "user", content: "What are the best safaris in Kenya?" }
];

var response = await client.path("chat/completions").post({
  body: {
    messages: messages,
    max_tokens: 4096,
    temperature: 1,
    top_p: 1,
    model: "gpt-35-turbo",
  },
});
if (response.body && response.body.choices && response.body.choices.length > 0) {
  console.log(response.body.choices[0].message.content);
} else {
  console.error("API call failed or returned no choices:", response.body);
}