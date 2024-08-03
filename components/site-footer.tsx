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
    const textClass = " lg:text-xl lg:leading-auto text-[1rem] leading-[1.2rem] "

    

    return (
        isSanityStudio? "" : 
        <footer ref={footerRef} className="text-lg w-full">
            <div id="footImgDiv" className={`flex w-screen top-screen justify-center items-center`}>
                <button id="footerTab" className={`fixed z-40 bottom-0 right-0 hover:bg-white hover:text-gray-400 decoration-dotted m-5 px-1 text-[1rem] leading-[1.4rem] py-0 w-fit whitespace-nowrap ${project? "blur-2xl" : `${blurClass}`}`} onClick={()=>{
                    searchParams.getAll(`about`).includes("open")?
                    router.push(`/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}${tags? `&tags=${tags}`: ""}${collabs? `&collabs=${collabs}`: ""}${project? `&project=${project}&img=0` : ""}`)
                    : router.push( `/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}${tags? `&tags=${tags}`: ""}${collabs? `&collabs=${collabs}`:""}${project? `&project=${project}&img=0` : ""}${`&about=open`}`)
                }}>About</button>
            </div>
            <span id="footer" className={`z-30 fixed lg:grid lg:grid-cols-1 bottom-0 h-[0vh] duration-500 transition-all overflow-y-scroll ${about==="open"? "h-[50vh]": "h-[0vh]"}`}>
                <button className={`w-screen h-screen fixed top-0 cursor-alias ${about==="open"? "": "hidden"}`}
                onClick={()=>{
                    searchParams.getAll(`about`).includes("open")?
                    router.push(`/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}${tags? `&tags=${tags}`: ""}${collabs? `&collabs=${collabs}`: ""}${project? `&project=${project}&img=0` : ""}`)
                    : router.push( `/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}${tags? `&tags=${tags}`: ""}${collabs? `&collabs=${collabs}`:""}${project? `&project=${project}&img=0` : ""}${`&about=open`}`)
                }}/>

                <div className={`w-4/4 m-5 p-5 text-xl leading-[1.8rem] h-fit ${blurClass}`}>
                    <PortableText value={info.info[0].bio[0]}/>
                </div>
                <div className={`m-5 w-4/4 p-5 h-fit ${blurClass} ${textClass}`}>
                    <table className="w-[100%]">
                    <tbody>
                        <tr className="">
                            {/* <td>Experience</td> */}
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