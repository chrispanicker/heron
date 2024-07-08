"use client"
import { Project } from "@/types/project";
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


    return(
        <section className={`fixed top-0 overflow-x-scroll w-screen z-40 transition-all px-2 flex justify-start items-center flex-row py-5 text-white lg:text-2xl text-lg overflow-hidden ${about==="open"? "blur-3xl": ""}`}>
            {/* <button 
                className={`fixed bottom-0 my-5 px-2 ${blurClass}`}
                onClick={()=>{
                     searchParams.getAll(`filters`).includes("open")? router.push( `/?${createQueryString(`filters`, ``)}`) : router.push( `/?${createQueryString(`filters`, `open`)}`)
                    }
                }
                >Filters</button> */}
            {Object.entries(filters).map(([key, array]:any)=>{
                return(
                    <span key={key} className="capitalize flex justify-center items-center">
                        {/* <p className={`px-2   w-fit mb-1`}>{`${key}`}</p> */}
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
                                ${searchParams.get(key)?.includes(filter)? "bg-white text-gray-400":"hover:bg-white hover:text-gray-400"}`
                                }>
                                    {`${filter}`}
                                </button>
                            )
                        })}
                    </span>
                )
            })}
        </section>
    )
}