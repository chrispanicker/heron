'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function ViewToggle(){
    const router = useRouter();
    const pathname = usePathname(); 
    const searchParams = useSearchParams();   
    const project = searchParams.get('project') 
    const roles = searchParams.get('roles')
    const view = searchParams.get('view');
    const about = searchParams.get('about');
    const blurClass = 'backdrop-blur-sm backdrop-brightness-[.7]'
    // const hoverClass = "outline outline-1 outline-black"
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
        <div className={`fixed flex decoration-dotted text-lg left-0 bottom-0 lg:mx-40 mb-5 mx-5 z-30 cursor-pointer transition-all ${about==="open"? "blur-xl": project? `blur-xl`: `${blurClass}`}`}>
            <button
            className={`px-1 text-[1rem] leading-[1.4rem] py-0 w-fit whitespace-nowrap hover:bg-white hover:text-black {hoverClass} ${view==="full"? "bg-white text-black hidden" : "block lg:hidden"}`} 
            onClick={()=>{
                router.push(`/?view=full`, {scroll: false})
                document.querySelectorAll(".bg-black")?.forEach((element)=>{
                    element.classList.remove("bg-black")
                })
                // searchParams.getAll(`view`).includes("all")? "" : router.push( `/?${createQueryString(`view`, `all`)}`, {scroll: false})
            }}>Full</button>

            <button 
            className={`px-1 text-[1rem] leading-[1.4rem] py-0 w-fit whitespace-nowrap hover:bg-white hover:text-black {hoverClass} ${view==="grid"? "bg-white text-black hidden lg:block" : "block"}`}
            onClick={()=>{
                router.push(`/?view=grid`, {scroll: false})
                document.querySelectorAll(".bg-black")?.forEach((element)=>{
                    element.classList.remove("bg-black")
                })
                // searchParams.getAll(`view`).includes("txt")? "" : router.push( `/?${createQueryString(`view`, `txt`)}`, {scroll: false})
            }}>Grid</button>
            <button
            className={`px-1 text-[1rem] leading-[1.4rem] py-0 w-fit whitespace-nowrap hover:bg-white hover:text-black {hoverClass} ${view==="list"? "bg-white text-black hidden lg:block" : "block"}`} 
            onClick={()=>{
                router.push(`/?view=list`, {scroll: false})
                document.querySelectorAll(".bg-black")?.forEach((element)=>{
                    element.classList.remove("bg-black")
                })
                // searchParams.getAll(`view`).includes("all")? "" : router.push( `/?${createQueryString(`view`, `all`)}`, {scroll: false})
            }}>List</button>
        </div>
    )
}