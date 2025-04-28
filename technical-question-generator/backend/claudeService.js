const axios = require('axios');

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY || '';

const askClaude = async (question) => {
  try {
    const response = await axios.post(
      CLAUDE_API_URL,
      {
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: question,
          },
        ],
      },
      {
        headers: {
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
      }
    );

    console.log('Claude API response:', response.data);

    return response.data?.content?.[0]?.text || 'No response from Claude';
  } catch (error) {
    console.error('Error in askClaude:', error.response?.data || error.message);
    throw new Error('Failed to get response from Claude');
  }
};

module.exports = { askClaude };
