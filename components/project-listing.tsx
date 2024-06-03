'use client'
import { useCallback, useEffect, useRef} from "react";
import { Project } from "@/types/project";
import { useRouter, useSearchParams } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

interface Props{
    filteredProjects:any
    project: Project
    index: number
}

export default function ProjectListing({filteredProjects, project, index}: Props) {
    let rolesArray: string[] = []
    let tagsArray: string[] = []
    let collabsArray: string[] = []

    const projectClickRef = useRef<HTMLDivElement | null>(null)
    const projectRef = useRef<HTMLElement | null>(null)
    const router = useRouter();
    const searchParams = useSearchParams();    
    const selectedProject = searchParams.get('project');
    const view = searchParams.get('view');
    const img = searchParams.get('img');
    
    const vimeoID = project.vimeo? project.vimeo.replace("https://vimeo.com/", ""):"";
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        }, [searchParams]
    )  

    {project.roles?.map((role:any,i:number)=>{
        rolesArray[i] = role.name
    })}
    {project.collabs?.map((collab:any,i:number)=>{
        collabsArray[i] = collab.name
    })}
    {project.tags?.map((tag:any,i:number)=>{
        tagsArray[i] = tag.name
    })}

    
   
    return project?
        <section id={project.slug} ref={projectRef} className={`transition-all duration-500 ${view==="all"||selectedProject===project.slug? "py-10":"lg:py-0"}`} style={{['--i' as any]:index+1}}>
            <div className="flex w-screen  ">
                    <div className=" ">
                        <button 
                        className={`z-50 projectTitle opacity-100 w-screen tracking-normal  cursor-pointer flex flex-col items-center justify-center`}
                        onClick={()=>{
                            searchParams.getAll(`project`).includes(project.slug)? router.push(`/?${createQueryString(`project`, ``)}`, {scroll: false})
                            : router.push( `/?${createQueryString(`project`, `${project.slug}`)}`, {scroll: false})
                        }}
                        >
                            <div className="flex justify-center items-center flex-col group">
                                <p className={`px-1 w-max flex group-hover:bg-gray-400 ${selectedProject===project.slug? "bg-gray-400 cursor-alias hover:bg-white": ""} ${view==="all"? "":""}`}>{project.name}</p>
                                <div className={`lg:text-4xl text-lg mx-10 tracking-tighter overflow-hidden ${selectedProject===project.slug ? "pb-5":"pb-0"} ${view==="all" || selectedProject===project.slug ? "h-fit ":"h-0"} `}>
                                    <PortableText value={project.content}/>
                                </div>
                            </div>
                        </button>

                        <div className={`w-screen overflow-x-scroll  overflow-y-hidden ${selectedProject===project.slug? "bg-gray-400 lg:h-[41rem] h-[13rem]":view==="all"?"h-[11rem]":'h-0'} `}>
                            <div 
                            className={`flex h-auto ${selectedProject===project.slug? "w-max":"lg:w-screen lg:justify-center w-max"}`}
                            >
                            {/* imgs logic for zoom ins */}
                            {project.images?.map((image, index)=>(
                                <div 
                                className={`${img===`${project.slug}${index}`? "fixed bg-white top-0 w-screen h-screen flex justify-center items-center z-50 flex-col":"cursor-zoom-in hover:opacity-80"} `}
                                key={`image${index}`}
                                onClick={(e)=>{
                                    img===`${project.slug}${index}`? "": router.push( `/?${createQueryString(`img`, `${project.slug}${index}`)}`, {scroll: false})
                                }}>
                                    <div className={`fixed lg:text-3xl text-lg  top-0 w-screen flex items-center justify-between p-5 ${img===`${project.slug}${index}`? "":"hidden"}`}>
                                        <button
                                        className="cursor-w-resise"
                                        onClick={(e)=>{
                                           index===0? router.push( `/?${createQueryString(`img`, `${project.slug}${project.images.length-1}`)}`, {scroll: false}) : router.push( `/?${createQueryString(`img`, `${project.slug}${index-1}`)}`, {scroll: false})
                                        }}>Prev
                                        </button>

                                        <button 
                                            className="flex cursor-alias"
                                            onClick={(e)=>{router.push( `/?${createQueryString(`img`, ``)}`, {scroll: false})}}
                                        >
                                            <p className="hover:underline bg-gray-400 px-2">{project.name}</p>
                                            &nbsp;
                                            <p>{`(Image ${index+1})`}</p>
                                        </button>

                                        <button
                                        className="cursor-e-resise"
                                        onClick={(e)=>{
                                           index===project.images.length-1?  router.push( `/?${createQueryString(`img`, `${project.slug}${0}`)}`, {scroll: false}) : router.push( `/?${createQueryString(`img`, `${project.slug}${index+1}`)}`, {scroll: false})
                                        }}>Next</button>
                                    </div>
                                    <Image
                                    src={urlForImage(image).url()}
                                    alt=""
                                    width={1080}
                                    height={1080}
                                    className={`${view==="txt" || selectedProject==`${project.slug}`? "lg:h-[40rem] h-[12rem] w-auto ":"h-[10rem] w-auto "} ${img===`${project.slug}${index}`? "lg:h-[50rem] lg:w-auto w-[100vw] h-auto":""}`}
                                    unoptimized= {false}
                                    />
                                    <div className={`${img===`${project.slug}${index}`? "m-5":"hidden"}`}>
                                        <PortableText value={project.content}/>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div> 
                </div>
            </div>
        </section>
    :<div>Oops! Looks like there was an error loading the page. Please refresh!</div>
}