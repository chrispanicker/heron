'use client'
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { buttonClass } from "./classes";

export function Sorts(){
    const router = useRouter();
    const searchParams = useSearchParams(); 
    const sorted = searchParams.get("sort")  
    const roles = searchParams.getAll("roles")
    const tags = searchParams.getAll("tags")
    const collabs = searchParams.getAll("collabs")
    const type = searchParams.getAll("type")

    const rolesObject = roles?.map(item => ({ Ptype:"roles", name: item }));
    const tagsObject =  tags?.map(item => ({ Ptype:"tags", name: item }));
    const collabsObject = collabs?.map(item => ({ Ptype:"collabs", name: item }));
    const typeObject = type?.map(item=>({Ptype:"type", name: item }))

    const allParams = typeObject.concat(collabsObject, tagsObject, rolesObject)

    const filtered = searchParams.get("roles") || searchParams.get("tags") || searchParams.get("collabs") || searchParams.get("type");
    const createSortQueryString = useCallback(
        (name: string, type:string) => {
            let params;
            let stringSearchParams = searchParams.toString()
            stringSearchParams = stringSearchParams.replaceAll("+", " ")
            params = new URLSearchParams(stringSearchParams)
             
            if(stringSearchParams.includes(`${name}=${type}-asc`)){
                params.delete(name, type+"-asc")
                params.append(name, type+"-desc")
            } else if(stringSearchParams.includes(`${name}=${type}-desc`)){
                params.delete(name, type+"-desc")
                params.append(name, type+"-asc")
            } else {
                params.delete(name)
                params.append(name, type+"-asc")
            }
            return params.toString()
        },
        [searchParams]
    )
    const createQueryString = useCallback(
    (value:string) => {
        let params;
        let stringSearchParams = searchParams.toString()
        stringSearchParams = stringSearchParams.replaceAll("+", " ")
        stringSearchParams = stringSearchParams.replaceAll("%2C", ",")
        params = new URLSearchParams(stringSearchParams)

        stringSearchParams.includes(`type=${value}`)? params.delete("type", value) : ""
        stringSearchParams.includes(`roles=${value}`)? params.delete("roles", value) : ""
        stringSearchParams.includes(`tags=${value}`)? params.delete("tags", value) : ""
        stringSearchParams.includes(`collabs=${value}`)? params.delete("collabs", value) : ""

        return params.toString()

    },
    [searchParams]
    )
    return(        
        <>
            <span className={`${sorted||filtered? "lg:flex hidden": "hidden"} w-screen justify-between px-5`}>
              <div className={`${sorted? "flex": "opacity-0"} w-[50%]`}>
                <p className={`mr-[.5rem] text-[1rem] whitespace-nowrap mono-book uppercase`}>Sorted by</p>
                <button className={`${buttonClass} bg-black text-gray-300 outline outline-1 outline-black hover:bg-gray-300 hover:text-black`}
                onClick={()=>{
                    router.push("?"+"")
                }}>{
                sorted==="name-asc"||sorted==="name-desc"? "Name"
                :sorted==="client-asc"||sorted==="client-desc"? "Client"
                :sorted==="roles-asc"||sorted==="roles-desc"? "Roles"
                :sorted==="year-asc"||sorted==="year-desc"? "Year"
                : sorted==="type-asc"||sorted==="type-desc"? "Type"
                : "Default"}</button>
              </div>
              <div className={`${filtered? "flex": "opacity-0"} w-[50%]`}>
                <p className={`sans mr-[.5rem] text-[1.3rem] whitespace-nowrap`}>Filtered by</p>
                <div className="px-1 w-fit">

                {/* NEED TO FIGURE OUT HOW TO GET DIFF SHAPES HERE BASED ON TYPE??? */}
                {allParams.map((param:any, idx:any)=>{
                    return (
                        <button 
                        id={`${param}`}
                        key={`${param}${idx}`}
                        onClick={()=>{
                          router.push( `/?${createQueryString(`${param.name}`)}`, {scroll: false})
                        }}  
                        className={`outline-1 outline-black ${buttonClass} ${param.Ptype ==="tags"? "rounded-xl px-2": ""} bg-black text-gray-300 hover:bg-gray-300 hover:text-black outline outline-1 outline-black`
                        }>
                            {`${param.name}`}
                        </button>
                    )
                })}
                </div>
              </div>

            </span>
            <span className="lg:grid hidden grid-cols-6 mt-2 text-[1.35rem] sans px-3 mb-[2px] pb-1 z-30 relative z-10 border-b-[2px] border-black decoration-2 ">
                <button className="ml-2 col-span-2 text-left flex hover:underline decoration-2 underline-offset-2"
                onClick={()=>{
                    router.push("?"+createSortQueryString("sort", "name"))
                }}
                >Name
                    <p className={`${sorted==="name-asc"? "": "hidden"}`}>&nbsp;&darr;</p>
                    <p className={`${sorted==="name-desc"? "": "hidden"}`}>&nbsp;&uarr;</p>
                </button>

                <button className="pl-[.15rem] text-left flex hover:underline decoration-2 underline-offset-2"
                onClick={()=>{
                    router.push("?"+createSortQueryString("sort", "client"))
                }}>Client
                    <p className={`${sorted==="client-asc"? "": "hidden"}`}>&nbsp;&darr;</p>
                    <p className={`${sorted==="client-desc"? "": "hidden"}`}>&nbsp;&uarr;</p>
                </button>

                <button className="pl-[.1rem] col-span-1 text-left flex hover:underline decoration-2 underline-offset-2"
                onClick={()=>{
                    router.push("?"+createSortQueryString("sort", "type"))
                }}>Type
                    <p className={`${sorted==="type-asc"? "": "hidden"}`}>&nbsp;&darr;</p>
                    <p className={`${sorted==="type-desc"? "": "hidden"}`}>&nbsp;&uarr;</p>
                </button>

                <button className="pl-[.0rem] col-span-1 text-left flex hover:underline decoration-2 underline-offset-2"
                onClick={()=>{
                    router.push("?"+createSortQueryString("sort", "roles"))
                }}>Roles
                    <p className={`${sorted==="roles-asc"? "": "hidden"}`}>&nbsp;&darr;</p>
                    <p className={`${sorted==="roles-desc"? "": "hidden"}`}>&nbsp;&uarr;</p>
                </button>

                <button className="mr-2 text-right flex justify-end hover:underline decoration-2 underline-offset-2"
                onClick={()=>{
                    router.push("?"+createSortQueryString("sort", "year"))
                }}>Year
                    <p className={`${sorted==="year-asc"? "": "hidden"}`}>&nbsp;&darr;</p>
                    <p className={`${sorted==="year-desc"? "": "hidden"}`}>&nbsp;&uarr;</p>
                </button>
            </span>
        </>
    )
}