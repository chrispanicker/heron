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

export default function Projects({project}: Props) {
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
    const buttonClass = ' lg:relative lg:top-auto top-[48vh] fixed hover:bg-white hover:text-gray-400 mx-2 z-30 px-2 '
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
            params.delete(name, value):  params.set(name, value):

            stringSearchParams.includes(`${name}=${value}`)?
            params.delete(name, value):params.append(name, value)
            return params.toString()
        },
        [searchParams]
    )

    const projectClick = () =>{
        router.push( `/?${createQueryString(`project`, `${project.slug}`)}`, { scroll: false})
        setTimeout(()=>{
            selectedProject? "": document.querySelector(`#${project.slug}`)?.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
        }, 200)
        
        
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
    <section key={`${project.slug}`} className={`flex flex-col justify-center items-center bg-gray-400 lg:text-xl text-lg transition-all ${view==="txt" && selectedProject===project.slug? "h-screen pb-5": ""} ${selectedProject===project.slug? " ": view==="txt"? "lg:h-[5rem]": ""}
    ${selectedProject && selectedProject!=project.slug && view === "all"? "blur-2xl": ""}`}>
        {/* view ===txt? */}
        <span ref={txtRef} id="txt" className={`group flex flex-col items-center justify-centers leading-none transition-all ${selectedProject===project.slug? "":""} ${view==="txt"? "text-5xl": "hidden"} `}>
            <div className="flex justify-center items-center">
                <button className={`peer z-20 transition-all text-white ${selectedProject===project.slug? "mb-2":""}`}                         
                onClick={projectClick}><h3 className="hover:bg-white hover:text-gray-400 leading-10 px-2 lg:py-2">{project.name}</h3>
                </button>
                <button className={`peer z-20 transition-all text-white mx-2 ${blurClass} ${selectedProject===project.slug? "":"hidden"}`}                         
                onClick={projectClick}><h3 className={`hover:bg-white hover:text-gray-400 px-1 text-[1rem] leading-[1.4rem] py-0 w-fit whitespace-nowrap`}>Close</h3>
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
            
            <div ref={filterRef} className="flex flex-col lg:flex-row justify-center items-center mx-5">
                <div className={`transition-all overflow-hidden lg:flex hidden ${selectedProject===project.slug? "h-0": "group-hover:h-[3rem] h-0"}`}>
                    {Object.entries(filters).map(([key, array])=>{
                        return(
                            <span key={key} className="capitalize flex justify-center items-center my-1">
                                {array.map((filter:any, idx:any)=>{
                                    return (
                                        <button 
                                        style={{[`${key==="roles"? "--r": key==="collabs"? "--c": key==="tags"? "--t": ""}` as any]:idx+1}}
                                        key={`${filter}${idx}`}
                                        onClick={()=>{
                                            router.push( `/?${createQueryString(`${key}`, `${filter}`)}`)
                                            document.querySelectorAll("#bg-black").forEach((e)=>{
                                                e.classList.remove("bg-black")
                                                console.log(e)
                                            })
                                        }}
                                        className={`px-1 ${blurClass} text-[1rem] leading-[1.4rem] mx-1 py-0 my-1 w-fit whitespace-nowrap 
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
            </div>
        </span>

        {/* view ===all? */}
        <span id="all" className={`flex flex-col items-center justify-center overflow-hidden ${selectedProject===project.slug? "h-auto": "h-[19rem] px-5"} ${selectedProject && selectedProject===project.slug? "blur-2xl": ""} ${view==="all"? "py-2": "hidden"} `}>
            <button className={`group peer z-20 flex justify-center items-center transition-all ${selectedProject===project.slug? "" : "hover:blur-none hover:text-white hover:bg-gray-400"}`}                         
            onClick={projectClick}>
                    <Image
                    src={urlForImage(project.preview).url()}
                    alt=""
                    width={1080}
                    height={1080}
                    unoptimized={urlForImage(project.preview).url().includes(".gif")? true: false}
                    className={`w-auto hover:h-[16rem] h-[15rem] transition-all object-cover`}
                    loading="lazy"
                    />
            </button>

            <button className={`peer z-20 px-2 mt-2 transition-all peer-hover:bg-white peer-hover:text-gray-400 ${selectedProject===project.slug? "": ""}`}                         
                    onClick={projectClick}>{project.name}
            </button>
        </span>

        {/* project open? */}
        <span id={`${project.slug}`} className={`overflow-hidden flex flex-col justify-start items-center transition-all ${view==="txt"? "": "w-screen"}  
        ${selectedProject===project.slug? view==="all"? `fixed top-0 left-0 w-screen h-screen left-0 z-40 justify-center opacity-100`: "max-h-[1000vh]" : "h-0"}`}
        >
            {/* invisible closing div */}
            <div>
                <button className={` ${selectedProject===project.slug? "w-full h-[20%] fixed top-0 z-10 cursor-alias":"hidden"}`} onClick={projectClick}>
                </button>
            </div>
            <div className={`flex justify-center items-center mb-5 ${view==="all"? "":"hidden"}`}>
                <button className={`peer z-20 transition-all text-white${blurClass} ${selectedProject===project.slug? "":""}`}                         
                onClick={projectClick}><h3 className="hover:bg-white text-3xl hover:text-gray-400 leading-10 px-2">{project.name}</h3>
                </button>
                <button className={`peer z-20 transition-all text-white mx-2 ${blurClass} ${selectedProject===project.slug? "":"hidden"}`}                         
                onClick={projectClick}><h3 className={`hover:bg-white hover:text-gray-400 px-1 text-[1rem] leading-[1.4rem] py-0 w-fit whitespace-nowrap`}>Close</h3>
                </button>
            </div>
            {/* current image */}
            {project.vimeo?.map((vid, index)=>(
                <div key={`project.slug+${index}`} className={`peer flex justify-center items-center max-[1500px]:h-[30rem] max-[1500px]:w-[53.333333rem] h-[40rem] w-[71rem]  ${selectedProject===project.slug? img===index? "":"hidden": view==="all"? "hidden": "hidden"}`}>
                    {/* arrow nav */}
                    {galleryCount===1? ""
                    :<div className="absolute flex h-[70%] w-full lg:block hidden">
                        <button className="cursor-w-resize bg-blue h-[100%] w-[50%] px-2" onClick={()=>{
                        img===0?
                        router.push( `/?${updateQueryString(`img`, `${galleryCount-1}`)}`, {scroll: false}):
                        router.push( `/?${updateQueryString(`img`, `${img-1}`)}`, {scroll: false})
                        }}> </button>
                        <button className="cursor-e-resize  h-[100%] w-[50%] px-2" onClick={()=>{
                        img===galleryCount-1?
                        router.push( `/?${updateQueryString(`img`, `0`)}`, {scroll: false}):
                        router.push( `/?${updateQueryString(`img`, `${img+1}`)}`, {scroll: false})
                        }}></button>
                    </div>}
                    {/* main gallery vimeo */}
                    {galleryCount===1? ""
                    :<button className={`left-0 ${buttonClass + blurClass + textClass}`} onClick={()=>{
                        img===0?
                        router.push( `/?${updateQueryString(`img`, `${galleryCount-1}`)}`, {scroll: false}):
                        router.push( `/?${updateQueryString(`img`, `${img-1}`)}`, {scroll: false})
                    }}>Prev</button>}
                    <div className={`relative overflow-hidden w-full pt-[56.25%]`}>
                        <iframe className="absolute top-0 left-0 w-full h-full" src={`https://player.vimeo.com/video/${vimeoIDs[index]}?loop=1&title=0&byline=0&portrait=0`} allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    </div>
                    {galleryCount===1? ""
                    :<button className={`right-0 ${buttonClass + blurClass + textClass}`} onClick={()=>{
                        img===galleryCount-1?
                        router.push( `/?${updateQueryString(`img`, `0`)}`, {scroll: false}):
                        router.push( `/?${updateQueryString(`img`, `${img+1}`)}`, {scroll: false})
                    }}>Next</button>}
                </div>
            ))}

            {project.images?.map((image, index)=>(
                <div key={`project.slug+${index+vimeoCount}`} className={`peer pb-5 flex justify-center items-center ${selectedProject===project.slug? img===index+vimeoCount? "":"hidden": "hidden"}`}>
                    
                    {/* main nav gallery images */}
                    {galleryCount===1? ""
                    :<button className={`left-0 ${buttonClass + blurClass} px-1 text-[1rem] leading-[1.4rem] mx-1 py-0 my-1 w-fit whitespace-nowrap`} onClick={()=>{
                        img===0?
                        router.push( `/?${updateQueryString(`img`, `${galleryCount-1}`)}`, {scroll: false}):
                        router.push( `/?${updateQueryString(`img`, `${img-1}`)}`, {scroll: false})
                    }}>Prev</button>}
                    <Image
                    src={urlForImage(image).url()}
                    id={`${project.slug+index}`}
                    alt=""
                    width={1080}
                    height={1080}
                    className={`object-cover z-30 cursor-zoom-in transition-all ${selectedProject===project.slug? "max-[1500px]:h-[30rem] h-[40rem] w-auto": "h-0"} ${selectedProject===project.slug? img===index+vimeoCount? "":"": ""}`}
                    loading="lazy"
                    onClick={()=>{
                        let img = document.querySelector(`#${project.slug+index}`)
                        if(img?.classList.contains("max-[1500px]:h-[30rem]" || "h-[40rem]")){
                            img.classList.remove("max-[1500px]:h-[30rem]", "h-[40rem]")
                            img.classList.add("h-[100dvh]")
                            img.classList.replace("w-auto", "w-[100dvw]")
                            img.classList.replace("cursor-zoom-in", "cursor-zoom-out")
                            img?.classList.replace("object-cover", "object-contain")
                            img.classList.add("fixed", "top-0", "z-50", "bg-gray-400")
                        }else{
                            img?.classList.remove("h-[100dvh]")
                            img?.classList.add("max-[1500px]:h-[30rem]", "h-[40rem]")
                            img?.classList.replace("w-[100dvw]", "w-auto")
                            img?.classList.replace("object-contain", "object-cover")
                            img.classList.replace("cursor-zoom-out", "cursor-zoom-in")
                            img?.classList.remove("fixed", "top-0", "z-50", "bg-gray-400")
                        }
                    }}
                    placeholder={urlForImage(image).url().includes(".gif")? "empty": "blur"}
                    blurDataURL={`${project.gallery[index].lqip}`}
                    unoptimized={urlForImage(project.preview).url().includes(".gif")? true: false}
                    />
                    {galleryCount===1? ""
                    :<button className={`right-0 py-1 lg:py-0 ${buttonClass + blurClass} px-1 text-[1rem] leading-[1.4rem] mx-1 py-0 my-1 w-fit whitespace-nowrap`} onClick={()=>{
                        img===galleryCount-1?
                        router.push( `/?${updateQueryString(`img`, `0`)}`, {scroll: false}):
                        router.push( `/?${updateQueryString(`img`, `${img+1}`)}`, {scroll: false})
                    }}>Next</button>}
                    
                    {/* arrow nav gallery */}
                    {galleryCount===1? ""
                    :<div className="absolute flex h-[50%] w-full lg:block hidden z-0">
                        <button className="cursor-w-resize decoration-dotted h-[100%] w-[50%] px-2" onClick={()=>{
                        img===0?
                        router.push( `/?${updateQueryString(`img`, `${galleryCount-1}`)}`, {scroll: false}):
                        router.push( `/?${updateQueryString(`img`, `${img-1}`)}`, {scroll: false})
                        }}> </button>
                        <button className="cursor-e-resize decoration-dotted h-[100%] w-[50%] px-2" onClick={()=>{
                        img===galleryCount-1?
                        router.push( `/?${updateQueryString(`img`, `0`)}`, {scroll: false}):
                        router.push( `/?${updateQueryString(`img`, `${img+1}`)}`, {scroll: false})
                        }}></button>
                    </div>}
                </div>
            ))}

            {/* BIO */}
            <div className={`flex w-screen text-center justify-center items-center lg:px-32 px-5 pb-2 ${textClass}`}><PortableText value={project.content}/></div>
            
            {/* FILTERS! */}
            <div ref={filterRef} className="lg:flex lg:flex-row text-center  justify-center items-center mx-5">
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
                                    document.querySelectorAll("#bg-black").forEach((e)=>{
                                        e.classList.remove("bg-black")
                                        console.log(e)
                                    })
                                }}
                                className={`px-1 ${blurClass} text-[1rem] leading-[1.4rem] mx-1 py-0 my-1 w-fit whitespace-nowrap 
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
        </span> 
    </section>
)
}  