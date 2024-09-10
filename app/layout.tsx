import type { Metadata } from 'next'
import '@/app/globals.css'
import localFont from 'next/font/local'
import { getGallery, getInfo } from '@/sanity/lib/queries'
import { SiteHeader } from '@/components/site-header'


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
    <html lang="en" className='bg-gray-300 text-black serif font-light overflow-x-hidden text-xl leading-[1.4rem] snap-y'>
      <body>
        <section>
          <SiteHeader />
          <>{children}</>
          {/* <SiteFooter /> */}
        </section>

      </body>
    </html>
  )
}
