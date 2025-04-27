const express = require('express');
const cors = require('cors');
const { askLLM } = require('./services/llmService');
const { extractCandidateInfo } = require('./services/extractionService');
const memoryStore = require('./utils/memoryStore');

const app = express();
app.use(cors());
app.use(express.json());

const JOB_DESCRIPTION = `
We are hiring a Senior Frontend Engineer.
Requirements: JavaScript, React, CSS, 4+ years experience.
Location: Remote.
`;

app.post('/api/chat', async (req, res) => {
  const { sessionId, message } = req.body;

  if (!sessionId || !message) {
    return res.status(400).json({ error: 'SessionId and message are required.' });
  }

  if (!memoryStore[sessionId]) {
    memoryStore[sessionId] = {
      conversation: [{ role: 'system', content: `You are helping candidates understand this job: ${JOB_DESCRIPTION}` }],
      candidateProfile: {},
    };
  }

  const session = memoryStore[sessionId];
  session.conversation.push({ role: 'user', content: message });

  try {
    const reply = await askLLM(session.conversation);
    session.conversation.push({ role: 'assistant', content: reply });
    extractCandidateInfo(message, session.candidateProfile);

    res.json({
      reply,
      candidateProfile: session.candidateProfile,
    });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
