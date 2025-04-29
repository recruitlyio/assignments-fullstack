// import React, { useState } from 'react';

// const ChatWindow = () => {
//   const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);
//   const [candidateInfo, setCandidateInfo] = useState<{ name: string; experience: string; skills: string }>({
//     name: '',
//     experience: '',
//     skills: '',
//   });
//   const [conversationStage, setConversationStage] = useState<number>(0);

//   const handleNewUserMessage = (newMessage: string) => {
//     if (newMessage.trim()) {
//       setChatHistory((prevChatHistory) => [
//         ...prevChatHistory,
//         { user: newMessage, bot: '' },
//       ]);
//       extractCandidateInfo(newMessage);
//     }
//   };

//   const extractCandidateInfo = (message: string) => {
//     let botReply = '';

//     if (conversationStage === 0 && message.toLowerCase().includes('name is')) {
//       const namePart = message.split('name is ')[1]?.trim();
//       if (namePart) {
//         setCandidateInfo((prevState) => ({
//           ...prevState,
//           name: namePart,
//         }));
//         setConversationStage(1);
//         botReply = `Nice to meet you, ${namePart}! Tell me more about your experience.`;
//       }
//     } else if (conversationStage === 1 && message.toLowerCase().includes('experience')) {
//       const experience = message.split('experience')[0].trim();
//       setCandidateInfo((prevState) => ({
//         ...prevState,
//         experience: experience,
//       }));
//       setConversationStage(2);
//       botReply = `Got it, ${candidateInfo.name}! You mentioned having ${experience} of experience. What skills do you have?`;
//     } else if (conversationStage === 2 && message.toLowerCase().includes('skills')) {
//       const skills = message.split('skills')[0].trim();
//       setCandidateInfo((prevState) => ({
//         ...prevState,
//         skills: skills,
//       }));
//       setConversationStage(3);
//       botReply = `Thanks, ${candidateInfo.name}! I see you have skills in ${skills}. You're all set!`;
//     } else {
//       botReply = `Sorry, I didn't quite understand that. Can you tell me your name and experience?`;
//     }


//     setChatHistory((prevChatHistory) => [
//       ...prevChatHistory.slice(0, prevChatHistory.length - 1),
//       { user: prevChatHistory[prevChatHistory.length - 1]?.user, bot: botReply },
//     ]);
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-window">
//         {chatHistory.map((msg, index) => (
//           <div key={index}>
//             <p>
//               <strong>User:</strong> {msg.user}
//             </p>
//             <p>
//               <strong>Bot:</strong> {msg.bot}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="summary-view">
//         <h3>Candidate Summary:</h3>
//         <p>
//           <strong>Name:</strong> {candidateInfo.name}
//         </p>
//         <p>
//           <strong>Experience:</strong> {candidateInfo.experience}
//         </p>
//         <p>
//           <strong>Skills:</strong> {candidateInfo.skills}
//         </p>
//       </div>

//       <input
//         type="text"
//         placeholder="Ask about the job..."
//         onKeyDown={(e) =>
//           e.key === 'Enter' && handleNewUserMessage((e.target as HTMLInputElement).value)
//         }
//       />
//     </div>
//   );
// };

// export default ChatWindow;

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../chat.css';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you? Ask me about the job.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      let botResponse;

      if (input.toLowerCase().includes('job') || input.toLowerCase().includes('description')) {
        const res = await axios.get('/api/job');
        botResponse = { sender: 'bot', text: res.data.description };
      } else {
        const res = await axios.post('/api/message', { message: input });
        botResponse = { sender: 'bot', text: res.data.reply };
      }

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={msg.sender === 'bot' ? 'bot-message' : 'user-message'}>
              {msg.sender === 'bot' ? (
                <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              ) : (
                <div>{msg.text}</div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
