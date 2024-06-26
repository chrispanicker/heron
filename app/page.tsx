import { Name } from "@/components/name";
import { OpeningCard } from "@/components/opening-card";
import Projects from "@/components/projects";
import { TestFilter } from "@/components/test-filter";
import {getFilteredProjects, getGallery } from "@/sanity/sanity-utils"; 
import dynamic from "next/dynamic";

interface Props {
  searchParams: {
    tags?: string
    collabs?: string
    roles?: string
    view?: string

  }
}

const ProjectListing = dynamic(() => import("@/components/project-listing"))
const UsedFilters = dynamic(() => import("@/components/used-filters"))

export default async function Home({searchParams}: Props) {
  
  const {tags, collabs, roles, view} = searchParams 
  let filteredProjects= await getFilteredProjects({searchParams});
  let gallery = await getGallery();

  return (
    filteredProjects? <main id="main" className={`font-normal z-0 flex flex-col items-center justify-start min-h-screen`}>
        <OpeningCard gallery={gallery} />
        <Name />
        <section className="">
          {filteredProjects.map((project:any, index:number)=>{ 
            return(
              <div className={view === "txt"? "": "sticky top-0"} key={project.name + project._id}>
                <Projects filteredProjects={filteredProjects} project={project} index={index}/>
              </div>
          )})}
        </section>
        <UsedFilters role={roles} tags={tags} collabs={collabs}/>
    </main>: <main className="w-screen h-screen flex justify-center items-center cursor-progress"><h1>Ah! There was an error loading the page!! Please refresh, thanks!</h1></main>
  )
}