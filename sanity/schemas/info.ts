const info = {
    name: 'info',
    title: "Info",
    type: 'document',
      __experimental_actions: ['create', 'update', 'publish'],
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
            name: 'shareimage',
            description: "This appears when you share the site link! 1200x360 & <1MB",
            title: "Share Image",
            type: 'image'
        },
    {
      name: 'favicon',
      title: "Favicon",
      type: 'image',
      description: "This appears in the browser tab. 32x32 or 64x64 .png file recommended.",
      options: {
        accept: 'image/png, image/svg+xml'
      }
    },
    {
      name: 'instagram',
      title: 'Instagram handle',
      type: 'string',
      description: 'Enter your Instagram username.',
      validation: (Rule: any) => Rule.max(100)
    },
    {
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      description: 'Enter your contact email address.',
      validation: (Rule: any) => Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email', invert: false })
    },
    {
        name: 'bio',
        title: "Bio",
        type: 'array',
        of: [{ type: 'block'}]
    },
    {
      name: 'jobs',
      title: 'CV / Jobs',
      desciption: "You can add your jobs here. They will appear in the footer of the site.",
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'job',
          fields: [
            { type: "string", name: "company", title: "Company" },
            { type: "string", name: "title", title: "Title" },
            { type: "string", name: "years", title: "Years", description: "E.g. 2020-2023 or 2020-Present" }
          ],
          preview: {
            select: {
              title: 'company',
              subtitle: 'years',
              value: 'years'
            }
          }
        }
      ],
      options: {
        sortable: true // enables drag-and-drop ordering in Studio
      }
    },
    {
      name: 'awards',
      title: 'Awards',
      desciption: "You can add your awards here. They will appear in the footer of the site.",
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'award',
          fields: [
            { type: "string", name: "title", title: "Title" },
            { type: "string", name: "year", title: "Year", description: "E.g. 2020" }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'year',
              value: 'year'
            }
          }
        }
      ],
      options: {
        sortable: true // enables drag-and-drop ordering in Studio
      }
    }
    ]
}

export default info;