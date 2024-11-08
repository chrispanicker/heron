
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
        <div id={`${project.slug}-mobileGallery`} className={`relative scroll-smooth overflow-x-scroll overflow-y-hidden snap-x snap-mandatory mt-10`}
        onScroll={(e)=>{
            let larr = document.querySelector(`#mobile-${project.slug}_larr`)
            if(e.currentTarget.scrollLeft<20 && larr?.classList.contains("opacity-100")){
                larr.classList.replace("opacity-100", "opacity-0")
            }else if(e.currentTarget.scrollLeft>20 && larr?.classList.contains("opacity-0")){
                larr!.classList.replace("opacity-0","opacity-100")
            } 
        }}>
                <span className={`flex w-max justify-center items-start h-full`}>
                    {project.images?.map((e:any, index)=>(
                        e._type === 'mp4'?
                        <div key={`project.slug+${index}`} className={`snap-center snap-always peer flex justify-center items-center h-[60lvh] bg-black mx-1`}>
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
                        :<div key={`mobile-${project.slug}+${index}`} className={`snap-center snap-always peer flex justify-center items-center h-[60lvh] bg-black mx-1`}>
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