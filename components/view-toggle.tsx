'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function ViewToggle(){
    const router = useRouter();
    const pathname = usePathname(); 
    const searchParams = useSearchParams();    
    const roles = searchParams.get('roles')
    const view = searchParams.get('view');
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        }, [searchParams]
    )  
    const isSanityStudio = pathname.startsWith('/admin');
    return(
        isSanityStudio? "":
        <div className="fixed bg-white text-[1.5rem] lg:text-2xl left-0 bottom-0 m-5 z-40 flex cursor-pointer text-gray-400">
            <button 
            className={`px-2 ${view==="txt"? "hidden":""}`}
            onClick={()=>{
                router.push(`/?view=txt${roles? `&roles=${roles}`: ""}`, {scroll: false})
                // searchParams.getAll(`view`).includes("txt")? "" : router.push( `/?${createQueryString(`view`, `txt`)}`, {scroll: false})
            }}>Collapse All</button>

            <button
            className={`px-2 ${view==="all"? "hidden":""}`} 
            onClick={()=>{
                router.push(`/?view=all${roles? `&roles=${roles}`: ""}`, {scroll: false})
                // searchParams.getAll(`view`).includes("all")? "" : router.push( `/?${createQueryString(`view`, `all`)}`, {scroll: false})
            }}>Expand All</button>
        </div>
    )
}