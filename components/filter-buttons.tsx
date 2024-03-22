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
    isSanityStudio? "" : <div id="filters" className={`overflow-x-scroll lg:h-auto lg:pt-32 lg:justify-center lg:items-start p-10 bg-bkg flex justify-center items-center flex-col bottom-0 z-10 text-lg sm:text-1xl`} key={'parent'}>
    
    {Object.entries(filters).map(([key, array])=>{
        return(
            <span key={key} className="gerstner py-3 flex items-center justify-center flex-col lg:flex-row">
                <p className="lg:text-3xl lg:p-0 p-2 text-3xl underline lg:no-underline hover:bg-bkg capitalize">{`${key}: `}</p>
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
                            className={`w-fit transition transition-all whitespace-nowrap text-3xl font-light my-2 lg:mx-1 lg:my-0 border-2 border-black rounded-full px-6 py-2 outline-2 lg:hover:underline ${searchParams.get(key)?.includes(item)? " text-4xl bg-black text-white" : ""}`}>
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