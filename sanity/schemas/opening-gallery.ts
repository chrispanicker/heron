import { client } from "../lib/client";

const limit = 3; // Set your limit here

const gallery = {
    name: 'gallery',
    title: "Gallery Projects",
    type: 'document',
    fields: [
        {
            name: 'projects',
            title: 'Projects',
            type: 'reference', to: { type: 'project' },
            description: 'Choose one of your fave projects!',
        },
        {
            name: 'priority', 
            title: 'Priority', 
            type: 'number', validation: (Rule: any) => Rule.min(0).integer().positive(), 
        },

    ],
    preview: {
        select: {
          title: 'priority',
        }
    },
    orderings: [
      {
        title: 'Priority',
        name: 'priorityasc',
        by: [
          {field: 'priority', direction: 'asc'}
        ]
      },
    ],
    validation: (Rule: any) => Rule.custom(async (value: any, context: any) => {
        const { document } = context;
        const docType = document._type;
    
        try {
          const existingDocs = await client.fetch<number>(`count(*[_type == "${docType}"])`);
    
          if (existingDocs >= limit) {
            return `You cannot create more than ${limit} entries of this type.`;
          }
    
          return true;
        } catch (error) {
          console.error('Error fetching document count:', error);
          return 'Validation error occurred.';
        }
      })
}


export default gallery;