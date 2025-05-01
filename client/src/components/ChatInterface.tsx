import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot } from "react-icons/fa";
import ChatMessage from "./ChatMessage";
import { CandidateInfo, Message } from "../types";
import { sendMessage } from "../services/api";

interface ChatInterfaceProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  updateCandidateInfo: (info: Partial<CandidateInfo>) => void;
}

const ChatInterface = ({
  messages,
  setMessages,
  updateCandidateInfo,
}: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input on component mount
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    setIsLoading(true);

    try {
      // Get response from API
      console.log("Sending message to server:", userMessage);

      const response = await sendMessage(userMessage, messages);
      console.log("Received response:", response);

      // Check if we got a valid response
      if (!response || typeof response.message !== "string") {
        throw new Error("Invalid response format from server");
      }

      // Add assistant message to chat
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.message },
      ]);

      // Log candidate info for debugging
      console.log("Candidate info received:", response.candidateInfo);

      // Update candidate info if provided
      if (response.candidateInfo) {
        updateCandidateInfo(response.candidateInfo);
      }
    } catch (error: any) {
      console.error("Error sending message:", error);

      // Determine appropriate error message
      let errorMessage =
        "I'm having trouble connecting to my knowledge base. Please try again in a moment.";

      if (error.response?.status === 503) {
        errorMessage =
          "The server is currently unavailable. Please try again later.";
      } else if (
        error.code === "ECONNABORTED" ||
        error.message.includes("timeout")
      ) {
        errorMessage = "The request timed out. Please try a simpler question.";
      } else if (!navigator.onLine) {
        errorMessage =
          "You appear to be offline. Please check your internet connection.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#F5F1E8] to-[#EEE4D1]">
      <div className="p-4 bg-gradient-to-r from-[#e8eaf6] to-[#c5cae9] border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center text-gray-700">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5c6bc0] to-[#3f51b5] flex items-center justify-center shadow-md mr-3">
            <FaRobot className="text-white text-lg" />
          </div>
          <div className="initial-prompt font-medium">
            <span>
              Ask me about our open positions or tell me about your experience.
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              isLastMessage={index === messages.length - 1 && isLoading}
            />
          ))}
          {isLoading && (
            <div className="text-center my-4">
              <div className="inline-block px-4 py-2 rounded-lg bg-white shadow-md">
                <div className="flex items-center space-x-2">
                  <div className="text-primary-700 text-sm font-medium">
                    Thinking
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white p-6 shadow-md">
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto px-2 sm:px-0"
        >
          <div className="flex items-center rounded-xl border-2 border-gray-300 focus-within:border-[#3f51b5] focus-within:ring-2 focus-within:ring-[#3f51b5]/20 transition-all duration-300 bg-white overflow-hidden shadow-md hover:shadow-lg">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 py-3 sm:py-4 px-4 sm:px-5 focus:outline-none text-gray-700 min-w-0 font-medium"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center transition-all duration-300 ${
                isLoading || !inputValue.trim()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#3f51b5] to-[#303f9f] text-white hover:from-[#303f9f] hover:to-[#1a237e] transform hover:scale-105"
              }`}
              disabled={isLoading || !inputValue.trim()}
            >
              <FaPaperPlane
                className={`text-lg ${
                  !isLoading && inputValue.trim() ? "animate-pulse" : ""
                }`}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
