import AuthStatus from "../../utils/AuthStatus"
import Link from "next/link"
import Chat from "./Chat"

const Body = () => {
    const authstatus = AuthStatus()
    return(
        <div className="h-full w-full">
            {
            authstatus?.user?.id ?
            <div>
                <Chat/>
            </div>
            :
            <div className="flex flex-col justify-center items-center w-full gap-15">
                <h1>Registrate o inica sesion para poder continuar</h1>
                <div className="flex w-full justify-center items-center gap-20 p-10">
                    <div className="flex flex-col justify-center items-center p-10 ps-24 pe-24 border 1px rounded-lg gap-10">
                        <p className="text-3xl font-bold">Login</p>
                        <button className="border 1px p-2 rounded-lg hover:border-blue-500"><Link className="font-bold" href={'/login'}>Go</Link></button>
                    </div>
                    <div className="flex flex-col justify-center items-center p-10 ps-24 pe-24 border 1px rounded-lg gap-10">
                        <p className="text-3xl font-bold">Register</p>
                        <button className="border 1px p-2 rounded-lg hover:border-blue-500"><Link className="font-bold" href={'/register'}>Go</Link></button>
                    </div>
                </div>
            </div> 
            }
        </div>
    )
}

export default Body