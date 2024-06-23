"use client"
import { urlForImage } from "@/sanity/lib/image"
import { Project } from "@/types/project"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react"

interface Props{
    filteredProjects:any
    project: Project
    index: number
}


export default function Projects({project, index}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();    
    const view = searchParams.get('view');
    const roles = searchParams.get('roles');
    const selectedProject = searchParams.get("project")
    const img = Number(searchParams.get('img'));
    const vimeoCount = project.vimeo? project.vimeo.length: 0;
    const imageCount = project.images? project.images.length: 0;
    const galleryCount = vimeoCount + imageCount;
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
    const projectClick = () =>{
        searchParams.getAll(`project`).includes(project.slug)?
        router.push(`/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}`, {scroll: false})
        : router.push( `/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}&project=${project.slug}&img=0`, {scroll: false})
    }

return(
    <section className={`flex flex-col transition-all ${view==="all" || selectedProject? "lg:text-5xl text-2xl": "lg:text-8xl text-2xl"} ${selectedProject===project.slug? "bg-gray-400": "bg-white"}`}>
        {/* view ===txt? */}
        <span id="txt" className={`flex flex-col items-center justify-center ${selectedProject===project.slug? "lg:py-5 py-2": "py-1"} ${view==="txt"? "": "hidden"} `}>
            <button className={`px-2 ${selectedProject===project.slug? "text-gray-400 bg-white hover:text-white hover:bg-gray-400": "text-white bg-gray-400 hover:text-gray-400 hover:bg-white"}`}                         
            onClick={projectClick}>{project.name}
            </button>
        </span>

        {/* View === all? */}
        <span id="all"  className={`flex flex-col items-center justify-center ${view==="txt"? "hidden": ""}`}>
            <div className={`w-screen h-screen overflow-hidden transition-all ${selectedProject===project.slug? "hidden": ""}`}>
                <Image
                src={urlForImage(project.images[0]).url()}
                alt=""
                width={1080}
                height={1080}
                unoptimized={true}
                priority
                objectFit="cover"
                className={`w-screen h-screen object-cover`}
                // placeholder="blur"
                // blurDataURL={`${project.gallery[index].lqip}`}
                />
            </div>
            <button className={`px-2 ${selectedProject===project.slug? "lg:my-5 mt-5 text-gray-400 bg-white hover:bg-gray-400 hover:text-white": "absolute top-5 text-white bg-gray-400 text-white hover:text-gray-400 hover:bg-white"}`}
            onClick={projectClick}>{project.name}</button>
        </span>

        {/* project open? */}
        <span id="open" className={`w-screen overflow-hidden text-gray-400 flex flex-col justify-start items-center transition-all ${selectedProject===project.slug? "h-screen":'h-0'} `}>
            <div className="mx-5 text-white text-center lg:text-5xl text-2xl mb-5"><PortableText value={project.content}/></div>
            {/* current image */}
            {project.vimeo?.map((vid, index)=>(
                <div className={`lg:h-[40rem] lg:w-[71rem] h-[14rem] w-[24rem]  ${selectedProject===project.slug? img===index? "":"hidden": view==="all"? "": "hidden"}`}>
                    <div key={`project.slug+${index}`} className={`relative overflow-hidden w-full pt-[56.25%]`}>
                        <iframe className="absolute top-0 left-0 w-full h-full" src={`https://player.vimeo.com/video/${vimeoIDs[index]}?loop=1&title=0&byline=0&portrait=0`} allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    </div>
                </div>
            ))}
            {project.images?.map((image, index)=>(
                <div key={`project.slug+${index+vimeoCount}`} className={` flex justify-center items-center ${selectedProject===project.slug? img===index+vimeoCount? "":"hidden": ""}`}>
                    <Image
                    src={urlForImage(project.images[index]).url()}
                    alt=""
                    width={1080}
                    height={1080}
                    unoptimized={true}
                    className={`object-cover w-auto ${selectedProject===project.slug? "lg:h-[40rem] h-[14rem]": "h-0"} ${selectedProject===project.slug? img===index+vimeoCount? "":"hidden": ""}`}
                    // placeholder="blur"
                    // blurDataURL={`${project.gallery[index].lqip}`}
                    />
                </div>
            ))}

            <span className={`flex lg:text-5xl text-2xl items-between justify-between ${selectedProject===project.slug? "lg:fixed lg:bottom-0 py-1 lg:m-5":"hidden"}`}>
                {galleryCount===1? ""
                :<button className="text-white bg-gray-400 hover:bg-white hover:text-gray-400 px-2" onClick={()=>{
                    img===0?
                    router.push( `/?${createQueryString(`img`, `${galleryCount-1}`)}`, {scroll: false}):
                    router.push( `/?${createQueryString(`img`, `${img-1}`)}`, {scroll: false})
                }}>Prev</button>}
                <p className="text-white bg-gray-400 px-2">{img+1}/{galleryCount}</p>
                {galleryCount===1? ""
                :<button className="text-white bg-gray-400 hover:bg-white hover:text-gray-400 px-2" onClick={()=>{
                    img===galleryCount-1?
                    router.push( `/?${createQueryString(`img`, `0`)}`, {scroll: false}):
                    router.push( `/?${createQueryString(`img`, `${img+1}`)}`, {scroll: false})
                }}>Next</button>}
            </span>
        </span> 
    </section>
)
}  