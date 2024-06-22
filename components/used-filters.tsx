"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Props{
    role: any,
    tags: any,
    collabs: any
}

export default function UsedFilters({role, tags, collabs}: Props){

    const searchParams = useSearchParams();  
    const router = useRouter();
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        }, [searchParams]
    )  
    const view = searchParams.get('view');
    const proj = searchParams.get("project");
    return(
        <div className="flex flex-row text-gray-400 text-[1.5rem]">
            {/* {role||collabs||tags? 
                <button className="buttonParent px-2 bg-gray-400 text-white hover:text-gray-400 hover:bg-white"                         
                    onClick={()=>{
                        router.push( `/?view=${view? `${view}`: "txt"}`)
                    }}>
                    Clear
                </button>
            :""} */}
            {role||collabs||tags? "&nbsp;" :""}
            {role||collabs||tags? <p>Filtered by:&nbsp;</p>:""}
            {role? <p className="capitalize mx-2 px-2 cursor-alias bg-gray-400 text-white hover:text-gray-400 hover:bg-white "
                onClick={()=>{
                    router.push( `/?${createQueryString(`roles`, ``)}`, {scroll: false})
                }}>{role}{tags||collabs?"\u00A0":""}</p>:""}
            {collabs? <p className="capitalize mx-2 px-2 cursor-alias outline outline-1 outline-black bg-white  hover:text-white hover:bg-gray-400" 
                onClick={()=>{
                    router.push( `/?${createQueryString(`collabs`, ``)}`, {scroll: false})
                }}>{collabs}{tags?"\u00A0":""}</p>:""}
            {tags? <p className="capitalize mx-2 px-2 cursor-alias outline outline-1 outline-black bg-white  hover:text-white hover:bg-gray-400"
                onClick={()=>{
                    router.push( `/?${createQueryString(`tags`, ``)}`, {scroll: false})
                }}>{tags}</p>:""}
            
        </div>
    )
}