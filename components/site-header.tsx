'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TestFilter } from "./test-filter";
import { openFilters } from "./functions";


type job ={
    company: string,
    years: string,
    title: string
}



export function SiteHeader(){
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin'); 
    const e = 1


// console.log(allprojects)
    return (
        isSanityStudio? "" : 
        <>
            <span className="flex justify-between items-center lg:px-2 px-2 mono-book py-1 mx-1"
            >
                <h1 className="flex duration-500 lg:text-2xl text-lg mr-40 whitespace-nowrap sans" onClick={()=>{document.querySelector("#foot")?.scrollIntoView({behavior:"smooth"})}}
                >Drew Litowitz&nbsp;<p className="lg:block hidden">is a Graphic Designer and Art Director based in NYC.</p></h1>
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