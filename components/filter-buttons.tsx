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
    : <section className="text-white lg:text-5xl text-2xl">
        <button id="filterTab" className="z-40 fixed top-0 left-0 bg-gray-400 hover:text-gray-400 hover:bg-white px-2 py-1 m-5" onClick={()=>{
            let filtersEl = document.querySelector("#filters")
            filtersEl?.classList.toggle("w-[0vw]")
            filtersEl?.classList.toggle("w-[100vw]")
        }}>Filters</button>


        <div id="filters" className={`pt-10 pb-40 z-30 fixed left-0 overflow-y-scroll w-[0vw] h-screen justify-center items-start transition-all duration-500 bg-gray-400/[.60]`} key={'parent'}>
            <div className="flex lg:flex-row flex-col">
            {Object.entries(filters).map(([key, array])=>{
                return(
                    <span key={key} className="lg:mt-20 mt-10 mx-5 capitalize flex flex-col justify-start items-start">
                        <p className={`px-2 text-gray-400 bg-white w-fit mb-1`}>{`${key}`}</p>
                        {array.map((filter:any, idx:any)=>{
                            return (
                                <button 
                                style={{[`${key==="roles"? "--r": key==="collabs"? "--c": key==="tags"? "--t": ""}` as any]:idx+1}}
                                key={`${filter}${idx}`}
                                onClick={()=>{
                                    searchParams.getAll(`${key}`).includes(filter)?
                                    router.push(`/?${createQueryString(`${key}`, ``)}`, {scroll: false})
                                    : router.push( `/?${createQueryString(`${key}`, `${filter}`)}`, {scroll: false})
                                }}
                                className={`px-2 my-1 w-fit whitespace-nowrap px-2 text-gray-400}
                                ${searchParams.get(key)?.includes(filter)? "bg-white text-gray-400 hover:bg-gray-400 hover:text-white":"bg-gray-400 text-white hover:bg-white hover:text-gray-400" }`
                                }>
                                    {`${filter}`}
                                </button>
                            )
                        })}
                    </span>
                )
            })}
            </div>
        </div>
    </section>)
}