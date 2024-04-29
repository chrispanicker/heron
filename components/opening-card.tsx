'use client'

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export function OpeningCard(){
    const cardRef = useRef<HTMLDivElement>(null!)
    const searchParams = useSearchParams();    
    const selectedProject = searchParams.get('project');

    useEffect(()=>{
        if(selectedProject === null || selectedProject === ""){
            let main = document.querySelector("main")
            main?.scrollIntoView({
            behavior: 'smooth'
        })}else{
            let proj = document.querySelector(`#${selectedProject}`)
            proj?.scrollIntoView({
            behavior: 'smooth'
        })}

        cardRef? setTimeout(()=>{
            cardRef.current.classList.replace("top-0", "top-full")
        }, 1000): ""
        cardRef? setTimeout(()=>{
            cardRef.current.classList.add("hidden")
        }, 3000): ""
    }, [cardRef])
    
    return(
        <div ref={cardRef} className="w-screen h-screen bg-white fixed top-0 z-50 flex flex-col justify-center items-center opacity-100 transition transition-all duration-1000 ease-in-out pointer-events-none">
            <Image className="w-3/4" src={require('../src/Drew-1.gif')} alt="loading..." priority />
            <div className="flex flex-col lg:flex-row justify-center items-center w-4/4">
                <p className="bg-black text-7xl text-gray-400 text-lighter mb-2 w-fit px-2">Art Director</p>
                <p className="bg-black text-7xl text-gray-400 text-lighter mb-2 w-fit px-2">Designer</p>
                <p className="bg-black text-7xl text-gray-400 text-lighter mb-2 w-fit px-2">Illustrator</p>
            </div>
        </div>
    )
}