"use client"
import { useSearchParams } from "next/navigation";

export function Name(){
    const searchParams = useSearchParams();    
    const view = searchParams.get('view');
    const about = searchParams.get('about');
    const selectedProject = searchParams.get("project");
    const blurClass = 'backdrop-blur-sm backdrop-brightness-[.7]'
    return(
        <section className={`fixed z-[45] text-lg bottom-0  h-fit transition-all px-1 text-[1rem] leading-[1.4rem] mx-1 py-0 mb-5 w-fit whitespace-nowrap hover:bg-white hover:text-gray-400 ${about==="open"? "blur-3xl": `${blurClass}`}`}><a href=""><h1>&#169; Drew Litowitz</h1></a></section>
    )
}