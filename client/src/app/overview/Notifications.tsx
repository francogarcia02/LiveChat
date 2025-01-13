import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import NotificationsList from './NotificartionsList';

interface Notification {
    sender: string
    receiver: string,
    id: string
}

interface Props {
    setIsReload: (isReload: boolean) => void,
    isReload: boolean
}

const Notifications = ({setIsReload, isReload}: Props) => {
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [openModal, setOpenModal] = useState<boolean>(false)
    const {user} = useContext(UserContext)

    const modalOpen = () => setOpenModal(true);
    const closeModal = () => {
        setOpenModal(false)
        setIsReload(!isReload)
    };

    useEffect(()=>{
        setIsReload(false)

        fetch('https://livechat-server-production-6654.up.railway.app/get-notifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ receiver: user.username }), 
        })
        .then(res => res.json())
        .then(data => {setNotifications(data.result)})
    },[user, isReload, setIsReload])

    return(
        <div className="relative">
            <button onClick={()=>modalOpen()}>
                <NotificationsIcon/>
            </button>
            {notifications.length > 0 ?
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
            :
            <></>
            }
            <NotificationsList isOpen={openModal} onClose={closeModal} notifications={notifications} setIsReload={setIsReload}/>
        </div>
    )
}

export default Notifications