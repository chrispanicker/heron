interface Props{
    role: any,
    tags: any,
    collabs: any
}

export default function UsedFilters({role, tags, collabs}: Props){
    return(
        <div className="flex flex-row text-gray-400 text-lg">
            {role||collabs||tags? <p>Filtered by:&nbsp;</p>:""}
            {role? <p className="capitalize">{role}{tags||collabs?",\u00A0":""}</p>:""}
            {collabs? <p className="capitalize">{collabs}{tags?",\u00A0":""}</p>:""}
            {tags? <p className="capitalize">{tags}</p>:""}
        </div>
    )
}