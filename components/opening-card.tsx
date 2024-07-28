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

    let type = Math.floor(Math.random() * 3)

    useEffect(()=>{
        view? "": router.push( `/?${createQueryString(`view`, `txt`)}`)
    }, [selectedProject])
    
    useEffect(()=>{

        console.log(type)
        if(type === 0){
            setTimeout(()=>{
                document.querySelector("#image1")?.classList.replace("h-[100dvh]", "h-0")
                // document.querySelector("#image2")?.classList.replace("hidden", "block")
            }, 800)
            setTimeout(()=>{
                document.querySelector("#image2")?.classList.replace("h-[100dvh]", "h-0")
                // document.querySelector("#image3")?.classList.replace("hidden", "block")
            }, 1600)
            setTimeout(()=>{
                document.querySelector("#image3")?.classList.replace("h-[100dvh]", "h-0")
            }, 2400)
        }else if(type === 1){
            setTimeout(()=>{
                document.querySelector("#image1")?.classList.replace("w-screen", "w-0")
                // document.querySelector("#image2")?.classList.replace("hidden", "block")
            }, 800)
            setTimeout(()=>{
                document.querySelector("#image2")?.classList.replace("w-screen", "w-0")
                // document.querySelector("#image3")?.classList.replace("hidden", "block")
            }, 1600)
            setTimeout(()=>{
                document.querySelector("#image3")?.classList.replace("w-screen", "w-0")
            }, 2400)
        }else if(type === 2){
            setTimeout(()=>{
                document.querySelector("#image1")?.classList.replace("blur-none", "blur-2xl")
                document.querySelector("#image1")?.classList.replace("opacity-100", "opacity-0")
                // document.querySelector("#image2")?.classList.replace("hidden", "block")
            }, 800)
            setTimeout(()=>{
                document.querySelector("#image2")?.classList.replace("blur-none", "blur-2xl")
                document.querySelector("#image2")?.classList.replace("opacity-100", "opacity-0")
                // document.querySelector("#image3")?.classList.replace("hidden", "block")
            }, 1600)
            setTimeout(()=>{
                document.querySelector("#image3")?.classList.replace("blur-none", "blur-2xl")
                document.querySelector("#image3")?.classList.replace("opacity-100", "opacity-0")
            }, 2400)
        }

        cardRef? setTimeout(()=>{
            cardRef.current.classList.replace("top-0", "top-full")
        }, 5000): ""
        cardRef? setTimeout(()=>{
            cardRef.current.classList.add("hidden")
        }, 6000): ""
    }, [cardRef])
    
    return(
        <div ref={cardRef} className="text-5xl w-screen h-[100dvh] backdrop-blur-lg backdrop-brightness-[1] fixed top-0 z-50 flex flex-col justify-center items-center opacity-100 transition transition-all duration-1000 cursor-none">
            <div className="flex justify-center items-center z-50">
                <p className= "text-white mx-2 w-fit px-4 backdrop-blur-sm backdrop-brightness-[.7] ">&#169; Drew Litowitz</p>
            </div>
            <div id="gallery" className="absolute top-0 flex w-screen h-[100dvh] justify-start items-center">
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
                <Image
                src={urlForImage(gallery[1].projects.preview).url()}
                alt=""
                width={1080}
                height={1080}
                id="image2"
                className="absolute opacity-100 w-screen h-[100dvh] object-cover transition-all blur-none duration-500"
                unoptimized={urlForImage(gallery[0].projects.preview).url().includes(".gif")? true: false}
                priority={true}
                />
                <Image
                src={urlForImage(gallery[0].projects.preview).url()}
                alt=""
                width={1080}
                height={1080}
                id="image1"
                className="absolute opacity-100 w-screen h-[100dvh] object-cover transition-all blur-none duration-500"
                unoptimized={urlForImage(gallery[0].projects.preview).url().includes(".gif")? true: false}
                priority={true}
                />

            </div>
        </div>
    )
}