'use client'

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

export function OpeningCard(){
    const router = useRouter();
    const cardRef = useRef<HTMLDivElement>(null!)
    const h1Ref = useRef<HTMLHeadingElement>(null!)
    const searchParams = useSearchParams();    
    const selectedProject = searchParams.get('project');
    const view = searchParams.get('view');

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        }, [searchParams]
    )  

    useEffect(()=>{
        if(selectedProject === null || selectedProject === ""){

        }else{
            let proj = document.querySelector(`#${selectedProject}`)
            proj?.scrollIntoView({
                block: "center",
            behavior: 'smooth'
        })}
        view? "": router.push( `/?${createQueryString(`view`, `txt`)}`)

    }, [selectedProject])
    
    useEffect(()=>{
        cardRef? setTimeout(()=>{
            cardRef.current.classList.replace("top-0", "top-full")
        }, 2000): ""
        cardRef? setTimeout(()=>{
            cardRef.current.classList.add("hidden")
        }, 4000): ""
    }, [cardRef])

    return(
        <div ref={cardRef} className="w-screen h-screen bg-white fixed top-0 z-50 flex flex-col justify-center items-center opacity-100 transition transition-all duration-1000 ease-in-out pointer-events-none">
            <div className="flex justify-center items-center h-[15rem]">
                <Image className="w-3/4 z-50" src={require('../src/Drew-1.gif')} alt="loading..." onLoad={(e)=>{h1Ref.current? h1Ref.current?.classList.add("opacity-0"): ""}} priority />
                <h1 ref={h1Ref} className="transition-all duration-200 absolute vivaldii lg:text-[16.5rem] md:text-[16.5rem]">Drew Litowitz</h1>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center w-4/4">
                <p className="bg-gray-400 text-7xl text-black mb-2 w-fit px-2">Art Director</p>
                <p className="bg-gray-400 text-7xl text-black mb-2 w-fit px-2">Designer</p>
                <p className="bg-gray-400 text-7xl text-black mb-2 w-fit px-2">Illustrator</p>
            </div>
        </div>
    )
}