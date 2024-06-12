import { OpeningCard } from "@/components/opening-card";
import {getFilteredProjects, getGallery } from "@/sanity/sanity-utils"; 
import dynamic from "next/dynamic";

interface Props {
  searchParams: {
    tags?: string
    collabs?: string
    roles?: string
  }
}

export const fetchCache = 'force-no-store';
const ProjectListing = dynamic(() => import("@/components/project-listing"))
const UsedFilters = dynamic(() => import("@/components/used-filters"))

export default async function Home({searchParams}: Props) {
  
  const {tags, collabs, roles} = searchParams 
  let filteredProjects= await getFilteredProjects({searchParams});
  let gallery = await getGallery();

  return (
    filteredProjects? <main id="main" className={`py-32 font-normal z-0 text-gray-400 bg-white flex flex-col items-center justify-start min-h-screen`}>
        <OpeningCard gallery={gallery} />
        <section className="Project3dParent">
          {filteredProjects.map((project:any, index:number)=>{ 
            return(
              <div className="Project3d flex justify-center items-center lg:text-4xl text-[1.5rem]" key={project._id}>
                  <ProjectListing filteredProjects={filteredProjects} project={project} index={index}/>
              </div>
          )})}
        </section>

        <h1 className="fixed bottom-0 mb-5 bg-gray-400 text-white lg:text-2xl px-2">This is the website of Drew Litowitz</h1>
        <UsedFilters role={roles} tags={tags} collabs={collabs}/>
    </main>: <main className="w-screen h-screen flex justify-center items-center cursor-progress"><h1>Ah! There was an error loading the page!! Please refresh, thanks!</h1></main>
  )
}