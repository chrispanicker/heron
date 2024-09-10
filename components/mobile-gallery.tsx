
import { urlForImage } from "@/sanity/lib/image"
import { Project } from "@/types/project"
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
        <div className={`absolute top-20 left-0 w-screen overflow-x-scroll overflow-y-hidden snap-x snap-mandatory h-screen`}>
                <span className={`flex w-max justify-center items-start`}>
                    {/* current image */}
                    {project.vimeo?.map((vid, index)=>(
                        <div key={`mobile-${project.slug}+${index}`} className={`pointer-events-auto px-2 snap-center rounded-lg snap-always peer flex justify-center items-center transition-all duration-50`}>
                            {/* main gallery vimeo */}
                            <div className={`relative overflow-hidden w-full pt-[56.25%]`}>
                                <iframe className="absolute top-0 left-0 w-full h-full" src={`https://player.vimeo.com/video/${vimeoIDs[index]}?loop=1&title=0&byline=0&portrait=0`} allow="autoplay; fullscreen; picture-in-picture"></iframe>
                            </div>
                        </div>
                    ))}
                    {project.images?.map((image, index)=>(
                        <div key={`mobile-${project.slug}+${index}`} className={`snap-center snap-always peer flex justify-center items-center h-full`}>
                            {/* main nav gallery images */}
                            <Image
                            src={urlForImage(image).url()}
                            alt=""
                            width={1080}
                            height={1080}
                            className={`object-cover transition-all duration-500 h-[83vh] w-screen px-2`}
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