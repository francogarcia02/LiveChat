import { io, Socket } from "socket.io-client";
import AuthStatus from "@/app/utils/AuthStatus";
import { useState, useEffect, useRef } from "react";

const Chat = () => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<{ msg: string; username: string }[]>([]);
    const [serverOffset, setServerOffset] = useState<number>(0); // Estado para serverOffset
    const socketRef = useRef<Socket | null>(null); // Referencia para el socket

    const data = AuthStatus();
    const user = data?.user?.username;
    console.log(serverOffset)
    useEffect(() => {
        // Crear el socket solo una vez
        socketRef.current = io('http://localhost:4000', {
            auth: {
                username: user
            }
        });
        
        const socket = socketRef.current;

        socket.on('chat message', (msg: string, offset: number, username: string) => {
            setMessages(prevMessages => [...prevMessages, { msg, username }]);
            setServerOffset(offset); // Actualiza el estado de serverOffset
        });

        return () => {
            socket.disconnect(); // Limpieza de la conexión al desmontar
        };
    }, [user]); // Solo se ejecuta cuando `user` cambia

    const handleSubmit = async () => {
        if (!message) return console.log('mensaje vacío');

        const messageData = {
            msg: message,
            username: user || 'Anonymous'
        };

        socketRef.current?.emit('chat message', messageData); // Usa la referencia del socket
        setMessage(''); // Limpiar el campo de entrada después de enviar
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="sm:w-full lg:w-1/3 h-96 flex flex-col border border-gray-300 rounded-lg">
                <div className="w-full flex flex-col overflow-y-auto flex-grow">
                    {messages.map((elem, index) => (
                        <div 
                            key={index} 
                            className={`w-full flex ${elem.username === user ? 'justify-end' : 'justify-start'} mb-2`}
                        >
                            <div className={`p-2 rounded-lg ${elem.username === user ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                <p>{elem.msg}</p>
                                <small className={`${elem.username === user ? 'text-gray-300' : 'text-gray-700'}`}>{elem.username}</small>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex w-full mt-4 p-4">
                    <input 
                        className="w-full p-2 text-black rounded-lg" 
                        type="text" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                    />
                    <button 
                        className="ml-2 p-2 bg-blue-500 text-white rounded-lg" 
                        onClick={handleSubmit}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
