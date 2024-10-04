import MobileProjects from "@/components/mobile-projects";
import Projects from "@/components/project";
import { Scroller } from "@/components/scroller";
import SillyCanvas from "@/components/silly-canvas";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Sorts } from "@/components/sorts";
import { getFilteredProjects, getInfo, getProjects } from "@/sanity/lib/queries";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

interface Props {
  searchParams: {
    view?: string
    tags?: string[]
    collabs?: string[]
    roles?: string[]
    sort?: string
    about?: string
    project?: string
  }
}


const UsedFilters = dynamic(() => import("@/components/used-filters"))

export default async function Home({searchParams}: Props) {
  const {tags, collabs, roles, about, view, sort, project} = searchParams 
  let filteredProjects= await getFilteredProjects({searchParams});
  let info = await getInfo();

  return (
    filteredProjects? <main className="lg:mx-5 z-20">

      <div className="h-[10rem]"></div>
      <Scroller />
        <Sorts />
        {filteredProjects.map((proj:any, index:number)=>{ 
        return(
          <div className={` duration-500 ${project===proj.slug? "transition-none py-[3.1rem]": "transition-all"}`} key={proj.slug}>
            <Projects project={proj}/>
            <MobileProjects project={proj}/>
          </div>
        )})}
        <SiteFooter info={info} />

    </main>: <main className="w-screen h-screen flex justify-center items-center cursor-progress"><h1>Ah! There was an error loading the page!! Please refresh, thanks!</h1></main>
  )
}