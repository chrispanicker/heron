import MobileProjects from "@/components/mobile-projects";
import { Name } from "@/components/name";
import { OpeningCard } from "@/components/opening-card";
import Projects from "@/components/projects";
import {getFilteredProjects, getGallery } from "@/sanity/sanity-utils"; 
import dynamic from "next/dynamic";

interface Props {
  searchParams: {
    view?: string
    tags?: string[]
    collabs?: string[]
    roles?: string[]
    about?: string
  }
}

const UsedFilters = dynamic(() => import("@/components/used-filters"))

export default async function Home({searchParams}: Props) {
  const {tags, collabs, roles, about, view} = searchParams 
  let filteredProjects= await getFilteredProjects({searchParams});

  return (
    filteredProjects? <main id="main" className={`font-normal z-0 flex flex-col items-center justify-start min-h-screen`}>
        <Name />
        <UsedFilters/>
        <section className={`pb-20 h-[100dvh] snap-y snap-mandatory lg:hidden ${view==="all"? "overflow-y-scroll block": "block"} `}>
          {filteredProjects.map((project:any, index:number)=>{ 
            return(
              <div className={` ${view==="all"? "" : ""} top-0 transition-all duration-500 ${about === "open"? "blur-3xl": ""}`} key={project.name + project._id}>
                <MobileProjects filteredProjects={filteredProjects} project={project} index={index}/>
              </div>
          )})}
        </section>

        <section className={`pb-20 hidden lg:grid ${view==="all"? "grid min-[1500px]:grid-cols-5 lg:grid-cols-4 md:grid-cols-2 lg:mx-12 min-[1500px]:mx-20": ""}`}>
          {filteredProjects.map((project:any, index:number)=>{ 
            return(
              <div className={`transition-all duration-500 ${about === "open"? "blur-2xl": ""}`} key={project.name + project._id}>
                <Projects filteredProjects={filteredProjects} project={project} index={index}/>
              </div>
          )})}
        </section>
    </main>: <main className="w-screen h-screen flex justify-center items-center cursor-progress"><h1>Ah! There was an error loading the page!! Please refresh, thanks!</h1></main>
  )
}