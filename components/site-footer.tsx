'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { buttonClass } from "./classes";

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
        <footer id="footer" ref={footerRef} className="border-t-[2px] mt-[2px] border-black relative z-10 lg:pt-[8rem]">
            <div className={`h-fit lg:pb-4 lg:pt-4 pb-[20dvh] pt-2 text-left grid lg:grid-cols-2 lg:mx-5 lg:text-black lg:text-[1rem] text-gray-300 `}>
                <div className="lg:pb-0 pb-5 lg:text-2xl lg:leading-[1.95rem] text-[1.35rem] leading-[1.6rem] lg:w-auto w-screen lg:px-0 px-2 serif">
                    <PortableText value={info[0]?.bio[0]}/>
                </div>
                <div className={`lg:h-fit lg:pt-0 sans px-2`}>
                    {jobs?.map((job:job)=>(
                        <span key={`${job.company}`} className="lg:flex-col larger:flex-row lg:text-2xl flex flex-col lg:justify-start larger:justify-between items-start lg:pb-0 pb-5 lg:leading-[1.98rem]">
                            <div className="flex lg:flex-row flex-col mb-1 lg:mb-0">
                                <p className="whitespace-nowrap text-[1.35rem] mb-1 lg:mb-0">{job.company}</p>                
                                <p className={`lg:block hidden mx-1 my-0${buttonClass} text-[.8rem] bg-black text-gray-300 outline outline-1 outline-black outline-gray-300 mt-[.45rem]`}>{job.title}</p>
                                <p className={`${buttonClass} text-2xl outline outline-1 outline-gray-300 lg:hidden inline whitespace-nowrap `}>{job.title}</p>
                            </div>
                            <p className="sans text-[1.35rem]">{job.years}</p>
                        </span>
                    ))}
                </div>
                {/* <div className="lg:hidden flex w-screen bg-black text-gray-300 sans justify-between items-end px-2 text-[1rem] relative z-10 leading-[1.6rem] border-t-2 border-gray-300 py-2 pb-5">
                      <p className="text-left">&#169; Drew Litowitz</p>
                      <span className="flex">
                        <a className="pr-1 hover:underline" href="https://www.instagram.com/drewknowitz">@drewknowitz</a>
                        <a className='hover:underline' href="mailto:dlitowit@gmail.com">dlitowit@gmail.com</a>
                      </span>
                </div> */}

            </div>
        </footer>
    )
}