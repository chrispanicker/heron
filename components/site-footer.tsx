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
        <footer ref={footerRef} className="w-full">
            <div id="footImgDiv" className={`flex w-screen top-screen justify-center items-center`}>
                <button id="footerTab" className={`fixed z-[31] bottom-0 right-0 hover:bg-white hover:text-black decoration-dotted lg:mx-40 mx-5 mb-5 leading-[1.4rem] px-1 py-0 w-fit whitespace-nowrap {hoverClass} ${project? `blur-xl`: `${blurClass}`}`} onClick={()=>{
                    searchParams.getAll(`about`).includes("open")?
                    router.push(`/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}${tags? `&tags=${tags}`: ""}${collabs? `&collabs=${collabs}`: ""}${project? `&project=${project}&img=0` : ""}`,{scroll: false})
                    : router.push( `/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}${tags? `&tags=${tags}`: ""}${collabs? `&collabs=${collabs}`:""}${project? `&project=${project}&img=0` : ""}${`&about=open`}`,{scroll: false})
                }}>About</button>
            </div>

            <span id="footer" className={`fixed z-30 lg:flex lg:flex-col bottom-0 h-[0vh] duration-500 transition-all lg:px-40 px-5 lg:overflow-y-hidden overflow-x-hidden overflow-y-scroll  ${about==="open"? " pb-20 lg:pt-40 h-[100dvh] blur-auto backdrop-blur-3xl backdrop-brightness-[.7]": "blur-3xl h-[0vh]"}`}>
                <button className={`w-screen h-screen z-0 fixed top-0 cursor-alias ${about==="open"? "": "hidden"}`}
                onClick={()=>{
                    searchParams.getAll(`about`).includes("open")?
                    router.push(`/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}${tags? `&tags=${tags}`: ""}${collabs? `&collabs=${collabs}`: ""}${project? `&project=${project}&img=0` : ""}`)
                    : router.push( `/?view=${view? `${view}`: "txt"}${roles? `&roles=${roles}`: ""}${tags? `&tags=${tags}`: ""}${collabs? `&collabs=${collabs}`:""}${project? `&project=${project}&img=0` : ""}${`&about=open`}`)
                }}/>

                <div className={`w-4/4 h-fit py-10 lg:text-2xl text-lg`}>
                    <PortableText value={info.info[0].bio[0]}/>
                </div>
                <div className={`w-4/4 h-fit lg:text-lg text-sm `}>
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