'use client'
import { useEffect } from "react";
import { useUser } from "./useUserQuery";

const AuthStatus = () => {
    const { data, isLoading, error, refetch } = useUser();

    useEffect(() => {
        const interval = setInterval(() => {
        refetch(); 
        }, 1000 * 60 * 10); 

        return () => clearInterval(interval); 
    }, [refetch]);

    if(error) return {error: error.message}
    if(isLoading) return {isLoading: true}
    if(data) return {user: data}

}

export default AuthStatus