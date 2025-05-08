import express from "express";
import axios from 'axios';
const router = express.Router();

router.post('/match', async (req, res) => {
  const { job, candidates } = req.body;

  try {
    const results = await Promise.all(
      candidates.map(async (candidate) => {
        const prompt = `Job Description:\n${job}\n\nCandidate:\n${JSON.stringify(candidate)}\n\nRate the match from 0–100 and explain why.`;

        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4',
            messages: [
              { role: 'system', content: 'You are an AI HR assistant scoring job fit.' },
              { role: 'user', content: prompt }
            ]
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );

        const content = response.data.choices[0].message.content;
        const scoreMatch = content.match(/\d{1,3}/);
        const score = scoreMatch ? parseInt(scoreMatch[0]) : 0;

        return {
          candidate: candidate.name,
          score,
          explanation: content
        };
      })
    );

    res.json({ results });
  } catch (error) {
    console.error('Matching error:', error.message);
    res.status(500).json({ error: 'Failed to match candidates' });
  }
});

export default router;
