import axios from "axios";
import { CandidateInfo, Message } from "../types";

const API_BASE_URL = "http://localhost:3001/api";

// Create an axios instance with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

interface ChatResponse {
  message: string;
  candidateInfo?: CandidateInfo;
}

export const sendMessage = async (
  message: string,
  conversationHistory: Message[]
): Promise<ChatResponse> => {
  try {
    // Only send the last 10 messages to avoid token limits
    const limitedHistory = conversationHistory.slice(-10);

    const response = await api.post("/chat/message", {
      message,
      conversationHistory: limitedHistory,
    });

    // Validate response format
    if (!response.data || typeof response.data.message !== "string") {
      console.error("Invalid response format:", response.data);
      throw new Error("Invalid response format from server");
    }

    return response.data;
  } catch (error: any) {
    console.error("API error:", error);

    // Enhance error message with details
    const errorMessage = error.response?.data?.error || error.message;
    throw new Error(`Failed to send message: ${errorMessage}`);
  }
};
