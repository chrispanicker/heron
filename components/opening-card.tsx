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
            // let proj = document.querySelector(`#${selectedProject}`)
            // proj?.scrollIntoView({
            //     block: "center",
            // behavior: 'smooth'
            // })
        }
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
    
    return(
        <div ref={cardRef} className="lg:text-7xl text-2xl w-screen h-screen bg-white fixed top-0 z-50 flex flex-col justify-center items-center opacity-100 transition transition-all duration-1000 cursor-none">
            <div className="flex justify-center items-center z-50">
                <p className= "bg-gray-400 text-white mx-2 w-fit px-4 ">This is the website of Drew Litowitz</p>
            </div>
            <div className="flex flex-row justify-center text-gray-400 items-center w-4/4">
                <p className=" bg-white mx-2 w-fit px-2">Art Director</p>
                <p className=" bg-white mx-2 w-fit px-2">Designer</p>
                <p className=" bg-white mx-2 w-fit px-2">More...</p>
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
                priority={true}
                />
                <Image
                src={urlForImage(gallery[1].projects.preview).url()}
                alt=""
                width={1080}
                height={1080}
                id="image2"
                className="w-screen h-screen object-cover hidden"
                unoptimized= {false}
                priority={true}
                />
                <Image
                src={urlForImage(gallery[2].projects.preview).url()}
                alt=""
                width={1080}
                height={1080}
                id="image3"
                className="w-screen h-screen object-cover hidden"
                unoptimized= {false}
                priority={true}
                />
            </div>
        </div>
    )
}