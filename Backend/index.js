const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 5174;
const MODEL_NAME = "gemini-1.5-pro";
const API_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());


async function runChat(userInput) {

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME }, { apiVersion: 'v1' });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];


  const chatHistory = [
    {
      role: "user",
      parts: [{ text: "You are Ella, a friendly assistant.Your answers should be very short" }],
    },
    {
      role: "model",
      parts: [{ text: "Hello! Welcome to Chatbot ella. I am here to assist you about this job role" }],
    },
    {
      role: "user",
      parts: [{ text: "Hi" }],
    },
    {
      role: "model",
      parts: [{ text: "Hi there! i am you friendly assistant Chatbot." }],
    },
    // {
    //   role: "user",
    //   parts: [{ text: "Introduction" }],
    // },
    {
      role: "model",
      parts: [{
        text: "Hello! I'm Ella, an AI chatbot designed to assist you with job related queries"
      }],
    },
    {
      role: "model",
      parts: [{
        text: "Here is Required Experience and Skills:- Minimum 4+ years of professional experience in full stack JavaScript development Strong proficiency with ReactJS, including state management, hooks, and component architecture Solid backend development skills with NodeJS, TypeScript, and Fastify or Express Experience integrating with third party APIs and services Understanding of AI concepts and experience working with Claude, OpenAI, DeepSeek and Google LLMs Strong JavaScript/TypeScript skills and understanding of modern ES6+ features"
      }],
    },
    {
      role: "model",
      parts: [{
        text: "Here is Job description :- role-'Full-stack AI Developer', Designing and developing AI agents that can autonomously perform complex tasks and interact with users Building responsive, intuitive front end interfaces in ReactJS that showcase AI capabilities Implementing robust backend systems with NodeJS, TypeScript, and Fastify/ Express to power AI functionalities Creating and optimizing API integrations with various AI/ ML models and services Developing conversational interfaces and natural language processing components Engineering decision systems and autonomous logic flows for intelligent agents Working on real time data processing systems to support AI agent operations Implementing and testing machine learning model integrations Optimizing AI agent performance across the entire stack , where package is '₹12L – ₹24L'"
      }],
    },
    {
      role: "model",
      parts: [{ text: "you are allowed to give information about Company which is 'Recruitly.io' and this job description , avoid giving answer of any random question outside these two." }],
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: chatHistory,
  });

  const result = await chat.sendMessage(userInput);
  return result.response.text();
}

app.post('/chat', async (req, res) => {
  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});