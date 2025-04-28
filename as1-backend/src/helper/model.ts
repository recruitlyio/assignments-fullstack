import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import config from "../config/config.js";
import { ChatOpenAI } from '@langchain/openai';

export const model = new ChatGoogleGenerativeAI({
    model: 'gemini-2.0-flash',
    apiKey: config.geminiApi,
    temperature: 0,
})

export const graph_model = new ChatOpenAI({
    model: 'gpt-4.1-mini',
    temperature: 0,
    apiKey: config.openAiApi
})
