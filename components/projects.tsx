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
    const roles = searchParams.get('roles');
    const tags = searchParams.get('tags');
    const collabs = searchParams.get('collabs');
    const selectedProject = searchParams.get("project")
    const img = Number(searchParams.get('img'));
    const vimeoCount = project.vimeo? project.vimeo.length: 0;
    const imageCount = project.images? project.images.length: 0;
    const galleryCount = vimeoCount + imageCount;
    const filtersmenu = searchParams.get("filters")
    const filterRef = useRef<HTMLDivElement | null>(null)
    const txtRef = useRef<HTMLElement | null>(null)
    const blurClass = 'backdrop-blur-sm backdrop-brightness-[.7]';

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

    // useEffect(()=>{
    //     let previewImages = document.getElementsByClassName('preview-image')
    //     //Detect touch device
    //     function isTouchDevice() {
    //     try {
    //         //We try to create TouchEvent. It would fail for desktops and throw error
    //         document.createEvent("TouchEvent");
    //         return true;
    //     } catch (e) {
    //         return false;
    //     }
    //     }
    //     const move = (e) => {
    //     //Try, catch to avoid any errors for touch screens (Error thrown when user doesn't move his finger)
    //     try {
    //         //PageX and PageY return the position of client's cursor from top left of screen
    //         var x = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
    //         var y = !isTouchDevice() ? e.pageY : e.touches[0].pageY;
    //     } catch (e) {}
    //     //set left and top of div based on mouse position
    //     Object.entries(previewImages).map((image:any)=>{
    //         image.style.left = x - 50 + "px";
    //         image.style.top = y - 50 + "px";
    //     })

    //     };
    //     //For mouse
    //     document.addEventListener("mousemove", (e) => {
    //     move(e);
    //     });
    //     //For touch
    //     document.addEventListener("touchmove", (e) => {
    //     move(e);
    //     });

    // }, [txtRef])

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
        router.push(`/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}${tags? `&tags=${tags}`: ""}${collabs? `&collabs=${collabs}`: ""}`, {scroll: false})
        : router.push( `/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}${tags? `&tags=${tags}`: ""}${collabs? `&collabs=${collabs}`:""}&project=${project.slug}&img=0`, {scroll: false})
        setTimeout(()=>{
            selectedProject!=project.slug?
            // document.getElementById(`${project.slug}`)?.scrollIntoView({behavior: "smooth", block: "center"})
            "": ""
    
        },100)

        
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
    <section key={`${project.slug}`} className={`flex flex-col bg-gray-400 lg:text-xl text-lg ${view==="all"? "": ""} ${selectedProject===project.slug? "pb-5": ""}`}>
        {/* view ===txt? */}
        <span ref={txtRef} id="txt" className={`group flex flex-col items-center justify-center lg:h-[5rem] leading-none ${selectedProject===project.slug? "":""} ${view==="txt"? "lg:text-5xl text-2xl": "hidden"} `}>
            <div className="flex justify-center items-center">
                <button className={`peer z-20 transition-all text-white ${selectedProject===project.slug? "":""}`}                         
                onClick={projectClick}><h3 className="hover:bg-white hover:text-gray-400 leading-10 px-2 lg:py-2">{project.name}</h3>
                </button>
                <button className={`peer z-20 transition-all text-white text-xl mx-2 ${blurClass} ${selectedProject===project.slug? "":"hidden"}`}                         
                onClick={projectClick}><h3 className="hover:bg-white hover:text-gray-400 px-2">Close</h3>
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
                            <span key={key} className="capitalize flex justify-center items-center  my-1">
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
                                        className={`px-2 ${blurClass} lg:text-xl text-lg mx-2 w-fit whitespace-nowrap hover:bg-white hover:text-gray-400
                                        ${searchParams.get(key)?.includes(filter)? "bg-white text-gray-400":"hover:bg-white hover:text-gray-400"}`}
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

        <span id="all" className={`flex flex-col items-center justify-center overflow-hidden ${selectedProject===project.slug? "h-auto": "h-[26rem] px-5"}  ${view==="all"? "py-2": "hidden"} `}>
            <button className={`group peer z-20 flex justify-center items-center transition-all ${selectedProject===project.slug? "" : "hover:blur-none hover:text-white hover:bg-gray-400"}`}                         
            onClick={projectClick}>
                    <Image
                    src={urlForImage(project.preview).url()}
                    alt=""
                    width={1080}
                    height={1080}
                    unoptimized={urlForImage(project.preview).url().includes(".gif")? true: false}
                    priority
                    className={`w-auto h-[15rem] object-cover`}
                    // placeholder="blur"
                    // blurDataURL={`${project.gallery[index].lqip}`}
                    />
                    {/* <h2 className="absolute px-2 backdrop-blur-3xl backdrop-brightness-[.75] top-0 z-20 decoration-dotted transition-all ">{project.name}</h2> */}
            </button>

            <button className={`peer z-20 px-2 mt-2 transition-all peer-hover:bg-white peer-hover:text-gray-400 ${selectedProject===project.slug? "text-5xl": ""}`}                         
                    onClick={projectClick}>{project.name}
            </button>
        </span>


        {/* project open? */}
        <span id={`${project.slug}`}  className={`overflow-hidden flex flex-col justify-start items-center ${view==="txt"? "": ""}  ${view==="all" && selectedProject===project.slug? "fixed top-0 left-0 w-screen h-screen bg-gray-400 left-0 z-50 justify-center opacity-100": view==="txt" && selectedProject===project.slug? "max-h-screen-2xl": "fixed w-0 h-0"}`}>
            <button className={`peer z-20 px-2 mb-5 transition-all hover:bg-white hover:text-gray-400 ${view==="all"? "": "hidden"} ${selectedProject===project.slug? "lg:text-5xl": ""}`}                         
                    onClick={projectClick}>{project.name}
            </button>
            {/* current image */}
            {project.vimeo?.map((vid, index)=>(
                <div key={`project.slug+${index}`} className={`peer flex justify-center items-center lg:h-[45rem] lg:w-[80rem] h-[14rem] w-[24rem]  ${selectedProject===project.slug? img===index? "":"hidden": view==="all"? "": "hidden"}`}>
                    {/* arrow nav */}
                    {galleryCount===1? ""
                    :<div className="absolute flex h-[70%] w-full lg:block hidden">
                        <button className="cursor-w-resize bg-blue h-[100%] w-[50%] px-2" onClick={()=>{
                        img===0?
                        router.push( `/?${createQueryString(`img`, `${galleryCount-1}`)}`, {scroll: false}):
                        router.push( `/?${createQueryString(`img`, `${img-1}`)}`, {scroll: false})
                        }}> </button>
                        <button className="cursor-e-resize  h-[100%] w-[50%] px-2" onClick={()=>{
                        img===galleryCount-1?
                        router.push( `/?${createQueryString(`img`, `0`)}`, {scroll: false}):
                        router.push( `/?${createQueryString(`img`, `${img+1}`)}`, {scroll: false})
                        }}></button>
                    </div>}
                    {/* main gallery vimeo */}
                    {galleryCount===1? ""
                    :<button className={`hover:bg-white hover:text-gray-400 mx-2 z-30 px-2 ${blurClass}`} onClick={()=>{
                        img===0?
                        router.push( `/?${createQueryString(`img`, `${galleryCount-1}`)}`, {scroll: false}):
                        router.push( `/?${createQueryString(`img`, `${img-1}`)}`, {scroll: false})
                    }}>Prev</button>}
                    <div className={`relative overflow-hidden w-full pt-[56.25%]`}>
                        <iframe className="absolute top-0 left-0 w-full h-full" src={`https://player.vimeo.com/video/${vimeoIDs[index]}?loop=1&title=0&byline=0&portrait=0`} allow="autoplay; fullscreen; picture-in-picture"></iframe>
                    </div>
                    {galleryCount===1? ""
                    :<button className={`hover:bg-white hover:text-gray-400 mx-2 z-30 px-2 ${blurClass}`} onClick={()=>{
                        img===galleryCount-1?
                        router.push( `/?${createQueryString(`img`, `0`)}`, {scroll: false}):
                        router.push( `/?${createQueryString(`img`, `${img+1}`)}`, {scroll: false})
                    }}>Next</button>}
                </div>
            ))}

            {project.images?.map((image, index)=>(
                <div key={`project.slug+${index+vimeoCount}`} className={`peer pb-5 flex justify-center items-center ${selectedProject===project.slug? img===index+vimeoCount? "":"hidden": "hidden"}`}>
                    {/* arrow nav gallery */}
                    {galleryCount===1? ""
                    :<div className="absolute flex h-[70%] w-full lg:block hidden">
                        <button className="cursor-w-resize decoration-dotted bg-blue h-[100%] w-[50%] px-2" onClick={()=>{
                        img===0?
                        router.push( `/?${createQueryString(`img`, `${galleryCount-1}`)}`, {scroll: false}):
                        router.push( `/?${createQueryString(`img`, `${img-1}`)}`, {scroll: false})
                        }}> </button>
                        <button className="cursor-e-resize decoration-dotted h-[100%] w-[50%] px-2" onClick={()=>{
                        img===galleryCount-1?
                        router.push( `/?${createQueryString(`img`, `0`)}`, {scroll: false}):
                        router.push( `/?${createQueryString(`img`, `${img+1}`)}`, {scroll: false})
                        }}></button>
                    </div>}
                    {/* main nav gallery images */}
                    {galleryCount===1? ""
                    :<button className={`hover:bg-white hover:text-gray-400 mx-2 z-30 px-2 ${blurClass}`} onClick={()=>{
                        img===0?
                        router.push( `/?${createQueryString(`img`, `${galleryCount-1}`)}`, {scroll: false}):
                        router.push( `/?${createQueryString(`img`, `${img-1}`)}`, {scroll: false})
                    }}>Prev</button>}
                    <Image
                    src={urlForImage(image).url()}
                    alt=""
                    width={1080}
                    height={1080}
                    className={`object-cover ${selectedProject===project.slug? "lg:h-[40vw] lg:w-auto h-[14rem] w-auto": "h-0"} ${selectedProject===project.slug? img===index+vimeoCount? "":"": ""}`}
                    // placeholder="blur"
                    // blurDataURL={`${project.gallery[index].lqip}`}
                    unoptimized={urlForImage(project.preview).url().includes(".gif")? true: false}
                    />
                    {galleryCount===1? ""
                    :<button className={`hover:bg-white hover:text-gray-400 mx-2 z-30 px-2 ${blurClass}`} onClick={()=>{
                        img===galleryCount-1?
                        router.push( `/?${createQueryString(`img`, `0`)}`, {scroll: false}):
                        router.push( `/?${createQueryString(`img`, `${img+1}`)}`, {scroll: false})
                    }}>Next</button>}
                </div>
            ))}

            {/* BIO */}
            <div className="flex w-screen text-center justify-center items-center px-20"><PortableText value={project.content}/></div>
            
            {/* FILTERS! */}
            <div ref={filterRef} className="flex flex-col lg:flex-row justify-center items-center mx-5">
            {Object.entries(filters).map(([key, array])=>{
                return(
                    <span key={key} className="capitalize flex justify-center items-center my-1">
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
                                className={`px-2 ${blurClass} mx-2 my-1 w-fit whitespace-nowrap 
                                ${searchParams.get(key)?.includes(filter)? "bg-white text-gray-400":"hover:bg-white hover:text-gray-400"}`}
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