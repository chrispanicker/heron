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
    <section className={`flex flex-col transition-all ${view==="all" || selectedProject? "text-5xl": "text-8xl"} ${selectedProject===project.slug? "bg-gray-400": "bg-white"}`}>
        {/* view ===txt? */}
        <span id="txt" className={`flex flex-col items-center justify-center ${selectedProject===project.slug? "py-5": "py-1"} ${view==="txt"? "": "hidden"} `}>
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
            <button className={`px-2 ${selectedProject===project.slug? "my-5 text-gray-400 bg-white hover:bg-gray-400 hover:text-white": "absolute top-5 text-white bg-gray-400 text-white hover:text-gray-400 hover:bg-white"}`}
            onClick={projectClick}>{project.name}</button>
        </span>

        {/* project open? */}
        <span id="open" className={`w-screen overflow-hidden text-gray-400 flex flex-col justify-start items-center transition-all ${selectedProject===project.slug? "h-screen":'h-0'} `}>
            <div className="mx-5 text-white text-center text-5xl mb-5"><PortableText value={project.content}/></div>
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
                    width={1080}
                    height={1080}
                    unoptimized={true}
                    className={` w-auto ${selectedProject===project.slug? "h-[40rem]": "h-0"} ${selectedProject===project.slug? img===index+vimeoCount? "":"hidden": ""}`}
                    // placeholder="blur"
                    // blurDataURL={`${project.gallery[index].lqip}`}
                    />
                </div>
            ))}

            <span className={`flex text-5xl items-between justify-between ${selectedProject===project.slug? "fixed bottom-5":"hidden"}`}>
                <button className="text-white bg-gray-400 hover:bg-white hover:text-gray-400 px-2 m-2" onClick={()=>{
                    img===0?
                    router.push( `/?${createQueryString(`img`, `${galleryCount-1}`)}`, {scroll: false}):
                    router.push( `/?${createQueryString(`img`, `${img-1}`)}`, {scroll: false})
                }}>Prev</button>
                <p className="mt-2 text-white">{img+1}/{galleryCount}</p>
                <button className="text-white bg-gray-400 hover:bg-white hover:text-gray-400 px-2 m-2" onClick={()=>{
                    img===galleryCount-1?
                    router.push( `/?${createQueryString(`img`, `0`)}`, {scroll: false}):
                    router.push( `/?${createQueryString(`img`, `${img+1}`)}`, {scroll: false})
                }}>Next</button>
            </span>
        </span> 
    </section>
)
}  