import { Project } from "@/types/project"
import { Filters } from "./filters";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

interface Props{
    projects:Project[]
    info:any
    jobs:any
}

export function HeaderAndFilters({info, projects, jobs}:Props){
    let allTags:string[] = [], allCollabs:string[] = [], allRoles:string[] = []
    projects?.map((project:Project)=>{
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
        <header className="flex-col sans justify-between items-center bg-black outline outline-[2px] outline-gray-300 text-gray-300 fixed left-0 top-0 max-h-[1.8rem] transition-all z-50 overflow-hidden">
            <SiteHeader info={info} />
            <Filters filters={filters} projects={projects}  />
            <div className="lg:hidden block">
                <SiteFooter info={info} jobs={jobs}/>
            </div>
        </header>
    )
   
}