
import { urlForImage } from "@/sanity/lib/image"
import { Project } from "@/types/project"
import { getFile } from "@sanity/asset-utils";
import Image from "next/image"
import { useSearchParams } from "next/navigation";

interface Props{
    project: Project
}


export function MobileGallery({project}:Props){
    const searchParams = useSearchParams(); 
    const selectedProject = searchParams.get("project")  
    let vimeoIDs:string[] = [];
    
    project.vimeo?.map((vid, index)=>{
        vimeoIDs[index]=vid.replace("https://vimeo.com/", "")
    })

    return(
        <>
        {/* GALLERY */}
        <div id={`${project.slug}-mobileGallery`} className={`relative pt-8 left-0 scroll-smooth overflow-x-scroll overflow-y-hidden snap-x snap-mandatory ${project.gallery.length<2? "mt-6": ""}`}
        onScroll={(e)=>{
            let larr = document.querySelector(`#mobile-${project.slug}_larr`)
            if(e.currentTarget.scrollLeft<20 && larr?.classList.contains("opacity-100")){
                larr.classList.replace("opacity-100", "opacity-0")
            }else if(e.currentTarget.scrollLeft>20 && larr?.classList.contains("opacity-0")){
                larr!.classList.replace("opacity-0","opacity-100")
            } 
        }}>
                <div className={`sticky left-0 flex w-full justify-between items-center top-full mb-6 text-2xl text-gray-300 serif leading-[1.1rem] ${project.gallery.length<2? "hidden": ""}`}>
                    <button className="opacity-0 px-[.1rem] transition-[opacity]"
                    id={`mobile-${project.slug}_larr`} 
                    onClick={()=>{
                        let gallery = document.querySelector(`#${project.slug}-mobileGallery`)
                        let width = document.documentElement.clientWidth
                        gallery!.scrollLeft>=0&& gallery!.scrollLeft<50? gallery!.scrollLeft=gallery!.scrollWidth
                        :gallery!.scrollLeft -= width
                    }}>
                        <svg id="a" data-name="Layer 1" fill="#d1d5db" className="fill-black stroke stroke-gray-300 stroke-[.07rem]" xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 40 30">
                            <polygon points="30 0 10 15 30 30 30 25 17 15 30 5" />
                        </svg>
                    </button>
                    <button className=" px-[.1rem]"
                    onClick={()=>{
                        let gallery = document.querySelector(`#${project.slug}-mobileGallery`)
                        let width = document.documentElement.clientWidth
                        gallery!.scrollLeft>width*(project.images.length-1)? gallery!.scrollLeft=0
                        : gallery!.scrollLeft += width
                    }}>
                        <svg id="a" data-name="Layer 1" fill="#d1d5db" className="fill-black stroke stroke-gray-300 stroke-[.07rem]" xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="-10 0 40 30">
                            <polygon points="0 0 20 15 0 30 0 25 13 15 0 5" />
                        </svg>      
                    </button>
                </div>
                <span className={`flex w-max justify-center items-start h-full`}>
                    {project.images?.map((e:any, index)=>(
                        e._type === 'mp4'?
                        <div key={`project.slug+${index}`} className={`snap-center snap-always peer flex justify-center items-center h-[69lvh] bg-black mx-1`}>
                            <video width="1440" height="1080" muted loop autoPlay controls webkit-playsinline playsInline preload="true"
                            className={`object-cover duration-500 h-[50lvh] w-[99vw] pointer-events-none`}>
                            <source src={getFile(e, {projectId:"01jwvji0", dataset:"production"}).asset.url} type="video/mp4" />
                            <track
                                src="/path/to/captions.vtt"
                                kind="subtitles"
                                srcLang="en"
                                label="English"
                            />
                            Your browser does not support the video tag.
                            </video>
                        </div>
                        :<div key={`mobile-${project.slug}+${index}`} className={`snap-center snap-always peer flex justify-center items-center h-[69lvh] bg-black mx-1`}>
                            <Image
                            src={urlForImage(e).url()}
                            alt=""
                            width={1080}
                            height={1080}
                            className={`object-cover duration-500 h-[50lvh] w-[99vw]`}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={`${project.gallery[index].lqip}`}
                            unoptimized={urlForImage(project.preview).url().includes(".gif")? true: false}
                            />
                        </div>
                    ))}
                </span>
            </div>
        </>
    )

}