'use client'
import Header from "./components/header/page";
import Confirmation from "./components/body/page";

export default function Home() {
  
  return (
    <div className="w-full">
      <Header/>
      <Confirmation/>
    </div>
  );
}
