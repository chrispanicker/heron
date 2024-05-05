'use client'

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";



export function SiteFooter(info:any){
    const footerRef = useRef(null)
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    return (
        isSanityStudio? "" : 
        <footer ref={footerRef} id="footer" className="z-40 fixed bottom-0 h-[0rem] overflow-hidden duration-500 text-xl w-screen justify-center text-justify flex w-full bg-gray-400 text-black transition transition-all">
            <div id="footImgDiv" className="fixed flex w-screen top-screen translate-y-[-2.5rem] justify-center items-center">
                <Image id="footIcon" className="w-10 cursor-pointer" src={require('../public/Up.svg')} alt="loading..." 
                onClick={()=>{
                    let footer = document.querySelector("#footer")
                    let image = document.querySelector("#footIcon")
                    let footImgDiv = document.querySelector("#footImgDiv")
                    footer?.classList.toggle("h-[0rem]")
                    footer?.classList.toggle("h-[calc(100dvh)]")
                    footImgDiv?.classList.toggle("translate-y-[-2.5rem]")
                    image?.classList.toggle("rotate-180")
                }}
                priority />
                {/* <button id="footIcon" className="text-lg my-2 cursor-pointer" 
                onClick={()=>{
                    let footer = document.querySelector("#footer")
                    let image = document.querySelector("#footIcon")
                    footer?.classList.toggle("h-[0rem]")
                    footer?.classList.toggle("h-[100vh]")
                    image?.classList.toggle("rotate-180")
                }}
                >Drew Litowitz</button> */}
            </div>
            <div className="sm:w-4/4 mx-10 mt-20">
                <PortableText value={info.info[0].bio[0]}/>
            </div>
        </footer>
    )
}