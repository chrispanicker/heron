import MobileProjects from "@/components/mobile-projects";
import { Name } from "@/components/name";
import { OpeningCard } from "@/components/opening-card";
import { TestFilter } from "@/components/test-filter";
import { Views } from "@/components/views";

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
    filteredProjects? <main id="main" className={`snap-y snap-mandatory top-0 flex z-0 flex-col items-center justify-start min-h-[100dvh]`}>
        <Name />
        <section className={`${view==="grid"? "flex flex-wrap justify-center items-center lg:pb-40 pb-20 lg:mx-40 mx-5": "flex flex-col justify-center items-center pb-5 lg:mx-40 mx-5"}`}>
          <Views />
          <TestFilter projects={allProjects}/>
          
          {/* <div className="flex flex-col justify-center items-center"> */}
            {/* <div className="w-screen flex justify-center pb-5">
              <h2 className="w-fit text-md flex text-center justify-center backdrop-blur-2xl backdrop-brightness-[.8] px-1">Project 
                <p className={`${view==="grid"? "": "hidden"}`}>&nbsp;Grid</p><p className={`${view==="list"? "": "hidden"}`}>&nbsp;List</p>
              </h2>
            </div> */}
            {filteredProjects.map((project:any, index:number)=>{ 
              return(
                <div className={`transition-all ${view==="grid"? "my-2 inline-block min-w-[10%] max-w-[100%] lg:pr-2 px-2": view==="list"? "": ""}`} key={project.name + project._id}>
                  <MobileProjects filteredProjects={filteredProjects} project={project} index={index}/>
                </div>
            )})}
          {/* </div> */}
        </section>
        <UsedFilters/>
    </main>: <main className="w-screen h-screen flex justify-center items-center cursor-progress"><h1>Ah! There was an error loading the page!! Please refresh, thanks!</h1></main>
  )
}