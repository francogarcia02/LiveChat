'use client'

import { useState } from "react"

interface Props {
    username: string | undefined,
    setConversation: (id: string) => void,
    conversation: {
        id:string,
        username1: string,
        username2: string
    }
}

const Conversation = ({conversation, username, setConversation}: Props) => {
    const [selected, setSelected] = useState<boolean>(false)

    return(
        <div className={`w-full p-2 rounded-lg ${selected ? 'bg-blue-500' : 'bg-blue-800'}`} onClick={()=>{
            setSelected(true)
            setConversation(conversation.id)
            }}>
            <h1 className="font-bold">{ conversation.username1 === username ?
            conversation.username2
            :
            conversation.username1
            }</h1>
        </div>
    )
}

export default Conversation