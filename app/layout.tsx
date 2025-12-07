import '@/app/globals.css'
import {getInfo, getProjects } from '@/sanity/lib/queries'
import { HeaderAndFilters } from '@/components/header-and-filters'
import  SillyCanvas  from '@/components/silly-canvas'
import { Modal } from '@/components/modal'
import { urlForImage } from '@/sanity/lib/image'
import FaviconUpdater from '@/components/faviconUpdater'


export const metadata = async () => {
  const infoArr = await getInfo();
  const site = infoArr?.[0] || null; // ensure we read the first document
  return {
    title: site?.name || 'Site',
    description: site?.bio || undefined,
    openGraph: {
      images: site?.image || undefined,
    },
    icons: {
      icon: site?.favicon ? urlForImage(site.favicon).url() : '/favicon.ico'
    }
  };
};

export default async function RootLayout({
  children,
}: {
    children: React.ReactNode
  }) {
    let allprojects = await getProjects();
    let info = await getInfo();    
  const infoArr = await getInfo();
  const site = infoArr?.[0] || null;
  const faviconUrl = site?.favicon ? urlForImage(site.favicon).url() : null;

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

        <FaviconUpdater url={faviconUrl} />

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
