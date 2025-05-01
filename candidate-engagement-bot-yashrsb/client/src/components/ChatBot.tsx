import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import InputBar from './InputBar';
import WelcomeBanner from './WelcomeBanner';
import { fetchBotResponse } from '../services/api';
import { Message } from '../types/message';

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleSend = async () => {
    if (!userInput.trim()) return;
  
    const newUserMessage: Message = { text: userInput, type: 'user' };
    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setLoading(true);
    const loadingMessage: Message = { text: 'Fetching response...⌛', type: 'bot' };
    setMessages((prev) => [...prev, loadingMessage]);
  
    try {
      const reply = await fetchBotResponse(userInput);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: reply, type: 'bot' }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: "Couldn't fetch response❌", type: 'bot' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      <WelcomeBanner />

      <div className="flex-1 overflow-auto">
        <MessageList messages={messages} />
        {loading}
        <div ref={bottomRef} /> {}
      </div>

      <InputBar userInput={userInput} setUserInput={setUserInput} onSend={handleSend} />
    </div>
  );
};

export default ChatBot;
