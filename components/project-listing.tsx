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
    console.log(project)
    const router = useRouter();
    const projectRef = useRef(null);
    const searchParams = useSearchParams();    
    const selectedProject = searchParams.get('project');
    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
          return params.toString()
        },
        [searchParams]
      )

    return project? 
        <section className="" style={{['--i' as any]:index}}>
            <button 
            id={project.slug}
            ref={projectRef}
            className={`projectTitle carouselView opacity-100 w-screen font-thin tracking-normal transition transition-all cursor-pointer flex flex-col pb-1 items-center justify-center group`}
            onClick={(event)=>{
                searchParams.getAll(`project`).includes(project.slug)? router.push(`/?${createQueryString(`project`, ``)}`, {scroll: false})
                : router.push( `/?${createQueryString(`project`, `${project.slug}`)}`, {scroll: false})
            }}
            >
                <span className="flex justify-center">
                    <p className="p-2 sm:group-hover:bg-bkg w-max flex">{project.name}</p>
                    <Image 
                    alt={`Image of ${project.name}`} 
                    width={240} 
                    height={240} 
                    className={`opacity-0 h-0 w-auto hidden lg:block group-hover:h-[3.5rem] sm:group-hover:opacity-100`} 
                    src={project.images? urlForImage(project.images[0]).url(): ""}>
                    </Image>
                </span>
            </button>
            {project.name? 
                <div id={project.slug+"1"} className={`w-screen transition transition-all duration-1000 overflow-hidden flex justify-center flex-col ${selectedProject===project.slug? "h-[80vh] lg:h-[90vh]": "h-[0vh]"}`}>
                    <div className="flex overflow-x-scroll overflow-y-hidden w-screen">
                        {project.images?.map((image, index)=>(
                            <Image
                            key={`image${index}`}
                            src={urlForImage(image).url()}
                            alt=""
                            width={1080}
                            height={1080}
                            className="w-[auto] h-[19rem] sm:h-[40rem] hover:rounded-none rounded-3xl transition transition-all py-2 mt-1 rounded-none object-cover"
                            unoptimized= {false}
                            />
                        ))}
                    </div>
                    <div className="text-lg leading-5 px-5 mr-5 sm:px-10 sm:grid grid-cols-2">
                        <div className="flex justify-start flex-col items-start text-left sm:pr-20 py-5">
                            <p className="pb-4 text-2xl sm:text-5xl tracking-tight">{project.name}</p>
                            <PortableText value={project.content}/>
                        </div>
                        <div className="grid lg:flex-col grid-cols-2 gap-y-5 gap-x-3 sm:flex justify-between items-start sm:items-end py-10">
                            {project.year? <p className="capitalize ">Year: <br className="block sm:hidden"></br> {project.year}</p>: ""}
                            {project.role? <p className="capitalize ">Role: <br className="block sm:hidden"></br> {project.role}</p>: ""}
                            {project.collaborators? <p className="capitalize">Collabs: <br className="block sm:hidden"></br> {project.collaborators?.join(", ")}</p>: " "}
                            {project.tags? <p className="capitalize ">Tags: <br className="block sm:hidden"></br> {project.tags.join(", ")}</p>: ""}
                        </div>
                    </div>

                </div>: ""
            }
        </section>
    :<div>Oops! Looks like there was an error loading the page. Please refresh!</div>
}