import {manageConversationContext} from '../utils/conversationManager';
import {GeminiChatMessage} from "../types";
import axios from "axios";
import dotenv from 'dotenv';
import {jobDescription} from "../utils/jobDescription";
import {extractCandidateProfileFromLLM} from "./candidateProfile";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function handleChat(message: string, conversationId?: string) {
  if (!GEMINI_API_KEY || !GEMINI_API_URL) {
    throw new Error('GEMINI_API_KEY is missing in .env');
  }

  let history = manageConversationContext(conversationId) as GeminiChatMessage[];

  // Trim old history if too long
  const MAX_HISTORY_MESSAGES = 20;
  if (history.length > MAX_HISTORY_MESSAGES) {
    history = history.slice(history.length - MAX_HISTORY_MESSAGES);
  }

  // Append user's new message
  history.push({
    role: 'user',
    parts: [{text: message}],
  });

  const userInstruction = `
You are an intelligent recruiter chatbot.
Only answer questions strictly related to the Full-stack AI Developer role described below.
If the user asks unrelated questions, politely redirect them to the job description details.
Also, if the user mentions experience, skills, or projects, acknowledge and collect that information for evaluation.

Here is the Job Description:
${jobDescription}
  `;

  const contents = [
    {
      role: 'user',
      parts: [{text: userInstruction}]
    },
    ...history.map(msg => ({
      role: msg.role,
      parts: msg.parts,
    }))
  ];

  const url = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;

  const payload = {contents};

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const aiReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply';

    // Append AI's reply
    history.push({
      role: 'model',
      parts: [{text: aiReply}],
    });

    // Save updated conversation context
    manageConversationContext(conversationId, history);

    // Profile Extraction (second Gemini call)
    const extractedProfile = await extractCandidateProfileFromLLM(message, url);

    return {
      reply: aiReply,
      conversationId: conversationId || generateConversationId(),
      updatedProfile: extractedProfile,
    };
  } catch (error) {
    console.error('Error communicating with Gemini:', error);
    throw new Error('Failed to communicate with Gemini API');
  }
}

function generateConversationId() {
  return Math.random().toString(36).substring(2, 15);
}