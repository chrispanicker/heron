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
        <footer ref={footerRef} className="pt-[1rem] border-t-[1px] border-black min-h-screen">
            <div className={`w-4/4 h-fit pb-10 lg:pt-4 pt-2 text-left grid lg:grid-cols-2 lg:mx-1 mx-2 lg:text-black lg:text-[1rem] text-gray-300`}>
                <div className="pr-5 lg:pb-0 pb-5 lg:text-2xl serif">
                    <PortableText value={info.info[0].bio[0]}/>
                </div>
                <div className={`w-4/4 lg:h-fit lg:pt-0 pt-10 pb-20 sans`}>
                    {info.info[0].cv.map((job:job)=>(
                        <span key={`${job.company}`} className="w-4/4 lg:flex-row flex flex-col justify-between items-start lg:pb-0 pb-2 lg:leading-[1.5rem] leading-[1.2rem]">
                            <div className="flex justify-center items-center">
                                <p className="pr-1 sans">{job.company}</p>
                                <p className={`pl-1 mx-1 ${buttonClass} bg-black text-gray-300 outline outline-1 lg:outline-black outline-gray-300`}>{job.title}</p>
                            </div>
                            <p className="mono text-right">{job.years}</p>
                        </span>
                    ))}
                </div>
                
            </div>
        </footer>
    )
}