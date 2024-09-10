'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

type job ={
    company: string,
    years: string,
    title: string
}


export function SiteHeader(info:any){
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
        const hoverClass = "outline outline-1 outline-black"
    const textClass = " lg:text-xl lg:leading-auto text-[1rem] leading-[1.2rem] "

    // window.onscroll = function() {scrollFunction()};

    // function scrollFunction() {
    // if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    //     document.querySelector("header")!.classList.replace("text-2xl","text-xl");
    //     document.querySelector("header")!.classList.replace("leading-[9rem]","leading-[1.4rem]");          
    // } else {
    //     document.querySelector("header")!.classList.replace("text-xl", "text-2xl");
    //     document.querySelector("header")!.classList.replace("leading-[1.4rem]","leading-[9rem]");     
    // }
    // }    
    console.log(info)

    return (
        isSanityStudio? "" : 
        <header className="bg-black flex-col sans justify-between items-center text-gray-300 px-2 lg:sticky fixed top-0 w-screen duration-500 transition-all z-50">
            <span className="flex justify-between items-center">
            <h1 className="flex">Drew Litowitz&nbsp;<p className="lg:block hidden">is a graphic designer and art director based in NYC.</p></h1>
            <button className="text-2xl">+</button>
            </span>
            {/* <div className="transition-all overflow-hidden">
                
            </div> */}
        </header>
    )
}