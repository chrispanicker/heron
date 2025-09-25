import '@/app/globals.css'
import {getInfo, getProjects } from '@/sanity/lib/queries'
import { HeaderAndFilters } from '@/components/header-and-filters'
import  SillyCanvas  from '@/components/silly-canvas'
import { Modal } from '@/components/modal'
import { VideoModal } from '@/components/vidmodal'
import { urlForImage } from '@/sanity/lib/image'

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
    const faviconUrl = info.favicon ? urlForImage(info.favicon).url() : null;

  return (
    <html lang="en" className={`notSanity bg-black text-black serif font-light overflow-x-hidden lg:text-[1rem] text-[1rem] leading-[1.4rem] snap-y snap-mandatory cursor-auto`}>
      <head>
        {faviconUrl && <link rel="icon" href={faviconUrl} />}
      </head>
      <body className='bg-gray-300'>
        <Modal />
        {/* <VideoModal /> */}
        <section className='relative z-10'>
          <HeaderAndFilters info={info}  projects={allprojects}/>
          <>{children}</>
        </section>
        <div id='foot' className="flex lg:relative hidden bottom-0 w-screen bg-black text-gray-300 leading-[.6rem] uppercase mono-book text-[1rem] justify-between lg:items-center items-end  lg:h-[2rem]  lg:px-5 px-2 lg:py-0 py-2 lg:pb-0 pb-5 lg:leading-auto leading-[1.6rem]  lg:border-none border-t-2 border-gray-300 z-10">
          <span className='hidden lg:flex whitespace-nowrap'><p className='sans'>&#169;</p>Drew Litowitz</span>
          <span className='flex lg:justify-end justify-between w-full'>
            <a className="pr-1 hover:underline flex" href="https://www.instagram.com/drewknowitz"><p className='sans'>@</p>drewknowitz</a>
            <p>&nbsp;</p>
            <a className='hover:underline flex' href="mailto:dlitowit@gmail.com">dlitowit<p className='sans'>@</p>gmail.com</a>
          </span>
        </div>
        <SillyCanvas />
      </body>
    </html>
  )
}
