
import { groq } from "next-sanity"
import { client } from "./client"

export async function getProjects() {
    return client.fetch(
            groq`*[_type=="project" && !(_id in path("drafts.**"))]{
              name,
              _id,
              type,
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
  const res = await client.fetch(groq`*[_type == "info"]{
    _id, name, bio, header, jobs, awards, favicon, instagram, contactEmail, "shareImage": shareimage.asset->url
  }`);
  return res;

}

// export async function getJobs() {
//         return client.fetch(
//                 groq`*[_type=="jobs"] | order(orderRank) {
//                     company,
//                     years,
//                     title
//                 }`
//     )}



interface Props {
    searchParams: {
            tags?: string[]
            collabs?: string[]
            roles?: string[]
            sort?: string
            type?: string[]
    }
}

export async function getFilteredProjects({searchParams}:Props){ 
    let {tags, collabs, roles, sort, type} = searchParams;
    let tagQueries, collabQueries, roleQueries, typeQueries;

typeof tags === "string"
  ? tagQueries = `(tags[]->name match "${tags}")` 
  : tagQueries = `(${tags?.map((e) => `tags[]->name match "${e}"`).join(" || ")})`;

typeof collabs === "string"
  ? collabQueries = `(collabs[]->name match "${collabs}")` 
  : collabQueries = `(${collabs?.map((e) => `collabs[]->name match "${e}"`).join(" || ")})`;

typeof roles === "string"
  ? roleQueries = `(roles[]->name match "${roles}")` 
  : roleQueries = `(${roles?.map((e) => `roles[]->name match "${e}"`).join(" || ")})`;

typeof type === "string"
  ? typeQueries = `(type match "${type}")`
  : typeQueries = `(${type?.map((e) => `type match "${e}"`).join(" || ")})`;


    const projectFilter = `_type == "project"`
    const typeFilter = type? `${typeQueries} ${tags || collabs || roles? "||" : "" }` : "" 
    const tagFilter =  tags? `${tagQueries} ${collabs || roles? "||" : "" }` : "" 
    const collabFilter = collabs? `${collabQueries} ${roles? "||" : "" }` : ""
    const roleFilter = roles? `${roleQueries}` : "" 
    
    const filter = collabs || roles || tags || type ?` && (${typeFilter} ${tagFilter} ${collabFilter} ${roleFilter})`: ""
    // THIS FILTER SAYS
    // Look item with project type && tags[] array has a name that matches "tag name" && etc.
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
          "rolesCount": count(coalesce(roles, [])),
          "totalCount": count(coalesce(roles, [])) + count(coalesce(tags, [])) + count(coalesce(collabs, []))
    }
      | order(${
      sort==="year-asc"? "year asc"
      : sort==="year-desc"? "year desc"
      : sort==="name-asc"? "name asc"
      : sort==="name-desc"? "name desc"
      : sort==="client-asc"? "client asc"
      : sort==="client-desc"? "client desc"   
      : sort==="tags-asc"? "totalCount asc"
      : sort==="tags-desc"? "totalCount desc"
      : sort==="roles-asc"? "rolesCount asc"
      : sort==="roles-desc"? "rolesCount desc"
      : sort==="type-asc"? "type asc"
      : sort==="type-desc"? "type desc"
      :"orderRank"})`, 
    )
}

export async function getOpeningGallery() {
  return client.fetch(
    groq`*[_type == "gallery"][0]{
      projects[]->{
        _id,
        name,
        client,
        type,
        year,
        "slug": slug.current,
        "preview": {
          "asset": {
            "url": preview.asset->url,
            "_ref": preview.asset._ref
          },
          "metadata": preview.asset->metadata
        },
        "roles": roles[]->{
          name
        },
        "collabs": collabs[]->{
          name
        },
        "tags": tags[]->{
          name
        },
        "gallery": images[]{
          "metadata": asset->metadata,
          "imageUrl": asset->url,
          "blurDataURL": asset->metadata.lqip,
          "alt": alt,
          "description": description,
          "mycrop": mycrop,
          "text": text
        }
      }
    }`,
    {},
    { cache: "no-store" }
  );
}
