'use client'
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";



export function SiteFooter(){
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    
    return (
        isSanityStudio? "" : 
        <footer className="snap-end snap-proximity w-full bg-bkg text-center transition transition-all"> 
            <button className="absolute top-[-10vh] text-black gerstner hover:underline font-light" onClick={()=>{
                let foot = document.querySelector("footer");
                foot?.scrollIntoView({
                    behavior: 'smooth'
                });
                // foot?.classList.add("top-[0vh]")
            }}>About</button>
            <p className="text-lg lg:text-3xl font-light py-20 sm:mx-40 mx-10 text-black">{siteConfig.description}</p>
        </footer>
    )
}