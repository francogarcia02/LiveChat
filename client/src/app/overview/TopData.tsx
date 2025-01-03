interface TopDataProps {
    user: string | undefined
}

const TopData = ({user}: TopDataProps) => {
    return(
        <div>
            {user ?
                <div className="flex justify-start items-center border-b border-gray-300 p-4 bg-[#383838] rounded-t-lg">
                    <h1>{user}</h1>
                </div>
            :
                <></>
            }
        </div>
    )
}

export default TopData