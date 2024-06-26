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
            name: 'bio',
            title: "Bio",
            type: 'array',
            of: [{ type: 'block'}]
        },
        {
            name: 'cv',
            title: 'CV',
            type: 'array',
            of: [{type: 'reference', to: [{ type: 'jobs' }]}],
            description: 'Hi Drew! You can choose from existing jobs or add new ones here!',
        },
    ]
}

export default info;