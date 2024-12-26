'use client'

import Chat from "./Chat"
import Input from "./Input";
import Header from "../components/header/page"
import { io, Socket } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import AuthStatus from "@/app/utils/AuthStatus";

const ChatContainer = () => {
    const [messages, setMessages] = useState<{ msg: string; username: string }[]>([]);
    const [serverOffset, setServerOffset] = useState<number>(0);
    const socketRef = useRef<Socket | null>(null);
    
    console.log(serverOffset)

    const data = AuthStatus();
    const user = data?.user?.username;
  
    useEffect(() => {
      socketRef.current = io("http://localhost:4000", {
        auth: { username: user },
      });
  
      const socket = socketRef.current;
  
      socket.on("chat message", (msg: string, offset: number, username: string) => {
        setMessages((prevMessages) => [...prevMessages, { msg, username }]);
        setServerOffset(offset);
      });
  
      return () => {
        socket.disconnect();
      };
    }, [user]);
  
    const sendMessage = (message: string) => {
      const messageData = { msg: message, username: user || "Anonymous" };
      socketRef.current?.emit("chat message", messageData);
    };
  

    return (
        <section>
            <Header/>
            <div className="h-full flex flex-col justify-between items-center m-1">
                <div className="sm:w-full lg:w-1/3 h-screen flex flex-col border border-gray-300 rounded-lg relative">
                    <Chat messages={messages} currentUser={user} />
                    <Input onSendMessage={sendMessage} />
                </div>
            </div>
        </section>
    )
}

export default ChatContainer