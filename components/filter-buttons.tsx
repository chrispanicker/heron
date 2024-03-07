"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


export function FilterButtons(filters:object){
    const searchParams = useSearchParams();   
    const selectedProject = searchParams.get('project');
    const router = useRouter();

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
          return params.toString()
        },
        [searchParams]
      )

    return(
    <div id="filters" className="h-screen lg:h-auto lg:pt-32 p-10 snap-start bg-bkg font-thin w-screen flex justify-center items-center flex-col bottom-0 z-10 text-lg sm:text-3xl" key={'parent'}>
    
    {Object.entries(filters).map(([key, array])=>{
        return(
            <span key={key} className="gerstner p-2 flex items-center justify-center flex-col lg:flex-row">
                <p className="hover:bg-bkg capitalize">{`${key}:`}</p>
                <div className="flex flex-col lg:flex-row">
                {array.map((item:string, itemIdx)=>{
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
                        className={`font-thin lg:hover:underline p-1 ${searchParams.get(key)?.includes(item)? "underline" : ""}`}>
                            {itemIdx<itemArray.length? `${itemArray.join("")},`: `${itemArray.join("")}`}
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