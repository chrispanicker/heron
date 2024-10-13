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
            <div className={`h-fit pb-10 lg:pt-4 pt-2 text-left grid lg:grid-cols-2 lg:mx-5 mx-2 lg:text-black lg:text-[1rem] text-gray-300 `}>
                <div className="pr-5 lg:pb-0 pb-5 lg:text-2xl lg:leading-[1.95rem] text-[1.4rem] leading-[1.6rem] serif">
                    <PortableText value={info.info[0].bio[0]}/>
                </div>
                <div className={`lg:h-fit lg:pt-0 pb-20 sans`}>
                    {info.info[0].cv.map((job:job)=>(
                        <span key={`${job.company}`} className="lg:flex-col larger:flex-row lg:text-2xl flex flex-col lg:justify-start larger:justify-between items-start lg:pb-0 pb-2 lg:leading-[1.98rem]">
                            <div className="flex pb-1">
                                <p className="whitespace-nowrap text-[1.35rem]">{job.company}</p>                
                                <p className={` mx-1 ${buttonClass} bg-black text-gray-300 outline outline-1 lg:outline-black outline-gray-300 lg:mt-[.4rem] mt-[.1rem]`}>{job.title}</p>
                            </div>
                            <p className="sans text-[1.35rem]">{job.years}</p>
                        </span>
                    ))}
                </div>
                
            </div>
        </footer>
    )
}