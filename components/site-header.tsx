'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TestFilter } from "./test-filter";


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
            <span className="flex justify-between items-center lg:bg-black lg:text-gray-300 px-2 outline-1 outline-gray-300 outline">
            <h1 className="flex duration-500 transition-[font-size] mr-40 whitespace-nowrap">Drew Litowitz&nbsp;<p className="lg:block hidden">is a graphic designer and art director based in NYC.</p></h1>
            <button className="text-2xl z-50" 
            onClick={()=>{
                let hed = document.querySelector("header")
                if(hed?.classList.contains("max-h-[2em]")){
                    hed?.classList.replace("max-h-[2em]","lg:max-h-[10rem]")
                    hed?.classList.add("max-h-[100dvh]")
                }else{
                    hed?.classList.replace("lg:max-h-[10rem]","max-h-[2em]")
                    hed?.classList.remove("max-h-[100dvh]")
                }
            }}>+</button>
            </span>
        </>
    )
}