'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { openFilters } from "./functions";
import { useCallback, useEffect, useState } from "react";
import { buttonClass, textSize } from "./classes";


type job ={
    company: string,
    years: string,
    title: string
}

interface SiteHeaderProps {
  info: any;
  activeTab?: 'about' | 'filters';
  setActiveTab?: (tab: 'about' | 'filters') => void;
}

export function SiteHeader({info, activeTab = 'filters', setActiveTab}: SiteHeaderProps){
  console.log(info[0].header);
    const pathname = usePathname(); 
    const isSanityStudio = pathname.startsWith('/admin');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const selectedProject = searchParams.get("project")
    const e = 1

    useEffect(() => {
      const checkFiltersOpen = () => {
        const filters = document.querySelector("header section");
        if (filters?.classList.contains("max-h-[10rem]")) {
          setIsFiltersOpen(true);
        } else {
          setIsFiltersOpen(false);
        }
      };

      // Check on mount
      checkFiltersOpen();

      // Listen for changes
      const observer = new MutationObserver(checkFiltersOpen);
      const filters = document.querySelector("header section");
      if (filters) {
        observer.observe(filters, { attributes: true });
      }

      return () => observer.disconnect();
    }, []);
    
    const createQueryString = useCallback(
        (name: string, value: string) => {
            let params;
            let stringSearchParams = searchParams.toString()
            stringSearchParams = stringSearchParams.replaceAll("+", " ")
            stringSearchParams = stringSearchParams.replaceAll("%2C", ",")
            params = new URLSearchParams(stringSearchParams)

        
            if(name==="project"){
                if(stringSearchParams.includes(`${name}=${value}`)){ 
                    params.delete(name, value)
                }else{params.set(name, value)}
            //not a project?? IE tags?
            }else {
                if(name==="roles"||name==="tags"||name==="collabs"||name==="type" && selectedProject){
                    params.delete("project", selectedProject!)
                    window.scrollTo(scrollX, 0)
                }

                if(stringSearchParams.includes(`${name}=${value}`)){
                    params.delete(name, value)
                }else{params.append(name, value)}
            }
                
            return params.toString()

        },
        [searchParams]
    )
    return (
        isSanityStudio? "" : 
        <>
            <span className="flex justify-between items-center lg:px-5 outline outline-gray-300 px-2 w-[100dvw] mono-book sticky top-0 bg-black z-50"
            >
                <h1 className={`flex justify-center items-center duration-500 leading-[.6rem] uppercase mono-book ${textSize}`}
                onClick={()=>{
                  if(window.innerWidth<1024){
                    window.scrollTo({top:0, left:0, behavior:"instant"})
                    window.location.href= "./"
                  }

                    window.scrollTo({top:0, left:0, behavior:"smooth"})
                
                  selectedProject? router.push("?"+createQueryString("project", `${selectedProject}`), {scroll:false}): ""
                }}>Drew Litowitz&nbsp;
                    <p className="lg:inline-block hidden pr-4">{info?.[0]?.header}</p>
                    <button className={`mono-book outline outline-1 p-1 ${selectedProject? "hover:bg-gray-300 hover:text-black": "hidden"}`}
                    onClick={()=>{
                      router.push("?"+createQueryString("project", `${selectedProject}`), {scroll:false})
                    }}>CLOSE ALL</button>
                </h1>
                <div className="flex justify-center items-center h-max group" onClick={()=>{openFilters(e)}}>
                    <p className={`lg:block hidden uppercase pr-1 group-hover:underline ${textSize}`}>Filters</p>
                    <button className="filters text-2xl z-50 transition-all lg:group-hover:rotate-[15deg] sans font-bolder" 
                    >
                   +
                    </button>
                </div>
            </span>
            {isFiltersOpen && (
              <div className="lg:hidden fixed bottom-0 left-0 right-0 flex justify-between items-center border-t border-t-2 border-gray-300 bg-black px-2 py-2 z-40">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab?.('filters')}
                    className={`outline outline-1 mono-book uppercase text-sm px-1 h-[1.2rem] flex justify-center items-center ${
                      activeTab === 'filters'
                        ? 'bg-gray-300 text-black'
                        : 'bg-black text-gray-300 outline-gray-300'
                    }`}
                  >
                    Projects & Filters
                  </button>
                  <button
                    onClick={() => setActiveTab?.('about')}
                    className={`outline outline-1 mono-book uppercase text-sm px-1 h-[1.2rem] flex justify-center items-center ${
                      activeTab === 'about'
                        ? 'bg-gray-300 text-black'
                        : 'bg-black text-gray-300 outline-gray-300'
                    }`}
                  >
                    About
                  </button>
                </div>
                <button
                  onClick={() => openFilters(e)}
                  className="outline outline-1 outline-gray-300 px-1 mono-book bg-black hover:bg-gray-300 hover:text-black uppercase text-sm h-[1.2rem] flex justify-center items-center"
                >
                  CLOSE Menu
                </button>
              </div>
            )}
        </>
    )
}