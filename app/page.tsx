import MobileProjects from "@/components/mobile-projects";
import { Name } from "@/components/name";
import { OpeningCard } from "@/components/opening-card";
import { TestFilter } from "@/components/test-filter";

import {getFilteredProjects, getGallery, getProjects } from "@/sanity/sanity-utils"; 
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
  let allProjects = await getProjects();

  return (
    filteredProjects? <main id="main" className={`top-0 flex z-0 flex-col items-center justify-start min-h-[100dvh]`}>
        <Name />
        <UsedFilters/>
        <section className={`${view==="full"? "h-[100dvh] snap-y snap-mandatory overflow-y-scroll block": view==="grid"? "flex flex-wrap justify-center items-center lg:pb-40 pb-20 lg:mx-40 mx-5": "flex flex-col justify-center items-center pb-5 lg:mx-40 mx-5"}`}>
          <TestFilter projects={allProjects}/>
          {filteredProjects.map((project:any, index:number)=>{ 
            return(
              <div className={`transition-all ${view==="grid"? "my-2 inline-block min-w-[10%] max-w-[100%] pr-2": view==="list"? "": ""}`} key={project.name + project._id}>
                <MobileProjects filteredProjects={filteredProjects} project={project} index={index}/>
              </div>
          )})}
        </section>
    </main>: <main className="w-screen h-screen flex justify-center items-center cursor-progress"><h1>Ah! There was an error loading the page!! Please refresh, thanks!</h1></main>
  )
}