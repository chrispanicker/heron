"use client"
import { useSearchParams } from "next/navigation";

export function Name(){
    const searchParams = useSearchParams();    
    const view = searchParams.get('view');
    const selectedProject = searchParams.get("project");
    return(
        <section className={`transition-all my-5 ${view==="all" || selectedProject? "text-5xl": "text-8xl"} sticky top-5 text-gray-400`}><a href=""><h1>This is the Website of Drew Litowitz</h1></a></section>
    )
}