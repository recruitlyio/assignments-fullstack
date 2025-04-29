import { useState } from "react";
import { ChatInterface } from "./components/Chat";
import { ProfileSummary } from "./components/CandidateProfile";
import { useChat } from "./contexts/ChatContext";
import { FiUser, FiMessageSquare, FiRefreshCw } from "react-icons/fi";
import { Button } from "./components/ui";

const App = () => {
  const { candidateProfile, resetConversation } = useChat();
  const [activeTab, setActiveTab] = useState<"chat" | "profile">("chat");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold mr-3">
              JR
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Candidate Engagement Chatbot
            </h1>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={resetConversation}
            className="flex items-center gap-1"
          >
            <FiRefreshCw className="text-sm" />
            <span>Reset Conversation</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Tabs */}
          <div className="flex md:hidden mb-4 bg-white rounded-lg shadow-sm">
            <button
              className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 ${
                activeTab === "chat"
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("chat")}
            >
              <FiMessageSquare />
              <span>Chat</span>
            </button>
            <button
              className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2 ${
                activeTab === "profile"
                  ? "text-primary-600 border-b-2 border-primary-600"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <FiUser />
              <span>Profile</span>
            </button>
          </div>

          {/* Chat Interface - full width on mobile when active, left side on desktop */}
          <div
            className={`w-full md:w-3/5 ${
              activeTab === "chat" ? "block" : "hidden md:block"
            }`}
          >
            <ChatInterface />
          </div>

          {/* Candidate Profile - full width on mobile when active, right side on desktop */}
          <div
            className={`w-full md:w-2/5 ${
              activeTab === "profile" ? "block" : "hidden md:block"
            }`}
          >
            {candidateProfile && <ProfileSummary profile={candidateProfile} />}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Candidate Engagement Chatbot - Powered by Open AI</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
