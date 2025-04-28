const { askClaude } = require('./claudeService');

const askQuestion = async (req, res) => {
  try {
    const { jobTitle, skills, experienceLevel } = req.body;

    if (!jobTitle || !skills || !experienceLevel) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const prompt = `Generate 5 interview questions for a ${jobTitle} with skills: ${skills}. Target experience level: ${experienceLevel}. Provide evaluation criteria as well. Return as JSON with "question" and "evaluationCriteria".`;

    const answer = await askClaude(prompt);

    const questions = JSON.parse(answer);

    res.json({ questions });
  } catch (error) {
    console.error('Error in askQuestion:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { askQuestion };
