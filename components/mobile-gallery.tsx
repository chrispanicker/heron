'use client'

import { urlForImage } from "@/sanity/lib/image"
import { Project } from "@/types/project"
import { PortableText } from "@portabletext/react";
import { getFile } from "@sanity/asset-utils";
import Image from "next/image"
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { MobileMedia } from "./mobileMedia";

interface Props {
  project: Project;
  onImageChange: (index: number) => void;
  isActive: boolean;
}

export function MobileGallery({ project, onImageChange, isActive }: Props) {
    const searchParams = useSearchParams(); 
    const selectedProject = searchParams.get("project")  
    let vimeoIDs: string[] = [];
    const galleryWidth = "w-full"
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
        className={`relative scroll-smooth overflow-x-scroll overflow-y-hidden snap-x snap-mandatory mt-10 bg-black h-[60vh] ${galleryWidth} flex scrollbar-hide`}
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
        {isActive
          ? project.images?.map((e: any, index: number) => (
              <MobileMedia
                key={`${project.slug}-${index}`}
                e={e}
                project={project}
                index={index}
                galleryLength={project.images.length}
              />
            ))
          : null}
      </span>
    </div>
  );
}