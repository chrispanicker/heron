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

    return (
        isSanityStudio? "" : 
        <footer ref={footerRef} className="text-2xl text-justify w-full">
            <div id="footImgDiv" className="flex w-screen top-screen justify-center items-center">
                <button id="footerTab" className={`fixed z-40 bottom-0 right-0 hover:underline decoration-dotted px-2 py-1 m-5 hidden lg:block ${blurClass}`} onClick={()=>{
                    searchParams.getAll(`about`).includes("open")?
                    router.push(`/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}${tags? `&tags=${tags}`: ""}${collabs? `&collabs=${collabs}`: ""}${project? `&project=${project}&img=0` : ""}`)
                    : router.push( `/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}${tags? `&tags=${tags}`: ""}${collabs? `&collabs=${collabs}`:""}${project? `&project=${project}&img=0` : ""}${`&about=open`}`)
                }}>About</button>
            </div>
            <span id="footer" className={`z-30 fixed bottom-0 h-[0vh] duration-500 transition-all overflow-y-scroll ${about==="open"? "h-[100vh]": "h-[0vh]"}`}>
                <div className="w-4/4 lg:m-40 m-5 p-2">
                    <PortableText value={info.info[0].bio[0]}/>
                </div>
                <div className="lg:m-40 m-5 w-4/4">
                    <table className="w-[100%]">
                    <tbody>
                        <tr>
                            <td>Company</td>
                            <td>Title</td>
                            <td>Years</td>
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
            </span>
        </footer>
    )
}