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
    isSanityStudio? "" : <div id="filters" className={`z-40 fixed top-[-4.5rem] sm:top-[-4.5rem] sm:hover:top-[0rem] transition-all duration-500 text-gray-400 overflow-x-scroll h-fit w-screen justify-start flex bottom-0 text-lg`} key={'parent'}>
    {Object.entries(filters).map(([key, array])=>{
        return(
            <span key={key} className="flex items-center justify-center py-7 z-40 bg-black">
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
        <div className="fixed w-screen flex justify-center items-center z-0">
            <button id="buttonEl" className='fixed transition-all duration-500 top-[2rem] text-5xl opacity-100 sm:opacity-0' onClick={(event)=>{
                let header = document.querySelector("#filters");
                let button = document.querySelector("#buttonEl");
                header?.classList.toggle("top-[0rem]")
                header?.classList.toggle("top-[-4.5rem]")
                button?.classList.toggle("top-[2rem]")
                button?.classList.toggle("top-[6.5rem]")
            }}>↓</button>
        </div>
    </div>
    )

}