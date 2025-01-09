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
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex flex-col justify-center items-center sm:items-start text-start">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl text-pink-500 font-bold mb-4">
            LinkUp
          </h1>
          <h2 className="text-lg sm:text-xl lg:text-3xl font-bold mb-4">
            Connect with users from around the world!
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6">
            Chat in real time and make new connections right now.
          </p>
        </div>
        <div className="w-full sm:w-auto flex justify-center items-center">
          <Image src="/World.png" alt="World" width={350} height={250} className="w-full max-w-xs sm:max-w-md lg:max-w-lg" />
        </div>
      </div>
  
      <div className="flex flex-col items-center sm:items-end gap-4 mt-6">
        {condition ? (
          <Link href="/overview">
            <button className="bg-pink-500 hover:bg-pink-600 text-white text-base sm:text-lg py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500">
              Overview
            </button>
          </Link>
        ) : (
          <div className="flex justify-center items-center gap-4">
            <Link href="/login">
              <button className="bg-pink-500 hover:bg-pink-600 text-white text-base sm:text-lg py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-pink-500 hover:bg-pink-600 text-white text-base sm:text-lg py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500">
                Sign Up
              </button>
            </Link>
          </div>
        )}
        <div className="flex justify-center items-center text-xs sm:text-sm text-white gap-2">
          <span>Connecting people from</span>
          <span className="text-2xl">🌍</span>
        </div>
      </div>
    </>
  );
  
  return (
    <div className="flex flex-col gap-8 text-white text-center p-6 sm:px-8">
      {renderContent()}
    </div>
  );
};

export default Dashboard;

