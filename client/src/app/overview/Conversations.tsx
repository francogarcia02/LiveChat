import GetConversations from "../utils/GetConversations"
import AuthStatus from "../utils/AuthStatus"
import { useEffect, useState } from "react";
import Conversation from "./Conversation";

interface Conversation {
    id: string;
    username1: string;
    username2: string;
}

interface Props {
    setConversation: (id: string) => void;
}

const Conversations = ({setConversation}: Props) => {
    const authstatus = AuthStatus()
    const username = authstatus?.user?.username

    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchConversations = async () => {
            try {
                if(username){
                    const data = await GetConversations(username);
                    setConversations(data.result);  // Guarda las conversaciones en el estado
                    setLoading(false); 
                }
                 // Cambia el estado a no cargando
            } catch (error) {
                console.log(error)
                setError('Error fetching conversatiooons');
                setLoading(false);
            }
        };

        fetchConversations();
    }, [username]); // El efecto solo se ejecuta cuando el username cambia

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return(
        <div className="flex flex-col justify-start w-1/3 h-full bg-gray-800 pt-2 pb-20 ps-5 pe-5 rounded-lg">
            Conversationssss
            <div className="mt-5 m-b5 flex flex-col gap-2">
                {conversations &&
                conversations.map(conv => (
                    <Conversation key={conv.id} conversation={conv} setConversation={setConversation} username={username}/>
                ))
                }
            </div>
        </div>
    )
}

export default Conversations