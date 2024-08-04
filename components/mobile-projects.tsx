"use client"
import { urlForImage } from "@/sanity/lib/image"
import { Project } from "@/types/project"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react"

interface Props{
    filteredProjects:any
    project: Project
    index: number
}

export default function MobileProjects({project}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();    
    const view = searchParams.get('view');
    const selectedProject = searchParams.get("project")
    const img = Number(searchParams.get('img'));
    const vimeoCount = project.vimeo? project.vimeo.length: 0;
    const imageCount = project.images? project.images.length: 0;
    const galleryCount = vimeoCount + imageCount;
    const filterRef = useRef<HTMLDivElement | null>(null)
    const txtRef = useRef<HTMLElement | null>(null)
    const blurClass = ' backdrop-blur-sm backdrop-brightness-[.7] ';
    const buttonClass = ' lg:relative lg:top-auto top-[48vh] hover:bg-white hover:text-gray-400 mx-2 z-30 px-2 '
    const textClass = " lg:text-xl lg:leading-auto text-[1rem] leading-[1.2rem] "

    let vimeoIDs:string[] = [];
    let allRoles:string[] = [];
    let allTags:string[] = []
    let allCollabs:string[] = [];
    let toggleBG: any;
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

    useEffect(()=>{
        if(selectedProject===project.slug){
            project.tags?.map((tag:any)=>{
                document.getElementById(tag.name)?.classList.add('bg-black', 'text-white')    
            })
            project.roles?.map((role:any)=>{
                document.getElementById(role.name)?.classList.add('bg-black', 'text-white')   
            })
            project.collabs?.map((collab:any)=>{
                document.getElementById(collab.name)?.classList.add('bg-black', 'text-white') 
            })
        }
    }, [filterRef])

    project.vimeo?.map((vid, index)=>{
        vimeoIDs[index]=vid.replace("https://vimeo.com/", "")
    })

    const updateQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        }, [searchParams]
    )  

    const createQueryString = useCallback(
        (name: string, value: string) => {
            let params;
            let stringSearchParams = searchParams.toString()
            stringSearchParams = stringSearchParams.replaceAll("+", " ")
            params = new URLSearchParams(stringSearchParams)

            if(name==="project"||name==="img"){
                if (stringSearchParams.includes(`${name}=${value}`)){
                    params.delete(name, value)
                    params.delete("img", params?.get("img")!)
                }else{
                    params.set(name, value)
                    params.set("img", "0")
                } 
            } 

            if(name==="roles"||"tags"||"collabs" && selectedProject){
                params.delete("project", params?.get("project")!)
                document.querySelectorAll(".bg-black").forEach((e)=>{
                    e.classList.remove('bg-black')
                })
            } 
            
            
            name==="project"||name==="img"? 
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

    const projectClick = () =>{
        router.push( `/?${createQueryString(`project`, `${project.slug}`)}`, { scroll: false })
        
        
        if(selectedProject===project.slug){
            project.tags?.map((tag:any)=>{
                let el = document.getElementById(tag.name)
                el?.classList.contains('bg-black')?
                el?.classList.remove('bg-black', 'text-white'): ""
            })
            project.roles?.map((role:any)=>{
                let el = document.getElementById(role.name)
                el?.classList.contains('bg-black')?
                el?.classList.remove('bg-black', 'text-white'): ""
            })
            project.collabs?.map((collab:any)=>{
                let el = document.getElementById(collab.name)
                el?.classList.contains('bg-black')?
                el?.classList.remove('bg-black', 'text-white'): ""
            })
        }else{
            let bgEls =Object.entries(document.getElementsByClassName('bg-black')).map((element)=>{
                return element[1].classList.remove('bg-black', 'text-white')
            })
            project.tags?.map((tag:any)=>{
                let el = document.getElementById(tag.name)
                el?.classList.contains('bg-black')? el?.classList.contains('selection')?
                "": el?.classList.add('bg-black', 'text-white') : el?.classList.add('bg-black')
            })
            project.roles?.map((role:any)=>{
                let el = document.getElementById(role.name)
                el?.classList.contains('bg-black')? el?.classList.contains('selection')?
                "": el?.classList.add('bg-black', 'text-white') : el?.classList.add('bg-black')
            })
            project.collabs?.map((collab:any)=>{
                let el = document.getElementById(collab.name)
                el?.classList.contains('bg-black')? el?.classList.contains('selection')?
                "": el?.classList.add('bg-black', 'text-white') : el?.classList.add('bg-black')
            })
        }
    }
    

return(
    <section key={`${project.slug}`} className={`flex flex-col justify-center items-center bg-gray-400 lg:text-xl text-lg transition-all ${view==="txt" && selectedProject===project.slug? "": ""} ${view==="txt"? "": ""}`}>
                {/* view ===txt? */}
                <span ref={txtRef} id="txt" className={`z-0 group flex flex-col items-center justify-center leading-0 ${selectedProject? "blur-lg":""} ${view==="txt"? "lg:text-5xl text-2xl": "hidden"} `}>
                    <div className="flex justify-center items-center">
                        <button className={`peer z-20 transition-all text-white ${selectedProject===project.slug? "":""}`}                         
                        onClick={projectClick}><h3 className="hover:bg-white hover:text-gray-400 leading-9 px-2 lg:py-2">{project.name}</h3>
                        </button>
                        <button className={`peer z-20 transition-all text-white text-xl mx-2 ${blurClass} ${selectedProject===project.slug? "":"hidden"}`}                         
                        onClick={projectClick}><h3 className={`hover:bg-white hover:text-gray-400 px-2 py-1 lg:py-0 ${textClass}`}>Close</h3>
                        </button>

                    </div>
            
            {/* <Image
                src={urlForImage(project.preview).url()}
                alt=""
                width={1080}
                height={1080}
                className={`w-screen fixed h-screen z-0 object-cover pointer-events-none top-0 peer-hover:opacity-100 opacity-0 duration-1000 transition-all ${selectedProject===project.slug? "hidden": ""}`}
                // placeholder="blur"
                // blurDataURL={`${project.gallery[index].lqip}`}
            /> */}
        </span>

        {/* view ===all? */}
        <span id="all" className={`flex z-0 relative snap-start snap-always flex-col items-center justify-center overflow-hidden transition-all duration-500 ${view==="all"? "": "hidden"} ${selectedProject===project.slug? "h-auto": "h-[100dvh]"} ${selectedProject? "blur-2xl": ""}`}>
            
            <button className={`peer absolute top-5 z-30 text-3xl transition-all peer-hover:bg-white peer-hover:text-gray-400 px-2 ${blurClass} ${selectedProject===project.slug? "": ""}`}                         
                    onClick={projectClick}>{project.name}
            </button>

            <button className={`group peer z-20 flex justify-center items-center transition-all ${selectedProject===project.slug? "z-40" : "hover:blur-none hover:text-white hover:bg-gray-400 z-0"}`}                         
            onClick={projectClick}>
                    <Image
                    src={urlForImage(project.preview).url()}
                    alt=""
                    width={1080}
                    height={1080}
                    unoptimized={urlForImage(project.preview).url().includes(".gif")? true: false}
                    className={`w-screen h-screen object-cover z-20`}
                    loading="lazy"
                    />
            </button>

        </span>

        {/* project open? */}
        <span className={`z-40 overflow-x-hidden flex w-screen flex-col justify-center items-center transition-all ${view==="txt"? "": "w-screen"}  
        ${selectedProject===project.slug? `fixed top-0 left-0 w-screen h-[100dvh] left-0 z-40 justify-start opacity-100`: "h-0 z-0"}`}
        >
            <div className={`flex justify-center items-center z-40 mb-5`}>
                <button className={`peer transition-all ${blurClass} ${selectedProject===project.slug? "":""}`}                         
                onClick={projectClick}><h3 className="hover:bg-white text-2xl hover:text-gray-400 leading-10 px-2">{project.name}</h3>
                </button>
                <button className={`peer transition-all ${blurClass} mx-2 ${selectedProject===project.slug? "":"hidden"}`}                         
                onClick={projectClick}><h3 className={`hover:bg-white hover:text-gray-400 px-2 py-1 lg:py-0 ${textClass}`}>Close</h3>
                </button>
            </div>
            <div className="w-screen overflow-x-scroll snap-x snap-mandatory z-40 mb-2">
                <span className={`flex left-0 mx-2 ${vimeoCount+imageCount===1? "justify-center items-center w-screen": "px-20 w-max justify-start items-start"}`}>
                    {/* current image */}
                    {project.vimeo?.map((vid, index)=>(
                        <div key={`project.slug+${index}`} className={`snap-center snap-always peer flex justify-center items-center h-[17rem] w-[30rem]  ${selectedProject===project.slug? img===index? "":"": view==="all"? "hidden": "hidden"}`}>
                            {/* main gallery vimeo */}
                            <div className={`relative overflow-hidden w-full pt-[56.25%]`}>
                                <iframe className="absolute top-0 left-0 w-full h-full" src={`https://player.vimeo.com/video/${vimeoIDs[index]}?loop=1&title=0&byline=0&portrait=0`} allow="autoplay; fullscreen; picture-in-picture"></iframe>
                            </div>
                        </div>
                    ))}

                    {project.images?.map((image, index)=>(
                        <div key={`project.slug+${index+vimeoCount}`} className={`snap-center snap-always peer pb-2 mx-2 flex justify-center items-center ${selectedProject===project.slug? img===index+vimeoCount? "":"": "hidden"}`}>
                            {/* main nav gallery images */}
                            <Image
                            src={urlForImage(image).url()}
                            id={`mobile-${project.slug+index}`}
                            alt=""
                            width={1080}
                            height={1080}
                            className={`object-cover cursor-zoom-in ${selectedProject===project.slug? "h-[17rem] w-auto": "h-0"} ${selectedProject===project.slug? img===index+vimeoCount? "":"": ""}`}
                            loading="lazy"
                            onClick={()=>{
                                let img = document.querySelector(`#mobile-${project.slug+index}`)
                                if(img?.classList.contains("h-[17rem]")){
                                    img.classList.replace("h-[17rem]", "h-[100dvh]")
                                    img.classList.replace("w-auto", "w-[100dvw]")
                                    img.classList.replace("cursor-zoom-in", "cursor-zoom-out")
                                    img.classList.replace("object-cover", "object-contain")
                                    img.classList.add("fixed", "top-0", "left-0", "z-50", "bg-gray-400")
                                }else{
                                    img?.classList.replace("h-[100dvh]", "h-[17rem]")
                                    img?.classList.replace("w-[100dvw]", "w-auto")
                                    img?.classList.replace("cursor-zoom-out", "cursor-zoom-in")
                                    img?.classList.replace("object-contain", "object-cover")
                                    img?.classList.remove("fixed", "top-0", "left-0",  "z-50", "bg-gray-400")
                                }
                            }}
                            // placeholder="blur"
                            // blurDataURL={`${project.gallery[index].lqip}`}
                            unoptimized={urlForImage(project.preview).url().includes(".gif")? true: false}
                            />
                        </div>
                    ))}
                </span>
            </div>
            {/* BIO */}
            <div className={`z-0 flex w-screen text-center justify-center items-center lg:px-32 px-2 mb-5 py-2 ${blurClass+textClass}`}><PortableText value={project.content}/></div>
            
            {/* FILTERS! */}
            <div ref={filterRef} className="z-10 lg:flex lg:flex-row text-center  justify-center items-center mx-5">
            {Object.entries(filters).map(([key, array])=>{
                return(
                    <span key={key} className="capitalize lg:flex justify-center items-center my-1">
                        {array.map((filter:any, idx:any)=>{
                            
                            return (
                                <button 
                                // style={{[`${key==="roles"? "--r": key==="collabs"? "--c": key==="tags"? "--t": ""}` as any]:idx+1}}
                                key={`${filter}${idx}`}
                                onClick={()=>{
                                    router.push( `/?${createQueryString(`${key}`, `${filter}`)}`)
                                }}
                                className={`px-2 ${blurClass + textClass} mx-2 py-1 lg:py-0 my-1 w-fit whitespace-nowrap 
                                ${searchParams.getAll(key)?.includes(filter)? "bg-white text-gray-400":"hover:bg-white hover:text-gray-400"}`}
                                >
                                    {`${filter}`}
                                </button>
                            )
                        })}
                    </span>
                )
            })}
            </div>
            <button 
            className={`w-screen h-screen absolute top-0 z-0 ${selectedProject===project.slug? "block": "hidden"}`}
            onClick={projectClick}
            />
        </span> 
    </section>
)
}  