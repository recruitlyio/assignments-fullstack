import React, { useState } from "react";
import ChatInterface from "./components/ChatInterface";
import CandidateProfile from "./components/CandidateProfile";
import Header from "./components/Header";
import { CandidateInfo, Message } from "./types";

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your CandiBot recruiting assistant. How can I help you today? Feel free to ask about our open positions or tell me about your experience.",
    },
  ]);

  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo>({
    skills: [],
    experience: "",
    education: "",
    otherQualifications: "",
  });

  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const updateCandidateInfo = (newInfo: Partial<CandidateInfo>) => {
    console.log("Updating candidate info with:", newInfo);

    if (!newInfo || Object.keys(newInfo).length === 0) {
      console.log("Empty candidate info received, ignoring update");
      return;
    }

    // Extract name from otherQualifications if it exists
    let name = "";
    if (newInfo.otherQualifications?.startsWith("Name:")) {
      name = newInfo.otherQualifications.substring(5).trim();

      // Create a better formatted profile info
      setCandidateInfo((prevInfo) => {
        // Create a new set from old and new skills
        const mergedSkills = new Set([
          ...(prevInfo.skills || []),
          ...(newInfo.skills || []),
        ]);

        return {
          ...prevInfo,
          ...newInfo,
          // Don't keep the "Name:" prefix in otherQualifications
          otherQualifications: name
            ? `Candidate Name: ${name}${
                prevInfo.otherQualifications
                  ? `\n\n${prevInfo.otherQualifications}`
                  : ""
              }`
            : newInfo.otherQualifications || prevInfo.otherQualifications,
          // Clean up skills array
          skills: Array.from(mergedSkills).filter(
            (skill) => skill && skill.trim().length > 0
          ),
          // Keep existing values if new ones are empty
          experience: newInfo.experience || prevInfo.experience,
          education: newInfo.education || prevInfo.education,
        };
      });
    } else {
      // Regular update without name extraction
      setCandidateInfo((prevInfo) => {
        const mergedSkills = new Set([
          ...(prevInfo.skills || []),
          ...(newInfo.skills || []),
        ]);

        return {
          ...prevInfo,
          ...newInfo,
          skills: Array.from(mergedSkills).filter(
            (skill) => skill && skill.trim().length > 0
          ),
          experience: newInfo.experience || prevInfo.experience,
          education: newInfo.education || prevInfo.education,
          otherQualifications:
            newInfo.otherQualifications || prevInfo.otherQualifications,
        };
      });
    }

    // Always show profile when we have info
    if (!isProfileVisible) {
      setIsProfileVisible(true);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gradient-to-br from-[#f0f2f0] to-[#e8eaf6] overflow-hidden">
      <Header
        isProfileVisible={isProfileVisible}
        toggleProfile={() => setIsProfileVisible(!isProfileVisible)}
      />

      <div className="flex flex-1 overflow-hidden p-2 sm:p-4">
        <div
          className={`transition-all duration-300 flex-1 ${
            isProfileVisible ? "lg:w-2/3 lg:pr-4" : "w-full"
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full border border-gray-100">
            <ChatInterface
              messages={messages}
              setMessages={setMessages}
              updateCandidateInfo={updateCandidateInfo}
            />
          </div>
        </div>

        {isProfileVisible && (
          <div className="hidden lg:block lg:w-1/3 lg:flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg h-full overflow-hidden border border-gray-100">
              <CandidateProfile candidateInfo={candidateInfo} />
            </div>
          </div>
        )}

        {isProfileVisible && (
          <div className="lg:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-50 overflow-hidden">
            <div className="h-full bg-white max-w-md ml-auto animate-slideIn overflow-hidden flex flex-col">
              <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-[#e8eaf6] to-[#c5cae9]">
                <h2 className="text-xl font-semibold text-gray-800">
                  Candidate Profile
                </h2>
                <button
                  onClick={() => setIsProfileVisible(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <CandidateProfile candidateInfo={candidateInfo} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
