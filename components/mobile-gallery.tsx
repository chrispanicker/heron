
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
        <div id={`${project.slug}-mobileGallery`} className={`pt-10 left-0 w-screen scroll-smooth overflow-x-scroll overflow-y-hidden snap-x snap-mandatory transition-all`}>
                <div className={`sticky left-0 flex w-full justify-between items-center top-[50%] text-2xl text-gray-300 serif h-fit leading-[1.1rem] ${project.gallery.length<2? "hidden": ""}`}>
                    <button className="bg-black mx-2 px-[.1rem]"
                    onClick={()=>{
                        let gallery = document.querySelector(`#${project.slug}-mobileGallery`)
                        let width = document.documentElement.clientWidth
                        gallery!.scrollLeft>=0&& gallery!.scrollLeft<50? gallery!.scrollLeft=gallery!.scrollWidth
                        :gallery!.scrollLeft -= width
                    }}>
                        <svg id="a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 10.87 9.46">
                        <rect width="10.87" height="9.46"/>
                        <path fill="#d1d5db" d="M4.87,8.55l-3.82-3.82L4.87.91l.66.65-2.7,2.7h7s0,.94,0,.94H2.82s2.7,2.69,2.7,2.69l-.66.66Z"/>
                        </svg>
                    </button>
                    <button className="bg-black mx-2 px-[.1rem]"
                    onClick={()=>{
                        let gallery = document.querySelector(`#${project.slug}-mobileGallery`)
                        let width = document.documentElement.clientWidth
                        gallery!.scrollLeft>width*(project.images.length-2)? gallery!.scrollLeft=0
                        :gallery!.scrollLeft += width
                    }}>
                        <svg id="a" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 10.87 9.46">
                        <rect width="10.87" height="9.46"/>
                        <path fill="#d1d5db" d="M6,.91l3.82,3.82-3.82,3.82-.66-.65,2.7-2.7H1.05v-.94h7l-2.7-2.69.66-.66Z"/>
                        </svg>
                    </button>
                </div>
                <span className={`flex w-max justify-center items-start h-full`}>
                    {/* {project.vimeo?.map((vid, index)=>(
                        <div key={`mobile-${project.slug}+${index}`} className={`pointer-events-auto px-2 snap-center rounded-lg snap-always peer flex justify-center items-center transition-all duration-50`}>
                            <div className={`relative overflow-hidden w-full pt-[56.25%]`}>
                                <iframe className="absolute top-0 left-0 w-full h-full" src={`https://player.vimeo.com/video/${vimeoIDs[index]}?loop=1&title=0&byline=0&portrait=0`} allow="autoplay; fullscreen; picture-in-picture"></iframe>
                            </div>
                        </div>
                    ))} */}
                    {project.images?.map((image, index)=>(
                        <div key={`mobile-${project.slug}+${index}`} className={`snap-center snap-always peer flex justify-center items-center`}>
                            {/* main nav gallery images */}
                            <Image
                            src={urlForImage(image).url()}
                            alt=""
                            width={1080}
                            height={1080}
                            className={`object-cover transition-all duration-500 h-[69lvh] w-screen px-2`}
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