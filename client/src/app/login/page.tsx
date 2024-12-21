'use client'
import Header from "@/app/components/header/page"
import { useState } from "react"

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
        })
    };
    
    
    
    return(
        <section>
            <Header/>
            {response ? 
            <div className="flex justify-center items-center w-full">
                <div className="bg-green-600 p-10 m-10 w-full flex flex-col justify-center items-center rounded-lg">
                    <h1 className="text-white">Login Exitoso</h1>
                    <p className="text-white">Volver a home, bienvenido {response.result?.username}</p>
                </div>
            </div>
            :
            <div className="w-full flex justify-center items-center">
                <div className="flex flex-col gap-10 justify-center items-center border 2px gray w-1/2 p-20 rounded-lg">
                    <h2 className="text-3xl">Inicio de sesion</h2>
                    <div className="flex justify-between items-center w-full p-2">
                        <h5>Usuario: </h5>
                        <input onChange={(e)=>setUsername(e.target.value)} className="w-full border 1px gray rounded-full p-2"/>
                    </div>
                    <div className="flex justify-center items-center w-full p-2">
                        <h5>Contraseña: </h5>
                        <input onChange={(e)=>setPassword(e.target.value)} className="w-full border 1px gray rounded-full p-2"/>
                    </div>
                    <button className="btn btn-primary" onClick={() => handleSubmit()}>Iniciar Sesion</button>
                </div>
            </div>
            }
        </section>
    )
}

export default Login