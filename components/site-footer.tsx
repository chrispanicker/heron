'use client'

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { PortableText } from "@portabletext/react";

interface Props {
  info: any
}

export function SiteFooter({info}:Props){
  const footerRef = useRef(null)
  const pathname = usePathname(); 
  const isSanityStudio = pathname.startsWith('/admin');

  // read first info doc
  const site = Array.isArray(info) ? info[0] : info;
  // debug: log incoming info/docs
  useEffect(() => { console.log('SiteFooter props.info:', info, 'site:', site); }, [info]);

  const rawInstagram = site?.instagram ? String(site.instagram) : undefined;
  const instagramHandle = rawInstagram ? rawInstagram.trim().replace(/^@+/, '') : undefined;
  const instagramUrl = instagramHandle ? `https://instagram.com/${instagramHandle}` : undefined;
  const email = site?.contactEmail ? String(site.contactEmail) : undefined;

  const renderEmailWithStyledAt = (emailStr?: string) => {
    if (!emailStr) return null;
    const atIndex = emailStr.indexOf('@');
    if (atIndex === -1) return <span>{emailStr}</span>;
    const before = emailStr.slice(0, atIndex);
    const after = emailStr.slice(atIndex + 1);
    // NOTE: href uses full email; display splits only for styling
    return (
      <a href={`mailto:${emailStr}`} className="hover:underline flex items-center">
        <span>{before}</span>
        <span className="sans px-0.5">@</span>
        <span>{after}</span>
      </a>
    );
  };

  return (
    isSanityStudio? "" :
    <footer id="footer" ref={footerRef} className="footer border-t-[2px] mt-[2px] border-black relative z-10 lg:pt-[8rem] lg:min-h-auto">
      <div className={`h-fit lg:pb-4 lg:pt-4 pb-[30vh] pt-2 text-left grid lg:grid-cols-2 lg:mx-5 lg:text-black lg:text-[1.5rem] text-[1rem] text-gray-300  lg:leading-[1.95rem] leading-[1.6rem]`}>
        <div className="lg:pb-0 pb-4 lg:pt-0 pt-2 lg:w-auto w-screen lg:pr-6 pr-2 pl-2 serif lg:text-[1.5rem] lg:leading-[1.95rem] text-[1.2rem] text-left">
          <h3 className="w-full border-b-[2px] mb-1 border-black text-[1.5rem] sans lg:block hidden">About</h3>
          <PortableText value={site?.bio || []} />
        </div>

        <div id='foot' className="lg:hidden flex justify-start items-start  mx-2 pt-[.1rem] border-gray-300 my-5 h-[2rem] mono-book uppercase bg-black text-gray-300">
          <span className='hidden lg:flex whitespace-nowrap underline'><p className='sans'>&#169;</p>Drew Litowitz</span>
          <span className='flex justify-start w-full underline'>
            {instagramHandle ? (
              <a className="pr-1 underline flex items-center" href={instagramUrl} target="_blank" rel="noreferrer">
                <p className='sans'>@</p>{instagramHandle}
              </a>
            ) : null}
            <p>&nbsp;</p>
            {email ? renderEmailWithStyledAt(email) : null}
          </span>
        </div>

        <div className={`lg:h-fit lg:pt-0 sans px-2`}>
          <h3 className="w-full border-b-[2px] mb-1 lg:border-black border-gray-300 border-black sans lg:text-[1.5rem] text-[1.2rem]">CV</h3>
          <div className="lg:mt-0 mt-4 lg:pb-0 ">
            {site?.jobs?.map((job:any)=>(
              <span key={`${job.company}`} className="grid grid-cols-3">
                <div className="flex larger:flex-row flex-col w-full col-span-2">
                  <p className="whitespace-nowrap pr-2">{job.company}</p>                
                  <p className={`mono-book text-[1rem] uppercase larger:mt-auto mt-[.15rem] whitespace-nowrap larger:leading-[2.2rem] leading-[.2rem] larger:mb-[0rem] lg:mb-[1.6rem] mb-4`}>{job.title}</p>
                </div>
                <p className={`text-right w-auto text-right serif`}>{job.years}</p>
              </span>
            ))}
          </div>

          <h3 className="w-full border-b-[2px] mb-1 pt-[.5rem] lg:border-black border-gray-300 border-black sans lg:text-[1.5rem] text-[1.2rem]">Awards</h3>
          <div className="lg:mt-0 mt-4">
            {site?.awards?.map((award:any)=>(
              <span key={`${award.title}`} className="grid grid-cols-3">
                <div className="flex larger:flex-row flex-col w-full col-span-2">     
                  <p className="whitespace-nowrap pr-2">{award.title}</p>                  
                </div>
                <p className={`text-right w-auto text-right serif`}>{award.year}</p>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}