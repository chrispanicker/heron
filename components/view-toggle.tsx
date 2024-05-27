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
        <div className="fixed text-[1.5rem] left-0 bottom-0 m-5 z-40 flex">
            <button 
            className={` ${view==="txt"? "text-black":"text-gray-400"}`}
            onClick={()=>{
                searchParams.getAll(`view`).includes("txt")? "" : router.push( `/?${createQueryString(`view`, `txt`)}`, {scroll: false})
            }}>txt</button>
            <p className="">
            &nbsp;/&nbsp;
            </p>
            <button
            className={`${view==="img"? "text-black":"text-gray-400"}`} 
            onClick={()=>{
                searchParams.getAll(`view`).includes("img")? "" : router.push( `/?${createQueryString(`view`, `img`)}`, {scroll: false})
            }}>all</button>
        </div>
    )
}