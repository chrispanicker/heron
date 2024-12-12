'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'
import { useEffect } from 'react'

export default function StudioPage() {
  useEffect(() => {
    console.log('Sanity Studio initialization started:', new Date().toISOString())
    return () => {
      console.log('Sanity Studio component unmounted:', new Date().toISOString())
    }
  }, [])

  return <NextStudio config={config} />
}

