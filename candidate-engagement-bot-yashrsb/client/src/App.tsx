import React from 'react';
import ChatBot from './components/ChatBot';

const App = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
    <div className="w-full max-w-2xl h-[90vh] bg-white/90 rounded-xl shadow-2xl">
      <ChatBot />
    </div>
  </div>
);

export default App;
