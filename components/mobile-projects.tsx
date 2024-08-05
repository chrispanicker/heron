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
    const blurClass = ' backdrop-blur-sm backdrop-brightness-[.8] ';
    const buttonClass = ' lg:relative lg:top-auto top-[48vh] hover:bg-white hover:text-gray-400 mx-2 z-30'
    const textClass = "text-lg leading-[1.5rem] "

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
    <section key={`${project.slug}`} className={`flex flex-col justify-center items-center bg-gray-400 transition-all `}>

        {/* view === grid? */}
        <span id="grid" className={`flex flex-col justify-start items-start overflow-hidden transition-all duration-500 lg:h-[24rem] h-[17rem] ${selectedProject? "blur-2xl": ""} ${view==="full"? "hidden": ""} `}>
            <button className={`peer z-20 transition-all ${selectedProject===project.slug? "" : "hover:blur-none hover:text-white hover:bg-gray-400"}`}                         
            onClick={projectClick}>
                    <Image
                    src={urlForImage(project.preview).url()}
                    alt=""
                    width={1080}
                    height={1080}
                    unoptimized={urlForImage(project.preview).url().includes(".gif")? true: false}
                    className={`lg:h-[22rem] lg:w-[22rem] lg:hover:h-[22rem] h-[12rem] object-cover transition-all`}
                    loading="lazy"
                    />
            </button>

            <button className={`peer z-20 px-1 ${blurClass} lg:mt-2 mt-1 transition-all whitespace-nowrap peer-hover:bg-white peer-hover:text-gray-400 hover:bg-white hover:text-gray-400`}                         
                    onClick={projectClick}>{project.name}
            </button>
        </span>

        {/* view ===full? */}
        <span id="full" className={`flex z-0 relative snap-start snap-always flex-col items-center justify-center overflow-hidden transition-all duration-500 ${view==="full"? "": "hidden"} ${selectedProject===project.slug? "h-auto": "h-[100dvh]"} ${selectedProject? "blur-2xl": ""}`}>
            
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
        <span className={`fixed bottom-0 left-0 w-screen z-40 overflow-y-hidden flex w-screen flex-col justify-center items-center transition-all duration-500 
        ${selectedProject===project.slug? `h-[100dvh] opacity-100` : "h-0 blur-3xl"}`}
        >
            <div className={`flex justify-center items-center z-40 mb-2`}>
                <button className={`peer transition-all`}                         
                onClick={projectClick}><h3 className={`text-4xl hover:bg-white hover:text-gray-400 px-1`}>{project.name}</h3>
                </button>
                <button className={`peer transition-all mx-2 ${blurClass}`}                         
                onClick={projectClick}><h3 className={`hover:bg-white hover:text-gray-400 px-1 lg:py-0 ${textClass}`}>Close</h3>
                </button>
            </div>

            <div className="w-screen overflow-x-scroll snap-x snap-mandatory z-40 mb-2">
                <span className={`flex left-0 mx-2 ${vimeoCount+imageCount===1? "justify-center items-center pointer-events-none": "w-max justify-start items-start"}`}>
                    {/* current image */}
                    {project.vimeo?.map((vid, index)=>(
                        <div key={`project.slug+${index}`} className={`pointer-events-auto px-2 snap-center snap-always peer flex justify-center items-center lg:h-[27rem] lg:w-[48rem] min-[1500px]:h-[36rem] min-[1500px]:w-[64rem] h-[17rem] w-[30rem]  ${selectedProject===project.slug? img===index? "":"": view==="full"? "hidden": "hidden"}`}>
                            {/* main gallery vimeo */}
                            <div className={`relative overflow-hidden w-full pt-[56.25%]`}>
                                <iframe className="absolute top-0 left-0 w-full h-full" src={`https://player.vimeo.com/video/${vimeoIDs[index]}?loop=1&title=0&byline=0&portrait=0`} allow="autoplay; fullscreen; picture-in-picture"></iframe>
                            </div>
                        </div>
                    ))}

                    {project.images?.map((image, index)=>(
                        <div key={`project.slug+${index+vimeoCount}`} className={`px-2 snap-center snap-always peer pb-2 flex justify-center items-center`}>
                            {/* main nav gallery images */}
                            <Image
                            src={urlForImage(image).url()}
                            alt=""
                            width={1080}
                            height={1080}
                            className={`object-contain cursor-zoom-in h-[17rem] lg:h-[27rem] min-[1500px]:h-[36rem] w-auto transition-all pointer-events-auto ${selectedProject===project.slug? "": ""}`}
                            loading="lazy"
                            onClick={()=>{
                                let img = document.querySelector(`#mobile-${project.slug+index}`)
                                if(img?.classList.contains("opacity-0")){
                                    img.classList.replace("cursor-zoom-in", "cursor-zoom-out")
                                    img.classList.replace("opacity-0", "opacity-100")
                                    img.classList.remove("pointer-events-none")
                                    img?.classList.remove("hidden")
                                }else{
                                    img?.classList.replace("cursor-zoom-out", "cursor-zoom-in")
                                    img?.classList.replace("opacity-100", "opacity-0")
                                    img?.classList.add("pointer-events-none")
                                    setTimeout(()=>{img?.classList.add("hidden")}, 500)
                                }

                            }}
                            placeholder="blur"
                            blurDataURL={`${project.gallery[index].lqip}`}
                            unoptimized={urlForImage(project.preview).url().includes(".gif")? true: false}
                            />

                            <Image
                            src={urlForImage(image).url()}
                            id={`mobile-${project.slug+index}`}
                            alt=""
                            width={1080}
                            height={1080}
                            className={`object-contain backdrop-blur-2xl left-0 z-50 top-0 fixed overflow-hidden cursor-zoom-in w-[100dvw] h-[100dvh] transition-all hidden ${selectedProject===project.slug? "opacity-0 pointer-events-none": "hidden"}`}
                            onClick={()=>{
                                let img = document.querySelector(`#mobile-${project.slug+index}`)
                                if(img?.classList.contains("opacity-0")){
                                    img.classList.replace("cursor-zoom-in", "cursor-zoom-out")
                                    img.classList.replace("opacity-0", "opacity-100")
                                    img.classList.remove("pointer-events-none")
                                }else{
                                    img?.classList.replace("cursor-zoom-out", "cursor-zoom-in")
                                    img?.classList.replace("opacity-100", "opacity-0")
                                    img?.classList.add("pointer-events-none")
                                }
                            }}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={`${project.gallery[index].lqip}`}
                            unoptimized={urlForImage(project.preview).url().includes(".gif")? true: false}
                            />
                        </div>
                    ))}
                </span>
            </div>

            {/* BIO */}
            <div className={`z-10 flex w-screen text-center justify-center items-center lg:px-32 px-2 pb-2 ${textClass}`}><PortableText value={project.content}/></div>
            
            {/* FILTERS! */}
            <div ref={filterRef} className="z-10 lg:flex lg:flex-row text-center  justify-center items-center mx-5">
            {Object.entries(filters).map(([key, array])=>{
                return(
                    <span key={key} className="capitalize lg:flex justify-center items-center">
                        {array.map((filter:any, idx:any)=>{
                            
                            return (
                                <button 
                                // style={{[`${key==="roles"? "--r": key==="collabs"? "--c": key==="tags"? "--t": ""}` as any]:idx+1}}
                                key={`${filter}${idx}`}
                                onClick={()=>{
                                    router.push( `/?${createQueryString(`${key}`, `${filter}`)}`)
                                }}
                                className={`${textClass + blurClass} px-1 mx-1 mb-2 w-fit whitespace-nowrap 
                                ${searchParams.getAll(key)?.includes(filter)? "bg-white text-gray-400": "hover:bg-white hover:text-gray-400"}`}
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
            className={`w-screen h-screen absolute top-0 cursor-alias transition-all bg-[#000000] opacity-40 ${selectedProject===project.slug? ``: "hidden"}`}
            onClick={projectClick}
            />
        </span> 
    </section>
)
}  