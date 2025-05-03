import OpenAi from "openai";
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAi({ apiKey: process.env.OPENAI_API_KEY });

const generateQuestions = async (prompt) => {
    try {
        const completion = await client.responses.create({
          model: 'gpt-3.5-turbo',
          input: [
            {
              role: 'user',
              content: prompt,
            },
          ]
        });
    
        return {
            status: 200,
            data: JSON.parse(completion.output_text),
        }
    } catch (error) {
        console.error('Error generating questions:', error.message);
        return {
            status: 500,
            error: 'Failed to generate questions',
        }
    }
}

export default {
    generateQuestions
}