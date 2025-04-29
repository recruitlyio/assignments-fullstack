import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/interview-questions',
  llmApiKey: process.env.LLM_API_KEY || '',
  llmApiEndpoint: process.env.LLM_API_ENDPOINT || 'https://api.openai.com/v1/chat/completions',
  llmModel: process.env.LLM_MODEL || 'gpt-4',
};

