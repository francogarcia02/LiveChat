'use client'
import AuthStatus from "@/app/utils/AuthStatus"
import Link from "next/link"

const Navbar = () => {
    const authstatus = AuthStatus()

    const handleLogOut = () => {
        fetch('http://localhost:4000/logout',{
            method: 'POST',
            credentials:'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

    return(
        <div className="flex justify-between items-center with-full m-0 bg-[#383838]">
            <div className="p-4 ps-5 font-bold">
                <Link href='/'>LiveChat</Link>
            </div>
            <div className="me-5">
                {authstatus?.user?.id? 
                <form><button type="submit" className="btn" onClick={() => {handleLogOut()}}>LogOut</button></form>
                :
                <button type="submit" className="btn" ><Link href={'/login'}>Login</Link></button>
            }
            </div>
        </div>
    )
}

export default Navbar