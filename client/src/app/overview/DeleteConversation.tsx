import React, { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from "react";
import { UserContext } from "../context/userContext";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setIsReload: (isReload: boolean) => void;
  username1: string | undefined;
  username2: string | undefined;
};

interface Data {
    Error: string,
    message: string
}

const DeleteConversation: React.FC<ModalProps> = ({ isOpen, onClose, username1, username2, setIsReload }) => {
    const [data, setData] = useState<Data>()
    const {setSelected} = useContext(UserContext)

    if (!isOpen) return null;

    const handdleDelete = () =>{
        fetch('http://localhost:4000/delete-conversation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ username1: username1, username2: username2 }), 
        })
        .then(res => res.json())
        .then(data => {
            setData(data)
            if(!data.Error){
                setIsReload(true)
                setSelected('')
            }
        })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {data ? 
            <div>
                {data.Error ?
                <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative z-10">
                    <h1 className="text-black font-bold">{data.Error}</h1>
                </div>
                :
                <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative z-10">
                    <h1 className="text-black font-bold">{data.message}</h1>
                </div>
                }
            </div>
            :
            <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 max-w-md relative z-10">
                <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={onClose}
                >
                    <CloseIcon/>
                </button>
                <h2 className="text-xl font-bold text-black mb-2">Press confirm to delete the conversation.</h2>
                <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={()=> handdleDelete()}
                >
                Remove Conversation
                </button>
            </div>
            }


            <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
            ></div>
        </div>
    );
};

export default DeleteConversation;