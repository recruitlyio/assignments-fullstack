import React from "react";
import { Message } from "../types";
import { FaRobot, FaUser } from "react-icons/fa";

interface ChatMessageProps {
  message: Message;
  isLastMessage: boolean;
}

const ChatMessage = ({ message, isLastMessage }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } items-start group mb-4`}
    >
      {!isUser && (
        <div className="flex-shrink-0 mr-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-md">
            <FaRobot className="text-white text-lg" />
          </div>
        </div>
      )}

      <div
        className={`max-w-[85%] rounded-2xl px-5 py-3.5 ${
          isUser
            ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md"
            : "bg-white border border-gray-200 shadow-md text-gray-800"
        } ${isUser ? "rounded-tr-sm" : "rounded-tl-sm"} bubble-animation`}
      >
        <div className="whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 ml-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
            <FaUser className="text-white text-sm" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
