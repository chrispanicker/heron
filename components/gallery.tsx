"use client"

import { urlForImage } from "@/sanity/lib/image"
import { Project } from "@/types/project"
import Image from "next/image"
import { getFile } from '@sanity/asset-utils'
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { PortableText } from "@portabletext/react"
import { MediaWithFadeIn } from "./media"

interface Props {
  project: Project
}

export function Gallery({ project }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(true)
  const [showArrows, setShowArrows] = useState(true)
  const searchParams = useSearchParams()
  const selectedProject = searchParams.get("project")  
  const isManualScrolling = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout>()

  const nextImage = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const maxScrollLeft = container.scrollWidth - container.clientWidth
    const current = container.scrollLeft
    const distanceToEnd = Math.max(0, maxScrollLeft - current)

    // Use a step based on visible container width (90% of viewport of gallery),
    // with a reasonable min so very small viewports still move.
    const step = Math.max(200, Math.round(container.clientWidth * 0.45))

    if (distanceToEnd > step + 4) {
      // plenty of room -> move by step
      container.scrollTo({ left: current + step, behavior: 'smooth' })
    } else if (distanceToEnd > 4) {
      // less than one step left -> snap to the end
      container.scrollTo({ left: maxScrollLeft, behavior: 'smooth' })
    } else {
      // already at end -> loop back to start
      container.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }

  const prevImage = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const current = container.scrollLeft
    const maxScrollLeft = container.scrollWidth - container.clientWidth

    const step = Math.max(200, Math.round(container.clientWidth * 0.9))

    if (current > step + 4) {
      // plenty of room to move left -> -step
      container.scrollTo({ left: current - step, behavior: 'smooth' })
    } else if (current > 4) {
      // less than one step from start -> snap to start
      container.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      // already at start -> loop to end
      container.scrollTo({ left: maxScrollLeft, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (selectedProject === project.slug) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          prevImage();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          nextImage();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedProject, project.slug, prevImage, nextImage]);

  return (
    selectedProject===project.slug? 
    <div className={`hidden lg:block relative w-full max-w-screen mx-auto text-3xl px-5 py-16 transition-all duration-1000 ${selectedProject===project.slug? "bg-black border-b-2 border-x-0 border-t-0 border border-gray-300" : ""}`}>
      <div
        ref={scrollContainerRef}
        className={`flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide ${!showArrows ? 'justify-center' : ''}`}
      >
        <span className={`relative flex w-max h-[34rem] ${project.images.length===1 ? 'justify-center items-center w-screen' : 'justify-start'} items-start`} key={`${project.slug}-gallery`}>
          {project.images?.map((e: any, index: number) => (
              <MediaWithFadeIn key={`${project.slug}-${index}`} e={e} project={project} index={index} />
          ))}
        </span>
      </div>
      {showArrows && (
        <> 
          <button
            id={`${project.slug}_larr`}
            className={`transition-[opacity] h-fit w-fit absolute bottom-4 z-[10] ${!showLeftArrow || project.images.length===1? "opacity-0" : "opacity-100"} pr-2`}
            onClick={prevImage}
          >
            {/* <svg id="a" data-name="Layer 1" fill="#d1d5db" className="fill-gray-300 stroke hover:stroke-gray-300 stroke-black stroke-[.04rem]" xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 40 30">
              <polygon points="30 0 10 15 30 30 30 25 17 15 30 5" />
            </svg> */}
            <svg id="Layer_1" className="hover:fill-black fill-gray-300 hover:stroke-gray-300 stroke-black" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="#d1d5db" stroke="#000000" strokeWidth="7px" viewBox="0 0 185.22 146.88">
              <polygon points="73.44 146.88 90.41 129.91 45.94 85.44 185.22 85.44 185.22 61.44 45.94 61.44 90.41 16.97 73.44 0 0 73.44 73.44 146.88"/>
            </svg>
          </button>
          
          <button
            className="absolute right-0 bottom-4 z-[10] px-2"
            onClick={nextImage}
          >
            <svg id="a" className={`hover:fill-black fill-gray-300 hover:stroke-gray-300 stroke-black ${project.images.length===1? "opacity-0" : "opacity-100"}`} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="#d1d5db" stroke="#000000" strokeWidth="7px" viewBox="0 0 185.22 146.88">
              <polygon points="111.78 0 94.81 16.97 139.28 61.44 0 61.44 0 85.44 139.28 85.44 94.81 129.91 111.78 146.88 185.22 73.44 111.78 0"/>
            </svg>
          </button>
        </>
      )}
    </div>:     <div className={`hidden bg-black lg:block relative w-full max-w-screen mx-auto text-3xl px-5 py-16 transition-all duration-500 ${selectedProject===project.slug? "bg-black border-b-2 border-x-0 border-t-0 border border-gray-300" : ""}`}>
Error Loading Media</div>
  )
}