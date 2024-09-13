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
            <span className="flex justify-between items-center lg:bg-black lg:text-gray-300 px-2 outline-[.5px] outline-gray-300 outline">
            <h1 className="flex duration-500 transition-[font-size] mr-40 whitespace-nowrap">Drew Litowitz&nbsp;<p className="lg:block hidden">is a graphic designer and art director based in NYC.</p></h1>
            <button className="text-2xl z-50 transition-all " 
            onClick={()=>{
                let hed = document.querySelector("header")
                let plus = document.querySelector("header span button")
                if(hed?.classList.contains("max-h-[2em]")){
                    hed?.classList.replace("max-h-[2em]","lg:max-h-[6rem]")
                    hed?.classList.add("max-h-[100dvh]")
                    plus?.classList.add("rotate-[45deg]")
                }else{
                    hed?.classList.replace("lg:max-h-[6rem]","max-h-[2em]")
                    hed?.classList.remove("max-h-[100dvh]")
                    plus?.classList.remove("rotate-[45deg]")
                }
            }}>+</button>
            </span>
        </>
    )
}