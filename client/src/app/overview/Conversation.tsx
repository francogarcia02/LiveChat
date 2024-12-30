'use client'

import { useEffect, useState } from "react"
import DeleteConversation from "./DeleteConversation"

interface Props {
    username: string | undefined,
    setConversation: (id: string) => void,
    setIsReload: (isReload: boolean) => void,
    conversation: {
        id:string,
        username1: string,
        username2: string
    }
}

const Conversation = ({conversation, username, setConversation, setIsReload}: Props) => {
    const [selected, setSelected] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [convUser, setConvUser] = useState<string>()

    useEffect(()=>{
        if(conversation.username1 === username){
            setConvUser(conversation.username2)
        }
        else{
            setConvUser(conversation.username1)
        }
    
    },[username, conversation])

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return(
        <div className={`w-full p-2 rounded-lg ${selected ? 'bg-blue-500' : 'bg-blue-800'}`} onClick={()=>{
            setSelected(true)
            setConversation(conversation.id)
        }}>
            <div className="flex justify-between items-center">
                <h1 className="font-bold">{conversation.username2}</h1>
                <button className="font-bold" onClick={()=>openModal()}>Delete</button>
            </div>
            

            <DeleteConversation isOpen={isModalOpen} setIsReload={setIsReload} onClose={closeModal} username1={username} username2={convUser} />
        </div>
    )
}

export default Conversation