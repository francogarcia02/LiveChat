'use client'
import Header from "@/app/components/header/page"
import { useState } from "react"
import Check from "../components/Check"
import { useContext } from "react";
import { UserContext } from "../context/userContext";

interface LoginResponse {
    message?: string;
    result?: {
      _id: string;
      username: string;
    },
    error: string | undefined
  }

const Login = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [response, setResponse] = useState<LoginResponse>()
    const [error, setError] = useState<string>('')

    const {login} = useContext(UserContext)

    const handleSubmit = async () => {
        fetch('https://livechat-server-production-6654.up.railway.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ username, password }), 
            credentials: 'include',
        })
        .then(response => response.json())
        .then(data=>{
            setResponse(data)

            if(data.error){
                setError(data.error)
            } else {
                login(data.user)
            }
        })
    };
    
    
    
    return(
        <section>
            <Header/>
            {response && !response.error ? 
                <Check title={'Login'} name={response.result?.username}/>
            :
            <div className="w-full flex justify-center items-center">
                <div className="w-full lg:w-1/2 flex flex-col gap-10 justify-center items-center bg-[#383838] p-20 pt-10 pb-10 m-5 rounded-lg">
                    <h2 className="text-3xl">Login</h2>
                    {error ? 
                    <div className="w-full">
                        <h1 className="font-bold text-red-500">{error}</h1>
                    </div>
                    :
                    <></>
                    }
                    <div className="flex flex-wrap justify-between items-center w-full p-2">
                        <h5>Username: </h5>
                        <input onChange={(e)=>setUsername(e.target.value)} className="w-full border 1px gray rounded-full p-2 text-black bg-white"/>
                    </div>
                    <div className="flex flex-wrap justify-between items-center w-full p-2">
                        <h5>Password: </h5>
                        <input onChange={(e)=>setPassword(e.target.value)} className="w-full border 1px gray rounded-full p-2 text-black bg-white"/>
                    </div>
                    <button className="btn btn-primary font-bold text-lg" onClick={() => handleSubmit()}>Submit</button>
                </div>
            </div>
            }
        </section>
    )
}

export default Login