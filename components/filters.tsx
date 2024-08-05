"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Props{
    filters:any
    projects:any
}


export function Filters({filters, projects}: Props){
    const searchParams = useSearchParams();    
    const selectedProject = searchParams.get("project");
    const about = searchParams.get('about');
    const view = searchParams.get('view');
    const router = useRouter();
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    const blurClass = 'backdrop-blur-sm backdrop-brightness-[.7]';
    const textClass = " lg:text-md lg:leading-auto text-[1rem] leading-[1.2rem] ";

    
    const createQueryString = useCallback(
        (name: string, value: string) => {
            let params;
            

            selectedProject? 
            document.querySelectorAll(".bg-black").forEach((e)=>{
                e.classList.remove('bg-black')
            }): ""


            let stringSearchParams = searchParams.toString()
            stringSearchParams = stringSearchParams.replaceAll("+", " ")
            params = new URLSearchParams(stringSearchParams)


            if(name==="roles"||"tags"||"collabs" && selectedProject){
                params.delete("project", params?.get("project")!)
                document.querySelectorAll(".bg-black").forEach((e)=>{
                    e.classList.remove('bg-black')
                })
            } 

            stringSearchParams.includes(`${name}=${value}`)?
            params.delete(name, value):params.append(name, value)
            return params.toString()

            
        },
        [searchParams]
    )

    let allFilters:any = []

    Object.entries(filters).map(([key, array]:any)=>{
        {array.map((filter:any, idx:any)=>{
            allFilters[allFilters.length]={filter: filter, key: key}
        })}
    })



    return(
        <section className={`lg:sticky top-0 z-[30] w-full col-span-full py-5 transition-all pointer-events-none text-white text-left duration-500 ${view==="full"? "hidden": ""}`}>
            {allFilters.map((entry:any, idx:any)=>{
                return (
                    <button 
                    id={`${entry.filter}`}
                    // style={{[`${entry.key==="roles"? "--r": entry.key==="collabs"? "--c": entry.key==="tags"? "--t": ""}` as any]:idx+1}}
                    key={`${entry.filter}${idx}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`${entry.key}`, `${entry.filter}`)}`)
                    }}
                    className={`${blurClass} ${textClass} pointer-events-auto px-1 py-1 lg:py-[.1rem] mr-1 my-1 w-fit whitespace-nowrap transition-all
                    ${searchParams.getAll(entry.key)?.includes(entry.filter)? "selection text-gray-400":"hover:bg-white hover:text-gray-400"}`
                    }>
                        {`${entry.filter}`}
                    </button>
                )
            })}
        </section>
    )
}