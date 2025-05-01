import React from 'react';
import { Message as MessageType } from '../types/message';
import JobApplicationResponse from './JobApplicationResponse';

const Message = ({ message }: { message: MessageType }) => {
  const isUser = message.type === 'user';

  return (
    <div
      className={`message p-3 rounded-xl max-w-[80%] whitespace-pre-wrap ${
        isUser
          ? "bg-blue-500 text-white self-end"
          : "bg-gray-200 text-gray-800 self-start"
      }`}
    >
      {isUser ? (
        message.text
      ) : (
        <JobApplicationResponse apiResponse={message.text as string} />
      )}
    </div>
  );
};

export default Message;
