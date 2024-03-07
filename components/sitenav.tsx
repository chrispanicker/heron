"use client"
export function SiteNav(){
    return(
        <>
            <button className="gerstner fixed lg:block hidden w-screen top-0 p-10 hover:underline cursor-n-resize" 
            onClick={()=>{
                let filters = document.querySelector("#filters");
                filters?.scrollIntoView({
                    behavior: 'smooth'
                });
            }}></button>

            <button className="gerstner lg:block hidden fixed w-screen bottom-0 p-10 hover:underline cursor-s-resize" 
            onClick={()=>{
                let foot = document.querySelector("footer");
                foot?.scrollIntoView({
                    behavior: 'smooth'
                });
            }}></button>
        </>
    )
}