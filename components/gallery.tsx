"use client"

import { urlForImage } from "@/sanity/lib/image"
import { Project } from "@/types/project"
import Image from "next/image"
import { getFile } from '@sanity/asset-utils'
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

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

  const scrollToImage = (index: number) => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth
      const imageWidth = scrollWidth / project.images.length
      scrollContainerRef.current.scrollTo({
        left: imageWidth * index,
        behavior: 'smooth'
      })
    }
  }

  const nextImage = () => {
    isManualScrolling.current = false // Reset manual scrolling flag
    setCurrentIndex((prevIndex) => (prevIndex + 1) % project.images.length)
  }

  const prevImage = () => {
    isManualScrolling.current = false // Reset manual scrolling flag
    setCurrentIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length)
  }

  useEffect(() => {
    if (!isManualScrolling.current) {
      scrollToImage(currentIndex)
    }
  }, [currentIndex])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      setShowLeftArrow(container.scrollLeft > 0)

      // Only update currentIndex if this is a manual scroll
      if (isManualScrolling.current) {
        const scrollWidth = container.scrollWidth
        const imageWidth = scrollWidth / project.images.length
        const newIndex = Math.round(container.scrollLeft / imageWidth)
        
        // Clear any existing timeout
        if (scrollTimeout.current) {
          clearTimeout(scrollTimeout.current)
        }

        // Set a timeout to update the index after scrolling stops
        scrollTimeout.current = setTimeout(() => {
          setCurrentIndex(newIndex)
          isManualScrolling.current = false
        }, 150) // Adjust this delay as needed
      }
    }

    const handleScrollStart = () => {
      isManualScrolling.current = true
    }

    const checkArrowVisibility = () => {
      setShowArrows(container.scrollWidth > container.clientWidth)
    }

    // Add event listeners for both scroll start and during scroll
    container.addEventListener('mousedown', handleScrollStart)
    container.addEventListener('touchstart', handleScrollStart)
    container.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', checkArrowVisibility)
    checkArrowVisibility()

    return () => {
      container.removeEventListener('mousedown', handleScrollStart)
      container.removeEventListener('touchstart', handleScrollStart)
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkArrowVisibility)
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current)
      }
    }
  }, [project.images.length])

  return (
    <div className="relative w-full max-w-screen mx-auto">
      <div
        ref={scrollContainerRef}
        className={`flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide ${
          !showArrows ? 'justify-center' : ''
        }`}
      >
        <span className={`flex w-max ${!showArrows ? 'justify-center' : 'justify-start'} items-start`}>
          {project.images?.map((e: any, index) => (
            e._type === 'mp4' ? (
              <video key={`project.slug+${index}`} width="1440" height="1080" muted controls loop autoPlay preload="true" className="w-[43rem] h-[32rem] pr-2 snap-center snap-always">
                <source src={getFile(e, { projectId: "01jwvji0", dataset: "production" }).asset.url} type="video/mp4" />
                <track
                  src="/path/to/captions.vtt"
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={urlForImage(e).url()}
                key={`project.slug+${index}`}
                alt=""
                width={1440}
                height={1080}
                className={`object-cover pr-2 transition-all duration-500 min-w-[43rem] h-[32rem] snap-center snap-always`}
                loading="lazy"
                placeholder="blur"
                blurDataURL={`${project.gallery[index].lqip}`}
                // unoptimized={urlForImage(project.preview).url().includes(".gif")}
              />
            )
          ))}
        </span>
      </div>
      {showArrows && (
        <> 
          <button
            id={`${project.slug}_larr`}
            className={`transition-[opacity] h-fit w-fit absolute bottom-2 ${showLeftArrow? "opacity-100": "opacity-0"}`}
            onClick={prevImage}
          >
            <svg id="a" data-name="Layer 1" fill="#d1d5db" className="fill-black hover:fill-gray-300 stroke hover:stroke-black stroke-gray-300 stroke-[.07rem]" xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 40 30">
              <polygon points="30 0 10 15 30 30 30 25 17 15 30 5" />
            </svg>
          </button>
          
          <button
            className="absolute right-0 bottom-2"
            onClick={nextImage}
          >
            <svg id="a" data-name="Layer 1" fill="#d1d5db" className="fill-black hover:fill-gray-300 stroke hover:stroke-black stroke-gray-300 stroke-[.07rem]" xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="-10 0 40 30">
              <polygon points="0 0 20 15 0 30 0 25 13 15 0 5" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}