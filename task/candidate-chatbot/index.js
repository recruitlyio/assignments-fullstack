const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: '.env.local' });

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const geminiAPI = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Make sure you have your Gemini API key in .env.local



const jobDescription = `
Full-stack AI Developer (ReactJS/NodeJS)
₹12L – ₹24L • No equity
About the job
We are seeking a skilled Full-stack AI Developer to join our team building next-generation AI agents and intelligent systems.

You will be working with cutting-edge AI technologies while leveraging your expertise in modern JavaScript frameworks.

What You Will Be Working On

Designing and developing AI agents that can autonomously perform complex tasks and interact with users
Building responsive, intuitive front end interfaces in ReactJS that showcase AI capabilities
Implementing robust backend systems with NodeJS, TypeScript, and Fastify/Express to power AI functionalities
Creating and optimizing API integrations with various AI/ML models and services
Developing conversational interfaces and natural language processing components
Engineering decision systems and autonomous logic flows for intelligent agents
Working on real time data processing systems to support AI agent operations
Implementing and testing machine learning model integrations
Optimizing AI agent performance across the entire stack
Required Experience and Skills

Minimum 4+ years of professional experience in full stack JavaScript development
Strong proficiency with ReactJS, including state management, hooks, and component architecture
Solid backend development skills with NodeJS, TypeScript, and Fastify or Express
Experience integrating with third party APIs and services
Understanding of AI concepts and experience working with Claude, OpenAI, DeepSeek and Google LLMs
Strong JavaScript/TypeScript skills and understanding of modern ES6+ features
`;

app.post("/chatbot", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      geminiAPI,
      {
        contents: [
          {
            parts: [
              { text: `${jobDescription}\n\nCandidate Question: ${message}` }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': GEMINI_API_KEY, // Use API key for Gemini
        },
      }
    );

    const geminiReply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (geminiReply) {
        res.json({ reply: geminiReply });
      } else {
        res.status(500).json({ reply: "Sorry, I couldn't get a response." });
      }
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ reply: "Sorry, there was an issue processing your request." });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});