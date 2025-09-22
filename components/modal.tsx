"use client"

import Image from "next/image";

export function Modal() {
  return (
    <div id="modal" className="w-screen overflow-x-scroll overflow-y-scroll h-screen bg-black fixed top-0 left-0 z-[1001] cursor-zoom-out opacity-0 pointer-events-none transition-[opacity] duration-500 flex justify-center items-center lg:py-0 py-20"
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
      <p className="fixed top-0 right-0 text-gray-300 text-3xl lg:mr-5 leading-[2rem] mr-2 font-bolder sans z-50 rotate-45"
      onClick={(e)=>{
          e.currentTarget.parentElement!.classList.replace("opacity-100","opacity-0") 
          e.currentTarget.parentElement!.classList.add("pointer-events-none") 
      }}>+</p>
      <Image
        src={"1234"}
        alt=""
        width={1440}
        height={1080}
        className={`object-contain lg:w-auto lg:min-w-0 min-w-[200vw] lg:h-full h-auto cursor-zoom-out`}
        loading="lazy"
        unoptimized={true}/>
  </div>
  )
}