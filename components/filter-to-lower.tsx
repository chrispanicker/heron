"use server"

export async function filterToLower(filteredProjects:any){ 
    filteredProjects.map((project:any, index:number)=>(
        project.roles?.map((role:any, i:number)=>(filteredProjects[index].roles[i]=role.name.toLowerCase())),
        project.collabs?.map((collab:any, i:number)=>(filteredProjects[index].collabs[i]=collab.name.toLowerCase())),
        project.tags?.map((tag:any, i:number)=>(filteredProjects[index].tags[i]=tag.name.toLowerCase()))
    ))
}