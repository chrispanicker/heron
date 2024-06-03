'use client'

import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

interface Props{
    gallery:any
}


export function OpeningCard({gallery}: Props){
    const router = useRouter();
    const cardRef = useRef<HTMLDivElement>(null!)
    const h1Ref = useRef<HTMLHeadingElement>(null!)
    const searchParams = useSearchParams();    
    const selectedProject = searchParams.get('project');
    const view = searchParams.get('view');

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        }, [searchParams]

        
    )  

    useEffect(()=>{
        if(selectedProject === null || selectedProject === ""){

        }else{
            let proj = document.querySelector(`#${selectedProject}`)
            proj?.scrollIntoView({
                block: "center",
            behavior: 'smooth'
        })}
        view? "": router.push( `/?${createQueryString(`view`, `txt`)}`)

    }, [selectedProject])
    
    useEffect(()=>{
        cardRef? setTimeout(()=>{
            document.querySelector("#image1")?.classList.replace("block", "hidden")
            document.querySelector("#image2")?.classList.replace("hidden", "block")
        }, 700): ""
        cardRef? setTimeout(()=>{
            document.querySelector("#image2")?.classList.replace("block", "hidden")
            document.querySelector("#image3")?.classList.replace("hidden", "block")
        }, 1400): ""
        cardRef? setTimeout(()=>{
            document.querySelector("#image3")?.classList.replace("block", "hidden")
        }, 2100): ""


        cardRef? setTimeout(()=>{
            cardRef.current.classList.replace("top-0", "top-full")
        }, 4000): ""
        cardRef? setTimeout(()=>{
            cardRef.current.classList.add("hidden")
        }, 6000): ""
    }, [cardRef])

    // console.log(gallery)
    return(
        <div ref={cardRef} className="lg:text-7xl text-2xl w-screen h-screen bg-white fixed top-0 z-50 flex flex-col justify-center items-center opacity-100 transition transition-all duration-1000 cursor-none">
            <div className="flex justify-center items-center">
                <p className= "bg-gray-400 text-black mx-2 w-fit times px-2 ">This is the website of Drew Litowitz</p>
                {/* <Image className="w-3/4 z-50 drop-shadow-md" 
                src={require('../src/Drew-1.gif')} 
                alt="loading..." 
                onLoad={(e)=>{h1Ref.current? h1Ref.current?.classList.add("opacity-0"): ""}} priority /> */}
                {/* <h1 ref={h1Ref} className="transition-all duration-200 absolute vivaldii lg:text-[16.5rem] md:text-[16.5rem]">Drew Litowitz</h1> */}
            </div>
            <div className="flex flex-row justify-center items-center w-4/4 z-50">
                <p className="outline outline-1 outline-black bg-white text-black mx-2 w-fit px-2">Art Director</p>
                <p className="outline outline-1 outline-black bg-white  text-black mx-2 w-fit px-2">Designer</p>
                <p className="outline outline-1 outline-black bg-white  text-black mx-2 w-fit px-2">More...</p>
            </div>

            <div id="gallery" className="absolute top-0 flex">
                <Image
                src={urlForImage(gallery[0].projects.preview).url()}
                alt=""
                width={1080}
                height={1080}
                id="image1"
                className="w-screen h-screen object-cover block"
                unoptimized= {false}
                />
                <Image
                src={urlForImage(gallery[1].projects.preview).url()}
                alt=""
                width={1080}
                height={1080}
                id="image2"
                className="w-screen h-screen object-cover hidden"
                unoptimized= {false}
                />
                <Image
                src={urlForImage(gallery[2].projects.preview).url()}
                alt=""
                width={1080}
                height={1080}
                id="image3"
                className="w-screen h-screen object-cover hidden"
                unoptimized= {false}
                />
            </div>
        </div>
    )
}