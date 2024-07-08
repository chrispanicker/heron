"use client"
import { useSearchParams } from "next/navigation";

export function Name(){
    const searchParams = useSearchParams();    
    const view = searchParams.get('view');
    const selectedProject = searchParams.get("project");
    const blurClass = 'backdrop-blur-sm backdrop-brightness-[.7]'
    return(
        <section className={`fixed z-40 lg:text-2xl text-lg bottom-0  h-fit transition-all px-2 my-5 hover:bg-white hover:text-gray-400 decoration-dotted ${blurClass} ${view==="all" || selectedProject? "": ""} ${view==="all"? "": ""}}`}><a href=""><h1>This is the website of Drew Litowitz</h1></a></section>
    )
}