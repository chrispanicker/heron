'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Project {
  _id: string
  name: string
  preview?: {
    asset?: {
      _ref?: string
      url?: string
    }
    metadata?: {
      lqip?: string
    }
  }
}

export function OpeningGallerySlideshow({ projects, onReadyToClose, siteInfo, isClosing }: { projects: Project[] | undefined, onReadyToClose?: () => void, siteInfo?: any, isClosing?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hasCompletedCycle, setHasCompletedCycle] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    if (!projects || projects.length === 0) return

    // Don't cycle if closing and we've completed a cycle
    if (isClosing && hasCompletedCycle) return

    // Only start timer after image is loaded
    if (!isImageLoaded) return

    const timeout = setTimeout(() => {
      setIsImageLoaded(false) // Reset for next image
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % projects.length
        // If we've wrapped around to 0, we've completed a cycle
        if (nextIndex === 0) {
          setHasCompletedCycle(true)
          // If already closing, go back to last index instead of 0
          if (isClosing) {
            return projects.length - 1
          }
        }
        return nextIndex
      })
    }, 750)

    return () => clearTimeout(timeout)
  }, [projects, isClosing, isImageLoaded])

  // Call the callback when cycle is complete
  useEffect(() => {
    if (hasCompletedCycle && onReadyToClose) {
      // Wait the full interval duration before triggering close
      const timeout = setTimeout(() => {
        onReadyToClose()
      }, 750)
      return () => clearTimeout(timeout)
    }
  }, [hasCompletedCycle, onReadyToClose])

  // Stop on last project when closing and cycle is complete
  useEffect(() => {
    if (isClosing && hasCompletedCycle && projects && projects.length > 0) {
      setCurrentIndex(projects.length - 1)
    }
  }, [isClosing, hasCompletedCycle, projects])

  const currentProject = projects![currentIndex]
  
  if (!currentProject) {
    return null
  }

  const previewUrl = currentProject.preview?.asset?.url
  
  if (!previewUrl) {
    return null
  }

  return (
    <div className="bg-black w-full h-full relative overflow-hidden">
      <Image
        src={previewUrl}
        alt={currentProject.name || 'Project preview'}
        fill
        className="lg:object-cover object-contain mx-auto"
        priority
        sizes="100vw"
        quality={85}
        blurDataURL={currentProject.preview?.metadata?.lqip}
        placeholder="blur"
        onLoad={() => setIsImageLoaded(true)}
      />
      
      {/* Project counter indicator */}
      <div className="absolute flex lg:justify-between justify-start lg:flex-row flex-col lg:items-center items-start h-screen w-screen top-0 left-0 text-gray-300 lg:text-[1rem] text-[.9rem] mono-book">
        <h2 className='bg-black px-2 h-fit uppercase lg:mx-4 mx-1 mt-1 py-0'>{siteInfo?.name ? siteInfo.name : ''}</h2>
        <span className='uppercase bg-black px-2 h-fit lg:mx-4 mx-1'>{currentProject.name} - {currentIndex + 1} / {projects!.length}</span>
      </div>

    </div>
  )
}
