'use client'
import { Project } from "@/types/project";
import { useRouter, useSearchParams } from "next/navigation";
import { buttonClass } from "./classes";
import { useCallback, useEffect, useRef } from "react";
import { PortableText } from "@portabletext/react";
import { MobileGallery } from "./mobile-gallery";

interface Props{
    project: Project
}

export default function MobileProjects({project}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const selectedProject = searchParams.get("project")  
    const mobileScroll = searchParams.get("mobile-scroll")  

    let projRef = useRef(null)

        
    useEffect(()=>{
        let el = document.querySelector(`#mobile-${project.slug}`)

        mobileScroll===project.slug? el?.scrollIntoView(): ""

        function isElementInViewport (el:Element) {
            var rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
            );
        }
        function onVisibilityChange(el:Element, callback:CallableFunction) {
            var old_visible:any;
            return function () {
                var visible = isElementInViewport(el);
                if (visible != old_visible) {
                    old_visible = visible;
                    if (typeof callback == 'function') {
                        callback();
                    }
                }
            }
        }

   
        var handler = onVisibilityChange(el!, function() {
            if(window.innerWidth<1024 && isElementInViewport(el!)){
                router.push( `/?mobile-scroll=${project.slug}`, {scroll: false})
            }
        })
        
        setTimeout(()=>{
            window.addEventListener('scroll', handler, false);
            window.addEventListener('resize', handler, false);
        }, 100)

    }, [projRef])


    const createQueryString = useCallback(
        (name: string, value: string) => {
            let params;
            let stringSearchParams = searchParams.toString()
            stringSearchParams = stringSearchParams.replaceAll("+", " ")
            params = new URLSearchParams(stringSearchParams)
    
            if(name==="project"){
                if (stringSearchParams.includes(`${name}=${value}`)){
                    params.delete(name, value)
                    // params.delete("img", params?.get("img")!)
                }else{
                    params.set(name, value)
                    // params.set("img", "0")
                } 
            }         
        
            name==="project"? 
            stringSearchParams.includes(`${name}=${value}`)? params.delete(name, value)
            :params.set(name, value)
            :stringSearchParams.includes(`${name}=${value}`)?
            params.delete(name, value)
            :params.append(name, value)


            return params.toString()


        },
        [searchParams]
    )
    

    return (
        <div ref={projRef} id ={`mobile-${project.slug}`} className={`relative group snap-start min-h-screen snap-always lg:hidden block relative items-center mx-2`}>
            <div className="sticky top-10 bg-gray-300 border-b-2 border-black z-10 pt-2 pb-2">
                <h2 className="text-2xl flex justify-start items-center leading-[1.8rem]">{project.name}</h2>
                <div className="flex justify-between">
                    <p className="sans">{project.type}</p>
                    <p className="sans">{project.year}</p>
                </div>
            </div>

            
        
            {/* Mobile Gallery */}
            <span className={`duration-500 z-0`}>
                <MobileGallery project={project}/>
            </span>


            <div className={`sticky bottom-0 mt-2 bg-gray-300 z-10 pt-1 pb-8`}>
                <span className="leading-[1.2rem]">
                    {/* <p className="pb-1">For <i>{project.client}</i></p> */}
                    <PortableText value={project.content}/>
                </span>
                {/* <span className="overflow-x-scroll my-1 z-10">
                {project.tags? project.tags?.map((tag:any)=>(
                    <button key={"mobile"+tag.name} className={`${buttonClass} bg-black text-gray-300`}>{tag.name}</button>
                )): ""}
                </span> */}
            </div>

        </div>
    )
}