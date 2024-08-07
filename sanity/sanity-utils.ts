
import {createClient, groq} from "next-sanity";
const client = createClient({
        projectId: "01jwvji0",
        dataset: "production",
        apiVersion: "2023-01-04",
        token: process.env.SANITY_TOKEN,
        useCdn: false,
});



export async function getProjects() {
        return client.fetch(
                groq`*[_type=="project"]{
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
                                preview,
                                "roles": roles[]->{
                                        name
                                }
                        }
                }`
        )
}


interface Props {
        searchParams: {
                tags?: string[]
                collabs?: string[]
                roles?: string[]
        }
}

export async function getFilteredProjects({searchParams}:Props){ 
        let {tags, collabs, roles} = searchParams 
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
                groq`*[${projectFilter} ${filter}]|order(priority asc){
                    _id,
                    name,
                    vimeo,
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
