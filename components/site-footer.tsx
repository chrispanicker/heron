'use client'

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PortableText } from "@portabletext/react";
import { MobileFilters } from "./mobile-filters";

interface Props {
  info: any;
  filters?: any;
  filteredProjects?: any[];
  activeTab?: 'about' | 'filters';
  setActiveTab?: (tab: 'about' | 'filters') => void;
}

export function SiteFooter({info, filters, filteredProjects, activeTab = 'filters', setActiveTab}:Props){
  const footerRef = useRef(null)
  const pathname = usePathname();
  const isSanityStudio = pathname.startsWith('/admin');

  // read first info doc
  const site = Array.isArray(info) ? info[0] : info;
  // debug: log incoming info/docs
  // useEffect(() => { console.log('SiteFooter props.info:', info, 'site:', site); }, [info]);

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
      <a href={`mailto:${emailStr}`} className="underline flex items-center">
        {before}
        <span className="sans px-0.5 no-underline ">@</span>
        {after}
      </a>
    );
  };

  return (
    isSanityStudio? "" :
    <footer id="footer" ref={footerRef} className="footer border-t-[2px] mt-[2px] border-black relative z-10 lg:pt-[8rem] lg:min-h-auto">
      {/* Desktop Version */}
      <div className={`hidden lg:grid h-fit lg:pb-4 lg:pt-4 pb-[30vh] pt-2 text-left lg:grid-cols-2 lg:mx-5 lg:text-black lg:text-[1.5rem] text-[1rem] text-gray-300  lg:leading-[1.95rem] leading-[1.6rem]`}>
        <div className="lg:pb-0 pb-4 lg:pt-0 pt-2 lg:w-auto w-screen lg:pr-6 pr-2 pl-2 serif lg:text-[1.5rem] lg:leading-[1.95rem] text-[1.2rem] text-left">
          <h3 className="w-full border-b-[2px] mb-1 border-black text-[1.5rem] sans lg:block hidden">About</h3>
          <PortableText value={site?.bio || []} />
        </div>

        <div id='foot' className="lg:hidden flex justify-start items-start  mx-2 pt-[.1rem] border-gray-300 my-5 h-[2rem] mono-book uppercase bg-black text-gray-300">
          <span className='hidden lg:flex whitespace-nowrap underline'><p className='sans'>&#169;</p>Drew Litowitz</span>
          <span className='flex justify-start w-full'>
            {instagramHandle ? (
              <a className="pr-1 underline flex items-center" href={instagramUrl} target="_blank" rel="noreferrer">
                <p className='sans'>@</p>{instagramHandle}
              </a>
            ) : null}
            {/* <p className="no-underline">&nbsp;</p> */}
            {email ? renderEmailWithStyledAt(email) : null}
          </span>
        </div>

        <div className={`lg:h-fit lg:pt-0 sans px-2`}>
          <h3 className="w-full border-b-[2px] mb-1 lg:border-black border-gray-300 border-black sans lg:text-[1.5rem] text-[1.2rem]">CV</h3>
          <div className="lg:mt-0 mt-4 lg:pb-0 ">
            {site?.jobs?.map((job:any)=>(
              <span key={`${job.company}`} className="grid grid-cols-3">
                <div className="flex larger:flex-row flex-col w-full col-span-2">
                  <p className="pr-2">{job.company}</p>                
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

      {/* Mobile Version with Tabs */}
      <div className="lg:hidden block relative pb-[5rem]">
        {/* Tab Content */}
        {activeTab === 'about' && (
          <div className={`h-fit pt-2 text-left text-[1rem] text-gray-300 leading-[1.6rem]`}>
            <div className="pb-4 pt-2 w-screen pr-2 pl-2 serif text-[1.2rem] text-left">
              <h3 className="w-full border-b-[2px] mb-2 border-gray-300 text-[1.2rem] sans">About</h3>
              <PortableText value={site?.bio || []} />
            </div>

            <div id='foot' className="flex justify-center items-center mx-2 py-2 border-b-2 border-gray-300 mono-book uppercase text-gray-300">
              <span className='flex justify-start w-full gap-4'>
                {instagramHandle ? (
                  <a className="underline flex items-center" href={instagramUrl} target="_blank" rel="noreferrer">
                    <p className='sans'>@</p>{instagramHandle}
                  </a>
                ) : null}
                {email ? renderEmailWithStyledAt(email) : null}
              </span>
            </div>

            <div className={`grid grid-cols-2 gap-2 mx-2`}>
              <div className="w-full">
                <h3 className=" border-b-[2px] mb-2 pt-4 border-gray-300 sans text-[1.2rem]">CV</h3>
                <div className="w-full">
                  {site?.jobs?.map((job:any)=>(
                    <span key={`${job.company}`} className="flex flex-col border-b-2 border-gray-300 pb-2 mb-2 leading-[1.2rem]">
                      <p className="sans text-lg py-0">{job.company}</p>                
                      <p className="mono-book text-sm uppercase py-0">{job.title}</p>
                      <p className="mono-book text-sm uppercase py-0">{job.years}</p>
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full">
                <h3 className=" border-b-[2px] mb-2 pt-4 border-gray-300 sans text-[1.2rem]">Awards</h3>
                <div className="mt-2">
                  {site?.awards?.map((award:any)=>(
                    <span key={`${award.title}`} className="flex flex-col border-b-2 border-gray-300 pb-2 mb-2 leading-[1.2rem]">
                      <p className="sans text-lg py-0">{award.title}</p>                
                      <p className="mono-book text-sm uppercase py-0">{award.year}</p>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'filters' && (
        <div className="pt-4 mx-2">
          <div className="">
              <h3 className="w-full border-b-[2px] border-gray-300 text-[1.2rem] sans sticky top-0">Projects & Filters</h3>
              <div>
                <h3 className="mono-book uppercase text-sm mt-2">
                  {filteredProjects && filteredProjects.length > 0? "Total: " + filteredProjects.length + " Projects filtered": ""}
                </h3>
              </div>
          </div>
          {/* <p className="serif text-lg pt-1">Use the buttons on the right-hand side to filter projects on the site.</p> */}
          <div className="grid grid-cols-3 gap-2">
            {/* Projects List */}
            {filteredProjects && filteredProjects.length > 0 && (
              <div className="col-span-1">
                <h2 className="w-full border-b-2 border-gray-300  sticky top-6 bg-black w-full pt-4">Projects:</h2>
                <div className="pt-2">
                {filteredProjects.map((proj: any) => (
                  <div className="flex flex-col border-b-2 border-gray-300 pb-2 mb-2" key={proj.slug}>
                    <span className="text-sm mono-book uppercase">{proj.name}</span>
                    {/* <span className="text-xs">{proj.year}</span> */}
                  </div>
                ))}
                </div>
              </div>
            )}

            {!filteredProjects || filteredProjects.length === 0 && (
              <div className="col-span-1">
                <p className="text-gray-300 text-sm">No projects match the selected filters.</p>
              </div>
            )}

            {/* Filters */}
            {filters && (
              <div className="col-span-2 sticky top-6 pt-4 z-40 self-start">
                <MobileFilters filters={filters} />
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </footer>
  )
}