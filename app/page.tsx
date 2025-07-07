import MobileProjects from "@/components/mobile-projects";
import Projects from "@/components/project";
import { Scroller } from "@/components/scroller";
import { SiteFooter } from "@/components/site-footer";
import { Sorts } from "@/components/sorts";
import { getFilteredProjects, getInfo, getJobs, getProjects } from "@/sanity/lib/queries";

interface Props {
  searchParams: {
    view?: string
    tags?: string[]
    collabs?: string[]
    roles?: string[]
    sort?: string
    about?: string
    type?: string[]
    project?: string
  }
}

export default async function Home({searchParams}: Props) {
  const {tags, collabs, roles, about, view, sort, type, project} = searchParams 
  let filteredProjects= await getFilteredProjects({searchParams});
  let info = await getInfo();
  let jobs = await getJobs();
  let slugs:string[] = []
  filteredProjects.map((project:any, index: number)=>{
    slugs[index] = project.slug;
  })

  return (
    filteredProjects? <main className="z-20 min-h-[96.2vh]">
      <div className="lg:h-[10rem]"></div>
      <Scroller />
        <Sorts />
        {filteredProjects.map((proj:any, index:number)=>{ 
        return(
          <div className={`duration-500 ${project===proj.slug? "transition-none pb-[2rem]": "transition-all"}`} key={proj.slug}>
            <Projects project={proj} slugs={slugs}/>
            <MobileProjects project={proj}/>
          </div>
        )})}
        <div className="lg:block hidden">
          <SiteFooter info={info} jobs={jobs}/>
        </div>

    </main>: 
    <main className="w-screen h-screen flex justify-center items-center cursor-progress"><h1>Ah! There was an error loading the page!! Please refresh, thanks!</h1></main>
  )
}