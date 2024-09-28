'use client'
import { Project } from "@/types/project";
import { useRouter, useSearchParams } from "next/navigation";
import { buttonClass } from "./classes";
import { useCallback } from "react";
import { PortableText } from "@portabletext/react";
import { MobileGallery } from "./mobile-gallery";

interface Props{
    project: Project
}

export default function MobileProjects({project}: Props) {
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
        <div className={`relative group snap-start min-h-screen snap-always lg:hidden block relative items-center transition-all`}>
            <div className="sticky top-8 bg-gray-300 z-10 pt-2 pb-1">
                <h2 className="text-2xl w-screen flex justify-start items-center px-2 leading-[1.5rem]">{project.name}</h2>
                <div className="flex px-2 justify-between text-sm">
                    <p className="mono">{project.type}</p>
                    <p className="mono">{project.year}</p>
                </div>
            </div>

            
        
            {/* Mobile Gallery */}
            <span className={`transition-all duration-500 z-0`}>
                <MobileGallery project={project}/>
            </span>


            <div className={`sticky w-screen bottom-0 bg-gray-300 z-10 px-2 pt-1 pb-8`}>
                <span className="leading-[1.2rem]">
                    {/* <p className="pb-1">For <i>{project.client}</i></p> */}
                    <PortableText value={project.content}/>
                </span>
                {/* <span className="overflow-x-scroll my-1 z-10">
                {project.tags? project.tags?.map((tag:any)=>(
                    <button key={"mobile"+tag.name} className={`${buttonClass} bg-black text-gray-300`}>{tag.name}</button>
                )): ""}
                </span> */}
            </div>

        </div>
    )
}