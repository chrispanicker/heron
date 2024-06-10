import { SIGNATURE_HEADER_NAME, isValidSignature } from "@sanity/webhook"
SANITY_WE

const handler = async(req:any, res:any)=>{
    try {
        const signature = req.headers[SIGNATURE_HEADER_NAME].toString()
        if(!isValidSignature(
            JSON.stringify(req.body),
            signature,
            process.env.SANITY_WEBHOOK_SECRET!
        ))return res.status(401).json({msg:"Invalid Request!"})
        const{slug}=req.body
        await res.revalidate(`../../`)
        await res.revalidate(`../../../sanity/sanity-utils`)

        res.status(200).jsom({err:"Projects are Revalidated!"})
    }catch(error){
        res.status(200).jsom({err:"Something Went Wrong!"})
    }
}

export default handler