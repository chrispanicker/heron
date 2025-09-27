'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { PortableText } from "@portabletext/react";

type job ={
    company: string,
    years: string,
    title: string
}

type award ={
    year: string,
    title: string
}
interface Props {
    info: any
}


export function SiteFooter({info}:Props){
    const footerRef = useRef(null)
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');

    return (
        isSanityStudio? "" : 
        <footer id="footer" ref={footerRef} className="footer border-t-[2px] mt-[2px] border-black relative z-10 lg:pt-[8rem] lg:min-h-auto">
            <div className={`h-fit lg:pb-4 lg:pt-4 pb-[30vh] pt-2 text-left grid lg:grid-cols-2 lg:mx-5 lg:text-black lg:text-[1.5rem] text-[1rem] text-gray-300  lg:leading-[1.95rem] leading-[1.6rem]`}>
                <div className="lg:pb-0 pb-4 lg:pt-0 pt-2 lg:w-auto w-screen lg:pr-6 pr-2 pl-2 serif lg:text-[1.5rem] lg:leading-[1.95rem] text-[1.2rem] text-left">
                    <h3 className="w-full border-b-[2px] mb-1 border-black text-[1.5rem] sans lg:block hidden">About</h3>
                    <PortableText value={info[0]?.bio[0]}/>
                </div>

                <div className={`lg:h-fit lg:pt-0 sans px-2`}>
                    <h3 className="w-full border-b-[2px] mb-1 lg:border-black border-gray-300 border-black sans lg:text-[1.5rem] text-[1.2rem]">CV</h3>
                    <div className="lg:mt-0 mt-4 lg:pb-0 ">
                      {info[0].jobs?.map((job:job)=>(
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
                      {info[0].awards?.map((award:award)=>(
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