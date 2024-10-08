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
        <footer id="footer" ref={footerRef} className="lg:pt-[10rem] border-t-[2wpx] mx-1 border-black min-h-screen relative z-10">
            <div className={`w-4/4 h-fit pb-10 lg:pt-4 pt-2 text-left grid lg:grid-cols-2 lg:mx-1 mx-2 lg:text-black lg:text-[1rem] text-gray-300 `}>
                <div className="pr-5 lg:pb-0 pb-5 lg:text-2xl serif">
                    <PortableText value={info.info[0].bio[0]}/>
                </div>
                <div className={`w-4/4 lg:h-fit lg:pt-0 pt-10 pb-20 sans`}>
                    {info.info[0].cv.map((job:job)=>(
                        <span key={`${job.company}`} className="w-4/4 lg:flex-row lg:text-2xl flex flex-col justify-between items-start lg:pb-0 pb-2 lg:leading-[2rem] leading-[1.2rem]">
                            <div className="">
                                <p className="inline-block pr-1 w-fit sans">{job.company}</p>
                                <p className={`inline-block pl-1 mt-2 mx-1 ${buttonClass} bg-black text-gray-300 outline outline-1 lg:outline-black outline-gray-300`}>{job.title}</p>
                            </div>
                            <p className="sans text-right">{job.years}</p>
                        </span>
                    ))}
                </div>
                
            </div>
        </footer>
    )
}