import { groq } from "next-sanity"
import { client } from "./client"

export async function getProjects() {
    return client.fetch(
            groq`*[_type=="project"]{
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
            }`
    )
} 


export async function getInfo() {
    return client.fetch(
            groq`*[_type=="info"]{
                bio,
                "cv": cv[]->{
                  company,
                  years,
                  title
                },
            }`
)}

export async function getGallery(){ 
    return client.fetch(
            groq`*[_type == "gallery"]|order(priority asc){
                    index,
                    "projects": projects->{
                            name,
                            slug,
                            preview,
                            "roles": roles[]->{
                                    name
                            },
                            "collabs": collabs[]->{
                                    name
                            },
                            "tags": tags[]->{
                                    name
                            },
                    }
            }`
    )
}


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
            groq`*[${projectFilter} ${filter}]|order(${
                sort==="year-asc"? "year asc"
                : sort==="year-desc"? "year desc"
                : sort==="name-asc"? "name asc"
                : sort==="name-desc"? "name desc"
                : sort==="client-asc"? "client asc"
                : sort==="client-desc"? "client desc"    
                :"priority asc"}){
                _id,
                name,
                vimeo,
                year,
                client,
                type,
                preview,
                images,
                "gallery": images[]{
                    "imageUrl": asset->url,
                    "lqip": asset->metadata.lqip,
                    "blurData": asset->metadata.blurhash,
                    "alt": alt
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
            }`
    )
}