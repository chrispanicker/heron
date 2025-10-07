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
        <section className={`lg:block bg-gray-300 hidden pt-2 pb-2 overflow-hidden px-4 transition-all max-h-0 border border-b-2 border-black`}>
          <button 
            onClick={()=>{router.push( `/?`, {scroll: false})}}
            className={`${buttonClass} text-gray-300 bg-black outline-black hover:bg-gray-300 hover:text-black outline-1 outline`}
          >
            {`CLEAR ALL`}
          </button>

          <span className={`text-black sans px-1 mr-1`}>
              {`Types:`}
          </span>
          {allFilters.map((entry:any, idx:any)=>{
            if(entry.key==="type"){
              return (
                <button 
                  id={`${entry.filter}`}
                  key={`${entry.filter}${idx}`}
                  onClick={()=>{router.push( `/?${createQueryString(`${entry.key}`, `${entry.filter}`)}`, {scroll: false})}}
                  className={`outline-1 outline-black px-2 ${buttonClass} ${searchParams.getAll(entry.key)?.includes(entry.filter)? "text-gray-300 bg-black":"bg-gray-300 text-black hover:bg-black hover:text-gray-300 outline"}`}>{`${entry.filter}`}
                </button>
              )
            }
          })}

          <span className={`text-black sans px-1 mr-1`}>
          {`Tags:`}
          </span>
          {allFilters.map((entry:any, idx:any)=>{
            if(entry.key==="tags"){
              return (
                <button 
                  id={`${entry.filter}`}
                  key={`${entry.filter}${idx}`}
                  onClick={()=>{router.push( `/?${createQueryString(`${entry.key}`, `${entry.filter}`)}`, {scroll: false})}}
                  className={`outline-1 outline-black px-2 rounded-xl ${buttonClass} ${searchParams.getAll(entry.key)?.includes(entry.filter)? "text-gray-300 bg-black":"bg-gray-300 text-black hover:bg-black hover:text-gray-300 outline"}`}>{`${entry.filter}`}
                </button>
              )
            }
          })}
        </section>
    )
}