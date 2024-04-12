'use client'
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { useRef } from "react";



export function SiteFooter(){
    const footerRef = useRef(null)
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    
    return (
        isSanityStudio? "" : 
        <footer ref={footerRef} id="footer" className="fixed bottom-0 h-[0rem] sm:h-[2rem] lg:hover:h-[14rem] md:hover:h-[20rem] sm:hover:h-[24rem] overflow-hidden duration-500 text-xl w-screen justify-center text-justify flex w-full bg-gray-400 text-black transition transition-all">
            <button className='fixed bottom-[1rem] text-5xl opacity-100 sm:opacity-0' onClick={()=>{
                let footer = document.querySelector("#footer");
                footer?.classList.toggle("h-[100vh]")
            }}>↑</button>
            <div className="sm:w-4/4 mx-10">
                <p className="py-10">{siteConfig.description}</p>
            </div>
        </footer>
    )
}