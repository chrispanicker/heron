'use client'
import { useCallback, useEffect, useRef} from "react";
import { Project } from "@/types/project";
import { useRouter, useSearchParams } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { ArrayDefinition } from "sanity";

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
    const vimeoID = project.vimeo? project.vimeo.replace("https://vimeo.com/", ""):"";
    const createQueryString = useCallback(
    (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
        return params.toString()
    }, [searchParams]
    )  
    // const thisProj = () => {
    //     document.querySelector(`#${project.slug}`)?.addEventListener("mouseenter",()=>{
    //         // let characters = document.querySelector(`#${project.slug} span p`)!.innerHTML.split("")
    //         document.querySelector(`#${project.slug}`)!.animate(
    //             [
    //             //   { transform: `rotateX(0deg) rotateX(${126*index}deg) translateX(-10rem) translateX(${2*index}rem) translateZ(10rem)`},
    //             //   { transform: `rotateX(360deg) rotateX(${126*index}deg) translateX(-10rem) translateX(${2*index}rem) translateZ(10rem)`},
    //                 // { transform: `rotateX(0deg) rotateX(${126*index}deg)`},
    //                 // { transform: `rotateX(360deg) rotateX(${126*index}deg)`},
    //                 { transform: `rotateX(0deg)`},
    //                 { transform: `rotateX(360deg)`},
    //             ],
    //             {
    //               duration: 1000,
    //               iterations: 1,
    //             },
    //         );
    //     })
    
    // } 


    // const handleScroll = (e:any) => {
    // const { scrollLeft, scrollWidth } = e.target;
    // Math.round(scrollWidth/2)===scrollLeft? document.querySelector(`#${project.slug+"1"}`)!.scrollLeft=0 : ""
    // };

    // useEffect(()=>{
    //     thisProj()
    // }, [projectRef])

    selectedProject===project.slug? "":"";
    {project.roles?.map((role:any,i:number)=>{
        rolesArray[i] = role.name
    })}
    {project.collabs?.map((collab:any,i:number)=>{
        collabsArray[i] = collab.name
    })}
    {project.tags?.map((tag:any,i:number)=>{
        tagsArray[i] = tag.name
    })}
   
    // {project.tags?.map((tag:any)=>{
    //     tagsString += tag.name
    // })}
    // {project.collabs?.map((collab:any)=>{
    //     collabsString += collab.name
    // })}
    return project?
        <section ref={projectRef} className="" style={{['--i' as any]:index+1}}>
            <div className="flex w-screen">
                    <div className="buttonParent cursor-pointer group"                         
                        onClick={()=>{
                        searchParams.getAll(`project`).includes(project.slug)? router.push(`/?${createQueryString(`project`, ``)}`, {scroll: false})
                        : router.push( `/?${createQueryString(`project`, `${project.slug}`)}`, {scroll: false})
                        setTimeout(() => {
                            projectClickRef.current?.scrollIntoView({behavior: 'smooth', block: "center"});
                        }, 200);
                        // let animations = document.getAnimations()
                        // animations.forEach((animation) => {
                        //     animation.playbackRate = 0.0;
                        //   });
                    }}>
                        <button 
                        id={project.slug}
                        className={`z-50 projectTitle opacity-100 w-screen tracking-normal transition transition-all duration-500 cursor-pointer flex flex-col pb-1 items-center justify-center`}
                        >
                            <span className="flex justify-center">
                                <p className={`px-1 transition transition-all duration-500 w-max flex sm:group-hover:bg-gray-400 sm:group-hover:text-white ${selectedProject===project.slug? "bg-gray-400 text-black": "text-gray-300"}`}>{project.name}</p>
                            </span>
                        </button>
                </div>
            </div>

            
            {project.name? 
                <div id={project.slug+"1"} ref={projectClickRef} className={`w-screen text-lg text-gray-400 transition transition-all duration-200 overflow-hidden flex justify-center flex-col ${selectedProject===project.slug? "h-[35rem] sm:h-[40rem] lg:h-[65rem]": "h-[0vh]"}`}>
                    <div className="flex overflow-x-scroll w-screen">
                        {project.vimeo? 
                        <div className="relative lg:min-w-[79.4rem] lg:min-h-[40rem] md:min-w-[38.8rem] md:min-h-[20rem] min-w-[31rem] h-[16.25rem] py-2 mt-1 overflow-hidden">
                            <div className="h-0 pt-[56.25%]">
                                <iframe src={`https://player.vimeo.com/video/${vimeoID}?title=0&byline=0&portrait=0`} className="w-full h-full absolute top-0 left-0" allow="fullscreen; picture-in-picture">
                                </iframe>
                                <script src="https://player.vimeo.com/api/player.js" async></script>
                            </div>
                        </div>:""}
                            {project.images?.map((image, index)=>(
                                <Image
                                key={`image${index}`}
                                src={urlForImage(image).url()}
                                alt=""
                                width={1080}
                                height={1080}
                                className="w-auto h-[16.25rem] lg:h-[40rem] md:h-[20rem] hover:rounded-none rounded-3xl transition transition-all py-2 mt-1 rounded-none object-cover"
                                unoptimized= {false}
                                />
                            ))}
                    </div>

                    
                    <div className={`leading-5 flex flex-col justify-center items-center transition transition-all ${selectedProject===project.slug? "opacity-100":"opacity-0"}`}>
                        <div className="sm:w-[35rem] w-[20rem] m-5 flex justify-center flex-col items-center text-justify">
                            <span className="pb-5 flex sm:w-[35rem] w-[20rem] justify-between items-center">
                                <button className="text-black text-2xl"
                                    onClick={()=>{
                                        router.push( `/?${createQueryString(`project`, `${index===0? filteredProjects[filteredProjects.length-1].slug: filteredProjects[index-1].slug}`)}`, {scroll: false})
                                        setTimeout(() => {
                                            projectClickRef.current?.scrollIntoView({behavior: 'smooth', block: "start"});
                                        }, 200);
                                    }}
                                >⮝</button>
                                <p className="tracking-tight">{project.name}</p>
                                <button className="text-black text-2xl"
                                    onClick={()=>{
                                        router.push( `/?${createQueryString(`project`, `${index===filteredProjects.length-1? filteredProjects[0].slug : filteredProjects[index+1].slug}`)}`, {scroll: false})
                                        setTimeout(() => {
                                            projectClickRef.current?.scrollIntoView({behavior: 'smooth', block: "start"});
                                        }, 200);
                                    }}
                                >⮟</button>
                            </span>
                            <PortableText value={project.content}/>
                        </div>
                        <div id={`${project.slug}-info`} className="sm:w-[35rem] flex flex-col items-center text-left pb-10">
                            {project.roles? <p className="capitalize ">{rolesArray.join(", ")}</p>: ""}
                            {project.collabs? <p className="capitalize">{collabsArray.join(", ")}</p>: " "}
                            {project.tags? <p className="capitalize ">{tagsArray.join(", ")}</p>: ""}
                            <span className="text-black text-2xl mt-4 sm:w-[35rem] w-[20rem] flex justify-center items-center">
                                <button 
                                onClick={()=>{
                                    searchParams.getAll(`project`).includes(project.slug)? router.push(`/?${createQueryString(`project`, ``)}`, {scroll: false})
                                    : router.push( `/?${createQueryString(`project`, `${project.slug}`)}`, {scroll: false})
                                }}
                                className={`px-2 ${selectedProject===project.slug? "block" : "hidden"}`}>✕</button>
                            </span>
                        </div>
                    </div>
                </div>: ""
            }
        </section>
    :<div>Oops! Looks like there was an error loading the page. Please refresh!</div>
}