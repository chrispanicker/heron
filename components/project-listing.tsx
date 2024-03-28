'use client'
import { useCallback, useRef } from "react";
import { Project } from "@/types/project";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";

interface Props{
    project: Project
    index: number
}


export default function ProjectListing({project, index}: Props) {
    const router = useRouter();
    const projectRef = useRef(null);
    const searchParams = useSearchParams();    
    const selectedProject = searchParams.get('project');
    const vimeoID = project.vimeo? project.vimeo.replace("https://vimeo.com/", ""):"";
    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
          return params.toString()
        },
        [searchParams]
      )
    selectedProject===project.slug? "":"";
    return project? 
        <section className="" style={{['--i' as any]:index}}>
            <button 
            id={project.slug}
            ref={projectRef}
            className={`projectTitle flatView opacity-100 w-screen tracking-normal transition transition-all duration-200 cursor-pointer flex flex-col pb-1 items-center justify-center group`}
            onClick={(event)=>{
                searchParams.getAll(`project`).includes(project.slug)? router.push(`/?${createQueryString(`project`, ``)}`, {scroll: false})
                : router.push( `/?${createQueryString(`project`, `${project.slug}`)}`, {scroll: false})
            }}
            >
                <span className="flex justify-center">
                    <p className={`px-1 text-gray-300 transition transition-all duration-500 w-max flex sm:group-hover:bg-gray-400 sm:group-hover:text-white ${selectedProject===project.slug? "bg-black text-gray-400": ""}`}>{project.name}</p>
                    {/* <Image 
                    alt={`Image of ${project.name}`} 
                    width={240} 
                    height={240} 
                    className={`opacity-0 h-0 w-auto hidden lg:block group-hover:h-[1.8rem] sm:group-hover:opacity-100 ${selectedProject===project.slug? "sm:opacity-100 sm:h-[1.8rem]": ""}`} 
                    src={project.images? urlForImage(project.images[0]).url(): ""}>
                    </Image> */}
                </span>
            </button>
            {project.name? 
                <div id={project.slug+"1"} className={`w-screen text-lg text-gray-400 transition transition-all duration-1000 overflow-hidden flex justify-center flex-col ${selectedProject===project.slug? "h-[80vh] lg:h-[90vh]": "h-[0vh]"}`}>
                    <div className="flex overflow-x-scroll overflow-y-hidden w-screen">
                        {project.vimeo? 
                        <div className="relative sm:min-w-[80rem] sm:min-h-[40rem] min-w-[31rem] h-[16.25rem] py-2 mt-1 overflow-hidden">
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
                            className="w-[auto] h-[16.25rem] sm:h-[40rem] hover:rounded-none rounded-3xl transition transition-all py-2 mt-1 rounded-none object-cover"
                            unoptimized= {false}
                            />
                        ))}
                    </div>
                    <div className="leading-5 flex flex-col justify-center items-center">
                        <div className="sm:w-1/4 m-5 flex justify-center flex-col items-center text-justify py-5">
                            <p className="pb-4 tracking-tight">{project.name}</p>
                            <PortableText value={project.content}/>
                        </div>
                        <div className="sm:w-1/4 grid flex-col justify-center items-center text-center pb-10">
                            {project.year? <p className="capitalize ">Year: {project.year}</p>: ""}
                            {project.role? <p className="capitalize ">Role: {project.role}</p>: ""}
                            {project.collaborators? <p className="capitalize">Collabs: {project.collaborators?.join(", ")}</p>: " "}
                            {project.tags? <p className="capitalize ">Tags: {project.tags.join(", ")}</p>: ""}
                        </div>
                    </div>

                </div>: ""
            }
        </section>
    :<div>Oops! Looks like there was an error loading the page. Please refresh!</div>
}