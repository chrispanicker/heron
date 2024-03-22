"use server"

export async function filterToLower(filteredProjects:any){ 
    filteredProjects.map((project:any, index:number)=>(
        project.collaborators?.map((collab:any, i:number)=>(filteredProjects[index].collaborators[i]=collab.toLowerCase())),
        project.tags?.map((tag:any, i:number)=>(filteredProjects[index].tags[i]=tag.toLowerCase()))
    ))
}