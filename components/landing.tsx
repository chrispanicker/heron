'use client'
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

interface Props{
    gallery:any
}

export function Landing({gallery}: Props){
    const router = useRouter();
    const cardRef = useRef<HTMLDivElement>(null!)
    const h1Ref = useRef<HTMLHeadingElement>(null!)
    const searchParams = useSearchParams();    
    const selectedProject = searchParams.get('project');
    const view = searchParams.get('view');
    let landingInt;

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        }, [searchParams]

        
    )  

    let type = Math.floor(Math.random() * 3)

    useEffect(()=>{
        view? "": router.push( `/?${createQueryString(`view`, `txt`)}`)
    }, [selectedProject])
    
    useEffect(()=>{
        landingInt = setInterval(()=>{}, 2000)
    }, [cardRef])
    
    return(
        <div ref={cardRef} className={`relative ${view==="all" || selectedProject? "hidden": ""} lg:block top-0 text-5xl w-screen h-[100dvh] backdrop-blur-lg backdrop-brightness-[1] fixed top-0 z-40 flex flex-col justify-center items-center opacity-100 transition transition-all duration-1000`}>
            {/* <div className="flex justify-center items-center z-50">
                <p className= "text-white mx-2 w-fit px-4 backdrop-blur-sm backdrop-brightness-[.7] ">&#169; Drew Litowitz</p>
            </div> */}
            <button className="absolute top-0 left-0 z-50 h-[100dvh] w-[50dvw] cursor-w-resize" />
            <button className="absolute top-0 right-0 z-50 h-[100dvh] w-[50dvw] cursor-e-resize" />
            <span id="gallery" className="absolute top-0 flex w-screen h-[100dvh] justify-end items-center">
                <div className="absolute top-0 w-screen h-100dvh">
                    <Image
                    src={urlForImage(gallery[0].projects.preview).url()}
                    alt=""
                    width={1080}
                    height={1080}
                    id="image3"
                    className="absolute opacity-100 w-screen h-[100dvh] object-cover transition-all blur-none duration-500"
                    unoptimized={urlForImage(gallery[0].projects.preview).url().includes(".gif")? true: false}
                    priority={true}
                    />
                </div>
                <div className="absolute top-0 w-screen h-100dvh">
                    <Image
                    src={urlForImage(gallery[1].projects.preview).url()}
                    alt=""
                    width={1080}
                    height={1080}
                    id="image3"
                    className="absolute opacity-100 w-screen h-[100dvh] object-cover transition-all blur-none duration-500"
                    unoptimized={urlForImage(gallery[0].projects.preview).url().includes(".gif")? true: false}
                    priority={true}
                    />
                </div>
                <div className="absolute top-0 w-screen h-100dvh">
                    <Image
                    src={urlForImage(gallery[2].projects.preview).url()}
                    alt=""
                    width={1080}
                    height={1080}
                    id="image3"
                    className="absolute opacity-100 w-screen h-[100dvh] object-cover transition-all blur-none duration-500"
                    unoptimized={urlForImage(gallery[0].projects.preview).url().includes(".gif")? true: false}
                    priority={true}
                    />
                </div>
            </span>
        </div>
    )
}