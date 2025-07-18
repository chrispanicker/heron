"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { textSize } from "./classes";


export default function UsedFilters(){
    const searchParams = useSearchParams();  
    const roles = searchParams.getAll("roles");
    const tags = searchParams.getAll("tags");
    const collabs = searchParams.getAll("collabs");
    const selectedProject = searchParams.get("project")
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
            <div className={`sticky flex flex-wrap w-screen z-10 leading-[1.1rem] bottom-6 text-lg z-30 justify-center text-center flex-row lg:text-xl px-5 pb-5 transition-all ${about==="open"? "blur-2xl": ""} ${selectedProject? "blur-2xl": ""}`}>
                <p className={`text-lg leading-[1.4rem] py-0 w-fit whitespace-nowrap mb-2 text-center w-fit `}>Filtered by:</p>
                {roles.map((role, i)=>{
                    return <button 
                    key={`${role}${i}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`roles`, `${role}`)}`, {scroll: false})
                    }}
                    className={`bg-white text-black ${blurClass}  ml-2 px-1 ${textSize} leading-[1.4rem] py-0 w-fit cursor-alias whitespace-nowrap mb-2`}>
                        {`${role}`}
                    </button>
                })}
                {collabs.map((collab, i)=>{
                    return <button 
                    key={`${collab}${i}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`collabs`, `${collab}`)}`, {scroll: false})
                    }}
                    className={`bg-white text-black ${blurClass}  ml-2 px-1 ${textSize} leading-[1.4rem] py-0 w-fit cursor-alias whitespace-nowrap mb-2`}>
                        {`${collab}`}
                    </button>
                })}
                {tags.map((tag, i)=>{
                    return <button 
                    key={`${tag}${i}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`tags`, `${tag}`)}`, {scroll: false})
                    }}
                    className={`bg-white text-black ${blurClass}  ml-2 px-1 ${textSize} leading-[1.4rem] py-0 w-fit cursor-alias whitespace-nowrap mb-2`}>
                        {`${tag}`}
                    </button>
                })}
                <button className={`${blurClass}  ml-2 px-1 ${textSize} leading-[1.4rem] py-0 w-fit whitespace-nowrap mb-2 hover:bg-white hover:text-black`}
                onClick={()=>{
                    router.push(`/?view=${view}`, {scroll: false})
                }}>Clear</button>
            </div>: ""
    )
}