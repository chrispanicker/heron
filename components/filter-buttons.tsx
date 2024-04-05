"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


export function FilterButtons(filters:object){
    const searchParams = useSearchParams();   
    const router = useRouter();
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
          return params.toString()
        },
        [searchParams]
      )

    return(
    isSanityStudio? "" : <div id="filters" className={`fixed top-[-7vh] hover:top-[0vh] transition-all duration-500 p-10 bg-black text-gray-400 overflow-x-scroll h-fit w-screen justify-start flex bottom-0 z-10 text-lg`} key={'parent'}>
    {Object.entries(filters).map(([key, array])=>{
        return(
            <span key={key} className="gerstner flex items-center justify-center">
                <p className="mx-2 text-lg underline lg:no-underline capitalize">{`${key}:`}</p>
                <div className="flex flex-row justify-center items-center">
                {array.map((item:string, itemIdx:any)=>{
                    let itemArray = Array.from(item);
                    itemArray[0]=itemArray[0].toUpperCase();
                    itemArray.map((letter, idx)=>{
                        letter===" "? itemArray[idx+1] = itemArray[idx+1].toUpperCase() : ""
                    })
                    return (

                            <button 
                            key={`${item}${itemIdx}`}
                            onClick={()=>{
                                searchParams.getAll(`${key}`).includes(item)? router.push(`/?${createQueryString(`${key}`, ``)}`, {scroll: false})
                                : router.push( `/?${createQueryString(`${key}`, `${item}`)}`, {scroll: false})
                            }}
                            className={`w-fit transition transition-all whitespace-nowrap text-xl font-light p-1 ml-1 lg:hover:underline ${searchParams.get(key)?.includes(item)? "text-4xl bg-black text-gray-400" : "bg-gray-400 text-black"}`}>
                                {itemIdx<itemArray.length? `${itemArray.join("")}`: `${itemArray.join("")}`}
                            </button>

                    )
                    
                })}
                </div>
            </span>
        )
    })}
    </div>
    )

}