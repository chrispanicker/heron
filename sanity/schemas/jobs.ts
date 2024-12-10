import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

const jobs = {
    name: 'jobs',
    title: "Jobs",
    type: 'document',
    ordering: [orderRankOrdering],
    fields: [
            orderRankField({ 
                type: "job", 
                newItemPosition: "before" }
            ),
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