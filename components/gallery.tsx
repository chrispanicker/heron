
import { urlForImage } from "@/sanity/lib/image"
import { Project } from "@/types/project"
import Image from "next/image"
import {getFile, getFileAsset} from '@sanity/asset-utils'
import { useSearchParams } from "next/navigation";

interface Props{
    project: Project
}


export function Gallery({project}:Props){
    const searchParams = useSearchParams(); 
    const selectedProject = searchParams.get("project")  
    // console.log(project.images.map((e:any)=>{
    //     return e._type === "mp4"? getFile(e, {projectId:"01jwvji0", dataset:"production"}): ""
    // }))

    return(
        <>
        {/* GALLERY */}
        <div id={`${project.slug}-gallery`} className={`relative ${selectedProject===project.slug? "overflow-x-scroll":""} scroll-smooth overflow-y-hidden snap-x snap-mandatory`}
        onScroll={(e)=>{
            let larr = document.querySelector(`#${project.slug}_larr`)
            if(e.currentTarget.scrollLeft<200 && larr?.classList.contains("opacity-100")){
                larr.classList.replace("opacity-100", "opacity-0")
            }else if(e.currentTarget.scrollLeft>200 && larr?.classList.contains("opacity-0")){
                larr!.classList.replace("opacity-0","opacity-100")

            } 
        }}>
            <span className={`flex w-max justify-center items-start`}>
                {project.images?.map((e:any, index)=>(
                    e._type === 'mp4'?
                    <div key={`project.slug+${index}`} className={`snap-center snap-always peer flex justify-center items-center pr-2`}>
                        <video width="1440" height="1080" muted loop autoPlay preload="true" className="w-[43rem] h-[32rem]">
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
                    :<div key={`project.slug+${index}`} className={`snap-center snap-always peer flex justify-center items-center`}>
                        <Image
                        src={urlForImage(e).url()}
                        alt=""
                        width={1080}
                        height={1080}
                        className={`object-cover pr-2 transition-all duration-500 w-[42rem] h-[32rem] ${selectedProject===project.slug?``: ""}`}
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