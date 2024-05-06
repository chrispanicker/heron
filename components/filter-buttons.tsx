"use client"

import Image from "next/image";
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
    isSanityStudio? "" : <div id="filters" className={`z-40 fixed top-[0rem] transition-all duration-500 text-gray-400 overflow-x-scroll h-[0rem] w-screen justify-start flex text-lg bg-black`} key={'parent'}>
    {Object.entries(filters).map(([key, array])=>{
        return(
            <span key={key} className="mx-2 flex items-center justify-center">
                <p className={`mx-2 text-lg underline lg:no-underline capitalize ${key==="role"?"text-gray-400":key==="collabs"?"text-gray-400":key==="tags"?"text-gray-400":""}`}>{`${key}:`}</p>
                <div className="flex flex-row justify-center items-center">
                {array.map((item:string, itemIdx:any)=>{
                    let itemArray = Array.from(item);
                    itemArray[0]=itemArray[0].toUpperCase();
                    itemArray.map((letter, idx)=>{
                        letter===" "? itemArray[idx+1] = itemArray[idx+1].toUpperCase() : ""
                    })
                    return (
                            <button 
                            style={{[`${key==="role"? "--r": key==="collabs"? "--c": key==="tags"? "--t": ""}` as any]:itemIdx+1}}
                            key={`${item}${itemIdx}`}
                            onClick={()=>{
                                searchParams.getAll(`${key}`).includes(item)?
                                router.push(`/?${createQueryString(`${key}`, ``)}`, {scroll: false})
                                : router.push( `/?${createQueryString(`${key}`, `${item}`)}`, {scroll: false})
                            }}
                            className={`w-fit transition-all whitespace-nowrap text-lg font-light ml-1 lg:hover:underline ${searchParams.get(key)?.includes(item)? `${key==="role"?"roles1":key==="collabs"?"collabs1":key==="tags"?"tags1":""}` : `${key==="role"?"roles":key==="collabs"?"collabs":key==="tags"?"tags":""} text-black`}`}>
                                {itemIdx<itemArray.length? `${itemArray.join("")}`:`${itemArray.join("")}`}
                            </button>

                    )
                })}
                </div>
            </span>
        )
    })}
            {/* <button id="buttonEl" className='fixed w-screen left-[0%] top-[2rem] transition-all duration-500 text-5xl text-black z-50' onClick={()=>{
                let header = document.querySelector("#filters");
                let button = document.querySelector("#buttonEl");
                header?.classList.toggle("h-[0rem]")
                header?.classList.toggle("h-[4rem]")
                button?.classList.toggle("top-[2rem]")
                button?.classList.toggle("top-[7.5rem]")
                button?.innerHTML=="↓"? button.innerHTML="↑": button!.innerHTML="↓"
            }}>↓</button> */}

            <div id="iconDiv" className="transition-all duration-500 fixed flex w-screen top-[calc(0rem)] justify-center items-center">
                <Image id="headIcon" className="w-10 rotate-180 cursor-pointer" src={require('../public/Up.svg')} alt="loading..." 
                onClick={()=>{
                    let footer = document.querySelector("#filters")
                    let image = document.querySelector("#headIcon")
                    let div = document.querySelector("#iconDiv")
                    footer?.classList.toggle("h-[0rem]")
                    footer?.classList.toggle("h-[5rem]")
                    // image?.classList.toggle("rotate-180")
                    div?.classList.toggle("top-[calc(0rem)]")
                    div?.classList.toggle("top-[calc(5rem)]")
                }}
                priority />
            </div>
    </div>
    )

}