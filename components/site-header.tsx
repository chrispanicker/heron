'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { openFilters } from "./functions";
import { useCallback } from "react";
import { textSize } from "./classes";


type job ={
    company: string,
    years: string,
    title: string
}



export function SiteHeader(info:any){
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin'); 
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const selectedProject = searchParams.get("project")
    const e = 1
    const createQueryString = useCallback(
        (name: string, value: string) => {
            let params;
            let stringSearchParams = searchParams.toString()
            stringSearchParams = stringSearchParams.replaceAll("+", " ")
            stringSearchParams = stringSearchParams.replaceAll("%2C", ",")
            params = new URLSearchParams(stringSearchParams)

        
            if(name==="project"){
                if(stringSearchParams.includes(`${name}=${value}`)){ 
                    params.delete(name, value)
                }else{params.set(name, value)}
            //not a project?? IE tags?
            }else {
                if(name==="roles"||name==="tags"||name==="collabs"||name==="type" && selectedProject){
                    params.delete("project", selectedProject!)
                    window.scrollTo(scrollX, 0)
                }

                if(stringSearchParams.includes(`${name}=${value}`)){
                    params.delete(name, value)
                }else{params.append(name, value)}
            }
                
            return params.toString()

        },
        [searchParams]
    )
    return (
        isSanityStudio? "" : 
        <>
            <span className="flex justify-between items-center lg:px-5 outline outline-gray-300 px-2 w-[100dvw] mono-book"
            >
                <h1 className={`flex duration-500 leading-[.6rem] uppercase mono-book ${textSize}`}
                onClick={()=>{
                  if(window.innerWidth<1024){
                    window.scrollTo({top:0, left:0, behavior:"instant"})
                    window.location.href= "./"
                  }

                  if(window.scrollY+window.innerHeight === document.body.scrollHeight){
                    window.scrollTo({top:0, left:0, behavior:"smooth"})
                  }else{
                    document.querySelector("#foot")?.scrollIntoView({behavior:"smooth", block: "start"})
                  }

              
                  router.push("?"+createQueryString("project", `${selectedProject}`), {scroll:false})
                }}>Drew Litowitz&nbsp;
                    <p className="lg:inline-block hidden">{info.info[0].header}</p>
                </h1>
                <div className="flex justify-center items-center h-max group" onClick={()=>{openFilters(e)}}>
                    <p className={`lg:block hidden uppercase pr-1 group-hover:underline ${textSize}`}>Filters</p>
                    <button className="filters text-2xl z-50 transition-all group-hover:rotate-[15deg] sans font-bolder" 
                    >
                   +
                    </button>
                </div>
            </span>
        </>
    )
}