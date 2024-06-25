const jobs = {
    name: 'jobs',
    title: "Jobs",
    type: 'document',
    fields: [
            { type: "string", name: "company", title: "Company"},
            { type: "string", name: "title", title: "Title" },
            { type: "string", name: "years", title: "Years" }

    ],            
    preview: {
        select: {
            title: 'company',
            subtitle: 'title',
            value: 'years'
        }
    },
}

export default jobs;