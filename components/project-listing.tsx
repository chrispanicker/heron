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
        <section ref={projectRef} className={` ${view==="img" ? "mt-10":"mt-0"}`} style={{['--i' as any]:index+1}}>
            <div className="flex w-screen">
                    <div className="buttonParent cursor-pointer group"                         
                        onClick={()=>{
                        searchParams.getAll(`project`).includes(project.slug)? router.push(`/?${createQueryString(`project`, ``)}`, {scroll: false})
                        : router.push( `/?${createQueryString(`project`, `${project.slug}`)}`, {scroll: false})
                        // let animations = document.getAnimations()
                        // animations.forEach((animation) => {
                        //     animation.playbackRate = 0.0;
                        //   });
                    }}>
                        <button 
                        id={project.slug}
                        className={`z-50 projectTitle opacity-100 w-screen tracking-normal  cursor-pointer flex flex-col items-center justify-center`}
                        >
                        
                            <span className="flex justify-center">
                                <div className="flex justify-center items-center flex-col">
                                    <p className={`px-1 w-max flex sm:group-hover:bg-gray-400 sm:group-hover:text-black ${view==="img"|| selectedProject===project.slug? "bg-gray-400 text-white ": "text-black"} ${view==="txt"||view===null? "lg:text-5xl": "text-3xl"}`}>{project.name}</p>
                                    <div className={`text-3xl overflow-hidden ${view==="img" || selectedProject===project.slug ? "h-fit pb-2":"h-0 pb-0"} `}>
                                        <PortableText value={project.content}/>
                                    </div>
                                </div>
                            </span>

                            <div className={`w-screen  overflow-x-scroll overflow-y-hidden ${view==="img"? "h-[16.25rem] lg:h-[30rem] md:h-[20rem]":"" } ${selectedProject===project.slug? "h-[16.25rem] lg:h-[40rem] md:h-[20rem] mb-2":"h-0 m-0"}`}>
                                <div className={`flex w-screen`}>
                                {project.images?.map((image, index)=>(
                                    <Image
                                    key={`image${index}`}
                                    src={urlForImage(image).url()}
                                    alt=""
                                    width={1080}
                                    height={1080}
                                    className={`w-auto ${view==="txt" || selectedProject==`${project.slug}`? "h-[40rem]":"h-[30rem]"}`}
                                    unoptimized= {false}
                                    />
                                ))}
                                </div>
                            </div> 
                        </button>
                </div>
            </div>
        </section>
    :<div>Oops! Looks like there was an error loading the page. Please refresh!</div>
}