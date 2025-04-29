import React, {useEffect, useRef, useState} from 'react';
import {Message, CandidateProfile} from '../types/chat';
import {sendMessageToBackend} from '../services/chatApi';
import MessageBubble from "./MessageBubble";

interface ChatWindowProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setProfile: React.Dispatch<React.SetStateAction<CandidateProfile>>;
}

export const ChatWindow = ({messages, setMessages, setProfile}: ChatWindowProps) => {
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {sender: 'user', text: input};
    setMessages((prev) => [...prev, userMessage]);

    setInput('');
    setIsTyping(true);

    try {
      const {reply, updatedProfile} = await sendMessageToBackend(input);

      const botMessage: Message = {sender: 'bot', text: reply};
      setMessages((prev) => [...prev, botMessage]);

      if (updatedProfile) {
        setProfile((prev) => ({...prev, ...updatedProfile}));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorBotMessage: Message = {sender: 'bot', text: 'Oops, something went wrong.'};
      setMessages((prev) => [...prev, errorBotMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await handleSend();
    }
  };

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages?.map((message, index) => (
          <MessageBubble key={index} sender={message?.sender} text={message?.text}/>
        ))}
        {isTyping && (
          <MessageBubble sender="bot" text="Recruiter is typing..."/>
        )}
        <div ref={scrollAnchorRef}/>
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend} className="px-4 py-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </div>
    </div>
  );
};