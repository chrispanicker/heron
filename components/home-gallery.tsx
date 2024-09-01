"use client"

import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Props{
    gallery:any
}



export function HomeGallery({gallery}: Props){
    const router = useRouter();
    const pathname = usePathname(); 
    const searchParams = useSearchParams();    
    const selectedProject = searchParams.get("project")
    const isSanityStudio = pathname.startsWith('/admin');
    const blurClass = ' backdrop-blur-sm px-1 w-fit whitespace-nowrap mx-1 mb-1';
    const parentClass = "relative snap-center snap-always w-fit h-fit flex justify-center items-center text-center w-screen h-[100dvh] shrink-0";

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


    const projectClick = (project:any) =>{
        console.log(project)
        router.push( `/?${createQueryString(`project`, `${project.slug.current}`)}`, { scroll: false })
        
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
        isSanityStudio? "": 
            <div id="gallery" className={`flex w-screen h-screen ${selectedProject? "blur-3xl": ""}`}>
                <span className="z-0 flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory">
                        <button className={`${parentClass}`} onClick={()=>{projectClick(gallery[2].projects)}}>
                            <h2 className={`${blurClass} absolute top-5 px-1 backdrop-brightness-[.8]`}>{gallery[2].projects.name}</h2>
                            <span className={`absolute bottom-12 flex justify-center items-center flex-wrap w-screen`}>
                                {gallery[2].projects.roles?.map((role:any)=>{
                                    return <p key={role.name} className={`${blurClass} px-1 backdrop-brightness-[.4] `}>{role.name}</p>
                                })}

                                {gallery[2].projects.collabs?.map((collab:any)=>{
                                    return <p key={collab.name}  className={`${blurClass} backdrop-brightness-[.6] `}>{collab.name}</p>
                                })}

                                {gallery[2].projects.tags?.map((tag:any)=>{
                                    return <p key={tag.name} className={`${blurClass} px-1 backdrop-brightness-[.8] `}>{tag.name}</p>
                                })}
                            </span>
                            <Image
                            id="image-2"
                            src={urlForImage(gallery[2].projects.preview).url()}
                            alt=""
                            width={1080}
                            height={1080}
                            className="w-screen h-[100dvh] object-cover shrink-0"
                            unoptimized={urlForImage(gallery[2].projects.preview).url().includes(".gif")? true: false}
                            />
                        </button>
                        <button className={`${parentClass}`} onClick={()=>{projectClick(gallery[1].projects)}}>     
                            <h2 className={`${blurClass} absolute top-5 px-1 backdrop-brightness-[.8]`}>{gallery[1].projects.name}</h2>
                            <span className={`absolute bottom-12 flex justify-center items-center flex-wrap w-screen`}>
                                {gallery[1].projects.roles?.map((role:any)=>{
                                    return <p key={role.name} className={`${blurClass} px-1 backdrop-brightness-[.4] `}>{role.name}</p>
                                })}

                                {gallery[1].projects.collabs?.map((collab:any)=>{
                                    return <p key={collab.name}  className={`${blurClass} backdrop-brightness-[.6] `}>{collab.name}</p>
                                })}

                                {gallery[1].projects.tags?.map((tag:any)=>{
                                    return <p key={tag.name} className={`${blurClass} px-1 backdrop-brightness-[.8] `}>{tag.name}</p>
                                })}
                            </span>                       
                            <Image
                            id="image-1"
                            src={urlForImage(gallery[1].projects.preview).url()}
                            alt=""
                            width={1080}
                            height={1080}
                            className="w-screen h-[100dvh] object-cover shrink-0"
                            unoptimized={urlForImage(gallery[1].projects.preview).url().includes(".gif")? true: false}
                            />
                        </button>
                        <button className={`${parentClass}`} onClick={()=>{projectClick(gallery[0].projects)}}>
                            <h2 className={`${blurClass} absolute top-5 px-1 backdrop-brightness-[.8]`}>{gallery[0].projects.name}</h2>
                            <span className={`absolute bottom-12 flex justify-center items-center flex-wrap w-screen`}>
                                {gallery[0].projects.roles?.map((role:any)=>{
                                    return <p key={role.name} className={`${blurClass} px-1 backdrop-brightness-[.4] `}>{role.name}</p>
                                })}

                                {gallery[0].projects.collabs?.map((collab:any)=>{
                                    return <p key={collab.name} className={`${blurClass} backdrop-brightness-[.6] `}>{collab.name}</p>
                                })}

                                {gallery[0].projects.tags?.map((tag:any)=>{
                                    return <p  key={tag.name} className={`${blurClass} px-1 backdrop-brightness-[.8] `}>{tag.name}</p>
                                })}
                            </span>                                
                            <Image
                            id="image-0"
                            src={urlForImage(gallery[0].projects.preview).url()}
                            alt=""
                            width={1080}
                            height={1080}
                            className="w-screen h-[100dvh] object-cover shrink-0"
                            unoptimized={urlForImage(gallery[0].projects.preview).url().includes(".gif")? true: false}
                            />
                        </button>
                </span>
            </div>
    )
}