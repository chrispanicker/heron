'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function ViewToggle(){
    const router = useRouter();
    const searchParams = useSearchParams();    
    const view = searchParams.get('view');
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        }, [searchParams]
    )  

    return(
        <div className="fixed bg-white text-[1.5rem] lg:text-4xl left-0 bottom-0 m-5 z-40 flex cursor-pointer">
            <button 
            className={`px-2 ${view==="txt"? "bg-gray-400 outline outline-1 outline-black":"hover:outline hover:outline-1 hover:outline-black"}`}
            onClick={()=>{
                searchParams.getAll(`view`).includes("txt")? "" : router.push( `/?${createQueryString(`view`, `txt`)}`, {scroll: false})
            }}>txt</button>
            {/* <p className="">
            &nbsp;/&nbsp;
            </p> */}
            <button
            className={`px-2 ${view==="all"? "bg-gray-400 outline outline-1 outline-black":"hover:outline hover:outline-1 hover:outline-black"}`} 
            onClick={()=>{
                searchParams.getAll(`view`).includes("all")? "" : router.push( `/?${createQueryString(`view`, `all`)}`, {scroll: false})
            }}>all</button>
        </div>
    )
}