import { Project } from "@/types/project"
import { FilterButtons } from "./filter-buttons";

export function TestFilter(props:any){
    let allTags:string[] = [], allCollabs:string[] = [], allRoles:string[] = []
    props.projects.map((project:Project)=>{
        project.tags.map((tag:string)=>{
            tag=tag.toLowerCase();
            tag.length===0 || allTags.includes(tag)? "": allTags.push(tag)
        })
            
        allRoles.includes(project.role)? "": allRoles.push(project.role)
        
        project.collaborators?.map((collab:string)=>{
            collab=collab.toLowerCase();
            collab.length===0 || allCollabs.includes(collab)? "": allCollabs.push(collab)
        })
    })

    allTags.sort(), allCollabs.sort(), allRoles.sort()
    let filters = {
        "role": allRoles,
        "collabs": allCollabs, 
        "tags": allTags, 
    };

    return (
        <FilterButtons {...filters} />
    )
   
}