'use client'

import { Project } from "@/types/project";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { PortableText } from "@portabletext/react";
import { MobileGallery } from "./mobile-gallery";
import { buttonClass } from "./classes";

interface Props {
    project: Project
}

export default function MobileProjects({project}: Props) {
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const mobileScroll = searchParams.get("mobile-scroll")  
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentImageHasDescription, setCurrentImageHasDescription] = useState(false);

    let projRef = useRef(null)

    useEffect(() => {
        let el = document.querySelector(`#mobile-${project.slug}`)

        mobileScroll === project.slug ? el?.scrollIntoView() : null

        function isElementInViewport(el: Element) {
            var rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        function onVisibilityChange(el: Element, callback: CallableFunction) {
            var old_visible: any;
            return function () {
              if(el){
                var visible = isElementInViewport(el);
                if (visible != old_visible) {
                    old_visible = visible;
                    if (typeof callback == 'function') {
                        callback();
                    }
                }
              }
            }
        }

        var handler = onVisibilityChange(el!, function() {
            if(window.innerWidth < 1024 && isElementInViewport(el!)){
                router.push(`/?mobile-scroll=${project.slug}`, {scroll: false})
            }
        })
        
        setTimeout(() => {
            window.addEventListener('scroll', handler, false);
            window.addEventListener('resize', handler, false);
        }, 100)

        return () => {
            window.removeEventListener('scroll', handler);
            window.removeEventListener('resize', handler);
        }
    }, [projRef, project.slug, mobileScroll, router])

    const handleGalleryScroll = useCallback((index: number) => {
        setCurrentImageIndex(index);
        setCurrentImageHasDescription(!!project.images?.[index]?.description);
    }, [project.images]);

    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    return isSanityStudio? "": (
        <div ref={projRef} id={`mobile-${project.slug}`} className="snap-start snap-always relative min-h-[100vh] h-[100vh] lg:hidden block relative items-center mx-2 last:mb-64">
            <div className="sticky top-8 bg-gray-300 border-b-2 border-black z-30 pt-2 pb-2">
                <h2 className="text-2xl flex justify-start items-center leading-[1.8rem]">{project.name}</h2>
                <div className="flex justify-between">
                    <p className={`${buttonClass} bg-black text-gray-300 ml-[.1rem] mt-[.2rem]`}>{project.type}</p>
                    <p className="sans">{project.year}</p>
                </div>
            </div>

            <span className="duration-500 z-0">
                <MobileGallery project={project} onImageChange={handleGalleryScroll} />
            </span>

            <div className={`left-0 absolute z-30 flex w-full justify-between items-center mt-[-1.8rem] text-2xl text-gray-300 serif leading-[1.1rem] px-1 ${project.images?.length < 2 ? "hidden" : ""}`}>
                <button className="opacity-0 px-[.1rem] transition-[opacity] text-3xl"
                id={`mobile-${project.slug}_larr`} 
                onClick={() => {
                    let gallery = document.querySelector(`#${project.slug}-mobileGallery`)
                    let width = document.documentElement.clientWidth
                    if(gallery){
                      gallery!.scrollLeft >= 0 && gallery!.scrollLeft < 50 ? gallery!.scrollLeft = gallery!.scrollWidth
                      : gallery!.scrollLeft -= width
                    }
                }}>
                  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="#d1d5db" stroke="#000000" strokeWidth="7px" viewBox="0 0 185.22 146.88">
                    <polygon points="73.44 146.88 90.41 129.91 45.94 85.44 185.22 85.44 185.22 61.44 45.94 61.44 90.41 16.97 73.44 0 0 73.44 73.44 146.88"/>
                  </svg>
                </button>
                {currentImageHasDescription && (
                    <button className="text-gray-300 outline-[.1rem] outline outline-gray-300 rounded-3xl px-[.4rem] py-[rem] text-[.8rem]"
                        onClick={() => {
                            document.querySelectorAll(".mobile-description").forEach((element) => {
                                element.classList.toggle("opacity-0")
                            })
                        }}>
                        i
                    </button>
                )}
                <button className="px-[.1rem] text-3xl"
                onClick={() => {
                    let gallery = document.querySelector(`#${project.slug}-mobileGallery`)
                    let width = document.documentElement.clientWidth
                    if(gallery){
                      gallery!.scrollLeft > width * (project.images?.length - 1) ? gallery!.scrollLeft = 0
                      : gallery!.scrollLeft += width
                    }
                }}>
                  <svg id="a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="#d1d5db" stroke="#000000" strokeWidth="7px" viewBox="0 0 185.22 146.88">
                    <polygon points="111.78 0 94.81 16.97 139.28 61.44 0 61.44 0 85.44 139.28 85.44 94.81 129.91 111.78 146.88 185.22 73.44 111.78 0"/>
                  </svg>
                </button>
            </div>

            <div className="sticky bottom-0 mt-2 bg-gray-300 z-10 pt-1">
                <span className="leading-[1.2rem]">
                    <PortableText value={project.content}/>
                </span>
            </div>
        </div>
    )
}