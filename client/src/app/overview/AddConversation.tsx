import React, { useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  setIsReload: (isReload: boolean) => void,
  username: string | undefined;
};

interface Data {
    Error: string,
    message: string
}

const AddConversation: React.FC<ModalProps> = ({ isOpen, onClose, username, setIsReload }) => {
    const [username2, setUsername2] = useState<string>('')
    const [data, setData] = useState<Data>()

    if (!isOpen) return null;

    const handdleAdd = () =>{
        fetch('http://localhost:4000/create-conversation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ username1: username, username2: username2 }), 
        })
        .then(res => res.json())
        .then(data => {
            setData(data)
            if(!data.Error){
                setIsReload(true)
            }
        })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {data ? 
            <div>
                {data.Error ?
                <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 max-w-md relative z-10">
                    <h1 className="text-black">{data.Error}</h1>
                </div>
                :
                <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 max-w-md relative z-10">
                    <h1 className="text-black">{data.message}</h1>
                </div>
                }
            </div>
            :
            <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 max-w-md relative z-10">
                <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={onClose}
                >
                &times;
                </button>
                <h2 className="text-xl font-bold text-black mb-2">Add a conversation</h2>
                <div className="flex flex-wrap justify-start items-center mt-4 mb-2 gap-2">
                    <p className="text-black">Username: </p>
                    <input type="text" onChange={(e)=> setUsername2(e.target.value)} className="p-2 rounded-lg w-full border text-black" placeholder="Insert Username"/>
                </div> 
                <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={()=> handdleAdd()}
                >
                Add Conversation
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

export default AddConversation;