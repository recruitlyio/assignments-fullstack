import React from 'react';
import Message from './Message';
import { Message as MessageType } from '../types/message';

const MessageList = ({ messages }: { messages: MessageType[] }) => (
  <div className="flex flex-col space-y-3 overflow-y-auto p-4">
    {messages.map((msg, i) => (
      <Message key={i} message={msg} />
    ))}
  </div>
);

export default MessageList;
