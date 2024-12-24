import AuthStatus from "../../utils/AuthStatus"
import Dashboard from "./DashBoard"

const Body = () => {
    const authstatus = AuthStatus()
    return(
        <div className="h-full w-full">
            <Dashboard user={authstatus?.user?.id}/>
        </div>
    )
}

export default Body