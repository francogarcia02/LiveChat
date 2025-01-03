'use client'
import { useState } from "react";
import Header from "../components/header/page";
import Check from "../components/Check";

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
                <Check title={'Register'} name={response.result?.username}/>
            :
            <div className="w-full h-full flex justify-center items-center mb-5">
                <div className="w-full lg:w-1/2 flex flex-col gap-10 justify-center items-center bg-[#383838] p-20 pt-10 pb-10  m-5 rounded-lg">
                    <h2 className="text-3xl">Sing Up</h2>
                    <div className="flex flex-wrap justify-between items-center w-full p-2">
                        <h5>Username: </h5>
                        <input onChange={(e)=>setUsername(e.target.value)} className="w-full border 1px gray rounded-full p-2 text-black"/>
                    </div>
                    <div className="flex flex-wrap justify-between items-center w-full p-2">
                        <h5>Password: </h5>
                        <input onChange={(e)=>setPassword(e.target.value)} className="w-full border 1px gray rounded-full p-2 text-black"/>
                    </div>
                    <div className="flex flex-wrap justify-between items-center w-full p-2">
                        <h5>Repeat password: </h5>
                        <input onChange={(e)=>setPassword2(e.target.value)} className="w-full border 1px gray rounded-full p-2 text-black"/>
                    </div>
                    <button className="btn btn-primary" onClick={() => handleSubmit()}>Register</button>
                </div>
            </div>
            }
        </section>
    )
}

export default Register