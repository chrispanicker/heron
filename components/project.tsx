'use client'
import { Project } from "@/types/project";
import { useRouter, useSearchParams } from "next/navigation";
import { Gallery } from "./gallery";
import { buttonClass } from "./classes";
import { useCallback, useEffect } from "react";
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
            
            // if(name==="roles"||name==="collabs"||name==="tags"){
            //     stringSearchParams.includes(`${name}=${value}`)?
            //     params.delete(name, value):params.append(name, value)
            // }
        
            if(name==="project"){
                if(stringSearchParams.includes(`${name}=${value}`)){ 
                    params.delete(name, value)
                }else{params.set(name, value)}
            //not a project?? IE tags?
            }else {
                if(name==="roles"||name==="tags"||name==="collabs" && selectedProject){
                    var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
                    params.delete("project", selectedProject!)
                    window.scrollTo(scrollX, 0)
                }
                if(stringSearchParams.includes(`${name}=${value}`)){
                    params.delete(name, value)
                }else{params.append(name, value)}
            }
                
            return params.toString()

        },
        [searchParams]
    )



    return (
        <div id={project.slug} 
            className={`group lg:text-2xl lg:grid hidden lg:relative grid-cols-12 items-start transition-[padding] duration-500 mx-[1.75px] lg:px-5 px-2 py-1 ${selectedProject===project.slug? "pt-12 bg-black text-gray-300 ": "hover:bg-black hover:text-gray-300"}`}>
            <div className="w-full h-full absolute top-0 z-0" 
            onClick={()=>{
                let element = document.querySelector(`#${project.slug}`)
                var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

                selectedProject===project.slug? window.scrollTo(scrollX, (scrollY-(rootFontSize*3.1)))
                :element?.scrollIntoView({behavior:'smooth'})
                router.push("?"+createQueryString("project", `${project.slug}`), {scroll:false})
                
                let filters = document.querySelector("header section")
                e=1
                if(!filters?.classList.contains("h-0")){
                    openFilters(e)
                }
            }}></div>
            {/* name */}
            <button className={`text-left col-span-4 hover:underline decoration-1 underline-offset-2 mr-2 cursor-select z-10`}
                onClick={()=>{
                    let element = document.querySelector(`#${project.slug}`)
                    let rect = element?.getBoundingClientRect();
                    var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

                    selectedProject===project.slug? window.scrollTo(scrollX, (scrollY-(rootFontSize*3.1)))
                    :element?.scrollIntoView({behavior:'smooth'})
                    router.push("?"+createQueryString("project", `${project.slug}`), {scroll:false})
                    
                    let filters = document.querySelector("header section")
                    e=1
                    if(!filters?.classList.contains("h-0")){
                        openFilters(e)
                    }
                }}>{project.name}
            </button>
            {/* client */}
            <p className="sans text-[1.35rem] col-span-2">{project.client}</p>
            {/* tags */}
            <span className="proj-filters flex overflow-x-scroll col-span-5 p-1 larger:mr-6 lg:mr-10 z-10">
                {project.roles? project.roles?.map((tag:any)=>(
                    <button key={tag.name} className={`${buttonClass} outline outline-1 hover:underline my-1
                    ${searchParams.getAll("roles")?.includes(tag.name)? "text-black bg-gray-300 hover:bg-gray-300 hover:text-black outline-black":"outline-gray-300 bg-black text-gray-300 hover:bg-gray-300 hover:text-black"}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`roles`, `${tag.name}`)}`, {scroll: false})
                        params.includes(tag.name) && bool ? e=1:""
                        openFilters(e)
                    }}
                >{tag.name}</button>
                )): ""}
                {project.collabs? project.collabs?.map((tag:any)=>(
                    <button key={tag.name} className={`${buttonClass} outline outline-1 outline-black hover:underline my-1
                    ${searchParams.getAll("collabs")?.includes(tag.name)? "text-black bg-gray-300 hover:bg-gray-300 hover:text-black outline-black":"outline-gray-300 bg-black text-gray-300 hover:bg-gray-300 hover:text-black"}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`collabs`, `${tag.name}`)}`, {scroll: false})
                        params.includes(tag.name) && bool ? e=1:""
                        openFilters(e)
                    }}>{tag.name}</button>
                )): ""}
                {project.tags? project.tags?.map((tag:any)=>(
                    <button key={tag.name} 
                    className={`${buttonClass} outline outline-1 outline-black hover:underline my-1
                    ${searchParams.getAll("tags")?.includes(tag.name)? "text-black bg-gray-300 hover:bg-gray-300 hover:text-black outline-black":"outline-gray-300 bg-black text-gray-300 hover:bg-gray-300 hover:text-black"}`}
                    onClick={()=>{
                    router.push( `/?${createQueryString(`tags`, `${tag.name}`)}`, {scroll: false})
                    params.includes(tag.name) && bool ? e=1:""
                    openFilters(e)
                }}>{tag.name}</button>
                )): ""}

            </span>
            {/* year */}
            <p className="lg:text-right sans text-[1.35rem] flex justify-end col-span-1 whitespace-nowrap">{project.year}</p>

            {/* gallery */}
            <span className={`lg:block relative hidden col-span-12 overflow-hidden transition-all duration-500  ${selectedProject===project.slug? "max-h-[50rem] pt-1": "max-h-[0rem]"}`}>
                <div className={`absolute left-0 flex w-full justify-between items-center top-[15rem] z-50 text-2xl text-gray-300 serif h-fit leading-[1.1rem] ${project.gallery.length<2? "hidden": ""}`}>
                    {/* left arrow */}
                    <button className="bg-black px-1 mx-1 outline outline-1 outline-gray-300 hover:outline-black hover:bg-gray-300 hover:text-black"
                    onClick={()=>{
                        let gallery = document.querySelector(`#${project.slug}-gallery`)
                        var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
                        function remToPx(remValue:number, rootFontSize:number) { // Convert REM to PX using the formula 
                            var pxValue = remValue * rootFontSize;
                            // Return the result
                            return pxValue;
                        }
                        let width = remToPx(40, rootFontSize)
                        gallery!.scrollLeft===0? gallery!.scrollLeft=gallery!.scrollWidth
                        :gallery!.scrollLeft -= width
                    }}>&larr;</button>
                    {/* right arrow */}
                    <button className="bg-black px-1 mx-1 outline outline-1 outline-gray-300 hover:outline-black hover:bg-gray-300 hover:text-black"
                    onClick={()=>{
                        let gallery = document.querySelector(`#${project.slug}-gallery`)
                        var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
                        function remToPx(remValue:number, rootFontSize:number) { // Convert REM to PX using the formula 
                            var pxValue = remValue * rootFontSize;
                            // Return the result
                            return pxValue;
                        }
                        let width = remToPx(42, rootFontSize)
                        gallery!.scrollLeft>width*(project.images.length-2)? gallery!.scrollLeft=0
                        :gallery!.scrollLeft += width
                    }}>&rarr;</button>
                </div>
                {/* gallery component */}
                <Gallery project={project}/>
                {/* info */}
                <div className={`pb-[.1rem] pt-1 sticky grid-cols-6 grid  left-0 ${selectedProject===project.slug? "": ""}`}>
                    {/* description */}
                    <div className="col-span-5">
                        <PortableText value={project.content}/>
                    </div>
                    {/* close button */}
                    <div className="flex text-right items-center justify-end col-span-1 h-[2rem]">
                        <button className={`${selectedProject===project.slug? "hover:bg-gray-300 hover:text-black": "bg-black text-gray-300 hover:bg-gray-300 hover:text-black outline-black"} px-1 ${buttonClass} hover:underline outline outline-1`} 
                        onClick={()=>{
                            router.push("?"+createQueryString("project", `${project.slug}`), {scroll:false})
                        }}>Close</button>
                    </div>
                </div>
            </span>

        </div>
    )
}