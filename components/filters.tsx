"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { buttonClass } from "./classes";

interface Props{
    filters:any
    projects:any
}


export function Filters({filters}: Props){
    const searchParams = useSearchParams();    
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
        <section className={`lg:block bg-gray-300 hidden pt-2 overflow-hidden px-4 transition-all h-0 border border-b-2 border-black`}>
            <p className="text-[1.2rem] leading-[1.8rem] text-black">Filter by Tags:&nbsp;</p>
            {allFilters.map((entry:any, idx:any)=>{
                return (
                    <button 
                    id={`${entry.filter}`}
                    key={`${entry.filter}${idx}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`${entry.key}`, `${entry.filter}`)}`, {scroll: false})
                    }}
                    className={`hover:underline outline-1 outline-black px-2 ${buttonClass} ${searchParams.getAll(entry.key)?.includes(entry.filter)? "text-black bg-gray-300":"bg-zinc-500 text-zinc-300 hover:bg-gray-300 hover:text-black hover:outline"}`
                    }>
                        {`${entry.filter}`}
                    </button>
                )
            })}
        </section>
    )
}