const bio = {
    name: 'bio',
    title: "Bio",
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: "string"
        },
        {
            name: 'bio',
            title: "Bio",
            type: 'array',
            of: [{ type: 'block'}]
        },
    ]
}

export default bio;