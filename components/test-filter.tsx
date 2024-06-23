import { Project } from "@/types/project"
import { FilterButtons } from "./filter-buttons";
export function TestFilter(props:any){
    let allTags:string[] = [], allCollabs:string[] = [], allRoles:string[] = []
    props.projects?.map((project:Project)=>{
        project.roles?.map((role:any)=>{
            role.length===0 || allRoles.includes(role.name)? "": allRoles.push(role.name)
        })
        
        project.tags?.map((tag:any)=>{
            tag.length===0 || allTags.includes(tag.name)? "": allTags.push(tag.name)
        })
        
        project.collabs?.map((collab:any)=>{
            collab.length===0 || allCollabs.includes(collab.name)? "": allCollabs.push(collab.name)
        })
    })

    allTags.sort(), allCollabs.sort(), allRoles.sort()
    let filters = {
        "roles": allRoles,
        "collabs": allCollabs, 
        "tags": allTags, 
    };
    return (
        <FilterButtons {...filters} />
    )
   
}