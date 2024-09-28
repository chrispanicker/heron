import { Project } from "@/types/project"
import { Filters } from "./filters";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

interface Props{
    projects:Project[]
    info:any
}

export function HeaderAndFilters({info, projects}:Props){
    // console.log(projects)
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
        <header className="flex-col sans justify-between items-center bg-black text-gray-300 fixed left-0 top-0 w-screen max-h-[2em] transition-[height] z-50 overflow-y-scroll">
            <SiteHeader />
            <Filters filters={filters} projects={projects}  />
            <div className="lg:hidden block overflow-y-scroll">
                {/* {
                    projects.map((project)=>(
                        <h2 className="serif mx-2" key={project.slug+"mobile!"}>{project.name}</h2>
                    ))
                } */}
                <SiteFooter info={info} />
            </div>
        </header>
    )
   
}