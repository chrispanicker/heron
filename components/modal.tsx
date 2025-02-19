"use client"

import Image from "next/image";

export function Modal() {
  return (
    <div id="modal" className="w-screen h-screen bg-black fixed top-0 left-0 z-[1001] cursor-zoom-out opacity-0 pointer-events-none transition-[opacity] flex justify-center items-center"
    onClick={(e)=>{
       e.currentTarget.classList.replace("opacity-100","opacity-0") 
       e.currentTarget.classList.add("pointer-events-none") 
    }}  >
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