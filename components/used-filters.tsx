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
    const about = searchParams.get("about");
    const filtersmenu = searchParams.get("filters")
    return(
        <div className={`flex flex-row text-2xl mt-5 pb-1 mb-5 ${about==="open"? "blur-3xl": ""}`}>
            {/* {role||collabs||tags? 
                <button className="buttonParent px-2 mx-2   hover:text-gray-400 hover:bg-white"                         
                    onClick={()=>{
                        router.push( `/?view=${view? `${view}`: "txt"}`)
                    }}>
                    Clear
                </button>
            :""} */}
            {role||collabs||tags? <p>Filtered by:&nbsp;</p>:""}
            {role? <p className="capitalize cursor-alias  hover:underline decoration-dotted"
                onClick={()=>{
                    router.push( `/?${createQueryString(`roles`, ``)}`, {scroll: false})
                }}>{role}{tags||collabs?"\u00A0":""}</p>:""}
            {collabs? <p className="capitalize cursor-alias hover:underline decoration-dotted" 
                onClick={()=>{
                    router.push( `/?${createQueryString(`collabs`, ``)}`, {scroll: false})
                }}>{collabs}{tags?"\u00A0":""}</p>:""}
            {tags? <p className="capitalize cursor-alias hover:underline decoration-dotted"
                onClick={()=>{
                    router.push( `/?${createQueryString(`tags`, ``)}`, {scroll: false})
                }}>{tags}</p>:""}
        </div>
    )
}