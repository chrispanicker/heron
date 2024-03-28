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
    
    return (
        isSanityStudio? "" : <header className={`z-40 pointer-events-none vivaldii text-4xl p-12 lg:p-10 flex items-center justify-center fixed w-full ${selectedProject? "hidden lg:block": "block"}`}> 
            <Link href="/" scroll={false} onClick={()=>{document.querySelector('main')!.style.backgroundColor = ''}} className="group flex justify-center items-center">
                {/* <span className="pointer-events-auto text-[3rem] hidden lg:block lg:text-[3.4rem] opacity-0 group-hover:opacity-100 group-hover:text-[4.4rem] transition transition-all duration-200">{siteConfig.name}</span>
                <Image className="pointer-events-auto pl-[.4rem] w-auto h-[3rem] lg:h-[3.9rem] absolute opacity-100 lg:opacity-100 transition transition-all group-hover:opacity-0 group-hover:h-20 duration-200"  src={require('../src/Drew-1.gif')} alt="loading..." /> */}
            </Link>
        </header>         
    )
}