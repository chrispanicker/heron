"use client"
import project from "@/sanity/schemas/project-schema";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function Views(){
    const router = useRouter();
    const blurClass = ' backdrop-blur-sm backdrop-brightness-[.8] ';
    const searchParams = useSearchParams();    
    const view = searchParams.get('view');
    const selectedProject = searchParams.get('project')
    const createQueryString = useCallback(
        (name: string, value: string) => {
            let params;
            

            selectedProject? 
            document.querySelectorAll(".bg-black").forEach((e)=>{
                e.classList.remove('bg-black')
            }): ""


            let stringSearchParams = searchParams.toString()
            stringSearchParams = stringSearchParams.replaceAll("+", " ")
            params = new URLSearchParams(stringSearchParams)


            if(name==="roles"||"tags"||"collabs" && selectedProject){
                params.delete("project", params?.get("project")!)
                document.querySelectorAll(".bg-black").forEach((e)=>{
                    e.classList.remove('bg-black')
                })
            } 

            stringSearchParams.includes(`${name}=${value}`)?
            params.delete(name, value):params.append(name, value)
            return params.toString()

            
        },
        [searchParams]
    )

    return(
        <div className={`w-screen justify-center mt-5 lg:mb-6 mb-2 lg:relative w-screen flex sticky top-5 z-40 ${selectedProject? "blur-2xl": ""}`}>
            <h2 className="px-2">View:</h2>
            <button className={`${blurClass} px-1 mr-2 ${view==="list"? "bg-white text-black": ""}`}
            onClick={()=>{
                router.push( `/?view=list`, {scroll: false})
            }}>List</button>
            <button className={`${blurClass} px-1 ${view==="grid"? "bg-white text-black": ""}`}
            onClick={()=>{
                router.push( `/?view=grid`, {scroll: false})
            }}>Grid</button>
        </div>
    )
}

