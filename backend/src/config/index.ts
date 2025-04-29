import dotenv from 'dotenv';

dotenv.config();
export const config = {
  port: process.env.PORT || '8080',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
};
