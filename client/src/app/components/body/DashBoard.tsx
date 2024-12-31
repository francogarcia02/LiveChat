import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type DashboardProps = {
  user?: string;
};

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [condition, setCondition] = useState<boolean>(false)

  useEffect(()=>{ 
    if(user){
      setCondition(true)
    }
  },[user])
  
  const renderContent = () => (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col justify-center items-start">
            <h1 className="text-4xl text-pink-500 sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">LinkUp</h1>
            <h1 className="sm:text-3xl md:text-xl lg:text-3xl font-bold mb-4">Connect with users from around the world!</h1>
            <p className="text-lg sm:text-base md:text-lg mb-6">Chat in real time and make new connections right now.</p>
        </div>
        <div>
        <Image
            src='/World.png'
            alt='World'
            width={400} 
            height={300} 
        />
        </div>
        
      </div>
      <div className="flex flex-col justify-center items-end">
        {condition ? (
            <Link href="/overview">
                <button className="bg-pink-500 hover:bg-pink-600 text-white text-lg py-2 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 mb-6">
                    Overview
                </button>
            </Link>
        ) : (
          <div className="flex justify-center items-center gap-4">
            <Link href="/login">
              <button className="bg-pink-500 hover:bg-pink-600 text-white text-lg py-2 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 mb-6">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-pink-500 hover:bg-pink-600 text-white text-lg py-2 px-8 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 mb-6">
                Sign Up
              </button>
            </Link>
          </div>
        )}
        <div className="flex justify-center items-center text-sm sm:text-xs text-white">
          <span>Connecting people from</span>
          <span className="ml-2 text-2xl">🌍</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col gap-20 w-full  text-white text-center py-10 px-6 pt-2 pb-0 rounded-lg shadow-lg">
      {renderContent()}
    </div>
  );
};

export default Dashboard;

