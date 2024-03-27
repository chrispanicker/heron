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
    isSanityStudio? "" : <div id="filters" className={`bg-black text-white overflow-x-scroll lg:h-auto lg:pt-32 lg:justify-center lg:items-start p-10 flex lg:flex-col lg:justify-center lg:items-center bottom-0 z-10 text-lg`} key={'parent'}>
    {Object.entries(filters).map(([key, array])=>{
        return(
            <span key={key} className="gerstner py-3 flex items-center justify-center flex-col lg:flex-row">
                <p className="p-2 text-lg underline lg:no-underline capitalize">{`${key}:`}</p>
                <div className="flex flex-col justify-center items-center lg:flex-row">
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
                            className={`w-fit transition transition-all whitespace-nowrap text-xl font-light my-2 lg:mx-1 lg:my-0 border-2 border-white rounded-full px-6 py-2 outline-2 lg:hover:underline ${searchParams.get(key)?.includes(item)? " text-4xl bg-white text-black" : ""}`}>
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