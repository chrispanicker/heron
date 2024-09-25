'use client'
import { Project } from "@/types/project";
import { useRouter, useSearchParams } from "next/navigation";
import { Gallery } from "./gallery";
import { buttonClass } from "./classes";
import { useCallback } from "react";
import { PortableText } from "@portabletext/react";
import { openFilters } from "./functions";

interface Props{
    project: Project
}

export default function Projects({project}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const selectedProject = searchParams.get("project")  
    let roles = searchParams.getAll("roles");
    let collabs = searchParams.getAll("collabs");
    let tags = searchParams.getAll("tags");
    let bool: Boolean;
    roles.length + collabs.length + tags.length ===1? bool = true: bool=false
    let params = roles.toString()+","+collabs.toString()+","+tags.toString()

    let e = 0

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
            
            // if(name==="roles"||name==="collabs"||name==="tags"){
            //     stringSearchParams.includes(`${name}=${value}`)?
            //     params.delete(name, value):params.append(name, value)
            // }
        
            name==="project"? 
                stringSearchParams.includes(`${name}=${value}`)? 
                    params.delete(name, value)
                :params.set(name, value)
            :stringSearchParams.includes(`${name}=${value}`)?
                params.delete(name, value)
            :params.append(name, value)
            return params.toString()

        },
        [searchParams]
    )
    

    return (
        <div id={project.slug} className={`group lg:grid hidden lg:grid-cols-6 grid-cols-2 items-center px-1 transition-[padding] duration-500 ${selectedProject===project.slug? "pt-10 pb-32": "py-1 hover:bg-black hover:text-gray-300"}`}>
            <h2 className="col-span-2 lg:text-2xl md:text-lg hover:underline decoration-1 underline-offset-2 cursor-pointer"
            onClick={()=>{
                router.push("?"+createQueryString("project", `${project.slug}`), {scroll:false})
                document.querySelector(`#${project.slug}`)?.scrollIntoView()
                let filters = document.querySelector("header section")
                e=1
                if(!filters?.classList.contains("h-0")){
                    openFilters(e)
                }
            }}>{project.name}</h2>
            <p className="sans lg:text-2xl md:text-lg">{project.client}</p>

  

            <span className="flex overflow-hidden col-span-2 lg:my-0 p-1 ">
                {project.roles? project.roles?.map((tag:any)=>(
                    <button key={tag.name} className={`${buttonClass} outline outline-1 hover:underline 
                    ${searchParams.getAll("roles")?.includes(tag.name)? "text-black bg-gray-300 hover:bg-gray-300 hover:text-black outline-black":"outline-gray-300 bg-black text-gray-300 hover:bg-gray-300 hover:text-black"}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`roles`, `${tag.name}`)}`, {scroll: false})
                        params.includes(tag.name) && bool ? e=1:""
                        openFilters(e)
                    }}
                >{tag.name}</button>
                )): ""}
                {project.collabs? project.collabs?.map((tag:any)=>(
                    <button key={tag.name} className={`${buttonClass} outline outline-1 outline-black hover:underline 
                    ${searchParams.getAll("collabs")?.includes(tag.name)? "text-black bg-gray-300 hover:bg-gray-300 hover:text-black outline-black":"outline-gray-300 bg-black text-gray-300 hover:bg-gray-300 hover:text-black"}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`collabs`, `${tag.name}`)}`, {scroll: false})
                        params.includes(tag.name) && bool ? e=1:""
                        openFilters(e)
                    }}>{tag.name}</button>
                )): ""}
                {project.tags? project.tags?.map((tag:any)=>(
                    <button key={tag.name} 
                    className={`${buttonClass} outline outline-1 outline-black hover:underline 
                    ${searchParams.getAll("tags")?.includes(tag.name)? "text-black bg-gray-300 hover:bg-gray-300 hover:text-black outline-black":"outline-gray-300 bg-black text-gray-300 hover:bg-gray-300 hover:text-black"}`}
                    onClick={()=>{router.push( `/?${createQueryString(`tags`, `${tag.name}`)}`, {scroll: false})
                    params.includes(tag.name) && bool ? e=1:""
                    openFilters(e)
                }}>{tag.name}</button>
                )): ""}

            </span>
            
            <p className="lg:text-right mono">{project.year}</p>

            {/* Desktop Gallery */}
            <span className={`lg:block relative hidden col-span-6 overflow-hidden transition-all duration-500 ${selectedProject===project.slug? "max-h-[100rem]": "max-h-[0rem]"}`}>
                <Gallery project={project}/>
                <div className={`pb-[.1rem] pt-2 sticky grid-cols-2 grid  left-0  text-2xl ${selectedProject===project.slug? "": ""}`}>
                    <PortableText value={project.content}/>
                    <div className="flex text-right items-start justify-end">
                        <button className={`px-1 bg-black text-gray-300 ${buttonClass} hover:bg-gray-300 hover:text-black hover:underline outline outline-black outline-1`} 
                        onClick={()=>{
                            router.push("?"+createQueryString("project", `${project.slug}`), {scroll:false})
                        }}>Close</button>
                    </div>
                </div>
            </span>


        </div>
    )
}