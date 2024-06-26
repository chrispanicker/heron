
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
                tags?: string
                collabs?: string
                roles?: string
        }
}

export async function getFilteredProjects({searchParams}:Props){ 
        const {tags, collabs, roles} = searchParams 
        const projectFilter = `_type == "project"`
        const tagFilter =  tags? `tags[]-> name match "${tags}" ${collabs || roles? "||" : "" }` : "" 
        const collabFilter = collabs ? `collabs[]-> name match "${collabs}" ${roles? "||" : "" }` : ""
        const roleFilter = roles ? `roles[]-> name match "${roles}"` : "" 
        const filter = collabs || roles || tags?`&& ${tagFilter} ${collabFilter} ${roleFilter}`: ""
        return client.fetch(
                groq`*[${projectFilter} ${filter}]|order(priority asc){
                    _id,
                    name,
                    vimeo,
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
