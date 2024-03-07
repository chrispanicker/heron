'use client'
import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function SiteHeader(){
    const searchParams = useSearchParams();    
    const selectedProject = searchParams.get('project');
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    console.log(searchParams)
    
    return (
        isSanityStudio? "" : <header className={`lg:bg-gradient-to-b from-white from-30% to-transparent pointer-events-none vivaldii text-4xl z-10 p-12 lg:p-10 flex items-center justify-center fixed w-full ${selectedProject? "hidden lg:block": "block"}`}> 
            <Link href="/" scroll={false} onClick={()=>{document.querySelector('main').style.backgroundColor = ''}} className="group flex justify-center items-center">
                <span className="pointer-events-auto text-[3rem] hidden lg:block lg:text-[3.4rem] opacity-100 group-hover:opacity-0 group-hover:text-[4.4rem] transition transition-all duration-200">{siteConfig.name}</span>
                <Image className="pointer-events-auto pl-[.4rem] w-auto h-[3rem] lg:h-[3.9rem] absolute opacity-100 lg:opacity-0 transition transition-all group-hover:opacity-100 group-hover:h-20 duration-200"  src={require('../src/Drew-1.gif')} alt="loading..." />
            </Link>
        </header> 
        
    )
}