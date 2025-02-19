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
      console.log(scrollContainerRef.current.scrollWidth, scrollContainerRef.current.scrollLeft, scrollContainerRef.current.scrollLeft!=0 )
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
    <div className="relative w-full max-w-screen mx-auto">
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
            className={`transition-[opacity] h-fit w-fit absolute bottom-2 z-[1000] ${showLeftArrow ? "opacity-100" : "opacity-0"}`}
            onClick={prevImage}
          >
            <svg id="a" data-name="Layer 1" fill="#d1d5db" className="fill-gray-300 stroke hover:stroke-gray-300 stroke-black stroke-[.04rem]" xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 40 30">
              <polygon points="30 0 10 15 30 30 30 25 17 15 30 5" />
            </svg>
          </button>
          
          <button
            className="absolute right-0 bottom-2 z-[1000]"
            onClick={nextImage}
          >
            <svg id="a" data-name="Layer 1" fill="#d1d5db" className="fill-gray-300 stroke hover:stroke-gray-300 stroke-black stroke-[.04rem]" xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="-10 0 40 30">
              <polygon points="0 0 20 15 0 30 0 25 13 15 0 5" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}