"use client"

import Image from "next/image";

export function Modal() {
  return (
    <div id="modal" className="w-screen h-screen bg-black fixed top-0 left-0 z-[1001] cursor-zoom-out opacity-0 pointer-events-none transition-[opacity] flex justify-center items-center"
    onClick={(e)=>{
      if(window.innerWidth>=1024){
       e.currentTarget.classList.replace("opacity-100","opacity-0") 
       e.currentTarget.classList.add("pointer-events-none") 
      }
    }}  
    onDoubleClick={(e)=>{
      if(window.innerWidth<1024){
        e.currentTarget.classList.replace("opacity-100","opacity-0") 
        e.currentTarget.classList.add("pointer-events-none") 
       }
    }}
    >
      <p className="fixed top-0 right-0 text-white text-3xl lg:mr-5 mr-2 font-bolder sans z-50"
      onClick={(e)=>{
          e.currentTarget.parentElement!.classList.replace("opacity-100","opacity-0") 
          e.currentTarget.parentElement!.classList.add("pointer-events-none") 
      }}>–</p>
      <Image
        src={"1234"}
        alt=""
        width={1440}
        height={1080}
        className={`object-contain w-auto h-full cursor-zoom-out`}
        loading="lazy"
        unoptimized={true}/>
  </div>
  )
}