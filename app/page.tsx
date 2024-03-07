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
  const filteredProjects = await client.fetch(
      groq`*[${projectFilter}][${filter}]{
          _id,
          _createdAt,
          name,
          images,
          url,
          content,
          "type": lower(type),
          roles,
          role,
          collaborators,
          tags,
          color,
          year,
          "slug": slug.current,
      }`
  )



  return (
    <main id="main" className="snap-center py-20 z-0 text-light text-black bg-white flex flex-col items-center justify-center min-h-screen gerstner">
        <OpeningCard />
        <SiteNav />
        <section className="Project3dParent">
        {filteredProjects.map((project:any, index:number)=>(
          <div className="Project3d flex justify-center items-center text-2xl md:text-4xl" key={project._id}>
              <ProjectListing project={project} index={index}  />
          </div>
        ))}
        </section>
    </main>
  )
}
 