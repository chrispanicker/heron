"use client"
import { urlForImage } from "@/sanity/lib/image"
import { Project } from "@/types/project"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";
import { getPlaiceholder } from "plaiceholder"
import { useCallback, useEffect, useRef } from "react"

interface Props{
    filteredProjects:any
    project: Project
    index: number
}


  
    // const plaiceholder = getPlaiceholder(buffer);

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
    // const hoverClass = "outline outline-1 outline-black"

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
        // document.querySelector("html")?.classList.contains("overflow-y-hidden")? document.querySelector("html")?.classList.remove("overflow-y-hidden") : document.querySelector("html")?.classList.add("overflow-y-hidden")
        
        
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
    <section key={`${project.slug}`} className={`flex flex-col justify-center items-start transition-all ${view==='full'?"":"mb-4 lg:mb-0"}`}>

        {/* view === grid || list? */}
        <span id="grid" className={`group relative flex flex-col justify-center items-center overflow-hidden transition-[height] transition-[border-radius] duration-500
        ${view==="grid"? `rounded-md hover:rounded-xl hover:outline outline-3 outline-white`: view==="list"? "lg:h-[5rem]": ""} 
        ${selectedProject? view==="grid"? "blur-2xl": `blur-md`: ""} 
        ${view==="grid"||"list"? "": "hidden"} `}>
            <button className={`peer z-20 transition-all  ${selectedProject===project.slug? "" : "hover:blur-none hover:text-white hover:bg-gray-400"}`}onClick={projectClick}>
                <Image
                src={urlForImage(project.preview).url()}
                alt=""
                id={`${project.slug}-preview`}
                width={1080}
                height={1080}
                unoptimized={true}
                placeholder="blur"
                priority
                blurDataURL={`${project.preview.lqip}`}
                className={`w-auto lg:h-[20rem] h-[10rem] object-cover transition-all blur-auto duration-500 ${view==="list"|| view==="full"? "hidden": ""}`}
                />
            </button>

            <div className={`${view==="list"? " group lg:text-5xl text-3xl flex flex-col justify-center items-center": "absolute "} top-0 peer z-20`}>
                <button className={`group-hover:text-black group-hover:bg-white peer-hover:text-black px-1 tracking-[-0.03rem] w-fit ${view==="list"? "": `${blurClass}`} `} onClick={projectClick}>{project.name}</button>
                <div ref={filterRef} className={`z-10 sans  text-center justify-center items-center overflow-hidden h-0 lg:group-hover:h-[2rem] transition-[height] duration-100 w-0 lg:w-auto ${view==="list"? "lg:flex": "hidden"}`}>
                    {Object.entries(filters).map(([key, array])=>{
                        return(
                            <span key={key} className="capitalize lg:flex justify-center items-center text-[1rem] leading-[19px] pt-2">
                                {array.map((filter:any, idx:any)=>{
                                    return (
                                        <button 
                                        // style={{[`${key==="roles"? "--r": key==="collabs"? "--c": key==="tags"? "--t": ""}` as any]:idx+1}}
                                        key={`${filter}${idx}`}
                                        onClick={()=>{
                                            router.push( `/?${createQueryString(`${key}`, `${filter}`)}`, {scroll: false})
                                        }}
                                        className={` backdrop-blur-sm  ${key==="roles"? "backdrop-brightness-[.4]": key==="tags"? "backdrop-brightness-[.8]": "backdrop-brightness-[.6]"}  px-1 py-[.1rem] mx-1 w-fit whitespace-nowrap
                                        ${searchParams.getAll(key)?.includes(filter)? "bg-white text-black": `text-white hover:bg-white hover:text-black`}`}
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

        {/* project open? */}
        <span className={`fixed bottom-0 left-0 z-40 overflow-y-hidden flex  flex-col justify-center items-center transition-all duration-1000 lg:pt-0 pt-5 
        ${selectedProject===project.slug? `h-[100dvh] opacity-100` : "h-0 blur-3xl"}`}>
            <button className={`peer transition-all mx-2 mb-2 z-30 absolute top-5 ${blurClass}`}                         
            onClick={projectClick}><h3 className={`hover:bg-white hover:text-black {hoverClass} hover:rounded-sm px-1`}>Close</h3>
            </button>

            {/* GALLERY */}
            <div className={`asbolute top-0 w-screen overflow-x-scroll snap-x snap-mandatory z-40 mb-5`}>
                <span className={`flex left-0 mx-2 ${vimeoCount+imageCount===1? "justify-center items-center pointer-events-none": "w-max justify-center items-center"}`}>
                    {/* current image */}
                    {project.vimeo?.map((vid, index)=>(
                        <div key={`project.slug+${index}`} className={`pointer-events-auto px-2 snap-center rounded-lg snap-always peer flex justify-center items-center transition-all duration-500
                         ${selectedProject===project.slug? "lg:h-[27rem] lg:w-[48rem] min-[1500px]:h-[32rem] min-[1500px]:w-[58rem] h-[17rem] w-[30rem]"
                         :"w-0 h-0"}`}>
                            {/* main gallery vimeo */}
                            <div className={`relative overflow-hidden w-full pt-[56.25%]`}>
                                <iframe className="absolute top-0 left-0 w-full h-full" src={`https://player.vimeo.com/video/${vimeoIDs[index]}?loop=1&title=0&byline=0&portrait=0`} allow="autoplay; fullscreen; picture-in-picture"></iframe>
                            </div>
                        </div>
                    ))}
                    {project.images?.map((image, index)=>(
                        <div key={`project.slug+${index+vimeoCount}`} className={`py-2 snap-center snap-always peer flex justify-center items-center`}>
                            {/* main nav gallery images */}
                            <Image
                            src={urlForImage(image).url()}
                            alt=""
                            width={1080}
                            height={1080}
                            className={`lg:object-contain object-cover cursor-zoom-in rounded-lg transition-all duration-500 pointer-events-auto hover:rounded-3xl hover:outline outline-3 outline-white  
                            ${selectedProject===project.slug? "mx-5 lg:h-[27rem] min-[1500px]:h-[32rem] h-[20rem] lg:w-auto w-[20rem] lg:px-0" :"w-0 h-0"}`}
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
                        </div>
                    ))}
                </span>
            </div>

            {project.images?.map((image, index)=>(
                <div key={`project.slug+${index+vimeoCount}_zoom`} className={``}>
                    {/* zoom images */}
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
            <h2 className={`lg:text-5xl text-3xl text-white hover:rounded-sm px-2 z-30 lg:pt-2 text-center`}>{project.name}</h2>

            {/* BIO */}
            <div className={`z-10 flex text-center justify-center items-center px-1 lg:mt-2 mb-2 lg:mb-4 lg:mx-40 mx-5 ${selectedProject===project.slug? "": "hidden"}`}><PortableText value={project.content}/></div>
            
            {/* FILTERS! */}
            <div ref={filterRef} className={`absolute bottom-12 z-10 lg:flex lg:flex-row text-center  justify-center items-center lg:mx-40 mx-5 ${selectedProject===project.slug? "": "hidden"}`}>
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
                                className={`backdrop-blur-sm ${key==="roles"? "backdrop-brightness-[.4]": key==="tags"? "backdrop-brightness-[.8]": "backdrop-brightness-[.6]"}  px-1 mx-1 mb-2 w-fit whitespace-nowrap
                                ${searchParams.getAll(key)?.includes(filter)? "bg-white text-black": `hover:bg-white hover:text-black`}`}
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
            className={`w-screen h-screen absolute top-0 cursor-alias transition-all bg-black opacity-[20%]  ${selectedProject===project.slug? ``: "hidden"}`}
            onClick={projectClick}
            />
        </span> 
    </section>
)
}  