'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { buttonClass } from "./classes";

type job ={
    company: string,
    years: string,
    title: string
}


export function SiteFooter(info:any){
    const footerRef = useRef(null)
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');

    return (
        isSanityStudio? "" : 
        <footer id="footer" ref={footerRef} className="border-t-[2px] mt-[2px] border-black relative z-10">
            <div className={`h-fit pb-10 lg:pt-4 pt-2 text-left grid lg:grid-cols-2 lg:mx-5 lg:text-black lg:text-[1rem] text-gray-300 `}>
                <div className="lg:pb-0 pb-5 lg:text-2xl lg:leading-[1.95rem] text-[1.4rem] leading-[1.6rem] lg:w-auto w-screen lg:px-0 px-2 serif">
                    <PortableText value={info.info[0].bio[0]}/>
                </div>
                <div className={`lg:h-fit lg:pt-0 pb-20 sans px-2`}>
                    {info.info[0].cv.map((job:job)=>(
                        <span key={`${job.company}`} className="lg:flex-col larger:flex-row lg:text-2xl flex flex-col lg:justify-start larger:justify-between items-start lg:pb-0 pb-5 lg:leading-[1.75rem]">
                            <div className="flex lg:flex-row flex-col mb-1 lg:mb-0">
                                <p className="whitespace-nowrap text-[1.35rem] mb-1 lg:mb-0">{job.company}</p>                
                                <p className={`lg:block hidden lg:mx-1 lg:my-0 mb-1 ${buttonClass} lg:text-[.8rem] text-[.7rem] bg-black text-gray-300 outline outline-1 lg:outline-black outline-gray-300 lg:mt-[.3rem]  mt-[.1rem]`}>{job.title}</p>
                                <p className={`serif text-[1.35rem] lg:hidden inline`}>{job.title}</p>
                            </div>
                            <p className="sans text-[1.35rem]">{job.years}</p>
                        </span>
                    ))}
                </div>
                
            </div>
        </footer>
    )
}