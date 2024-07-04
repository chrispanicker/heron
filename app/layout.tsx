import type { Metadata } from 'next'
import '@/app/globals.css'
import { SiteFooter } from '@/components/site-footer'
import { TestFilter } from '@/components/test-filter'
import localFont from 'next/font/local'
import ViewToggle from '@/components/view-toggle'
import { getInfo, getProjects } from '@/sanity/sanity-utils'
import { Filters } from '@/components/filters'


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

  return (
    <html lang="en" className='bg-white text-black'>
      <body>
        <section>
          <TestFilter projects={allProjects}/>
          <ViewToggle />
          <>{children}</>
          <SiteFooter info={info} />
        </section>
      </body>
    </html>
  )
}
