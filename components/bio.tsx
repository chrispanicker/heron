import { PortableText } from "@portabletext/react"

export async function Bio(bio:any){
    return(
        <div className="sm:w-[35rem] w-[20rem] m-5 flex justify-center flex-col items-center text-justify">
            <PortableText value={bio.bio}/>
        </div>
    )

}