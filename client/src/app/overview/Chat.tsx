import React, { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

type Message = {
  msg: string;
  username: string;
  created_at: string;
};

type ChatMessagesProps = {
  messages: Message[];
  conversation: string | undefined;
};

const Chat: React.FC<ChatMessagesProps> = ({ messages }) => {
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
        <ChatMessage content={elem} key={index}/>
      ))}
    </div>
  );
};

export default Chat;
