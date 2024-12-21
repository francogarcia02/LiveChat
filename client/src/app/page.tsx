'use client'
import Header from "./components/header/page";
import Body from "./components/body/page";

export default function Home() {
  
  return (
    <section>
      <div className="w-full h-full">
        <Header/>
        <Body/>
      </div>
    </section>
  );
}
