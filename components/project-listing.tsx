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
        <section id={project.slug} ref={projectRef} className={` ${view==="all"? "py-10":"py-0"}`} style={{['--i' as any]:index+1}}>
            <div className="flex w-screen  ">
                    <div className=" ">
                        <button 
                        className={`z-50 projectTitle opacity-100 w-screen tracking-normal  cursor-pointer flex flex-col items-center justify-center cursor-pointer`}
                        onClick={()=>{
                            searchParams.getAll(`project`).includes(project.slug)? router.push(`/?${createQueryString(`project`, ``)}`, {scroll: false})
                            : router.push( `/?${createQueryString(`project`, `${project.slug}`)}`, {scroll: false})
                        }}
                        >
                            <div className="flex justify-center items-center flex-col group">
                                <p className={`px-1 w-max flex sm:group-hover:bg-gray-400 ${selectedProject===project.slug? "bg-gray-400 cursor-zoom-out": ""}`}>{project.name}</p>
                                <div className={`lg:text-4xl text-lg mx-10 tracking-tighter overflow-hidden ${view==="all" || selectedProject===project.slug ? "h-fit":"h-0"} `}>
                                    <PortableText value={project.content}/>
                                </div>
                            </div>
                        </button>

                        <div className={` w-screen overflow-x-scroll overflow-y-hidden ${selectedProject===project.slug? "lg:h-[41rem] h-[13rem]":view==="all"?"h-[10rem]":'h-0'} `}>
                            <div 
                            className={`flex h-auto ${selectedProject===project.slug? "w-max":"w-screen justify-center"}`}
                            >
                            {project.images?.map((image, index)=>(
                                <button 
                                className={`${img===`${project.slug}${index}`? "fixed bg-white top-0 w-screen h-screen flex justify-center items-center z-50 cursor-zoom-out flex-col":"cursor-zoom-in hover:opacity-80"} `}
                                key={`image${index}`}
                                onClick={(e)=>{
                                    img===`${project.slug}${index}`? router.push( `/?${createQueryString(`img`, ``)}`, {scroll: false}): router.push( `/?${createQueryString(`img`, `${project.slug}${index}`)}`, {scroll: false})
                                }}>
                                    <div className={`fixed top-0 w-screen flex justify-between p-5 ${img===`${project.slug}${index}`? "":"hidden"}`}>
                                        <p>{project.name}</p>
                                        <p>{index+1}</p>
                                    </div>
                                    <Image
                                    src={urlForImage(image).url()}
                                    alt=""
                                    width={1080}
                                    height={1080}
                                    className={`w-auto ${view==="txt" || selectedProject==`${project.slug}`? "lg:h-[40rem] h-[12rem]":"h-[10rem]"} ${img===`${project.slug}${index}`? "lg:h-[50rem]":""}`}
                                    unoptimized= {false}
                                    />
                                </button>
                            ))}
                            </div>
                        </div> 
                </div>
            </div>
        </section>
    :<div>Oops! Looks like there was an error loading the page. Please refresh!</div>
}