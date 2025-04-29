import { useEffect, useRef } from "react";
import { useChat } from "@/contexts/ChatContext";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { LoadingIndicator } from "@/components/ui";

const ChatInterface = () => {
  const { conversation, isLoading, jobDescription, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages]);

  return (
    <div className="flex flex-col h-full max-h-[700px] overflow-hidden bg-gray-50 rounded-lg shadow-md">
      <div className="p-4 bg-primary-600 text-white rounded-t-lg">
        <h2 className="text-xl font-semibold m-0">Job Candidate Assistant</h2>
        <p className="text-sm mt-1 opacity-90">
          {jobDescription
            ? `Ask me about the ${jobDescription.title} position at ${jobDescription.company}`
            : "Loading job details..."}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {conversation.messages
          .filter((msg) => msg.role !== "system") // Don't show system messages
          .map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500 text-sm p-2 animate-fadeIn">
            <LoadingIndicator size="sm" />
            <span>Assistant is typing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatInterface;
