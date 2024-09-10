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
        <span className="grid grid-cols-6 mx-1 text-sm sans pt-2">
            <button className="col-span-2 text-left flex"
            onClick={()=>{
                router.push("?"+createSortQueryString("sort", "name"))
            }}
            >Name
            <p className={`${sorted==="name-asc"? "": "hidden"}`}>&nbsp;&darr;</p>
            <p className={`${sorted==="name-desc"? "": "hidden"}`}>&nbsp;&uarr;</p>
            </button>
            <button className="text-left">Client</button>
            <button className="col-span-2 text-left">Tags</button>
            <button className="text-right flex justify-end"
            onClick={()=>{
                router.push("?"+createSortQueryString("sort", "year"))
            }}>Year
                <p className={`${sorted==="year-asc"? "": "hidden"}`}>&nbsp;&darr;</p>
                <p className={`${sorted==="year-desc"? "": "hidden"}`}>&nbsp;&uarr;</p>
            </button>
        </span>
    )
}