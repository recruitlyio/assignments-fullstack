import OpenAI from "openai";
import config from "./index";

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

// Default model to use
export const GPT_MODEL = "gpt-4";
