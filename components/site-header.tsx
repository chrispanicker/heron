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


// console.log(allprojects)
    return (
        isSanityStudio? "" : 
        <>
            <span className="flex justify-between items-center lg:px-5 px-2 mono-book"
            onClick={openFilters}>
            <h1 className="flex duration-500 lg:text-sm text-lg mr-40 whitespace-nowrap uppercase">Drew Litowitz<p className="lg:block hidden">is a graphic designer and art director based in NYC.</p></h1>
            <button className="text-2xl z-50 transition-all serif" 
            >+</button>
            </span>
        </>
    )
}