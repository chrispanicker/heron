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
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showArrows, setShowArrows] = useState(true)
  const searchParams = useSearchParams()
  const isManualScrolling = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout>()

  const IMAGE_WIDTH = 688 // 43rem in pixels

  const scrollToImage = (index: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: IMAGE_WIDTH * index,
        behavior: 'smooth'
      })
    }
  }

  console.log(project.name, project.images[0].mycrop)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % project.images?.length
      scrollToImage(newIndex)
      return newIndex
    })
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + project.images?.length) % project.images?.length
      scrollToImage(newIndex)
      return newIndex
    })
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      setShowLeftArrow(scrollLeft > 0)

      // Update currentIndex based on scroll position
      const newIndex = Math.round(scrollLeft / IMAGE_WIDTH)
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
      }
    }

    const checkArrowVisibility = () => {
      setShowArrows(container.scrollWidth > container.clientWidth)
    }

    container.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', checkArrowVisibility)
    checkArrowVisibility()

    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkArrowVisibility)
    }
  }, [currentIndex, project.images?.length])

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
            className={`transition-[opacity] h-fit w-fit absolute bottom-2 ${showLeftArrow ? "opacity-100" : "opacity-0"}`}
            onClick={prevImage}
          >
            <svg id="a" data-name="Layer 1" fill="#d1d5db" className="fill-gray-300 stroke hover:stroke-gray-300 stroke-black stroke-[.04rem]" xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 40 30">
              <polygon points="30 0 10 15 30 30 30 25 17 15 30 5" />
            </svg>
          </button>
          
          <button
            className="absolute right-0 bottom-2"
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