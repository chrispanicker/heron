import type { Metadata } from 'next'
import '@/app/globals.css'
import localFont from 'next/font/local'
import {getInfo, getJobs, getProjects } from '@/sanity/lib/queries'
import { HeaderAndFilters } from '@/components/header-and-filters'
import  SillyCanvas  from '@/components/silly-canvas'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { Modal } from '@/components/modal'



export const metadata = async () => {
  let info = await getInfo();
  return {
    title: info[0].name,
    description: info[0].bio,
    openGraph: {
      images: info[0].image,
    },
  };
};

export default async function RootLayout({
  children,
}: {
    children: React.ReactNode
  }) {
    let allprojects = await getProjects();
    let info = await getInfo();
    let jobs = await getJobs();
    

  return (
    <html lang="en" className='bg-gray-300 text-black serif font-light overflow-x-hidden lg:text-xl text-[1rem] leading-[1.4rem] snap-y snap-mandatory cursor-auto '>
      <body>
        <Modal />

        <section className='relative z-10'>
          <HeaderAndFilters info={info}  projects={allprojects} jobs={jobs}/>
          <>{children}</>
        </section>

        <div id='foot' className="lg:flex hidden w-screen bg-black text-gray-300 sans h-[2.4rem] justify-between items-center lg:text-2xl px-5 relative z-10">
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
