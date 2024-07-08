'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function ViewToggle(){
    const router = useRouter();
    const pathname = usePathname(); 
    const searchParams = useSearchParams();    
    const roles = searchParams.get('roles')
    const view = searchParams.get('view');
    const about = searchParams.get('about');
    const blurClass = 'backdrop-blur-sm backdrop-brightness-[.7]'
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
        <div className={`fixed decoration-dotted lg:text-2xl text-lg left-0 bottom-0 m-5 z-40 flex cursor-pointer transition-all ${about==="open"? `blur-xl`: `${blurClass}`}`}>
            <button 
            className={`px-2 hover:bg-white hover:text-gray-400 ${view==="txt"? "hidden":""}`}
            onClick={()=>{
                router.push(`/?view=txt${roles? `&roles=${roles}`: ""}`, {scroll: false})
                // searchParams.getAll(`view`).includes("txt")? "" : router.push( `/?${createQueryString(`view`, `txt`)}`, {scroll: false})
            }}>View: Image</button>

            <button
            className={`px-2 hover:bg-white hover:text-gray-400 ${view==="all"? "hidden":""}`} 
            onClick={()=>{
                router.push(`/?view=all${roles? `&roles=${roles}`: ""}`, {scroll: false})
                // searchParams.getAll(`view`).includes("all")? "" : router.push( `/?${createQueryString(`view`, `all`)}`, {scroll: false})
            }}>View: Text</button>
        </div>
    )
}