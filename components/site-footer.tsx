'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

type job ={
    company: string,
    years: string,
    title: string
}


export function SiteFooter(info:any){
    const footerRef = useRef(null)
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    const router = useRouter();
    const searchParams = useSearchParams();   
    const view = searchParams.get('view');
    const roles = searchParams.get('roles');
    const tags = searchParams.get('tags');
    const project = searchParams.get('project')
    const collabs = searchParams.get('collabs');
    const about = searchParams.get('about');
    const blurClass = 'backdrop-blur-3xl backdrop-brightness-[.7]';
        // const hoverClass = "outline outline-1 outline-black"
    // const textClass = " lg:text-xl lg:leading-auto text-[1rem] leading-[1.2rem] "

    

    return (
        isSanityStudio? "" : 
        <footer ref={footerRef} className="">
            <span id="footer" className={`z-30 lg:flex text-lg justify-center items-center lg:flex-col min-h-screen duration-500 transition-all lg:px-40 backdrop-blur-3xl backdrop-brightness-[.9]`}>
                <div className={`w-4/4 h-fit pb-10 pt-5 text-center `}>
                    <PortableText value={info.info[0].bio[0]}/>
                </div>
                <div className={`w-4/4 h-fit`}>
                        {info.info[0].cv.map((job:job)=>(
                            <span key={`${job.company}`} className="w-4/4 flex flex-col justify-between items-center pb-2">
                                <div className="flex">
                                    <p className="pr-1">{job.company}</p>
                                    <p className="italic">{job.title}</p>
                                </div>
                                <p>{job.years}</p>
                            </span>
                        ))}
                </div>
            </span>
        </footer>
    )
}