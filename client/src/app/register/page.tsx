'use client'
import { useRef, useState } from "react";
import Header from "../components/header/page";
import Check from "../components/Check";
import ReCAPTCHA from 'react-google-recaptcha';
import ErrorWindows from "../components/ErrorsWindows";

interface RegisterResponse {
    message?: string;
    result?: {
      _id: string;
      username: string;
    };
    error: string | null,
  }

const Register = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [password2, setPassword2] = useState<string>('')
    const [response, setResponse] = useState<RegisterResponse>()
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [captchaValue, setCaptchaValue] = useState<string | null>('')
    const [error, setError] = useState<string | string[]>('')

    const handleSubmit = async () => {
        if (password === password2) {
            if (!captchaValue) {
                alert("Por favor verifica el reCAPTCHA.");
                return;
            }

            fetch('https://livechat-server-production-6654.up.railway.app/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ username, password, recaptcha: captchaValue }), 
                credentials: 'include',
            })
            .then(response => response.json())
            .then(data => {
                setResponse(data);
                console.log(data)
                if(data.error){
                    setError(data.error)
                }
            })
        } else {
            setError('Las contraseñas no coinciden');
        }
    };
    
    const handleChange = (token: string | null) => {
        setCaptchaValue(token)
      };
    
      function handleExpired() {
        setCaptchaValue(null);
      }
    
    return(
        <section>
            <Header/>
            {response && !response.error ? 
                <Check title={'Register'} name={response.result?.username}/>
            :
            <div className="w-full h-full flex justify-center items-center mb-5">
                <div className="w-full lg:w-1/2 flex flex-col gap-10 justify-center items-center bg-[#383838] p-20 pt-10 pb-10  m-5 rounded-lg">
                    <h2 className="text-3xl">Sing Up</h2>
                    {error ?
                    <ErrorWindows errors={error} setError={setError}/>
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
                    <div className="flex flex-wrap justify-between items-center w-full p-2">
                        <h5>Repeat password: </h5>
                        <input onChange={(e)=>setPassword2(e.target.value)} className="w-full border 1px gray rounded-full p-2 text-black bg-white"/>
                    </div>
                    <ReCAPTCHA
                        sitekey={"6Leb_bEqAAAAAEB8aU3IaYTt1a_iZ8SSmNNHYBi7"}
                        ref={recaptchaRef}
                        onChange={handleChange}
                        onExpired={handleExpired}
                    />
                    <button className="btn btn-primary" onClick={() => handleSubmit()}>Register</button>
                </div>
            </div>
            }
        </section>
    )
}

export default Register