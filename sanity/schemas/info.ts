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
            title: "Example object list",
            type: "array",
            name: "example",
            of: [
                {
                type: "object",
                name: "inline",
                fields: [
                    { type: "string", name: "Job or Project Title" },
                    { type: "number", name: "Year" }
                ]
                }
            ],
        }
    ]
}

export default info;