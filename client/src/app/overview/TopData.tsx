import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useContext } from "react"
import { UserContext } from "../context/userContext"

interface TopDataProps {
    user: string | undefined
}

const TopData = ({user}: TopDataProps) => {
    const {isMobile, setSelected} = useContext(UserContext)

    return(
        <div>
            {user ?
            <div className="flex justify-start items-center gap-4 p-4 bg-[#484848]">
                {isMobile ? 
                    <button onClick={()=>setSelected('')}>
                        <ArrowBackIcon/>
                    </button>
                :
                <></>
                }
                
                <h1 className='p-1 font-bold'>{user}</h1>
            </div>
            :
                <></>
            }
        </div>
    )
}

export default TopData