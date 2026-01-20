import TestComponent from "@/components/testComponent";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { downloadProjectMediaAction } from "../lib/downloadMedia";
import ImagesArrayWithDownload from "@/components/imagesWrapper";

const project = {
    name: 'project',
    title: "Projects",
    type: 'document',
    //plugin for downloading media
    actions: [downloadProjectMediaAction],

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
        //images includes, image with custom crop, mp4, text card
        {
            name: 'images',
            title: "Images",
            type: "array",
            components: {
              input: ImagesArrayWithDownload
            },    
            of: [
                {
                  type: 'image',
                  title: 'Image',
                  options: {
                    accept: '.pdf,image/jpeg,image/png,image/gif',
                    storeOriginalFilename: true,
                  },
                  fields: [
                    {
                      name: 'name',
                      type: 'string',
                      title: 'Name',
                      components: {input: TestComponent,}
                    },
                    {
                      name: 'description',
                      type: 'string',
                      title: 'Image Description',
                      description: 'Provide a description of the image to appear on hover',
                    },
                    {
                      name: 'mycrop',
                      type: 'boolean',
                      title: 'Crop',
                      description: 'This sets the image to crop to a 4:3 ratio',
                    },
                  ],
                },
                {
                type: 'file', 
                title: 'MP4', 
                name: 'mp4', 
                options: {
                    accept: 'video/*,.mp4',
                    storeOriginalFilename: true,

                },
                fields: [
                  {
                    name: 'name',
                    type: 'string',
                    title: 'Name',
                    components: {input: TestComponent,}
                  },
                  {
                  name: 'description',
                  type: 'string',
                  title: 'Image Description',
                  description: 'Provide a description of the image to appear on hover',
                  },
                ]
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
    preview: {
        select: {
          title: 'name',
          media: 'preview'
        }
    },
}

export default project;