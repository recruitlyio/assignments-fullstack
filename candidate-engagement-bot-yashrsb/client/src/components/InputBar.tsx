import React from 'react';

interface InputBarProps {
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
}

const InputBar: React.FC<InputBarProps> = ({ userInput, setUserInput, onSend }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your message"
        className="p-4 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSend}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Send
      </button>
    </div>
  );
};

export default InputBar;
