import type { Metadata } from 'next'
import '@/app/globals.css'
import { SiteFooter } from '@/components/site-footer'
import { TestFilter } from '@/components/test-filter'
import localFont from 'next/font/local'
import ViewToggle from '@/components/view-toggle'
import { getGallery, getInfo, getProjects } from '@/sanity/sanity-utils'
import { Filters } from '@/components/filters'
import { OpeningCard } from '@/components/opening-card'
import { Landing } from '@/components/landing'


export const metadata: Metadata = {
  title: 'Drew Litowitz',
}

const flatspot = localFont({ 
  src: [
    {
      path: '../public/fonts/FlatspotNuovoTest-Bold.woff2',
      weight: '700'
    }
  ],
  variable: "--font-flatspot"
})

const poppins = localFont({ 
  src:'../public/fonts/Poppins-Black.woff',
  variable: "--font-poppins"
})


export default async function RootLayout({
  children,
}: {
    children: React.ReactNode
  }) {


let allProjects = await getProjects();
let info = await getInfo();
let gallery = await getGallery();

  return (
    <html lang="en" className='bg-gray-400 text-white overflow-x-hidden'>
      <body>
        <section className=''>

          {/* <Landing gallery={gallery}/> */}
          <OpeningCard gallery={gallery} />
          <TestFilter projects={allProjects}/>
          <ViewToggle />
          
          <>{children}</>
          <SiteFooter info={info} />
        </section>
      </body>
    </html>
  )
}
