'use client'

import TopData from "./TopData";
import Chat from "./Chat"
import Input from "./Input";
import Conversations from "./Conversations";
import Header from "../components/header/page"

import { io, Socket } from "socket.io-client";
import { useState, useEffect, useRef } from "react";

import { useContext } from "react";
import { UserContext } from "../context/userContext";

const ChatContainer = () => {
    const [messages, setMessages] = useState<{ msg: string; username: string }[]>([]);
    const [conversationId, setConversationId] = useState<string>('')
    const socketRef = useRef<Socket | null>(null);
    
    const {user, selected} = useContext(UserContext)

  
    useEffect(() => {
      if (conversationId) {
          setMessages([]);
          socketRef.current = io("http://localhost:4000", {
              auth: { username: user },
          });

          const socket = socketRef.current;

          socket.emit("join_conversation", conversationId);

          socket.on("chat_message", ({ msg, username }) => {
              setMessages((prevMessages) => [...prevMessages, { msg, username }]);
          });

          socket.emit("fetch_messages", { conversationId });

          return () => {
              socket.disconnect();
          };
      }
  }, [conversationId, user]);

  const sendMessage = (message: string) => {
      if (conversationId) {
          const messageData = { conversationId, msg: message, username: user.username || "Anonymous" };
          socketRef.current?.emit("chat_message", messageData);
      }
  };
  

    return (
        <section>
            <Header/>
            {user ? 
                <div className="h-full flex flex-wrap lg:flex-nowrap justify-center items-start m-1 gap-1">
                    <Conversations setConversation={setConversationId}/>
                    <div className="w-full h-screen lg:h-[540px] flex flex-col border border-gray-300 rounded-lg relative">
                        <TopData user={selected}/>
                        <Chat messages={messages} currentUser={user.username} conversation={conversationId} />
                        <Input onSendMessage={sendMessage} />
                    </div>
                </div>
            :
                <div className="flex justify-center items-center p-20 m-20">
                    <h1 className="text-3xl font-bold">Login Required</h1>
                </div>
            }
        </section>
    )
}

export default ChatContainer