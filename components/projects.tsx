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
    const filtersmenu = searchParams.get("filters")

    let vimeoIDs:string[] = [];
    let allRoles:string[] = [];
    let allTags:string[] = []
    let allCollabs:string[] = [];
    console.log(project)
    project.roles?.map((role:any)=>{
        allRoles.push(role.name)
    })
    project.tags?.map((tag:any)=>{
        allTags.push(tag.name)
    })
    project.collabs?.map((collab:any)=>{
        allCollabs.push(collab.name)
    })

    let filters = {
        "roles": allRoles,
        "collabs": allCollabs, 
        "tags": allTags, 
    };


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
    <section key={`${project.slug}`} className={`${filtersmenu==="1"? "blur-lg": ""} flex flex-col transition-all ${view==="all" || selectedProject? "lg:text-5xl text-2xl sticky top-0": "lg:text-8xl text-2xl"} ${view==="all"? "": ""} ${selectedProject===project.slug? "bg-gray-400": "bg-white"}`}>
        {/* view ===txt? */}
        <span id="txt" className={`flex flex-col items-center justify-center ${selectedProject===project.slug? "lg:py-5 py-2": "py-1"} ${view==="txt"? "": "hidden"} `}>
            <button className={`peer z-0 hover:z-50 px-2 ${selectedProject===project.slug? "text-gray-400 bg-white hover:text-white hover:bg-gray-400": "text-white bg-gray-400 hover:text-gray-400 hover:bg-white"}`}                         
            onClick={projectClick}>{project.name}
            </button>
            <div className={`z-30 fixed top-0 w-screen h-screen pointer-events-none overflow-hidden transition-all opacity-0 peer-hover:opacity-90`}>
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
        </span>

        {/* View === all? */}
        <span id="all"  className={`sticky top-0 flex flex-col items-center justify-center ${view==="txt"? "hidden": ""}`}>
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
            <button className={`px-2 z-10 ${selectedProject===project.slug? "my-2 text-gray-400 bg-white hover:bg-gray-400 hover:text-white": "absolute top-5 text-white bg-gray-400 text-white hover:text-gray-400 hover:bg-white"}`}
            onClick={projectClick}>{project.name}</button>
        </span>

        {/* project open? */}
        <span id="open" className={`w-screen overflow-hidden text-gray-400 flex flex-col justify-start items-center transition-all ${selectedProject===project.slug? "h-screen":'h-0'} `}>
            {/* current image */}
            {project.vimeo?.map((vid, index)=>(
                <div key={`project.slug+${index}`} className={`peer lg:h-[40rem] lg:w-[71rem] h-[14rem] w-[24rem]  ${selectedProject===project.slug? img===index? "":"hidden": view==="all"? "": "hidden"}`}>
                    <div className={`relative overflow-hidden w-full pt-[56.25%]`}>
                        <iframe className="absolute top-0 left-0 w-full h-full" src={`https://player.vimeo.com/video/${vimeoIDs[index]}?loop=1&title=0&byline=0&portrait=0`} allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    </div>
                </div>
            ))}
            {project.images?.map((image, index)=>(
                <div key={`project.slug+${index+vimeoCount}`} className={`peer flex justify-center items-center ${selectedProject===project.slug? img===index+vimeoCount? "":"hidden": ""}`}>
                    <Image
                    src={urlForImage(image).url()}
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

            <span className={`lg:absolute lg:top-[58%] lg:peer-hover:opacity-100 lg:hover:opacity-100 lg:opacity-0 transition-all flex lg:text-5xl text-2xl items-between justify-between ${selectedProject===project.slug? "py-1 lg:m-5":"hidden"}`}>
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

            {/* BIO */}
            <div className="mx-40 flex text-white text-center lg:text-5xl text-2xl mt-5"><PortableText value={project.content}/></div>
            
            {/* FILTERS! */}
            <div className="flex w-screen flex-col lg:flex-row justify-center items-center mx-5">
            {Object.entries(filters).map(([key, array])=>{
                return(
                    <span key={key} className="capitalize">
                        {array.map((filter:any, idx:any)=>{
                            return (
                                <button 
                                style={{[`${key==="roles"? "--r": key==="collabs"? "--c": key==="tags"? "--t": ""}` as any]:idx+1}}
                                key={`${filter}${idx}`}
                                onClick={()=>{
                                    searchParams.getAll(`${key}`).includes(filter)?
                                    router.push(`/?${createQueryString(`${key}`, ``)}`, {scroll: false})
                                    : router.push( `/?${createQueryString(`${key}`, `${filter}`)}`, {scroll: false})
                                }}
                                className={`px-2 my-1 mx-2 lg:text-2xl text-2xl w-fit whitespace-nowrap text-gray-400}
                                ${searchParams.get(key)?.includes(filter)? "bg-gray-400 text-white hover:bg-white hover:text-gray-400":"bg-white text-gray-400 hover:bg-gray-400 hover:text-white" }`
                                }>
                                    {`${filter}`}
                                </button>
                            )
                        })}
                    </span>
                )
            })}
            </div>
        </span> 
    </section>
)
}  