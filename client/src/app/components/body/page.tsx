import AuthStatus from "../../utils/AuthStatus"
import Link from "next/link"

const Body = () => {
    const authstatus = AuthStatus()
    console.log(authstatus)

    return(
        <div className="h-full w-full">
            {
            authstatus?.user?.id ?
            <div>
                <h1>Hola {authstatus.user.username}</h1>
            </div>
            :
            <div className="flex flex-col justify-center items-center w-full gap-15">
                <h1>Registrate o inica sesion para poder continuar</h1>
                <div className="flex w-full justify-center items-center gap-20 p-10">
                    <div className="flex flex-col justify-center items-center p-10 border 1px rounded-lg">
                        <p>Login</p>
                        <button><Link href={'/login'}>Go</Link></button>
                    </div>
                    <div className="flex flex-col justify-center items-center p-10 border 1px rounded-lg">
                        <p>Register</p>
                        <button><Link href={'/register'}>Go</Link></button>
                    </div>
                </div>
            </div> 
            }
        </div>
    )
}

export default Body