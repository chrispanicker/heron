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
    : <div id="filters" className={`z-40 fixed top-[0dvh] overflow-x-scroll w-screen justify-center items-center flex lg:text-[1.3rem] text-lg`} key={'parent'}>
        {Object.entries(filters).map(([key, array])=>{
            return(
                <span key={key} className="flex capitalize items-center justify-center">
                    {/* <p className={`px-[.2rem]`}>{`${key}`}</p> */}
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
                            className={`w-fit whitespace-nowrap px-2 text-gray-400 text-2xl ${key!="roles"? "hidden":""}
                            ${searchParams.get(key)?.includes(filter)? "bg-white hover:bg-gray-400 hover:text-white":"bg-gray-400 text-white hover:bg-white hover:text-gray-400" }`
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