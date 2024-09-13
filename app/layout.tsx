import type { Metadata } from 'next'
import '@/app/globals.css'
import localFont from 'next/font/local'
import { getGallery, getInfo, getProjects } from '@/sanity/lib/queries'
import { SiteHeader } from '@/components/site-header'
import { TestFilter } from '@/components/test-filter'
import { HeaderAndFilters } from '@/components/header-and-filters'


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
    let allprojects = await getProjects();
    let info = await getInfo();
    

  return (
    <html lang="en" className='bg-gray-300 text-black serif font-light overflow-x-hidden text-xl leading-[1.4rem] snap-y snap-mandatory'>
      <body>
        <section>
          <HeaderAndFilters info={info}  projects={allprojects}/>
          <>{children}</>
        </section>
        {/* <TestFilter projects = {allprojects} /> */}
        <div className="w-screen bg-black text-gray-300 sans h-[2rem] flex justify-between items-center px-2 ">
          <p>&#169; Drew Litowitz</p>
          <span>
            <a className="pr-1" href="https://www.instagram.com/drewknowitz">@drewknowitz</a>
            <a href="mailto:dlitowit@gmail.com">dlitowit@gmail.com</a>
          </span>
        </div>
      </body>
    </html>
  )
}
