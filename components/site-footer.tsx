'use client'

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";



export function SiteFooter(info:any){
    const footerRef = useRef(null)
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    return (
        isSanityStudio? "" : 
        <footer ref={footerRef} id="footer" className="z-40 lg:text-5xl text-2xl overflow-y-scroll fixed bottom-0 h-[0vh] duration-500 w-screen justify-center text-justify w-full bg-gray-400 text-gray-400">
            <div id="footImgDiv" className="fixed flex w-screen top-screen justify-center items-center"

            >
            <button id="footerTab" className="fixed bottom-0 right-0 bg-gray-400 text-white hover:text-gray-400 hover:bg-white px-2 py-1 m-5" onClick={()=>{
                let footer = document.querySelector("#footer")
                footer?.classList.toggle("h-[0dvh]")
                footer?.classList.toggle("h-[100dvh]")
            }}>About</button>
                
            </div>
            <div className="w-4/4 text-white lg:m-40 m-5 p-2">
                <PortableText value={info.info[0].bio[0]}/>
            </div>
            {/* <div className="m-40 text-white w-4/4">
            <tr >
                <td className="w-1/4">Pitchfork</td>
                <td className="w-1/4">Designer</td>
                <td className="w-1/4">2020-2021</td>
            </tr>
            <tr>
                <td>Wolff Olins</td>
                <td>Senior Designer</td>
                <td>2021-2022</td>
            </tr>
            <tr>
                <td>AIR COMPANY</td>
                <td>Senior Designer</td>
                <td>2022-</td>
            </tr>
            </div> */}
        </footer>
    )
}