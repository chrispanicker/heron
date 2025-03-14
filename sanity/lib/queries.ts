
import { groq } from "next-sanity"
import { client } from "./client"

export async function getProjects() {
    return client.fetch(
            groq`*[_type=="project" && !(_id in path("drafts.**"))]{
              name,
              _id,
              _createdAt,
              "slug": slug.current,
              "roles": roles[]->{
                name
              },
              "collabs": collabs[]->{
                name
              },
              "tags": tags[]->{
                name
              },
            }`, {}, {cache: "no-store"}
    )
} 



export async function getInfo() {
    return client.fetch(
            groq`*[_type=="info"]{
                name,
                bio,
                header,
                "image": shareimage.asset->url
            }`
)}

export async function getJobs() {
        return client.fetch(
                groq`*[_type=="jobs"] | order(orderRank) {
                    company,
                    years,
                    title
                }`
    )}



interface Props {
    searchParams: {
            tags?: string[]
            collabs?: string[]
            roles?: string[]
            sort?: string
    }
}

export async function getFilteredProjects({searchParams}:Props){ 
    let {tags, collabs, roles, sort} = searchParams 
    let tagQueries, collabQueries, roleQueries

    typeof tags === "string"? tagQueries = `tags[] -> name match "${tags}"` 
    : tagQueries = tags?.map((e, i)=>{
            return `tags[] -> name match "${e}"`
    }).join(" || ")

    typeof collabs === "string"? collabQueries = `collabs[] -> name match "${collabs}"` 
    : collabQueries = collabs?.map((e)=>{
            return `collabs[] -> name match "${e}"`
    }).join(" || ")

    typeof roles === "string"? roleQueries = `roles[] -> name match "${roles}"` 
    : roleQueries = roles?.map((e)=>{
            return `roles[] -> name match "${e}"`
    }).join(" || ")


    const projectFilter = `_type == "project"`
    const tagFilter =  tags? `${tagQueries} ${collabs || roles? "||" : "" }` : "" 
    const collabFilter = collabs ? `${collabQueries} ${roles? "||" : "" }` : ""
    const roleFilter = roles ? `${roleQueries}` : "" 
    
    const filter = collabs || roles || tags?`&& ${tagFilter} ${collabFilter} ${roleFilter}`: ""

    return client.fetch(
            groq`*[${projectFilter} ${filter} && !(_id in path("drafts.**"))]{
                _id,
                name,
                vimeo,
                year,
                client,
                type,
                preview,
                orderRank,
                images,
                "gallery": images[]{
                    "metadata": asset->metadata,
                    "imageUrl": asset->url,
                    "blurDataURL": asset->metadata.lqip,
                    "alt": alt,
                    "description": description,
                    "mycrop":mycrop,
                    "text": text
                    },
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
                "slug": slug.current,
                "totalCount": count(coalesce(roles, [])) + count(coalesce(tags, [])) + count(coalesce(collabs, []))
        } | order(${
        sort==="year-asc"? "year asc"
        : sort==="year-desc"? "year desc"
        : sort==="name-asc"? "name asc"
        : sort==="name-desc"? "name desc"
        : sort==="client-asc"? "client asc"
        : sort==="client-desc"? "client desc"   
        : sort==="tags-asc"? "totalCount asc"
        : sort==="tags-desc"? "totalCount desc"
        :"orderRank"})`, 
    )
}
