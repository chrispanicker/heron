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

export default function ProjectListing({project, index}: Props) {
    const projectRef = useRef<HTMLElement | null>(null)
    const router = useRouter();
    const searchParams = useSearchParams();    
    const selectedProject = searchParams.get('project');
    const view = searchParams.get('view');
    const img = Number(searchParams.get('img'));
    const roles = searchParams.get('roles')
    
    let vimeoIDs:string[] = [];

    project.vimeo?.map((vid, index)=>{
        vimeoIDs[index]=vid.replace("https://vimeo.com/", "")
    })

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        }, [searchParams]
    )  

    const vimeoCount = project.vimeo? project.vimeo.length: 0;
    const imageCount = project.images? project.images.length: 0;
    const galleryCount = vimeoCount + imageCount;

    return project?
        <section id={project.slug} ref={projectRef} className={`text-2xl  ${view==="all"? "pb-10":selectedProject===project.slug? "py-10": ""}`} style={{['--i' as any]:index+1}}>
            <div className="flex w-screen">
                    <div>
                        <button 
                        className={`z-50 projectTitle opacity-100 w-screen tracking-normal cursor-pointer flex flex-col items-center justify-center`}
                        onClick={()=>{
                            searchParams.getAll(`project`).includes(project.slug)?
                            router.push(`/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}`, {scroll: false})
                            : router.push( `/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}&project=${project.slug}&img=0`, {scroll: false})
                        }}
                        >
                            <div className="flex justify-center items-center flex-col group">
                                <span className="flex justify-center items-center">       
                                    <p className={`px-1 tracking-[.005rem] font-bold w-max flex group-hover:text-gray-600 ${selectedProject===project.slug? "text-gray-600 cursor-alias hover:text-grey-400": ""} ${view==="all"? "":""}`}>{project.name}</p>
                                    <p className={selectedProject===project.slug? "":"hidden"}>&#735;</p>
                                </span>
                                <div className={`flatspot lg:mx-60 tracking-tighter overflow-hidden ${selectedProject===project.slug ? "pb-5":"pb-0"} ${view==="all" || selectedProject===project.slug ? "h-fit ":"h-0"} `}>
                                    <PortableText value={project.content}/>
                                </div>
                            </div>
                        </button>

                        <section className={` w-screen overflow-hidden flex justify-center items-center ${selectedProject===project.slug? "flex-col" : view==="all"?"h-[10rem]":'h-0'} `}>
                                {/* current image */}
                                {project.vimeo?.map((vid, index)=>(
                                    <div key={`project.slug+${index}`} className={`${selectedProject===project.slug? img===index? "":"hidden": view==="all"? "": "hidden"}`}>
                                        <iframe className="" src={`https://player.vimeo.com/video/${vimeoIDs[index]}?loop=1&title=0&byline=0&portrait=0`} width={selectedProject===project.slug? 1040: view==="all"? 288:640} height={selectedProject===project.slug? 640: view==="all"? 162:480} allow="autoplay; fullscreen; picture-in-picture"></iframe>
                                    </div>
                                ))}
                                {project.images?.map((image, index)=>(
                                    <div key={`project.slug+${index+vimeoCount}`} className={` flex justify-center items-center ${selectedProject===project.slug? img===index+vimeoCount? "":"hidden": ""}`}>
                                        <Image
                                        src={urlForImage(project.images[index]).url()}
                                        alt=""
                                        width={480}
                                        height={480}
                                        className={` w-auto ${selectedProject===project.slug? "h-[40rem]": view==="all"? "h-[10rem]": "h-0"}`}
                                        unoptimized= {false}
                                        priority={false}    
                                        />
                                    </div>
                                ))}
                                <span className={`flex w-[10rem] items-between justify-between ${view==="all"? selectedProject===project.slug? "":"hidden":""}`}>
                                    <button onClick={()=>{
                                        img===0?
                                        router.push( `/?${createQueryString(`img`, `${galleryCount-1}`)}`, {scroll: false}):
                                        router.push( `/?${createQueryString(`img`, `${img-1}`)}`, {scroll: false})
                                    }}>Prev</button>
                                    <p>{img+1}/{galleryCount}</p>
                                    <button onClick={()=>{
                                        img===galleryCount-1?
                                        router.push( `/?${createQueryString(`img`, `0`)}`, {scroll: false}):
                                        router.push( `/?${createQueryString(`img`, `${img+1}`)}`, {scroll: false})
                                    }}>Next</button>
                                </span>
                        </section> 
                </div>
            </div>
        </section>
    :<div>Oops! Looks like there was an error loading the page. Please refresh!</div>
}