
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
        <div id={`${project.slug}-mobileGallery`} className={`pt-8 left-0 scroll-smooth overflow-x-scroll overflow-y-hidden snap-x snap-mandatory transition-all ${project.gallery.length<2? "mt-6": ""}`}>
                <div className={`sticky left-0 flex w-full justify-between items-center top-[50%] text-2xl text-gray-300 serif h-0 leading-[1.1rem] ${project.gallery.length<2? "hidden": ""}`}>
                    <button className=" px-[.1rem]"
                    onClick={()=>{
                        let gallery = document.querySelector(`#${project.slug}-mobileGallery`)
                        let width = document.documentElement.clientWidth
                        gallery!.scrollLeft>=0&& gallery!.scrollLeft<50? gallery!.scrollLeft=gallery!.scrollWidth
                        :gallery!.scrollLeft -= width
                    }}>

                        <svg id="a" data-name="Layer 1" stroke="black" fill="#d1d5db" strokeWidth={5} xmlns="http://www.w3.org/2000/svg" width="30" height="500" viewBox="0 0 55.1 1089.32">
                        <polygon points="41.56 1089.32 54.94 1086.71 13.56 562.98 55.1 2.83 41.74 0 0 562.87 .09 564.23 41.56 1089.32"/>
                        </svg>

                    </button>
                    <button className=" px-[.1rem]"
                    onClick={()=>{
                        let gallery = document.querySelector(`#${project.slug}-mobileGallery`)
                        let width = document.documentElement.clientWidth
                        gallery!.scrollLeft>width*(project.images.length-2)? gallery!.scrollLeft=0
                        :gallery!.scrollLeft += width
                    }}>
                        <svg id="a" data-name="Layer 1" stroke="black" fill="#d1d5db" strokeWidth={5} xmlns="http://www.w3.org/2000/svg" width="30" height="500" viewBox="0 0 55.1 1089.32">
                        <polygon points="13.54 1089.32 .16 1086.71 41.54 562.98 0 2.83 13.36 0 55.1 562.87 55.01 564.23 13.54 1089.32"/>
                        </svg>
                    </button>
                </div>
                <span className={`flex w-max justify-center items-start h-full`}>
                    {project.images?.map((e:any, index)=>(
                        e._type === 'mp4'?
                        <div key={`project.slug+${index}`} className={`snap-center snap-always peer flex justify-center items-center h-[69lvh] bg-black mx-1`}>
                            <video width="1440" height="1080" muted controls loop autoPlay preload="true"
                            className={`object-cover transition-all duration-500 h-[50lvh] w-[99vw]`}>
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
                            className={`object-cover transition-all duration-500 h-[50lvh] w-[99vw]`}
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