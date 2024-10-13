import type { Metadata } from 'next'
import '@/app/globals.css'
import localFont from 'next/font/local'
import {getInfo, getProjects } from '@/sanity/lib/queries'
import { HeaderAndFilters } from '@/components/header-and-filters'
import  SillyCanvas  from '@/components/silly-canvas'



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
    <html lang="en" className='bg-gray-300 text-black serif font-light overflow-x-hidden text-xl leading-[1.4rem] snap-y snap-mandatory cursor-auto '>
      <body>
        <section className='relative z-10'>
          <HeaderAndFilters info={info}  projects={allprojects}/>
          <>{children}</>
        </section>
        <div id='foot' className="w-screen bg-black text-gray-300 sans h-[2.4rem] flex justify-between items-center lg:text-2xl px-5 relative z-10">
          <p>&#169; Drew Litowitz</p>
          <span className='text-[1.35rem]'>
            <a className="pr-1 hover:underline" href="https://www.instagram.com/drewknowitz">@drewknowitz</a>
            <a className='hover:underline' href="mailto:dlitowit@gmail.com">dlitowit@gmail.com</a>
          </span>
        </div>
        <SillyCanvas />
      </body>
    </html>
  )
}
