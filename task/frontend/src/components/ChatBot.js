// src/components/ChatBot.js
import React, { useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', type: 'bot' }
  ]);
  const [userInput, setUserInput] = useState('');

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      // Add user message
      setMessages([...messages, { text: userInput, type: 'user' }]);

      // Here, you can add logic to send the user message to the backend or handle it
      // Add a bot response (for demo purposes, using a simple response)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `You said: ${userInput}`, type: 'bot' },
      ]);

      setUserInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleUserInput}
        placeholder="Type your message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatBot;
