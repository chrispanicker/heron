'use client'

import { urlForImage } from "@/sanity/lib/image"
import { Project } from "@/types/project"
import { PortableText } from "@portabletext/react";
import { getFile } from "@sanity/asset-utils";
import Image from "next/image"
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

interface Props {
    project: Project
    onImageChange: (index: number) => void
}

export function MobileGallery({project, onImageChange}: Props) {
    const searchParams = useSearchParams(); 
    const selectedProject = searchParams.get("project")  
    let vimeoIDs: string[] = [];
    const galleryWidth = "w-[98vw]"
    const galleryRef = useRef<HTMLDivElement>(null);
    
    project.vimeo?.map((vid, index) => {
        vimeoIDs[index] = vid.replace("https://vimeo.com/", "")
    })

    const handleScroll = useCallback(() => {
        if (galleryRef.current) {
            const scrollLeft = galleryRef.current.scrollLeft;
            const itemWidth = galleryRef.current.clientWidth;
            const currentIndex = Math.round(scrollLeft / itemWidth);
            onImageChange(currentIndex);
        }
    }, [onImageChange]);

    useEffect(() => {
        const gallery = galleryRef.current;
        if (gallery) {
            gallery.addEventListener('scroll', handleScroll);
            return () => gallery.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    return (
        <div 
            id={`${project.slug}-mobileGallery`} 
            ref={galleryRef}
            className={`relative scroll-smooth overflow-x-scroll overflow-y-hidden snap-x snap-mandatory mt-10`}
            onScroll={(e) => {
                let larr = document.querySelector(`#mobile-${project.slug}_larr`)
                if (e.currentTarget.scrollLeft < 20 && larr?.classList.contains("opacity-100")) {
                    larr.classList.replace("opacity-100", "opacity-0")
                } else if (e.currentTarget.scrollLeft > 20 && larr?.classList.contains("opacity-0")) {
                    larr!.classList.replace("opacity-0", "opacity-100")
                }
            }}
        >
            <span className={`flex w-max justify-center items-start h-full`}>
                {project.images?.map((e: any, index: number) => (
                    e._type === 'mp4' ?
                    <div key={`${project.slug}-${index}`} className={`snap-center snap-always peer flex justify-center items-center h-[60lvh] bg-black mx-1`}>
                        {e.description ? 
                          <span className={`mobile-description absolute top-0 h-[50lvh] ${galleryWidth} text-gray-300 flex text-justify justify-center items-start mt-2 px-5`}>
                              <p className="serif leading-[1.2rem]">{e.description}</p>
                          </span>
                        : null}
                        <video width="1440" height="1080" muted loop autoPlay controls webkit-playsinline="true" playsInline preload="true"
                        className={`object-cover duration-500 h-[50lvh] ${galleryWidth}`}>
                        <source src={getFile(e, {projectId:"01jwvji0", dataset:"production"}).asset.url} type="video/mp4" />
                        <track
                            src="/path/to/captions.vtt"
                            kind="subtitles"
                            srcLang="en"
                            label="English"
                        />
                        Your browser does not support the video tag.
                        </video>
                    </div>
                    : e._type === "image" ?
                    <div key={`mobile-${project.slug}-${index}`} className={`relative snap-center snap-always peer flex justify-center items-center h-[60lvh] bg-black mx-1`}>
                        {e.description ? 
                        <span className={`mobile-description absolute top-0 h-[50lvh] ${galleryWidth} text-gray-300 flex text-justify justify-center items-start mt-2 px-5`}>
                            <p className="serif leading-[1.2rem]">{e.description}</p>
                        </span>
                        : null}
                        <Image
                        src={urlForImage(e).url()}
                        alt=""
                        width={1080}
                        height={1080}
                        className={`object-contain duration-500 h-[50lvh] ${galleryWidth}`}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={`${project.images[index].lqip}`}
                        unoptimized={urlForImage(project.preview).url().includes(".gif")? true: false}
                        />
                    </div>
                    : <div key={`mobile-${project.slug}-text-${index}`} className={`h-[60lvh] ${galleryWidth} snap-center snap-always flex justify-center items-center bg-black text-gray-300 text-2xl text-center p-5`}>
                    <PortableText value={e.content} />
                  </div>
                ))}
            </span>
        </div>
    )
}