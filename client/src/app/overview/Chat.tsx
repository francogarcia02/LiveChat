import React from "react";

type Message = {
  msg: string;
  username: string;
};

type ChatMessagesProps = {
  messages: Message[];
  currentUser: string | undefined;
  conversation: string | undefined;
};

const Chat: React.FC<ChatMessagesProps> = ({ messages, currentUser}) => {

  return (
    <div className="w-full flex flex-col overflow-y-auto flex-grow p-4">
      {messages.map((elem, index) => (
        <div
          key={index}
          className={`w-full flex ${elem.username === currentUser ? "justify-end" : "justify-start"} mb-2`}
        >
          <div
            className={`p-2 rounded-lg ${
              elem.username === currentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            <p>{elem.msg}</p>
            <small
              className={`${
                elem.username === currentUser ? "text-gray-300" : "text-gray-700"
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
