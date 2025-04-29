import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isAI: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isAI }) => {
  return (
    <div className={cn(
      "flex w-full",
      isAI ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "max-w-[80%] rounded-lg px-4 py-2 mb-4",
        isAI ? "bg-gray-200" : "bg-blue-500 text-white"
      )}>
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;