'use client'
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";



export function SiteFooter(){
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    
    return (
        isSanityStudio? "" : 
        <footer className="fixed bottom-0 h-[2rem] lg:hover:h-[14rem] md:hover:h-[20rem] sm:hover:h-[24rem] hover:h-[30rem] overflow-hidden duration-500 text-xl w-screen justify-center text-justify flex w-full bg-gray-400 text-black transition transition-all">
            <div className="sm:w-4/4 mx-10">
                <p className="font-light py-10">{siteConfig.description}</p>
            </div>
        </footer>
    )
}