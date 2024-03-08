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
            //
            cardRef.current.classList.replace("opacity-100", "opacity-0")
        }, 1000): ""
        cardRef? setTimeout(()=>{
            cardRef.current.classList.add("hidden")
        }, 3000): ""
    }, [cardRef])
    
    return(
        <div ref={cardRef} className="w-screen h-screen bg-white fixed top-0 z-30 flex flex-col justify-center items-center opacity-100 transition transition-all duration-1000 pointer-events-none">
            <Image className=""  src={require('../src/Drew-1.gif')} alt="loading..." />
            <p className="text-8xl text-lighter">Art Director, Designer, Illustrator</p>
        </div>
    )
}