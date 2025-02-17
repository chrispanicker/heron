"use client"

import { urlForImage } from "@/sanity/lib/image"
import { Project } from "@/types/project"
import Image from "next/image"
import { getFile } from '@sanity/asset-utils'
import { useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { PortableText } from "@portabletext/react"

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
        <span className={`relative flex w-max ${!showArrows ? 'justify-center' : 'justify-start'} items-start`} key={`${project.slug}-gallery`}>
          {project.images?.map((e: any, index: number) => (
            e._type === 'mp4' ? (
              <div className="relative" key={`${project.slug}-${index}`}>
                {e.description && (
                  <span className="absolute w-full h-full flex justify-center items-end opacity-0 hover:opacity-[100%] active:pointer-events-none z-[200]">
                    <p className="w-fit h-fit uppercase mono-book text-[.8rem] px-1 leading-[1rem] outline outline-1 bg-black text-gray-300 outline-gray-300 mb-5">{e.description}</p>
                  </span>
                )}
                <video key={`${project.slug}-${index}`} width="1440" height="1080" muted loop autoPlay preload="true" className="min-w-[43rem] h-[32rem] pr-2 snap-center snap-always z-0">
                  <source src={getFile(e, { projectId: "01jwvji0", dataset: "production" }).asset.url} type="video/mp4" />
                  <track
                    src="/path/to/captions.vtt"
                    kind="subtitles"
                    srcLang="en"
                    label="English"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : e._type === "image" ? (
              <div className="relative" key={`${project.slug}-${index}`}>
                {e.description && (
                  <span key={`${project.slug}-description-${index}`} className="absolute w-full h-full flex justify-center items-end opacity-0 hover:opacity-[100%] active:pointer-events-none">
                    <p className="w-fit h-fit uppercase mono-book text-[.8rem] px-1 leading-[1rem] outline outline-1 bg-black text-gray-300 outline-gray-300 mb-5">{e.description}</p>
                  </span>
                )}
                <Image
                  src={urlForImage(e).url()}
                  alt=""
                  width={1440}
                  height={1080}
                  className={`object-contain pr-2 transition-all duration-500 min-w-[43rem] h-[32rem] snap-center snap-always`}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={`${project.gallery[index].lqip}`}
                  unoptimized={true}
                />
              </div>
            ) : (
              <div className="min-w-[43rem] h-[32rem] snap-center snap-always flex justify-center items-center" key={`${project.slug}-${index}`}>
                <span className="max-w-[18rem] h-fit uppercase mono-book text-[1.2rem] px-1 leading-[1.8rem] text-gray-300 text-center mb-5 mr-10">
                  <PortableText value={e.content} />
                </span>
              </div>
            )
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