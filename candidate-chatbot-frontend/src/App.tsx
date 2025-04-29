import React, {useState} from 'react';
import CandidateSummary from './components/CandidateSummary';
import {Message, CandidateProfile} from './types/chat';
import {ChatWindow} from "./components/ChatWindow";

const App = () => {
  const [messages, setMessages] = useState<Message[]>([
    {sender: 'bot', text: 'Feel free to ask questions if you have any doubts regarding the role'},
  ]);
  const [profile, setProfile] = useState<CandidateProfile>({});

  return (
    <div className="flex h-screen">
      <div className="flex-[3] border-r border-r-[#ccc]">
        <ChatWindow messages={messages} setMessages={setMessages} setProfile={setProfile}/>
      </div>
      <div className="flex-1">
        <CandidateSummary profile={profile}/>
      </div>
    </div>
  );
};

export default App;