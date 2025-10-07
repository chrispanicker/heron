'use client'
import { Project } from "@/types/project";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Gallery } from "./gallery";
import { buttonClass } from "./classes";
import { useCallback, useEffect, useRef } from "react";
import { PortableText } from "@portabletext/react";
import { openFilters } from "./functions";

interface Props{
    project: Project
    slugs: string[]
}

type Role = {
  name: string;
};

export default function Projects({project, slugs}: Props ) {
    const projectRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const selectedProject = searchParams.get("project")  
    let roles = searchParams.getAll("roles");
    let collabs = searchParams.getAll("collabs");
    let tags = searchParams.getAll("tags");
    let bool: Boolean;
    let reachedEnd: number;
    roles.length + collabs.length + tags.length ===1? bool = true: bool=false
    let params = roles.toString()+","+collabs.toString()+","+tags.toString()

    let e = 0
    let tagHoverInterval:any;

    // function scrollToProject(slug:string){     
    //   let element = document.querySelector(`#${slug}`)
    //   var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    //   selectedProject===slug? 
    //   //scroll back to top
    //   window.scrollTo(scrollX, (scrollY-(rootFontSize*3.1)))
    //   :selectedProject?
    //       setTimeout(()=>{
    //       element?.scrollIntoView({behavior:"smooth", block:"start"})}, 300)
    //   :setTimeout(()=>{
    //   element?.scrollIntoView({behavior:"smooth", block:"start"})}, 300)
    // }

    function scrollToProject(slug: string) {
      let filters = document.querySelector("header section");
      router.push("?" + createQueryString("project", `${slug}`), { scroll: false });
      e = 1;
      if (!filters?.classList.contains("h-0")) {
          openFilters(e);
      }
    }   
    

    function setHoverInterval(e:any) {
        if (!tagHoverInterval) {
          tagHoverInterval = setInterval(()=>{
            tagHover(e)
          }, 15);
        }
    }
      
    function stopHoverInterval() {
        clearInterval(tagHoverInterval);
        tagHoverInterval = null;
    }

    function tagHover(e:any) {
        let element = e.target;

        if(element.scrollWidth-Math.round(element.scrollLeft)===element.offsetWidth){
            setTimeout(()=>{
                reachedEnd=-1;
            },100)

        }else if (element.scrollLeft === 0){
            setTimeout(()=>{
                reachedEnd=1;
            },100)
        }
        element.scrollLeft=element.scrollLeft+reachedEnd;
        
    }

    const createQueryString = useCallback(
        (name: string, value: string) => {
            let params;
            let stringSearchParams = searchParams.toString()
            stringSearchParams = stringSearchParams.replaceAll("+", " ")
            stringSearchParams = stringSearchParams.replaceAll("%2C", ",")
            params = new URLSearchParams(stringSearchParams)

            if(name==="project"){
                if(stringSearchParams.includes(`${name}=${value}`)){
                    window.scrollTo({left:scrollX, top:0, behavior:"smooth"})
                    params.delete(name, value)
                    
                }else{params.set(name, value)}
            }else {
                if(name==="roles"||name==="tags"||name==="collabs"||name==="type" && selectedProject){
                    params.delete("project", selectedProject!)
                    window.scrollTo({left:scrollX, top:0, behavior:"smooth"})
                }
                if(stringSearchParams.includes(`${name}=${value}`)){
                    params.delete(name, value)
                }else{
                  params.append(name, value)}
            }
                
            return params.toString()

        },
        [searchParams, selectedProject]
    )

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const currentIndex = slugs.indexOf(project.slug);
        let nextSlug = "";

        if (event.key === "ArrowDown") {
            event.preventDefault(); 
            const nextIndex = (currentIndex + 1) % slugs.length;
            nextSlug = slugs[nextIndex];
            
            router.push("?" + createQueryString("project", nextSlug), { scroll: false });
            scrollToProject(nextSlug);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            const prevIndex = (currentIndex - 1 + slugs.length) % slugs.length;
            nextSlug = slugs[prevIndex];
            
            router.push("?" + createQueryString("project", nextSlug), { scroll: false });
            scrollToProject(nextSlug);
        }
    }, [slugs, project.slug, router, createQueryString, scrollToProject]);
    
    useEffect(() => {
        if (selectedProject === project.slug && projectRef.current) {
          setTimeout(() => {
            projectRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 300);

            window.addEventListener("keydown", handleKeyDown);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [selectedProject, project.slug, slugs, router, createQueryString, scrollToProject, handleKeyDown]);

    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    const sortedRoles: Role[] = project.roles?.sort((a:any, b:any) => a.name.localeCompare(b.name));

    return isSanityStudio? "": (
        <div
            ref={projectRef}
            className={`lg:text-2xl lg:grid hidden lg:relative grid-cols-12 items-start transition-[padding] duration-100 ml-[1.75px] mr-[2px] lg:px-5 px-2 py-1 ${selectedProject===project.slug? "py-4 pt-12 pb-2 bg-gray-300 text-black ": "hover:bg-black hover:text-gray-300"}`}>
            <div className={`w-full h-full absolute top-0 z-0`} 
            onClick={()=>{
                scrollToProject(project.slug)
                let filters = document.querySelector("header section")
                router.push("?"+createQueryString("project", `${project.slug}`), {scroll:false})
                e=1
                if(!filters?.classList.contains("h-0")){
                    openFilters(e)
                }
            }}></div>
            {/* name */}
            <button className={`text-left col-span-4 hover:underline decoration-1 underline-offset-2 mr-2 cursor-select z-10`}
                onClick={()=>{
                    scrollToProject(project.slug);

                    router.push("?"+createQueryString("project", `${project.slug}`), {scroll:false})
                    
                    let filters = document.querySelector("header section")
                    e=1
                    if(!filters?.classList.contains("h-0")){
                        openFilters(e)
                    }
                }}>{project.name}
            </button>
            {/* client */}
            <p className="sans text-[1.35rem] col-span-2 ">{project.client}</p>

            {/* type */}
            <span id={`${project.slug}_type`} className="proj-filters flex overflow-x-scroll col-span-2 p-1 larger:mr-6 lg:mr-10 z-10"
              onMouseOver={(e)=>{setHoverInterval(e)}}
              onWheel={()=>{ stopHoverInterval()}}
              onMouseLeave={()=>{stopHoverInterval()}}>
              <button key={"dskp-"+project.type} className={`${buttonClass}  outline-1  my-1
              ${searchParams.getAll("type")?.includes(project.type)? "text-black bg-gray-300 hover:bg-black hover:text-gray-300 outline-black": "bg-black text-gray-300 outline-gray-300 hover:bg-gray-300 hover:text-black hover:outline-black"} outline outline-1`}
              onClick={()=>{
                  router.push( `/?${createQueryString(`type`, `${project.type}`)}`, {scroll: false})
                  params.includes(project.type) && bool ? e=1:""
                  openFilters(e)
                  stopHoverInterval()
              }}
              >{project.type}</button>
            </span>

            {/* roles */}
            <span id={`${project.slug}_tags`} className="proj-filters flex overflow-x-scroll col-span-3 p-1 larger:mr-6 lg:mr-10 z-10"
            onMouseOver={(e)=>{
                setHoverInterval(e)
            }}
            onWheel={()=>{
                stopHoverInterval()
            }}
            onMouseLeave={()=>{
                stopHoverInterval()
            }}>
                {project.roles? sortedRoles?.map((tag:any, i:number)=>(
                    i<project.roles.length-1?
                    <button key={tag.name} className={`sans text-[1.3rem] leading-[1rem] outline-1  my-1 whitespace-nowrap
                    ${searchParams.getAll("roles")?.includes(tag.name)? "underline": "hover:underline"}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`roles`, `${tag.name}`)}`, {scroll: false})
                        params.includes(tag.name) && bool ? e=1:""
                        openFilters(e)
                        stopHoverInterval()
                    }}
                >{tag.name + ","}&nbsp;</button>
                : <button key={tag.name} className={`sans text-[1.3rem] leading-[1rem] outline-1  my-1 whitespace-nowrap
                    ${searchParams.getAll("roles")?.includes(tag.name)? "underline": "hover:underline"}`}
                    onClick={()=>{
                        router.push( `/?${createQueryString(`roles`, `${tag.name}`)}`, {scroll: false})
                        params.includes(tag.name) && bool ? e=1:""
                        openFilters(e)
                        stopHoverInterval()
                    }}
                >{tag.name}</button>
                )): ""}
            </span>
            {/* year */}
            <p className={`lg:text-right flex justify-end col-span-1 whitespace-nowrap serif`}>{project.year}</p>

            {/* gallery */}
            <span className={`lg:block relative hidden col-span-12 overflow-hidden transition-[max-height] duration-100 border-black ${selectedProject===project.slug? "border-x-0 border-y-2 pt-2 pb-1 border max-h-[56rem]": "max-h-[0rem]"}`}>
                {/* gallery component */}
                <Gallery project={project}/>
                {/* info */}
                <div className={`pb-[.1rem] sticky grid-cols-6 grid left-0 pt-2`}>
                    {/* description */}
                    <div className="col-span-5 text-[1.2rem] leading-[1.5rem]">
                        <PortableText value={project.content}/>
                    </div>
                    {/* close button */}
                    <div className="flex flex-col text-right items-end justify-end col-span-1 h-full">
                        <button className={`${selectedProject===project.slug? "bg-black text-gray-300 hover:bg-gray-300 hover:text-black outline-black": "bg-gray-300 text-black hover:bg-black hover:text-gray-300 outline-gray-300"} px-1.2 mb-1 pt-[.4rem] ${buttonClass} sans  outline outline-1`} 
                        onClick={()=>{
                            router.push("?"+createQueryString("project", `${project.slug}`), {scroll:false})
                        }}>&#10005;</button>
                        
                        <button className={`${selectedProject===project.slug? "bg-black text-gray-300 hover:bg-gray-300 hover:text-black outline-black": "bg-gray-300 text-black hover:bg-black hover:text-gray-300 outline-gray-300"} px-1 mb-2 ${buttonClass}  outline outline-1`} 
                        onClick={()=>{
                          let nextSlug = ""
                          slugs.map((slug, index)=>{
                            slug === project.slug? index<slugs.length? nextSlug = slugs[index + 1]: nextSlug = slugs[0]: "";
                          })
                          router.push("?"+createQueryString("project", `${nextSlug}`), {scroll:false})
                          scrollToProject(nextSlug)
                        }}>Next Project</button>
                    </div>
                </div>
            </span>
        </div>
    )
}