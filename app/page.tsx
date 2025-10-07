import HomeClient from "@/components/homeClient";
import { getFilteredProjects, getInfo } from "@/sanity/lib/queries";

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
  let filteredProjects = await getFilteredProjects({searchParams});
  let info = await getInfo();
  let slugs:string[] = [];
  filteredProjects.map((project:any, index: number)=>{
    slugs[index] = project.slug;
  })
  return (
    filteredProjects? 
    <HomeClient filteredProjects={filteredProjects} slugs={slugs} info={info} />
    : <main className="w-screen h-screen flex justify-center items-center cursor-progress"><h1>Ah! There was an error loading the page!! Please refresh, thanks!</h1></main>
  )
}