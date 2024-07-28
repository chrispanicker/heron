"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";


export default function UsedFilters(){
    const searchParams = useSearchParams();  
    const roles = searchParams.getAll("roles");
    const tags = searchParams.getAll("tags");
    const collabs = searchParams.getAll("collabs");
    const view = searchParams.get("view");
    const blurClass = 'backdrop-blur-sm backdrop-brightness-[.7]';
    const router = useRouter();
    const createQueryString = useCallback(
        (name: string, value: string) => {
            let params;
            let stringSearchParams = searchParams.toString()
            stringSearchParams = stringSearchParams.replaceAll("+", " ")
            params = new URLSearchParams(stringSearchParams)
            stringSearchParams.includes(`${name}=${value}`)?
            params.delete(name, value):params.append(name, value)
            return params.toString()
        },
        [searchParams]
    )


    

    const about = searchParams.get("about");

    return( searchParams.toString().includes("collabs")|| searchParams.toString().includes("roles") || searchParams.toString().includes("tags")?
            <div className={`fixed flex bottom-10 text-xl z-30 flex-row text-2xl pb-1 m-5 ${about==="open"? "blur-3xl": ""}`}>
                <p className={`mx-1 px-2 ${blurClass}`}>Filtered by:</p>
                {roles.map((role, i)=>{
                    return <button 
                    key={`${role}${i}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`roles`, `${role}`)}`)
                    }}
                    className={`bg-white text-gray-400 px-2 mx-1`}>
                        {`${role}`}
                    </button>
                })}
                {collabs.map((collab, i)=>{
                    return <button 
                    key={`${collab}${i}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`collabs`, `${collab}`)}`)
                    }}
                    className={`bg-white text-gray-400 px-2 mx-1`}>
                        {`${collab}`}
                    </button>
                })}
                {tags.map((tag, i)=>{
                    return <button 
                    key={`${tag}${i}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`tags`, `${tag}`)}`)
                    }}
                    className={`bg-white text-gray-400 px-2 mx-1`}>
                        {`${tag}`}
                    </button>
                })}
                <button className={`${blurClass} px-2 mx-1 cursor-alias`}
                onClick={()=>{
                    router.push(`/?view=${view}`)
                }}>Clear</button>
            </div>: ""
    )
}