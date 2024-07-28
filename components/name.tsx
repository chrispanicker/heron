"use client"
import { useSearchParams } from "next/navigation";

export function Name(){
    const searchParams = useSearchParams();    
    const view = searchParams.get('view');
    const about = searchParams.get('about');
    const selectedProject = searchParams.get("project");
    const blurClass = 'backdrop-blur-sm backdrop-brightness-[.7]'
    return(
        <section className={`fixed z-40 text-lg bottom-0  h-fit transition-all px-2 my-5 hover:bg-white hover:text-gray-400 decoration-dotted ${about==="open"? "blur-3xl": `${blurClass}`}`}><a href=""><h1>&#169; Drew Litowitz</h1></a></section>
    )
}