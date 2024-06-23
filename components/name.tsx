"use client"
import { useSearchParams } from "next/navigation";

export function Name(){
    const searchParams = useSearchParams();    
    const view = searchParams.get('view');
    const selectedProject = searchParams.get("project");
    return(
        <section className={`transition-all py-1 px-2 my-5 text-gray-400 bg-white hover:text-white hover:bg-gray-400 ${view==="all" || selectedProject? "lg:text-5xl text-2xl": "lg:text-5xl text-2xl"} ${view==="all"? "sticky top-5": ""}}`}><a href=""><h1>This is the Website of Drew Litowitz</h1></a></section>
    )
}