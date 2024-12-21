'use client'
import { useState } from "react";
import Header from "../components/header/page";

interface RegisterResponse {
    message?: string;
    result?: {
      _id: string;
      username: string;
    };
  }

const Register = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const [response, setResponse] = useState<RegisterResponse>()

    const handleSubmit = async () => {
        if(password === password2){
            fetch('http://localhost:4000/register', {
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
        }
        else{
            console.log('Contraseñas no coinciden')
        }
    };
    
    
    
    return(
        <section>
            <Header/>
            {response ? 
            <div className="flex justify-center items-center w-full">
                <div className="bg-green-600 p-10 m-10 w-full flex flex-col justify-center items-center rounded-lg">
                    <h1 className="text-white">Registro Exitoso</h1>
                    <p className="text-white">Volver a home, bienvenido {response.result?.username}</p>
                </div>
            </div>
            :
            <div className="w-full flex justify-center items-center">
                <div className="flex flex-col gap-10 justify-center items-center border 2px gray w-1/2 p-20 rounded-lg">
                    <h2 className="text-3xl">Registro de sesion</h2>
                    <div className="flex justify-between items-center w-full p-2">
                        <h5>Usuario: </h5>
                        <input onChange={(e)=>setUsername(e.target.value)} className="w-full border 1px gray rounded-full p-2"/>
                    </div>
                    <div className="flex justify-center items-center w-full p-2">
                        <h5>Contraseña: </h5>
                        <input onChange={(e)=>setPassword(e.target.value)} className="w-full border 1px gray rounded-full p-2"/>
                    </div>
                    <div className="flex justify-center items-center w-full p-2">
                        <h5>Repetir contraseña: </h5>
                        <input onChange={(e)=>setPassword2(e.target.value)} className="w-full border 1px gray rounded-full p-2"/>
                    </div>
                    <button className="btn btn-primary" onClick={() => handleSubmit()}>Registrarse</button>
                </div>
            </div>
            }
        </section>
    )
}

export default Register