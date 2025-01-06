'use client'

import { useEffect, useState } from "react"
import Dashboard from "./DashBoard"
import { useContext } from 'react';
import { UserContext } from "@/app/context/userContext";

const Body = () => {
    const {user, setSelected} = useContext(UserContext)
    const [userr, setUser] = useState<string | undefined>('')
    
    useEffect(()=>{
        setSelected('')
    },[setSelected])

    useEffect(()=>{
        if(user.id !== ''){
            setUser(user.username)
        }
    },[user])
    
    return(
        <div className="h-full w-full">
            <Dashboard user={userr}/>
        </div>
    )
}

export default Body