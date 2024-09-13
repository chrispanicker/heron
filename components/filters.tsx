"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { buttonClass } from "./classes";

interface Props{
    filters:any
    projects:any
}


export function Filters({filters, projects}: Props){
    const searchParams = useSearchParams();    
    const selectedProject = searchParams.get("project");
    const router = useRouter();
    
    const createQueryString = useCallback(
        (name: string, value: string) => {
            let params;
            
            let stringSearchParams = searchParams.toString()
            stringSearchParams = stringSearchParams.replaceAll("+", " ")
            params = new URLSearchParams(stringSearchParams)


            stringSearchParams.includes(`${name}=${value}`)?
            params.delete(name, value):params.append(name, value)
            return params.toString()

            
        },
        [searchParams]
    )

    let allFilters:any = []

    Object.entries(filters).map(([key, array]:any)=>{
        {array.map((filter:any, idx:any)=>{
            allFilters[allFilters.length]={filter: filter, key: key}
        })}
    })



    return(
        <section className={`px-6 pb-2 lg:block hidden`}>
            {/* <p className="text-sm">Filters:&nbsp;</p> */}
            {allFilters.map((entry:any, idx:any)=>{
                return (
                    <button 
                    id={`${entry.filter}`}
                    // style={{[`${entry.key==="roles"? "--r": entry.key==="collabs"? "--c": entry.key==="tags"? "--t": ""}` as any]:idx+1}}
                    key={`${entry.filter}${idx}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`${entry.key}`, `${entry.filter}`)}`, {scroll: false})
                    }}
                    className={`cursor-pointer ${buttonClass} ${searchParams.getAll(entry.key)?.includes(entry.filter)? "hover:underline":"bg-gray-300 text-black hover:bg-black hover:text-gray-300"}`
                    }>
                        {`${entry.filter}`}
                    </button>
                )
            })}
        </section>
    )
}