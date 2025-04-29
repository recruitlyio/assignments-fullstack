import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  Message,
  Conversation,
  CandidateProfile,
  JobDescription,
  ChatContextType,
  ApiResponse,
} from "@/types";

// Create a default empty conversation
const createEmptyConversation = (): Conversation => {
  const timestamp = Date.now();
  return {
    id: uuidv4(),
    messages: [
      {
        id: uuidv4(),
        role: "system",
        content: `You are a friendly and helpful AI assistant for a job recruitment platform. 
        Your role is to provide information about job positions and collect relevant information about candidates.
        Be conversational, informative, and engaging.`,
        timestamp,
      },
      {
        id: uuidv4(),
        role: "assistant",
        content:
          "Hello! I'm your recruitment assistant. I can tell you all about this position and help determine if it's a good match for your skills and experience. Feel free to ask me any questions about the job, or tell me a bit about your background. How can I help you today?",
        timestamp: timestamp + 1000,
      },
    ],
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

// Create an empty candidate profile
const createEmptyCandidateProfile = (): CandidateProfile => {
  return {
    id: uuidv4(),
    skills: [],
    experience: [],
    education: [],
    confidenceScore: 0,
    lastUpdated: Date.now(),
  };
};

// Create the Context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [conversation, setConversation] = useState<Conversation>(
    createEmptyConversation()
  );
  const [candidateProfile, setCandidateProfile] =
    useState<CandidateProfile | null>(createEmptyCandidateProfile());
  const [jobDescription, setJobDescription] = useState<JobDescription | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch job description on initial load
  useEffect(() => {
    const fetchJobDescription = async () => {
      try {
        const response = await axios.get<ApiResponse<JobDescription>>(
          "/api/job-description"
        );
        if (response.data.success && response.data.data) {
          setJobDescription(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch job description:", error);
      }
    };

    fetchJobDescription();
  }, []);

  // Send a message to the chatbot
  const sendMessage = async (content: string): Promise<void> => {
    if (content.trim() === "") return;

    // Create user message
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: Date.now(),
    };

    // Update conversation with user message
    const updatedConversation: Conversation = {
      ...conversation,
      messages: [...conversation.messages, userMessage],
      updatedAt: Date.now(),
    };

    setConversation(updatedConversation);
    setIsLoading(true);

    try {
      // Send message to API
      const response = await axios.post<
        ApiResponse<{
          message: Message;
          candidateProfile: CandidateProfile;
        }>
      >("/api/chat", {
        message: userMessage,
        conversation: updatedConversation,
        candidateProfile,
      });

      if (response.data.success && response.data.data) {
        // Add assistant response to conversation
        const assistantMessage = response.data.data.message;
        setConversation((prev) => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
          updatedAt: Date.now(),
        }));

        // Update candidate profile
        setCandidateProfile(response.data.data.candidateProfile);
      }
    } catch (error) {
      console.error("Failed to send message:", error);

      // Add error message to conversation
      const errorMessage: Message = {
        id: uuidv4(),
        role: "assistant",
        content:
          "I apologize, but I encountered an error processing your message. Please try again.",
        timestamp: Date.now(),
      };

      setConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
        updatedAt: Date.now(),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Reset the conversation
  const resetConversation = (): void => {
    setConversation(createEmptyConversation());
    setCandidateProfile(createEmptyCandidateProfile());
  };

  return (
    <ChatContext.Provider
      value={{
        conversation,
        isLoading,
        candidateProfile,
        jobDescription,
        sendMessage,
        resetConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the chat context
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
