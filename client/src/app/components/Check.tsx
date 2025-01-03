'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Check: React.FC<{ title: string; name: string | undefined }> = ({ title, name }) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/'); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="bg-green-600 p-10 m-10 w-full flex flex-col justify-center items-center rounded-lg">
        <h1 className="text-white">{title} Successfull</h1>
        <p className="text-white">Welcome {name}</p>
      </div>
    </div>
  );
};

export default Check;
