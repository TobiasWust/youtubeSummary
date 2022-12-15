import YoutubeTranscript from 'youtube-transcript';
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

async function getTranscript(videoId) {
  const transcript = await YoutubeTranscript.default.fetchTranscript(videoId);
  return transcript.map((item) => item.text).join(' ');
};

async function getSummary(text) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `remove ads and summarize: \n ${text}`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.data.choices[0].text;
};

const transcript = await getTranscript(process.argv.slice(2));
const summary = await getSummary(transcript);

// console.log(transcript);
console.log(summary);
