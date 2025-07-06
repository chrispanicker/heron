'use client'
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { buttonClass } from "./classes";

export function Sorts(){
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const sorted = searchParams.get("sort")  
    const createSortQueryString = useCallback(
        (name: string, type:string) => {
            let params;
            let stringSearchParams = searchParams.toString()
            stringSearchParams = stringSearchParams.replaceAll("+", " ")
            params = new URLSearchParams(stringSearchParams)
             
            if(stringSearchParams.includes(`${name}=${type}-asc`)){
                params.delete(name, type+"-asc")
                params.append(name, type+"-desc")
            } else if(stringSearchParams.includes(`${name}=${type}-desc`)){
                params.delete(name, type+"-desc")
                params.append(name, type+"-asc")
            } else {
                params.delete(name)
                params.append(name, type+"-asc")
            }
            return params.toString()
        },
        [searchParams]
    )
    
    return(        
        <>
            <span className={`${sorted? "flex": "hidden"} px-5`}>
                <p className={`${buttonClass} mr-[.3rem] outline outline-1 outline-black`}>Sorted by</p>
                <button className={`${buttonClass} bg-black text-gray-300 outline outline-1 outline-black hover:bg-gray-300 hover:text-black hover:underline`}
                onClick={()=>{
                    router.push("?"+"")
                }}>{
                sorted==="name-asc"||sorted==="name-desc"? "Name"
                :sorted==="client-asc"||sorted==="client-desc"? "Client"
                :sorted==="tags-asc"||sorted==="tags-desc"? "Tags"
                :sorted==="year-asc"||sorted==="year-desc"? "Year"
                : sorted==="type-asc"||sorted==="type-desc"? "Type"
                : "Default"}</button>
            </span>
            <span className="lg:grid hidden grid-cols-6 mt-2 text-[1.35rem] sans px-3 mb-[2px] pb-1 z-30 relative z-10 border-b-[2px] border-black decoration-2 ">
                <button className="ml-2 col-span-2 text-left flex hover:underline decoration-2 underline-offset-2"
                onClick={()=>{
                    router.push("?"+createSortQueryString("sort", "name"))
                }}
                >Name
                    <p className={`${sorted==="name-asc"? "": "hidden"}`}>&nbsp;&darr;</p>
                    <p className={`${sorted==="name-desc"? "": "hidden"}`}>&nbsp;&uarr;</p>
                </button>

                <button className="pl-[.15rem] text-left flex hover:underline decoration-2 underline-offset-2"
                onClick={()=>{
                    router.push("?"+createSortQueryString("sort", "client"))
                }}>Client
                    <p className={`${sorted==="client-asc"? "": "hidden"}`}>&nbsp;&darr;</p>
                    <p className={`${sorted==="client-desc"? "": "hidden"}`}>&nbsp;&uarr;</p>
                </button>

                <button className="pl-[.1rem] col-span-1 text-left flex hover:underline decoration-2 underline-offset-2"
                onClick={()=>{
                    router.push("?"+createSortQueryString("sort", "type"))
                }}>Type
                    <p className={`${sorted==="type-asc"? "": "hidden"}`}>&nbsp;&darr;</p>
                    <p className={`${sorted==="type-desc"? "": "hidden"}`}>&nbsp;&uarr;</p>
                </button>

                <button className="pl-[.0rem] col-span-1 text-left flex hover:underline decoration-2 underline-offset-2"
                onClick={()=>{
                    router.push("?"+createSortQueryString("sort", "tags"))
                }}>Role
                    <p className={`${sorted==="tags-asc"? "": "hidden"}`}>&nbsp;&darr;</p>
                    <p className={`${sorted==="tags-desc"? "": "hidden"}`}>&nbsp;&uarr;</p>
                </button>

                <button className="mr-2 text-right flex justify-end hover:underline decoration-2 underline-offset-2"
                onClick={()=>{
                    router.push("?"+createSortQueryString("sort", "year"))
                }}>Year
                    <p className={`${sorted==="year-asc"? "": "hidden"}`}>&nbsp;&darr;</p>
                    <p className={`${sorted==="year-desc"? "": "hidden"}`}>&nbsp;&uarr;</p>
                </button>
            </span>
        </>
    )
}