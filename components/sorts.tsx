'use client'
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

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
        <span className="lg:grid hidden grid-cols-6 mx-1 mt-2 text-sm sans border-b-[1px] mb-1 border-black">
            <button className="col-span-2 text-left flex hover:underline"
            onClick={()=>{
                router.push("?"+createSortQueryString("sort", "name"))
            }}
            >Name
                <p className={`${sorted==="name-asc"? "": "hidden"}`}>&nbsp;&darr;</p>
                <p className={`${sorted==="name-desc"? "": "hidden"}`}>&nbsp;&uarr;</p>
            </button>

            <button className="text-left flex hover:underline"
            onClick={()=>{
                router.push("?"+createSortQueryString("sort", "client"))
            }}>Client
                <p className={`${sorted==="client-asc"? "": "hidden"}`}>&nbsp;&darr;</p>
                <p className={`${sorted==="client-desc"? "": "hidden"}`}>&nbsp;&uarr;</p>
            </button>

            <button className="col-span-2 text-left">Tags</button>

            <button className="text-right flex justify-end hover:underline"
            onClick={()=>{
                router.push("?"+createSortQueryString("sort", "year"))
            }}>Year
                <p className={`${sorted==="year-asc"? "": "hidden"}`}>&nbsp;&darr;</p>
                <p className={`${sorted==="year-desc"? "": "hidden"}`}>&nbsp;&uarr;</p>
            </button>
        </span>
    )
}