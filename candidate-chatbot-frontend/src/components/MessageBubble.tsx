import React from 'react';
import {Message} from '../types/chat';

interface MessageBubbleProps extends Message {
}

const MessageBubble: React.FC<MessageBubbleProps> = ({sender, text}) => {
  const isUser = sender === 'user';

  return (
    <div
      className={`mb-[0.5rem] flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[70%] py-[0.75rem] px-[1rem] rounded-[20px] break-words ${isUser ? 'bg-[#007BFF]' : 'bg-[#f1f0f0]'} ${isUser ? 'text-[#fff]' : 'text-[#000]'}`}
      >
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;