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
        <footer ref={footerRef} id="footer" className="z-40 fixed bottom-0 h-[0vh] overflow-hidden duration-500 text-xl w-screen justify-center text-justify flex w-full bg-gray-400 text-black transition transition-all">
            <div id="footImgDiv" className="fixed flex w-screen top-screen text-4xl justify-center items-center"

            >
            <button id="footerTab" className="fixed bottom-0 right-0 m-5 text-[1.5rem]" onClick={()=>{
                let footer = document.querySelector("#footer")
                footer?.classList.toggle("h-[0vh]")
                footer?.classList.toggle("h-[100vh]")
            }}>about</button>
                
            </div>
            <div className="sm:w-4/4 m-5 md:text-5xl text-2xl ">
                <PortableText value={info.info[0].bio[0]}/>
            </div>
        </footer>
    )
}