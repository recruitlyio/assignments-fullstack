import dotenv from 'dotenv';
dotenv.config();
const config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    geminiApi: process.env.GEMINI_API,
    openAiApi: process.env.OPEN_AI_API,
    neonUri: process.env.NEO4J_URI,
    neonUser: process.env.NEO4J_USERNAME,
    neonPassword: process.env.NEO4J_PASSWORD
};
export default config;
