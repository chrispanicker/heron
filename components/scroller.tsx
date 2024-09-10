'use client'
import { useEffect, useRef } from "react"

export function Scroller(){
    const htmlRef = useRef<HTMLElement>(null!)
    useEffect(()=>{
        const handleScrollPosition = () => {
            const scrollPosition = sessionStorage.getItem("scrollPosition");
            if (scrollPosition) {
                window.scrollTo(0, parseInt(scrollPosition));
                sessionStorage.removeItem("scrollPosition");
                // console.log("scroll handled")
            }
        };
        handleScrollPosition()
        window.addEventListener('scroll', ()=>{
            sessionStorage.setItem("scrollPosition", `${window.scrollY}`);
            // console.log(`${window.scrollY}`)
        })

    }, [htmlRef])

    return (<div></div>)

}