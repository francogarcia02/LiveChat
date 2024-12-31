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
    };
  }

const Login = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [response, setResponse] = useState<LoginResponse>()

    const {login} = useContext(UserContext)

    const handleSubmit = async () => {
        fetch('http://localhost:4000/login', {
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
            login(data.user)
            console.log(data)
        })
    };
    
    
    
    return(
        <section>
            <Header/>
            {response ? 
                <Check title={'Login'} name={response.result?.username}/>
            :
            <div className="w-full flex justify-center items-center">
                <div className="flex flex-col gap-10 justify-center items-center border 2px gray w-1/2 p-20 rounded-lg">
                    <h2 className="text-3xl">Inicio de sesion</h2>
                    <div className="flex flex-wrap justify-between items-center w-full p-2">
                        <h5>Usuario: </h5>
                        <input onChange={(e)=>setUsername(e.target.value)} className="w-full border 1px gray rounded-full p-2 text-black"/>
                    </div>
                    <div className="flex flex-wrap justify-between items-center w-full p-2">
                        <h5>Contraseña: </h5>
                        <input onChange={(e)=>setPassword(e.target.value)} className="w-full border 1px gray rounded-full p-2 text-black"/>
                    </div>
                    <button className="btn btn-primary" onClick={() => handleSubmit()}>Iniciar Sesion</button>
                </div>
            </div>
            }
        </section>
    )
}

export default Login