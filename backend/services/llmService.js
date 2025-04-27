const axios = require('axios');
require('dotenv').config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function askLLM(messages) {
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: "meta-llama/llama-3-8b-instruct",
      messages,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  return response.data.choices[0].message.content.trim();
}

module.exports = { askLLM };
