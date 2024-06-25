'use client'

import { usePathname } from "next/navigation";
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
    return (
        isSanityStudio? "" : 
        <footer ref={footerRef} id="footer" className="z-40 lg:text-5xl text-2xl overflow-y-scroll fixed bottom-0 h-[0vh] duration-500 w-screen justify-center text-justify w-full bg-gray-400 text-gray-400">
            <div id="footImgDiv" className="fixed flex w-screen top-screen justify-center items-center"

            >
            <button id="footerTab" className="fixed bottom-0 right-0 bg-gray-400 text-white hover:text-gray-400 hover:bg-white px-2 py-1 m-5" onClick={()=>{
                let footer = document.querySelector("#footer")
                footer?.classList.toggle("h-[0dvh]")
                footer?.classList.toggle("h-[100dvh]")
            }}>About</button>
                
            </div>
            <div className="w-4/4 text-white lg:m-40 m-5 p-2">
                <PortableText value={info.info[0].bio[0]}/>
            </div>
            <div className="lg:m-40 m-5 text-white w-4/4">
                <table className="w-[100%]">
                <tbody>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                    </tr>
                    {info.info[0].cv.map((job:job)=>(
                        <tr key={`${job.company}`}>
                            <td>{job.company}</td>
                            <td>{job.title}</td>
                            <td>{job.years}</td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </footer>
    )
}