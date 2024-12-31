'use client'
import { useReducer } from 'react';
import { ReactNode } from "react";
import { UserContext } from './userContext';
import { userReducer } from './userReducer';

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

    const login = ( user: UserState ) => {
        dispatch({ type: 'setUser', payload: user })
    }


    return (
        <UserContext.Provider value={{
            user,
            login
        }}>
            { children }
        </UserContext.Provider>
    )
}