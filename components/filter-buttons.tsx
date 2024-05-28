"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {useCallback} from "react";


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
    isSanityStudio? "" 
    : <div id="filters" className={`z-40 fixed top-[0dvh] font-bold overflow-x-scroll w-screen justify-start flex text-[1.5rem]`} key={'parent'}>
        {Object.entries(filters).map(([key, array])=>{
            return(
                <span key={key} className="flex capitalize items-center justify-center">
                    <p className={`p-2 underline bg-gray-400`}>{`${key}:`}</p>
                    <div className="flex flex-row justify-center items-center">
                    {array.map((filter:any, idx:any)=>{
                        const filterArray = filter.split("");
                        filterArray[0] = filterArray[0].toUpperCase()
                        return (
                            <button 
                            style={{[`${key==="roles"? "--r": key==="collabs"? "--c": key==="tags"? "--t": ""}` as any]:idx+1}}
                            key={`${filter}${idx}`}
                            onClick={()=>{
                                searchParams.getAll(`${key}`).includes(filter)?
                                router.push(`/?${createQueryString(`${key}`, ``)}`, {scroll: false})
                                : router.push( `/?${createQueryString(`${key}`, `${filter}`)}`, {scroll: false})
                            }}
                            className={`w-fit  whitespace-nowrap hover:bg-white text-[1.5rem] p-2
                            ${searchParams.get(key)?.includes(filter)?"bg-white":"bg-gray-400" }`
                            }>
                                {idx<filterArray.length? `${filterArray.join("")}`:`${filterArray.join("")}`}
                            </button>
                        )
                    })}
                    </div>
                </span>
            )
        })}
    </div>)
}