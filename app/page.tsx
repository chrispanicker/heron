import {filterToLower} from "@/components/filter-to-lower";
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
  const tagFilter = tags ? `"${tags}" in tags ${collabs || role? "||" : "" }` : "" 
  const collabFilter = collabs ? `"${collabs}" in collaborators ${role? "||" : "" }` : ""
  const roleFilter = role ? `role == "${role}"` : ""
  const filter = `${tagFilter} ${collabFilter} ${roleFilter}`
  let filteredProjects = await client.fetch(
      groq`*[${projectFilter}][${filter}]{
          _id,
          _createdAt,
          name,
          images,
          url,
          content,
          "type": lower(type),
          roles,
          "role": lower(role),
          collaborators,
          tags,
          color,
          year,
          "slug": slug.current,
      }`
  )
  filterToLower(filteredProjects)

  return (
    <main id="main" className="py-20 z-0 text-light text-black bg-white flex flex-col items-center justify-center min-h-screen gerstner">
        <OpeningCard />
        <SiteNav />
        <button className="fixed top-10 left-10 text-3xl z-50">↑</button>
        <button className="fixed bottom-10 left-10 text-3xl z-50">↓</button>
        <section className="Project3dParent">
        {filteredProjects.map((project:any, index:number)=>(
          <div className="Project3d flex justify-center items-center text-2xl md:text-4xl snap-y" key={project._id}>
              <ProjectListing project={project} index={index}  />
          </div>
        ))}
        </section>
    </main>
  )
}
 