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
            <span className="flex justify-between items-center lg:px-5 px-2 mono-book"
            >
                <h1 className="flex duration-500 lg:text-sm text-lg mr-40 whitespace-nowrap sans">Drew Litowitz&nbsp;<p className="lg:block hidden">is a Graphic Designer and Art Director based in NYC.</p></h1>
                <div className="flex">
                    <button className="filters text-2xl z-50 transition-all sans" 
                    onClick={()=>{openFilters(e)}}
                    >+</button>
                </div>
            </span>
        </>
    )
}