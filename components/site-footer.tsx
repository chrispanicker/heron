'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { buttonClass, textSize } from "./classes";

type job ={
    company: string,
    years: string,
    title: string
}
interface Props {
    info: any
    jobs: any
}


export function SiteFooter({info, jobs}:Props){
    const footerRef = useRef(null)
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');

    return (
        isSanityStudio? "" : 
        <footer id="footer" ref={footerRef} className="border-t-[2px] mt-[2px] border-black relative z-10 lg:pt-[8rem] lg:min-h-auto">
            <div className={`h-fit lg:pb-4 lg:pt-4 pb-[20dvh] pt-2 text-left grid lg:grid-cols-2 lg:mx-5 lg:text-black lg:text-[1.5rem] text-[1rem] text-gray-300  lg:leading-[1.95rem] leading-[1.6rem]`}>
                <div className="lg:pb-0 pb-5 lg:w-auto w-screen lg:pr-6 pr-10 pl-2 serif text-left">
                    <PortableText value={info[0]?.bio[0]}/>
                </div>
                <div className={`lg:h-fit lg:pt-0 sans px-2`}>
                    {jobs?.map((job:job)=>(
                        // <span key={`${job.company}`} className="lg:flex-col larger:flex-row lg:text-2xl flex flex-col lg:justify-start larger:justify-between items-start lg:pb-0 pb-5 lg:leading-[1.98rem]">
                        //     <div className="flex lg:flex-row flex-col mb-1 lg:mb-0">
                        //         <p className="whitespace-nowrap mb-1 lg:mb-0">{job.company}</p>                
                        //         <p className={`lg:block hidden mx-2 ${textSize} mono-book uppercase underline`}>{job.title}</p>
                        //         <p className={`${buttonClass} text-2xl outline outline-1 outline-gray-300 lg:hidden inline whitespace-nowrap`}>{job.title}</p>
                        //     </div>
                        //     <p className={`larger:mx-2 ${textSize} mono-book uppercase underline`}>{job.years}</p>
                        // </span>
                        <span key={`${job.company}`} className="grid grid-cols-3">
                              <div className="flex larger:flex-row flex-col w-full col-span-2">
                                <p className="whitespace-nowrap pr-2">{job.company}</p>                
                                <p className={`mono-book text-[1rem] uppercase mt-[.15rem] whitespace-nowrap larger:leading-[1.95rem] leading-[.2rem] larger:mb-[0rem] mb-[1.6rem]`}>{job.title}</p>
                              </div>
                            <p className={`text-right w-auto text-right serif`}>{job.years}</p>
                        </span>
                    ))}
                </div>
            </div>
        </footer>
    )
}