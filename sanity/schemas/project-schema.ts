const project = {
    name: 'project',
    title: "Projects",
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: "string"
        },
        // {
        //     name: 'color',
        //     title: 'Color',
        //     type: 'color',
        // },
        {
            title: "Role",
            description: "Choose the best fitting role for this project.",
            name: "role",
            type: "string",
            options: {
              list: [
                { title: "Designer", value: "designer" },
                { title: "Art Director", value: "art director"},
                { title: "Illustrator", value: "illustrator" },
              ],
            },
            validation: (Rule) => Rule.required(),
        },

        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: 'name'}
        },
        {
            title: 'Year',
            name: 'year',
            type: 'string',
        },
        {
            title: 'Type',
            name: 'type',
            type: 'string',

        },
        {
            name: 'images',
            title: "Images",
            type: "array",
            of: [{type: 'image'}]
        },
        {
            name: "url",
            title: 'URL',
            type: "url"
        },

        {
            name: 'tags',
            title: 'Tags',
            type: "array",
            of: [{type: 'string'}]
        },

        {
            name: 'client',
            title: 'Client',
            type: "string"
        },
        {
            name: 'collaborators',
            title: 'Collaborators',
            type: "array",
            of: [{type: 'string'}]
        },
        {
            name: 'content',
            title: "Content",
            type: 'array',
            of: [{ type: 'block'}]
        },
    ],
}

export default project;