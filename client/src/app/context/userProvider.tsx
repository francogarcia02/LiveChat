'use client'
import { useReducer, useState } from 'react';
import { ReactNode } from "react";
import { UserContext } from './userContext';
import { userReducer } from './userReducer';
import { useEffect } from 'react';


interface UserState {
    id: string | undefined,
    username: string | undefined
}



const INITIAL_STATE: UserState = {
    id: '',
    username: ''
}



interface props {
    children: ReactNode
}

export const UserProvider = ({ children }: props ) => {

    const [ user, dispatch] = useReducer( userReducer, INITIAL_STATE );

    const [selected, setSelected] = useState<string | undefined>(undefined);
    
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const login = ( user: UserState ) => {
        dispatch({ type: 'setUser', payload: user })
    }

    useEffect(()=>{
        fetch('https://livechat-server-production-6654.up.railway.app/getData',{
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            const modifiedData = {
                id: data.id,
                username: data.username
            }
            dispatch({
                type: 'setUser',
                payload: modifiedData,
            });
            console.log(INITIAL_STATE)
        })
    },[])


    return (
        <UserContext.Provider value={{
            user,
            login,
            selected,
            setSelected,
            isMobile,
            setIsMobile
        }}>
            { children }
        </UserContext.Provider>
    )
}