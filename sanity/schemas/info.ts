
const info = {
    name: 'info',
    title: "Info",
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: "string"
        },
        {
            name: 'header',
            title: 'Header',
            type: 'string',
            description: "This goes after your name in the header of the desktop site."
        },
        {
            name: 'bio',
            title: "Bio",
            type: 'array',
            of: [{ type: 'block'}]
        },
        {
            name: 'shareimage',
            description: "This appears when you share the site link! 1200x360 & <1MB",
            title: "Share Image",
            type: 'image'
        }
    ]
}

export default info;