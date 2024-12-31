import { createContext } from "react";

interface User {
    id: string | undefined,
    username: string | undefined
}

export type UserContextProps = {
    user: User
    login: (user: User) => void
} 


export const UserContext = createContext<UserContextProps>({} as UserContextProps );