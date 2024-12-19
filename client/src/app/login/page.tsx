'use client'
import Header from "@/app/components/header/page"
import { useState } from "react"

/*interface LoginResponse {
    message?: string;
    result?: {
      _id: string;
      username: string;
    };
  }
*/
const Login = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ username, password }), 
            });
    
            if (response.ok) {
                // Si la respuesta es exitosa
                const data = await response.json();
                console.log('Login exitoso', data);
                // Hacer algo con el token o los datos de la respuesta
            } else {
                const errorData = await response.json();
                console.error('Error al hacer login:', errorData.message);
            }
        } catch (error) {
            console.error('Error al realizar el fetch', error);
        }
    };
    
    
    
    return(
        <section>
            <Header/>
            <div className="w-full flex justify-center items-center">
                <div className="flex flex-col gap-10 justify-center items-center border 2px gray w-1/2 p-20 rounded-lg">
                    <h2 className="text-3xl">Inicio de sesion</h2>
                    <div className="flex justify-between align-center w-full p-2">
                        <h5>Usuario: </h5>
                        <input onChange={(e)=>setUsername(e.target.value)} className="w-full border 1px gray rounded-full p-2"/>
                    </div>
                    <div className="flex justify-center align-center w-full p-2">
                        <h5>Contraseña: </h5>
                        <input onChange={(e)=>setPassword(e.target.value)} className="w-full border 1px gray rounded-full p-2"/>
                    </div>
                    <button className="btn btn-primary" onClick={() => handleSubmit()}>Iniciar Sesion</button>
                </div>
            </div>
        </section>
    )
}

export default Login