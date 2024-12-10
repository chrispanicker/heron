import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

const project = {
    name: 'project',
    title: "Projects",
    type: 'document',
    orderings: [orderRankOrdering],
    fields: [
        orderRankField({ 
            type: "project", 
            newItemPosition: "before" }
        ),
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
        // {
        //     name: 'priority', 
        //     title: 'Priority', 
        //     type: 'number', validation: (Rule: any) => Rule.min(0).integer().positive(), 
        // },
        {
            name: 'client',
            title: 'Client',
            type: "string"
        },
        {
            name: 'type',
            title: 'Type',
            type: "string"
        },
        {
            title: 'Year',
            name: 'year',
            type: 'string',
        },
        {
            name: 'roles',
            title: 'Roles',
            type: 'array',
            of: [{type: 'reference', to: [{ type: 'roles' }]}],
            description: 'You can choose from existing roles or add new ones!',
        },
        
        {
            name: 'preview',
            title: "Preview Image",
            type: "image",
            description: 'Choose a preview image to highlight on opening!',
            options: {
                hotspot: true,
                metadata: [
                    'blurhash',
                    'lqip'
                ]
            },
        },
        {
            name: 'images',
            title: "Images",
            type: "array",
            of: [
                {
                type: 'image',
                options: {
                    metadata: [
                    'blurhash',   // Default: included
                    ],
                    // Specify the allowed MIME types
                    accept: '.pdf,image/jpeg,image/png',
                },
                fields: [
                    {
                    name: 'description',
                    type: 'string',
                    title: 'Image Description',
                    description: 'Provide a description of the image to appear on hover',
                    }
                ]
                },
                {
                type: 'file', 
                title: 'MP4', 
                name: 'mp4', 
                options: {
                    accept: 'video/*,.mp4'
                }
                },
                {
                    name: 'textcard',
                    title: "Text Card",
                    type: 'object',
                    fields: [
                    {       
                        name: 'content',
                        title: "Content",
                        type: 'array',
                        of: [{ type: 'block'}]}
                    ]  
                }
            ]
        },
        // {
        //     name: "url",
        //     title: 'URL',
        //     type: "url",
        //     description: 'You can link to the project here!',
        // },
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
    // orderings: [
    //     {
    //       title: 'Priority',
    //       name: 'priorityasc',
    //       by: [
    //         {field: 'priority', direction: 'asc'}
    //       ]
    //     },
    // ],
    preview: {
        select: {
          title: 'name',
        //   subtitle: 'priority',
          media: 'preview'
        }
    },
}

export default project;