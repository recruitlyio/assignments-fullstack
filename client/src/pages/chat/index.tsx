import React, { useState } from "react";
import ChatMessage from "@/components/molecules/ChatMessage";
import ChatInput from "@/components/molecules/ChatInput";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

interface Message {
   text: string;
   isAI: boolean;
}

const ChatPage = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();

   const handleSendMessage = async (message: string) => {
      // Add user message
      setMessages((prev) => [...prev, { text: message, isAI: false }]);
      setIsLoading(true);

      try {
         // TODO: Replace with actual API call
         // Simulating API delay
         await new Promise((resolve) => setTimeout(resolve, 1000));

         // Add AI response
         setMessages((prev) => [
            ...prev,
            {
               text: "This is a sample AI response. Replace with actual API integration.",
               isAI: true,
            },
         ]);
      } catch (error) {
         console.error("Error getting AI response:", error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="flex flex-col h-screen p-4">
         <nav className="border-b pb-3 ">
            <div
               className="flex items-center gap-3 cursor-pointer w-max"
               onClick={() => {
                  navigate("/");
               }}
            >
               <ChevronLeft />
               <span className="text-gray-700 font-semibold text-xl">
                  Interview Chat
               </span>
            </div>
         </nav>
         <div className="flex-1 overflow-y-auto mb-4 p-3">
            {messages.map((message, index) => (
               <ChatMessage
                  key={index}
                  message={message.text}
                  isAI={message.isAI}
               />
            ))}
         </div>
         <div className="sticky bottom-0 bg-white p-4 border-t">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
         </div>
      </div>
   );
};

export default ChatPage;
