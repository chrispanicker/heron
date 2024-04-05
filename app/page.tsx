import FunkyButtons from "@/components/funky-buttons";
import { OpeningCard } from "@/components/opening-card";
import ProjectListing from "@/components/project-listing";
import { SiteNav } from "@/components/sitenav";
import { client } from "@/sanity/sanity-utils";
import { groq } from "next-sanity";

interface Props {
  searchParams: {
    tags?: string
    collabs?: string
    role?: string
  }
}

export default async function Home({searchParams}: Props) {
  const {tags, collabs, role} = searchParams 
  const projectFilter = `_type == "project" `
  const tagFilter =  tags? `tags match "${tags}" ${collabs || role? "||" : "" }` : "" 
  const collabFilter = collabs ? `collaborators match "${collabs}" ${role? "||" : "" }` : ""
  const roleFilter = role ? `role match "${role}"` : "" 
  const filter = collabs || role || tags?`&& ${tagFilter} ${collabFilter} ${roleFilter}`: ""
  let filteredProjects = await client.fetch(
      groq`*[${projectFilter} ${filter}]{
          _id,
          _createdAt,
          name,
          vimeo,
          images,
          url,
          content,
          "type": lower(type),
          "role": lower(role),
          collaborators,
          tags,
          color,
          year,
          "slug": slug.current,
      }`
  )
      
  return (
    <main id="main" className="py-20 z-0 text-light text-black bg-white flex flex-col items-center justify-start min-h-screen gerstner">
        <OpeningCard />
        <SiteNav />
        <section className="Project3dParent">
          {filteredProjects.map((project:any, index:number)=>(
            <div className="Project3d flex justify-center items-center lg:text-5xl text-3xl snap-y" key={project._id}>
                <ProjectListing project={project} index={index}/>
            </div>
          ))}
        </section>
        <FunkyButtons />
    </main>
  )
}
 