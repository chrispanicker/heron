'use client'
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { usePathname } from "next/navigation";



export function SiteFooter(){
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    
    return (
        isSanityStudio? "" : 
        <footer className="relative w-full bg-bkg transition transition-all">
        <div className="w-screen h-2/4 z-30 flex flex-col justify-center items-center opacity-100 transition transition-all duration-1000 ease-in-out pointer-events-none">
            <Image className=""  src={require('../src/Drew-1.gif')} alt="loading..." />
            <p className="text-8xl text-lighter">Art Director, Designer, Illustrator</p>
        </div>

            {/* <button className="absolute top-[-10vh] text-black gerstner hover:underline font-light" onClick={()=>{
                let foot = document.querySelector("footer");
                foot?.scrollIntoView({
                    behavior: 'smooth'
                });
                // foot?.classList.add("top-[0vh]")
            }}></button> */}
            <p className="text-lg lg:text-3xl font-light py-20 sm:mx-40 mx-10 text-black">{siteConfig.description}</p>
        </footer>
    )
}