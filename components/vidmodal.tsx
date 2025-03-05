"use client"

import { getFile } from "@sanity/asset-utils";
import Image from "next/image";

export function VideoModal() {
  return (
    <div id="vidmodal" className="w-screen h-screen bg-black fixed top-0 left-0 z-[1001] cursor-zoom-out opacity-0 pointer-events-none transition-[opacity] flex justify-center items-center"
    onDoubleClick={(e)=>{
       e.currentTarget.classList.replace("opacity-100","opacity-0") 
       e.currentTarget.classList.add("pointer-events-none") 
       e.currentTarget.firstElementChild?.classList.add("hidden")
    }}  >

        <video
          width="1440"
          height="1080"
          muted
          loop
          autoPlay
          webkit-playsinline="true"
          src={""}
          playsInline
          preload="true"
          className={`object-contain duration-500 h-[50vh] transition-opacity duration-1000 hidden`
          }
        >
          Your browser does not support the video tag.
        </video>
        <p className="fixed top-0 right-0 text-white text-3xl lg:mr-5 mr-2 font-bolder sans z-50"
        onClick={(e)=>{
            e.currentTarget.parentElement!.classList.replace("opacity-100","opacity-0") 
            e.currentTarget.parentElement!.classList.add("pointer-events-none") 
            e.currentTarget.parentElement!.firstElementChild?.classList.add("hidden")
        }}>–</p>
  </div>
  )
}