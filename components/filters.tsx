"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Props{
    filters:any
    projects:any
}


export function Filters({filters, projects}: Props){
    const searchParams = useSearchParams();    
    const view = searchParams.get('view');
    const selectedProject = searchParams.get("project");
    const roles = searchParams.get('roles');
    const proj = searchParams.get('project');
    const tags = searchParams.get('tags');
    const collabs = searchParams.get('collabs');
    const about = searchParams.get('about');
    const router = useRouter();
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    const filtersmenu = searchParams.get("filters");
    const blurClass = 'backdrop-blur-sm backdrop-brightness-[.7]';

    projects.map((project:any)=>{
        selectedProject===project.slug?
        project.tags? project.tags.map((tag:any)=>{
            // console.log(tag.name)
        }): "" : ""
    })
    
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
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
        <section className={`z-40 p-5 transition-all text-white text-xl text-center  ${about==="open"? "blur-3xl": ""}`}>
            {/* <button 
                className={`fixed bottom-0 my-5 px-2 ${blurClass}`}
                onClick={()=>{
                     searchParams.getAll(`filters`).includes("open")? router.push( `/?${createQueryString(`filters`, ``)}`) : router.push( `/?${createQueryString(`filters`, `open`)}`)
                    }
                }
                >Filters</button> */}
            
            {/* {Object.entries(filters).map(([key, array]:any)=>{
                return(
                    <span key={key} className="capitalize justify-center items-center flex">
                        // <p className={`px-2   w-fit mb-1`}>{`${key}`}</p>
                        {array.map((filter:any, idx:any)=>{
                            return (
                                <button 
                                id={`${filter}`}
                                style={{[`${key==="roles"? "--r": key==="collabs"? "--c": key==="tags"? "--t": ""}` as any]:idx+1}}
                                key={`${filter}${idx}`}
                                onClick={()=>{
                                    if(searchParams.getAll(`${key}`).includes(filter)){
                                        router.push(`/?${createQueryString(`${key}`, ``)}`)
                                    }else{
                                        router.push( `/?${createQueryString(`${key}`, `${filter}`)}`)
                                    }
                                   
                                }}
                                className={`${blurClass} px-2 mx-1 w-fit whitespace-nowrap px-2 transition-all
                                ${searchParams.get(key)?.includes(filter)? "selection text-gray-400":"hover:bg-white hover:text-gray-400"}`
                                }>
                                    {`${filter}`}
                                </button>
                            )
                        })}
                    </span>
                )
            })} */}
            
            {allFilters.map((entry:any, idx:any)=>{
                return (
                    <button 
                    id={`${entry.filter}`}
                    // style={{[`${entry.key==="roles"? "--r": entry.key==="collabs"? "--c": entry.key==="tags"? "--t": ""}` as any]:idx+1}}
                    key={`${entry.filter}${idx}`}
                    onClick={()=>{
                        if(searchParams.getAll(`${entry.key}`).includes(entry.filter)){
                            router.push(`/?${createQueryString(`${entry.key}`, ``)}`)
                        }else{
                            router.push( `/?${createQueryString(`${entry.key}`, `${entry.filter}`)}`)
                        }
                        
                    }}
                    className={`${blurClass} px-2 py-0 mx-1 my-1 w-fit whitespace-nowrap transition-all
                    ${searchParams.get(entry.key)?.includes(entry.filter)? "selection text-gray-400":"hover:bg-white hover:text-gray-400"}`
                    }>
                        {`${entry.filter}`}
                    </button>
                )
            })}
        </section>
    )
}