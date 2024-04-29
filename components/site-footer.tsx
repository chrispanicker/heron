'use client'

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { PortableText } from "@portabletext/react";



export function SiteFooter(info:any){
    const footerRef = useRef(null)
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    return (
        isSanityStudio? "" : 
        <footer ref={footerRef} id="footer" className="z-40 fixed bottom-0 h-[0rem] overflow-hidden duration-500 text-xl w-screen justify-center text-justify flex w-full bg-gray-400 text-black transition transition-all">
            <button id="footerButton" className='fixed bottom-[1rem] text-5xl opacity-100' onClick={()=>{
                let footer = document.querySelector("#footer");
                let button = document.querySelector("#footerButton");
                footer?.classList.toggle("h-[100vh]")
                button?.innerHTML=="↑"? button.innerHTML="↓": button!.innerHTML="↑"
            }}>↑</button>
            <div className="sm:w-4/4 mx-10 mt-10">
                <PortableText value={info.info[0].bio[0]}/>
            </div>
        </footer>
    )
}