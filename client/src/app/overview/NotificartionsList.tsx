import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface Notification {
    receiver: string,
    sender: string,
    id: string
}

interface Props {
    isOpen: boolean,
    onClose: () => void,
    notifications: Notification[]
    setIsReload: (isReload: boolean) => void,
}

interface Data {
    Error: string,
    message: string,
    user: string
}

const NotificationsList = ({isOpen, onClose, notifications, setIsReload}: Props) => {
    const [data, setData] = useState<Data | undefined>()
    
    if (!isOpen) return null; 

    const handdleAcept = (username1:string, username2:string, id:string) => {
        fetch('https://livechat-server-production-6654.up.railway.app/create-conversation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ username1: username1, username2: username2, idNot: id }), 
        })
        .then(res => res.json())
        .then(data => {
            setData({...data, user: username1})
            if(!data.Error){
                setIsReload(true)
            }
            if(data.Error === 'SQLITE_CONSTRAINT'){
                setData({
                    Error: 'Conversation just exists',
                    message: '',
                    user: ''
                })
            }
        })
    }

    const handdleDecline = (id:string) => {
        fetch('https://livechat-server-production-6654.up.railway.app/reject-notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ id: id }), 
        })
        .then(res => res.json())
        .then(data => {
            if(!data.Error){
                setIsReload(true)
            }
        })
    }

    const handleClose = () => {
        setData(undefined)
        onClose()
    }

    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            
            <div className="w-full lg:w-1/2 bg-white text-black rounded-lg z-10 p-5">
                <h1 className="font-bold text-xl pb-4">Notifications:</h1>
                {data ?
                <div>
                    {data.Error ? 
                    <h1 className='font-bold text-red-500'>{data.Error}</h1>
                    :
                    <div className='flex justify-start items-center gap-2'>
                        <h1 className='font-bold'>Go talk to</h1>
                        <h1 className='font-bold text-blue-600'>{data.user}</h1>
                    </div>
                    }
                </div>
                :
                <></>
                }
                <div className="flex flex-col">
                    {notifications && notifications.map(noti => (
                        <div key={noti.sender} className="flex justify-between items-center p-2">
                            <div className='flex justify-start items-center gap-2'>
                                <h1 className='font-bold text-blue-600'>{noti.sender}</h1>
                                <h1>Want to talk with you</h1>
                            </div>
                            <div className='flex justify-center items-center gap-2'>
                                <button className='hover:text-green-400' onClick={()=>{handdleAcept(noti.sender, noti.receiver, noti.id)}}>
                                    <CheckIcon/>
                                </button>
                                <button className='hover:text-red-400' onClick={()=> handdleDecline(noti.id)}>
                                    <CloseIcon/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={()=>handleClose()}
            ></div>
        </div>
    )
}

export default NotificationsList