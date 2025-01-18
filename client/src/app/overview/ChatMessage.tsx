import { useContext } from "react"
import { UserContext } from "../context/userContext"

interface Props {
    content: {
        username: string,
        msg: string,
        created_at: string
    }
}

const ChatMessage = ({content}: Props) => {
    const {user} = useContext(UserContext)

    const hour = content.created_at ? content.created_at.slice(11, 16) : 'none';

    return(
        <div
          className={`flex ${
            content.username === user.username ? "justify-end ms-8" : "justify-start me-8"
          } mb-2`}
        >
            <div
            className={`p-2 min-h-10 rounded-lg relative flex flex-col
                ${content.username === user.username
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"}
                `}
            >
                {content.username === user.username ?
                <div className="w-0 h-0 absolute top-0 -right-2 border-r-[15px] border-t-[20px] border-r-transparent border-t-blue-500"></div>
                :
                <div className="w-0 h-0 absolute top-0 -left-2 border-l-[15px] border-t-[20px] border-l-transparent border-t-gray-200"></div>
                }
                <p className={`break-all ${content.username === user.username ? 'text-end' : 'text-start'}`}>{content.msg}</p>
                <small className={`text-xs w-full ${content.username === user.username ? 'text-gray-200 text-start' : 'text-[#383838] text-end'}`}>{hour}</small>
            </div>
        </div>
    )
}

export default ChatMessage