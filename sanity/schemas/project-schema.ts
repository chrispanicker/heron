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
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: 'name'},
            description: 'Hi! Generate a URL slug for this Project!',
        },
        {
            name: 'roles',
            title: 'Roles',
            type: 'array',
            of: [{type: 'reference', to: [{ type: 'roles' }]}],
            description: 'You can choose from existing roles or add new ones!',
        },
        {
            title: 'Year',
            name: 'year',
            type: 'string',
        },
        
        {
            name: 'preview',
            title: "Preview Image",
            type: "image",
            description: 'Choose a preview image to highlight on opening!',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'vimeo',
            title:'Vimeo Links',
            type: "array",
            of: [{type: 'url'}],
            description: 'Hi Drew! Have any vimeo videos for this project? You can add them here!',
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
            type: "url",
            description: 'You can link to the project here!',
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'tags' }] }],
            description: 'Select or reference existing tags',
        },
        {
            name: 'collabs',
            title: 'Collabs',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'collabs' }] }],
            description: 'Select or reference existing collabs',
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