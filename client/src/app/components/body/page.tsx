import AuthStatus from "../../utils/AuthStatus"
import Link from "next/link"

const Body = () => {
    const authstatus = AuthStatus()
    console.log(authstatus)

    return(
        <div>
            {
            authstatus?.user?.id ?
            <div>
                <h1>Hola {authstatus.user.username}</h1>
            </div>
            :
            <div>
                <h1>Registrate o inica sesion para poder continuar</h1>
                <Link href={'/login'}>Login</Link>
            </div> 
            }
        </div>
    )
}

export default Body