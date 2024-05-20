import { OpeningCard } from "@/components/opening-card";
import ProjectListing from "@/components/project-listing";
import UsedFilters from "@/components/used-filters";
import { client } from "@/sanity/sanity-utils";
import { Any, groq } from "next-sanity";

 

interface Props {
  searchParams: {
    tags?: string
    collabs?: string
    roles?: string
  }
}


export default async function Home({searchParams}: Props) {
  const {tags, collabs, roles} = searchParams 
  const projectFilter = `_type == "project"`
  const tagFilter =  tags? `tags[]-> name match "${tags}" ${collabs || roles? "&&" : "" }` : "" 
  const collabFilter = collabs ? `collabs[]-> name match "${collabs}" ${roles? "&&" : "" }` : ""
  const roleFilter = roles ? `roles[]-> name match "${roles}"` : "" 
  const filter = collabs || roles || tags?`&& ${tagFilter} ${collabFilter} ${roleFilter}`: ""
  let filteredProjects = await client.fetch(
      groq`*[${projectFilter} ${filter}]{
          _id,
          _createdAt,
          name,
          vimeo,
          images,
          url,
          content,
          "roles": roles[]->{
            name
          },
          "collabs": collabs[]->{
            name
          },
          "tags": tags[]->{
            name
          },
          year,
          "slug": slug.current,
      }`
  )
  return (
    <main id="main" className={`py-20 z-0 text-black bg-white flex flex-col items-center justify-start min-h-screen`}>
        <OpeningCard />
        <section className="Project3dParent">
          {filteredProjects.map((project:any, index:number)=>{ 
            return(
            <div className="Project3d flex font-bold justify-center items-center lg:text-5xl text-3xl snap-y" key={project._id}>
                <ProjectListing filteredProjects={filteredProjects} project={project} index={index}/>
            </div>
          )})}
        </section>
        <UsedFilters role={roles} tags={tags} collabs={collabs}/>
    </main>
  )
}
 