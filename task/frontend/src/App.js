import React, { useState } from "react";
import "./index.css"; // Import the Tailwind CSS file
import JobApplicationResponse from "./components/Markdown";

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false); // To track loading state

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      setMessages([...messages, { text: userInput, type: "user" }]);
      setUserInput(""); // Clear input immediately after sending

      // Show loader while waiting for the response
      setLoading(true);

      try {
        const response = await fetch("http://localhost:5000/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();
        const formattedReply = data.reply
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
          .replace(/\*(.*?)\n/g, "<li>$1</li>") // Bullet points (assuming each point ends with a newline)
          .replace(/\*/g, "• "); // Fallback for stray asterisks

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: <div dangerouslySetInnerHTML={{ __html: formattedReply }} />,
            type: "bot",
          },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Sorry, there was an error.", type: "bot" },
        ]);
      } finally {
        setLoading(false); // Hide loader once response is received
      }
    }
  };

  return (
    <div className="App min-h-screen flex flex-col justify-between bg-gray-100">
      <span className="text-center text-2xl font-bold text-gray-800 bg-gray-100 p-4 rounded-lg shadow-sm w-full">
        Full-stack AI Developer (ReactJS/NodeJS)
      </span>
      <div className="chat-container p-4 flex-1 overflow-y-auto space-y-4 bg-white rounded-lg shadow-md m-4 ">
        {/* Display the welcome message at the top */}
        {messages.length === 0 && (
          <div className="message p-6 font-semibold rounded-xl justify-center m-auto text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-col gap-2 w-fit animate-fadeIn">
            <span>Hi there! 👋 Welcome to the AAJ (Ask me Anything about JD) chatbot.</span>
            <span>
              I'm here to help you with the job description for the Full-stack
              AI Developer role. Ask away!
            </span>
            
          </div>
        )}

        {/* Map through messages and display them */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message p-2 rounded-lg w-fit ${
              message.type === "user"
                ? "bg-blue-500 text-white ml-auto "
                : "mr-auto "
            }`}
          >
            <JobApplicationResponse apiResponse={message.text} />
          </div>
        ))}

        {/* Show loader if in loading state */}
        {loading && (
          <div className="message p-2 rounded-lg w-full text-center bg-gray-200 text-gray-600">
            <span className="loader">Loading...</span>{" "}
            {/* You can style this loader */}
          </div>
        )}
      </div>

      <div className="input-container p-4 bg-white shadow-lg rounded-lg m-4 flex items-center space-x-2 sticky bottom-0 bg-white">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask about the job..."
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
