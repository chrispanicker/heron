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
  const isManualScrolling = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout>()

  const nextImage = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft+1000<scrollContainerRef.current.scrollWidth-1000?
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft+1000,
        behavior: 'smooth'
      })
      : scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  const prevImage = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft!=0?
        scrollContainerRef.current.scrollTo({
          left: scrollContainerRef.current.scrollLeft-1000,
          behavior: 'smooth'
        })
        : scrollContainerRef.current.scrollTo({
          left: scrollContainerRef.current.scrollWidth,
          behavior: 'smooth'
        })
    }
  }

  return (
    <div className="relative w-full max-w-screen mx-auto text-3xl">
      <div
        ref={scrollContainerRef}
        className={`flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide ${
          !showArrows ? 'justify-center' : ''
        }`}
      >
        <span className={`relative flex w-max h-[32rem] ${!showArrows ? 'justify-center' : 'justify-start'} items-start`} key={`${project.slug}-gallery`}>
          {project.images?.map((e: any, index: number) => (
              <MediaWithFadeIn key={`${project.slug}-${index}`} e={e} project={project} index={index} />
          ))}
        </span>
      </div>
      {showArrows && (
        <> 
          <button
            id={`${project.slug}_larr`}
            className={`transition-[opacity] h-fit w-fit absolute bottom-2 z-[1000] ${showLeftArrow ? "opacity-100" : "opacity-0"} px-2`}
            onClick={prevImage}
          >
            {/* <svg id="a" data-name="Layer 1" fill="#d1d5db" className="fill-gray-300 stroke hover:stroke-gray-300 stroke-black stroke-[.04rem]" xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 40 30">
              <polygon points="30 0 10 15 30 30 30 25 17 15 30 5" />
            </svg> */}
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="#d1d5db" stroke="#000000" strokeWidth="7px" viewBox="0 0 185.22 146.88">
              <polygon points="73.44 146.88 90.41 129.91 45.94 85.44 185.22 85.44 185.22 61.44 45.94 61.44 90.41 16.97 73.44 0 0 73.44 73.44 146.88"/>
            </svg>
          </button>
          
          <button
            className="absolute right-0 bottom-2 z-[1000] px-2"
            onClick={nextImage}
          >
            <svg id="a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="#d1d5db" stroke="#000000" strokeWidth="7px" viewBox="0 0 185.22 146.88">
              <polygon points="111.78 0 94.81 16.97 139.28 61.44 0 61.44 0 85.44 139.28 85.44 94.81 129.91 111.78 146.88 185.22 73.44 111.78 0"/>
            </svg>
          </button>
        </>
      )}
    </div>
  )
}