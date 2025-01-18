import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { useContext } from "react";
import { UserContext } from "../context/userContext";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

const Input: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");
  const { setKeyboard } = useContext(UserContext);

  const handleFocus = () => {
    setKeyboard(true);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex w-full p-4 bg-[#484848]">
      <input
        className="w-full p-2 text-black bg-white rounded-lg"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
      <button
        className="ml-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        onClick={handleSend}
      >
        <SendIcon />
      </button>
    </div>
  );
};

export default Input;
