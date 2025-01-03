import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send'

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

const Input: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex w-full p-4 border-t border-gray-300 bg-[#383838] rounded-b-lg">
      <input
        className="w-full p-2 text-black rounded-lg"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        className="ml-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        onClick={handleSend}
      >
        <SendIcon/>
      </button>
    </div>
  );
};

export default Input;
