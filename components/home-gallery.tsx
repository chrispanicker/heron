"use client"

import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image"
import { usePathname } from "next/navigation";

interface Props{
    gallery:any
}

export function HomeGallery({gallery}: Props){
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    let i = 0;

    return(
        isSanityStudio? "": 
            <div id="gallery" className="sticky top-0 flex w-screen h-screen">
                {/* <span className="absolute  w-screen h-screen flex top-0 z-40">
                    <button className="h-screen w-[50%] cursor-w-resize"
                    onClick={()=>{
                        if(i<=0){
                            document.querySelector(`#image-${2}`)?.classList.remove("w-0","h-0")
                            document.querySelector(`#image-${2}`)?.classList.add("w-screen","h-[100dvh]","z-50")
                            document.querySelector(`#image-${i}`)?.classList.add("w-0", "h-0")
                            i=2
                        }else{
                            document.querySelector(`#image-${i-1}`)?.classList.remove("w-0","h-0")
                            document.querySelector(`#image-${i-1}`)?.classList.add("w-screen","h-[100dvh]")
                            document.querySelector(`#image-${i}`)?.classList.add("w-0", "h-0")
                            i--
                        }
                        console.log(i)
                    }}>
                    </button>
                    <button className="h-screen w-[50%] cursor-e-resize"
                    onClick={()=>{
                        if(i>=2){
                            document.querySelector(`#image-${0}`)?.classList.replace("hidden","flex")
                            document.querySelector(`#image-${i}`)?.classList.add("hidden")
                            i=0
                        }else{
                            document.querySelector(`#image-${i+1}`)?.classList.replace("hidden","flex")
                            document.querySelector(`#image-${i}`)?.classList.add("hidden")
                            i++
                        }
                        console.log(i)
                    }}>
                    </button>
                </span> */}
                <span className="z-0 flex overflow-x-scroll">
                        <Image
                        id="image-2"
                        src={urlForImage(gallery[2].projects.preview).url()}
                        alt=""
                        width={1080}
                        height={1080}
                        className="w-screen h-[100dvh] object-cover shrink-0"
                        unoptimized={urlForImage(gallery[2].projects.preview).url().includes(".gif")? true: false}
                        />
                        <Image
                        id="image-1"
                        src={urlForImage(gallery[1].projects.preview).url()}
                        alt=""
                        width={1080}
                        height={1080}
                        className="w-screen h-[100dvh] object-cover shrink-0"
                        unoptimized={urlForImage(gallery[1].projects.preview).url().includes(".gif")? true: false}
                        />
                        <Image
                        id="image-0"
                        src={urlForImage(gallery[0].projects.preview).url()}
                        alt=""
                        width={1080}
                        height={1080}
                        className="w-screen h-[100dvh] object-cover shrink-0"
                        unoptimized={urlForImage(gallery[0].projects.preview).url().includes(".gif")? true: false}
                        />
                </span>
            </div>
    )
}