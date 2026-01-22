'use client'

import { useEffect, useState, useCallback } from 'react'
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
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0])) // Track which images have loaded
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false) // Wait for first image before cycling

  // Preload images in the background
  useEffect(() => {
    if (!projects || projects.length === 0) return

    projects.forEach((project, index) => {
      if (!loadedImages.has(index) && project.preview?.asset?.url) {
        const img = new window.Image()
        img.src = project.preview.asset.url
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, index]))
        }
        img.onerror = () => {
          // Still mark as attempted even if load fails
          setLoadedImages((prev) => new Set([...prev, index]))
        }
      }
    })
  }, [projects, loadedImages])

  useEffect(() => {
    if (!projects || projects.length === 0) return

    // Don't cycle if closing and we've completed a cycle
    if (isClosing && hasCompletedCycle) return

    // Only start cycling after first image loads
    if (currentIndex === 0 && !isFirstImageLoaded) return

    // Start timer with fast transitions
    const timeout = setTimeout(() => {
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
    }, 500) // Fast transitions for smooth cycling

    return () => clearTimeout(timeout)
  }, [projects, isClosing, currentIndex, isFirstImageLoaded])

  // Call the callback when cycle is complete
  useEffect(() => {
    if (hasCompletedCycle && onReadyToClose) {
      // Reduced delay from 750ms to 500ms
      const timeout = setTimeout(() => {
        onReadyToClose()
      }, 1000)
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
    <div className="bg-black lg:w-full lg:h-full relative overflow-hidden">
      <Image
        src={previewUrl}
        alt={currentProject.name || 'Project preview'}
        fill
        className="lg:object-contain object-contain mx-auto"
        priority={currentIndex === 0} // Only prioritize first image
        sizes="100vw"
        quality={75} // Reduced from 85 for faster loading
        blurDataURL={currentProject.preview?.metadata?.lqip ? currentProject.preview.metadata.lqip : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAkACQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAUGB//EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgP/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCkAAAAAP/Z"}
        placeholder="blur"
        onLoad={() => {
          if (currentIndex === 0) {
            setIsFirstImageLoaded(true)
          }
        }}
      />
      
      {/* Project counter indicator */}
      <div className="absolute flex lg:justify-between justify-start lg:flex-row flex-col lg:items-center items-start h-screen w-screen top-0 left-0 text-gray-300 lg:text-[1rem] text-[.9rem] mono-book">
        <h2 className='bg-black px-2 h-fit uppercase lg:mx-4 mx-1 mt-1 py-0'>{siteInfo?.name ? siteInfo.name : ''}</h2>
        <span className='uppercase bg-black px-2 h-fit lg:mx-4 mx-1'>{currentProject.name} - {currentIndex + 1} / {projects!.length}</span>
      </div>

    </div>
  )
}
