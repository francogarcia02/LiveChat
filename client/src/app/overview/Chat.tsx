import React, { useEffect, useRef } from "react";

type Message = {
  msg: string;
  username: string;
};

type ChatMessagesProps = {
  messages: Message[];
  currentUser: string | undefined;
  conversation: string | undefined;
};

const Chat: React.FC<ChatMessagesProps> = ({ messages, currentUser }) => {
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth", 
      });
    }
  }, [messages]); 

  return (
    <div ref={chatRef} className="flex flex-col overflow-y-auto flex-grow p-4">
      {messages.map((elem, index) => (
        <div
          key={index}
          className={`flex ${
            elem.username === currentUser ? "justify-end ms-8" : "justify-start me-8"
          } mb-2`}
        >
          <div
            className={`p-2 rounded-lg ${
              elem.username === currentUser
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <p className="break-all">{elem.msg}</p>
            <small
              className={`${
                elem.username === currentUser ? "text-gray-100" : "text-gray-700"
              }`}
            >
              {elem.username}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chat;
