import type { Metadata } from 'next'
import '@/app/globals.css'
import { SiteFooter } from '@/components/site-footer'
import localFont from 'next/font/local'
import ViewToggle from '@/components/view-toggle'
import { getGallery, getInfo, getProjects } from '@/sanity/sanity-utils'
import { OpeningCard } from '@/components/opening-card'


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

let info = await getInfo();
let gallery = await getGallery();

  return (
    <html lang="en" className='bg-gray-400 text-white font-light overflow-x-hidden sans '>
      <body>
        <section className=''>
          <OpeningCard gallery={gallery} />
          <ViewToggle />
          <>{children}</>
          <SiteFooter info={info} />
        </section>
      </body>
    </html>
  )
}
