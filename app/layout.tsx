import '@/app/globals.css'
import {getInfo} from '@/sanity/lib/queries'
import  SillyCanvas  from '@/components/silly-canvas'
import { Modal } from '@/components/modal'
import { urlForImage } from '@/sanity/lib/image'
import FaviconUpdater from '@/components/faviconUpdater'
import { Analytics } from '@vercel/analytics/next';


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
    let info = await getInfo();    
    const site = info?.[0] || null;
    const faviconUrl = site?.favicon ? urlForImage(site.favicon).url() : null;

    const rawInstagram = site?.instagram ? String(site.instagram) : undefined;
    const instagramHandle = rawInstagram ? rawInstagram.trim().replace(/^@+/, '') : undefined;
    const instagramUrl = instagramHandle ? `https://instagram.com/${instagramHandle}` : undefined;
    const email = site?.contactEmail ? String(site.contactEmail) : undefined;
    let emailBefore: string | null = null;
    let emailAfter: string | null = null;
    if (email) {
      const atIndex = email.indexOf('@');
      if (atIndex === -1) {
        emailBefore = email;
      } else {
        emailBefore = email.slice(0, atIndex);
        emailAfter = email.slice(atIndex + 1);
      }
    }

  return (
    <html lang="en" className={`bg-black text-black serif font-light overflow-x-hidden lg:text-[1rem] text-[1rem] leading-[1.4rem] snap-y snap-mandatory cursor-auto`}>
      <Analytics />
      <head>
        {faviconUrl && <link rel="icon" href={faviconUrl} />}
      </head>
      <body className='bg-gray-300'>
        <Modal />
        {/* <VideoModal /> */}
        <section className='relative z-10'>
          <>{children}</>
        </section>

        <FaviconUpdater url={faviconUrl} />

        <div id='foot' className="lg:flex hidden bottom-0 justify-start h-[1rem] items-start lg:px-5 px-2 my-5 pt-2 w-full mono-book uppercase bg-black text-gray-300">
          <span className='hidden lg:flex whitespace-nowrap'><p className='sans'>&#169;</p>Drew Litowitz</span>
          <span className='flex justify-end w-full items-center '>
            {email ? (
              <a href={`mailto:${email}`} className="hover:underline flex items-center pr-2">
                <span>{emailBefore}</span>
                <span className="sans">@</span>
                <span>{emailAfter}</span>
              </a>
            ) : null}
            
            {instagramHandle ? (
              <a className="hover:underline flex items-center" href={instagramUrl} target="_blank" rel="noreferrer">
                <span className='sans'>@</span>
                <span className="">{instagramHandle}</span>
              </a>
            ) : null}


          </span>
        </div>
        <SillyCanvas />
      </body>
    </html>
  )
}
