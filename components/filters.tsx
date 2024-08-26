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
    const blurClass = 'backdrop-blur-sm';
    const textClass = " lg:text-md lg:leading-auto text-[1rem] leading-[1.2rem] ";
    // const hoverClass = "outline outline-1 hover:outline-2 hover:rounded-sm outline-black"
    
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
        <section className={`lg:sticky col-span-4 top-0 z-[30] py-5 transition-all pointer-events-none text-white lg:text-left text-center duration-500 ${view==="full"? "hidden": ""} ${selectedProject? "max-[1024px]:blur-3xl": ""}`}>
            {allFilters.map((entry:any, idx:any)=>{
                return (
                    <button 
                    id={`${entry.filter}`}
                    // style={{[`${entry.key==="roles"? "--r": entry.key==="collabs"? "--c": entry.key==="tags"? "--t": ""}` as any]:idx+1}}
                    key={`${entry.filter}${idx}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`${entry.key}`, `${entry.filter}`)}`)
                    }}
                    className={`${blurClass} ${entry.key==="roles"? "backdrop-brightness-[.4]": entry.key==="tags"? "backdrop-brightness-[.8]": "backdrop-brightness-[.6]"} ${textClass} pointer-events-auto px-1 py-1 lg:py-[.1rem] mr-2 my-1 w-fit whitespace-nowrap transition-all
                    ${searchParams.getAll(entry.key)?.includes(entry.filter)? "selection text-black":"hover:bg-white hover:text-black"}`
                    }>
                        {`${entry.filter}`}
                    </button>
                )
            })}
        </section>
    )
}