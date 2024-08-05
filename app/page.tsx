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
    filteredProjects? <main id="main" className={`top-0 font-normal z-0 flex flex-col items-center justify-start min-h-screen ${about==="open"? "overflow-hidden": ""}`}>
        <Name />
        <UsedFilters/>
        <section className={`${view==="full"? "h-[100dvh] snap-y snap-mandatory overflow-y-scroll block": "lg:py-40 pb-20 grid gap-5 min-[1500px]:grid-cols-5 min-[1200px]:grid-cols-4 min-[720px]:grid-cols-3 grid-cols-2 justify-items-stretch lg:mx-40 mx-5"}`}>
          <TestFilter projects={allProjects}/>
          {filteredProjects.map((project:any, index:number)=>{ 
            return(
              <div className={`top-0 transition-all duration-500`} key={project.name + project._id}>
                <MobileProjects filteredProjects={filteredProjects} project={project} index={index}/>
              </div>
          )})}
        </section>
    </main>: <main className="w-screen h-screen flex justify-center items-center cursor-progress"><h1>Ah! There was an error loading the page!! Please refresh, thanks!</h1></main>
  )
}