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

    const [keyBoard, setKeyboard] = useState<boolean>(false);

    const login = ( user: UserState ) => {
        dispatch({ type: 'setUser', payload: user })
    }

    useEffect(()=>{
        fetch('https://livechat-server-production-6654.up.railway.app/getData',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.success){
                dispatch({
                    type: 'setUser',
                    payload: data.user,
                });
            } 
        })
    },[])


    return (
        <UserContext.Provider value={{
            user,
            login,
            selected,
            setSelected,
            isMobile,
            setIsMobile,
            keyBoard,
            setKeyboard
        }}>
            { children }
        </UserContext.Provider>
    )
}