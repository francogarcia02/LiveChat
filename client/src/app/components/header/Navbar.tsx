'use client'
import Link from "next/link"
import { useContext } from "react"
import { UserContext } from "@/app/context/userContext"

const Navbar = () => {
    const {user} = useContext(UserContext)

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
        <div className="flex justify-between items-center with-full m-0 bg-[#484848]">
            <div className="p-4 ps-5 font-bold">
                <Link href='/'>LiveChat</Link>
            </div>
            <div className="me-5">
                {user && user.username ?
                <form><button type="submit" className="font-bold hover:text-pink-500 transition duration-150" onClick={() => {handleLogOut()}}>LogOut</button></form>
                :
                <div className="flex gap-2 justify-center items-center">
                    <Link href={'/login'}><button type="submit" className="font-bold hover:text-pink-500 transition duration-150" >Login</button></Link>
                    <Link href={'/register'}><button type="submit" className="font-bold hover:text-pink-500 transition duration-150" >Sing Up</button></Link>
                </div>
            }
            </div>
        </div>
    )
}

export default Navbar