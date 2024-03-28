'use client'
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { usePathname } from "next/navigation";



export function SiteFooter(){
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    
    return (
        isSanityStudio? "" : 
        <footer className="text-xl w-screen justify-center text-justify relative flex w-full bg-black text-gray-400 transition transition-all">
        {/* <div className="m-10 sm:w-2/4 h-4/4 flex flex-col align-start items-start opacity-100 transition transition-all duration-1000 ease-in-out pointer-events-none">
          <p className="font-light vivaldii text-8xl pr-4 pt-5">Drew Litowitz</p>
          <p className="font-light pl-2">Art Director, Designer, Illustrator</p>
        </div> */}
        <div className="sm:w-4/4 mx-10">
            <p className="font-light py-10">{siteConfig.description}</p>
            {/* <a href="https://www.instagram.com/drewknowitz/?hl=en">@drewknowitz</a> */}
        </div>
    </footer>
    )
}