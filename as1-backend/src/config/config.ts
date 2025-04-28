import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number
  nodeEnv: string
  geminiApi: string
  openAiApi: string 
  neonUri: string
  neonUser: string
  neonPassword: string
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  geminiApi: process.env.GEMINI_API as string,
  openAiApi: process.env.OPEN_AI_API as string,
  neonUri: process.env.NEO4J_URI as string,
  neonUser: process.env.NEO4J_USERNAME as string,
  neonPassword: process.env.NEO4J_PASSWORD as string
};

export default config;