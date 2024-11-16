'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TestFilter } from "./test-filter";
import { openFilters } from "./functions";


type job ={
    company: string,
    years: string,
    title: string
}



export function SiteHeader(info:any){
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin'); 
    const e = 1

    return (
        isSanityStudio? "" : 
        <>
            <span className="flex justify-between items-center lg:px-5 outline outline-gray-300 px-2 w-[100dvw] mono-book"
            >
                <h1 className="flex duration-500 text-[1.35rem] sans" onClick={()=>{document.querySelector("#foot")?.scrollIntoView({behavior:"smooth", block: "start"})}}
                >Drew Litowitz&nbsp;
                    <p className="lg:inline-block hidden">{info.info[0].header}</p>
                </h1>
                <div className="flex justify-center items-center h-max">
                    <button className="filters text-4xl z-50 transition-all sans font-bolder" 
                    onClick={()=>{openFilters(e)}}
                    >
                   +
                    </button>
                </div>
            </span>
        </>
    )
}