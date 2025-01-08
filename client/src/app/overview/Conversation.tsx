'use client'

import { useEffect, useState } from "react"
import DeleteConversation from "./DeleteConversation"
import { useContext } from "react"
import { UserContext } from "../context/userContext"

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
    const {selected, setSelected} = useContext(UserContext)
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

    const handleSelected = () => {
        if(selected === convUser){
            setSelected('')
        } else{
            setSelected(convUser)
        }
        setConversation(conversation.id)
    }

    return(
        <div className={`w-full p-2 ${selected === convUser ? 'bg-[#4c4c4c]' : 'bg-[#5f5f5f]'} hover:bg-[#4c4c4c]`} onClick={()=>{
            handleSelected()
        }}>
            <div className="flex justify-between items-center">
                <h1 className="font-bold">{convUser}</h1>
                <button
                className="font-bold"
                onClick={(e) => {
                    e.stopPropagation(); 
                    setSelected('')
                    openModal();
                }}
                >
                Delete
                </button>
            </div>
            

            <DeleteConversation isOpen={isModalOpen} setIsReload={setIsReload} onClose={closeModal} username1={username} username2={convUser} />
        </div>
    )
}

export default Conversation