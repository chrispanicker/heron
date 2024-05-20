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
    : <div id="filters" className={`z-40 fixed top-[0dvh] font-bold transition-all duration-500 text-gray-400 overflow-x-scroll w-screen justify-start flex text-lg`} key={'parent'}>
        {Object.entries(filters).map(([key, array])=>{
            return(
                <span key={key} className="flex items-center justify-center">
                    {/* <p className={`text-lg underline px-3 lg:no-underline capitalize ${key==="roles"?"text-gray-400":key==="collabs"?"text-gray-400":key==="tags"?"text-gray-400":""}`}>{`${key}:`}</p> */}
                    <div className="flex flex-row justify-center items-center">
                    {array.map((filter:any, idx:any)=>{
                        const filterArray = filter.split("");
                        filterArray[0] = filterArray[0].toUpperCase()
                        // filterArray.map((letter:any, letterIdx:any)=>{
                        //     letter === " "?  filterArray[idx+1] = filterArray[idx+1].toUpperCase() : ""
                        // })
                        // filterArray[0]=filterArray[0].toUpperCase();
                        // filterArray.map((letter, idx)=>{
                        //     letter===" "? filterArray[idx+1] = filterArray[idx+1].toUpperCase() : ""
                        // })
                        return (
                            <button 
                            style={{[`${key==="roles"? "--r": key==="collabs"? "--c": key==="tags"? "--t": ""}` as any]:idx+1}}
                            key={`${filter}${idx}`}
                            onClick={()=>{
                                searchParams.getAll(`${key}`).includes(filter)?
                                router.push(`/?${createQueryString(`${key}`, ``)}`, {scroll: false})
                                : router.push( `/?${createQueryString(`${key}`, `${filter}`)}`, {scroll: false})
                            }}
                            className={`w-fit transition-all whitespace-nowrap text-lg p-2 lg:hover:underline ${searchParams.get(key)?.includes(filter)? `${key==="roles"?"roles1":key==="collabs"?"collabs1":key==="tags"?"tags1":""}` : `${key==="roles"?"roles":key==="collabs"?"collabs":key==="tags"?"tags":""} text-black`}`}>
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