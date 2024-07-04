"use client"
import { useSearchParams } from "next/navigation";

export function Name(){
    const searchParams = useSearchParams();    
    const view = searchParams.get('view');
    const selectedProject = searchParams.get("project");
    return(
        <section className={`fixed z-40 text-2xl bottom-0 transition-all py-1 px-2 my-5 text-white  hover:underline decoration-dotted mix-blend-difference ${view==="all" || selectedProject? "": ""} ${view==="all"? "": ""}}`}><a href=""><h1>This is the website of Drew Litowitz</h1></a></section>
    )
}