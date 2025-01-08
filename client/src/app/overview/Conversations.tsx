import GetConversations from "../utils/GetConversations"
import { useEffect, useState } from "react";
import Conversation from "./Conversation";
import AddConversation from "./AddConversation";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import AddCommentIcon from '@mui/icons-material/AddComment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import Notifications from "./Notifications";


interface Conversation {
    id: string;
    username1: string;
    username2: string;
}

interface Props {
    setConversation: (id: string) => void;
}

const Conversations = ({setConversation}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReload, setIsReload] = useState<boolean>(false)

    const {user} = useContext(UserContext)

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        setIsReload(false)
        const fetchConversations = async () => {
            try {
                if(user.username){
                    const data = await GetConversations(user.username);
                    setConversations(data.result);  
                    setLoading(false); 
                }
                 
            } catch (error) {
                console.log(error)
                setError('Error fetching conversatiooons');
                setLoading(false);
            }
        };

        fetchConversations();
    }, [user, isReload]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return(
        <div className="shadow-2xl flex flex-col justify-start w-full lg:w-1/3 h-full lg:h-screen bg-[#383838]">
            <div className="flex justify-between items-center p-4">
                <div className="flex justify-start items-center gap-2">
                    <Link href={'/'}>
                        <ArrowBackIcon/>
                    </Link>
                    <h1 className="font-bold text-2xl">Chats</h1>
                </div>
                <div className="flex gap-2 justify-center items-center">
                    <button onClick={()=>openModal()}>
                        <AddCommentIcon/>
                    </button>
                    <Notifications setIsReload={setIsReload} isReload={isReload}/>
                </div>
            </div>
            <div className="m-b5 flex justify-start items-start flex-col overflow-y-auto flex-grow">
                {conversations &&
                conversations.map(conv => (
                    <Conversation key={conv.id} setIsReload={setIsReload} conversation={conv} setConversation={setConversation} username={user.username}/>
                ))
                }
            </div>
            <AddConversation isOpen={isModalOpen} setIsReload={setIsReload} onClose={closeModal} username={user.username} />
        </div>
    )
}

export default Conversations