'use client'
import { Project } from "@/types/project";
import { useRouter, useSearchParams } from "next/navigation";
import { Gallery } from "./gallery";
import { buttonClass } from "./classes";
import { useCallback } from "react";
import { PortableText } from "@portabletext/react";

interface Props{
    project: Project
}

export default function Projects({project}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const selectedProject = searchParams.get("project")  

    const createQueryString = useCallback(
        (name: string, value: string) => {
            let params;
            let stringSearchParams = searchParams.toString()
            stringSearchParams = stringSearchParams.replaceAll("+", " ")
            params = new URLSearchParams(stringSearchParams)
    
            if(name==="project"){
                if (stringSearchParams.includes(`${name}=${value}`)){
                    params.delete(name, value)
                    // params.delete("img", params?.get("img")!)
                }else{
                    params.set(name, value)
                    // params.set("img", "0")
                } 
            }         
        
            name==="project"? 
            stringSearchParams.includes(`${name}=${value}`)? params.delete(name, value)
            :params.set(name, value)
            :stringSearchParams.includes(`${name}=${value}`)?
            params.delete(name, value)
            :params.append(name, value)
            return params.toString()
        },
        [searchParams]
    )
    

    return (
        <div className={`group lg:grid hidden lg:grid-cols-6 grid-cols-2 items-center cursor-pointer px-1 transition-[padding] duration-500 ${selectedProject===project.slug? "py-16": "py-1 hover:bg-black hover:text-gray-300"}`}
        onClick={()=>{
            router.push("?"+createQueryString("project", `${project.slug}`), {scroll:false})
        }}>
            <h2 className="col-span-2 whitespace-nowrap">{project.name}</h2>
            <p className="italic">{project.client}</p>

        

            <span className="flex overflow-hidden col-span-2 lg:my-0 my-1">
                {project.tags? project.tags?.map((tag:any)=>(
                    <button key={tag.name} className={`${buttonClass} bg-black text-gray-300  ${selectedProject===project.slug? "": "group-hover:bg-gray-300 group-hover:text-black"} `}>{tag.name}</button>
                )): ""}
            </span>
            
            <p className="lg:text-right">{project.year}</p>

            {/* Desktop Gallery */}
            <span className={`lg:block hidden col-span-6 overflow-hidden transition-all duration-500 ${selectedProject===project.slug? "max-h-[100rem]": "max-h-[0rem]"}`}>
                <Gallery project={project}/>
                <div className={`pb-[.1rem] ${selectedProject===project.slug? "": ""}`}>
                    <PortableText value={project.content}/>
                </div>
            </span>


        </div>
    )
}