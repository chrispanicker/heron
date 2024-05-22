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
        <div className="fixed left-0 bottom-0 m-5 z-50 flex">
            <button 
            className={`text-[1rem] ${view==="txt"? "text-black":"text-gray-400"}`}
            onClick={()=>{
                searchParams.getAll(`view`).includes("txt")? "" : router.push( `/?${createQueryString(`view`, `txt`)}`, {scroll: false})
            }}>&#9443;</button>
            <p className="text-3xl">
            &nbsp;/&nbsp;
            </p>
            <button
            className={`text-[1.5rem] ${view==="img"? "text-black":"text-gray-400"}`} 
            onClick={()=>{
                searchParams.getAll(`view`).includes("img")? "" : router.push( `/?${createQueryString(`view`, `img`)}`, {scroll: false})
            }}>&#6821;</button>
        </div>
    )
}