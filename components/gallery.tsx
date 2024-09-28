
import { urlForImage } from "@/sanity/lib/image"
import { Project } from "@/types/project"
import Image from "next/image"
import { useSearchParams } from "next/navigation";

interface Props{
    project: Project
}


export function Gallery({project}:Props){
    const searchParams = useSearchParams(); 
    const selectedProject = searchParams.get("project")  
    let vimeoIDs:string[] = [];
    
    project.vimeo?.map((vid, index)=>{
        vimeoIDs[index]=vid.replace("https://vimeo.com/", "")
    })

    return(
        <>
        {/* GALLERY */}
        <div id={`${project.slug}-gallery`} className={`relative ${selectedProject===project.slug? "overflow-x-scroll":""} scroll-smooth overflow-y-hidden snap-x snap-mandatory`}>
                <div className={`sticky left-0 flex w-full justify-between items-center top-[50%] z-50 text-2xl text-gray-300 serif h-fit leading-[1.1rem] ${project.gallery.length<2? "hidden": ""}`}>
                    <button className="bg-black px-1 mx-2 outline outline-1 outline-gray-300 hover:outline-black hover:bg-gray-300 hover:text-black"
                    onClick={()=>{
                        let gallery = document.querySelector(`#${project.slug}-gallery`)
                        var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
                        function remToPx(remValue:number, rootFontSize:number) { // Convert REM to PX using the formula 
                            var pxValue = remValue * rootFontSize;
                            // Return the result
                            return pxValue;
                        }
                        let width = remToPx(53.3333333, rootFontSize)
                        gallery!.scrollLeft===0? gallery!.scrollLeft=gallery!.scrollWidth
                        :gallery!.scrollLeft -= width
                    }}>&larr;</button>
                    <button className="bg-black px-1 mx-2 outline outline-1 outline-gray-300 hover:outline-black hover:bg-gray-300 hover:text-black"
                    onClick={()=>{
                        let gallery = document.querySelector(`#${project.slug}-gallery`)
                        var rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
                        function remToPx(remValue:number, rootFontSize:number) { // Convert REM to PX using the formula 
                            var pxValue = remValue * rootFontSize;
                            // Return the result
                            return pxValue;
                        }
                        let width = remToPx(53.3333333, rootFontSize)
                        gallery!.scrollLeft>width*(project.images.length-2)? gallery!.scrollLeft=0
                        :gallery!.scrollLeft += width
                    }}>&rarr;</button>
                </div>
                <span className={`flex w-max justify-center items-start`}>
                    {/* current image */}
                    {project.vimeo?.map((vid, index)=>(
                        <div key={`project.slug+${index}`} className={`pointer-events-auto px-2 snap-center rounded-lg snap-always peer flex justify-center items-center transition-all duration-50`}>
                            {/* main gallery vimeo */}
                            <div className={`relative overflow-hidden w-full pt-[56.25%]`}>
                                <iframe className="absolute top-0 left-0 w-full h-full" src={`https://player.vimeo.com/video/${vimeoIDs[index]}?loop=1&title=0&byline=0&portrait=0`} allow="autoplay; fullscreen; picture-in-picture"></iframe>
                            </div>
                        </div>
                    ))}
                    {project.images?.map((image, index)=>(
                        <div key={`project.slug+${index}`} className={`snap-center snap-always peer flex justify-center items-center`}>
                            {/* main nav gallery images */}
                            <Image
                            src={urlForImage(image).url()}
                            alt=""
                            width={1080}
                            height={1080}
                            className={`object-cover pr-1 transition-all duration-500 w-[53.33333rem] h-[40rem] ${selectedProject===project.slug?``: ""}`}
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