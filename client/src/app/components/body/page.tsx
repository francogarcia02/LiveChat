'use client'

import { useEffect, useState } from "react"
import AuthStatus from "../../utils/AuthStatus"
import Dashboard from "./DashBoard"

const Body = () => {
    const [user, setUser] = useState<string>('')
    const authstatus = AuthStatus()
    
    useEffect(()=>{
        if(authstatus?.user?.id){
            setUser(authstatus?.user?.id)
        }
    },[authstatus])
    
    return(
        <div className="h-full w-full">
            <Dashboard user={user}/>
        </div>
    )
}

export default Body