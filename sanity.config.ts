import { defineConfig } from "sanity";
import project from "./sanity/schemas/project-schema";
import info from "./sanity/schemas/info";
import tags from "./sanity/schemas/tags";
import roles from "./sanity/schemas/roles";
import jobs from "./sanity/schemas/jobs"
import collabs from "./sanity/schemas/collabs";
import { structureTool } from "sanity/structure";
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {BillIcon, DotIcon, OlistIcon} from '@sanity/icons'




const config = defineConfig({
    projectId: "01jwvji0",
    dataset: "production",
    title: "Heron",
    apiVersion: "2023-12-06",
    basePath: "/admin",

    plugins: [
        structureTool({
            structure: (S, context) => {
                return S.list()
                .title('Content')
                .items([
                    orderableDocumentListDeskItem({type: 'project', title: 'Projects', S, context}),
                    S.documentTypeListItem('info').title('Info').icon(BillIcon),
                    orderableDocumentListDeskItem({type: 'jobs', title: 'Jobs', S, context, icon: OlistIcon}),
                    S.documentTypeListItem('roles').title('Roles').icon(DotIcon),
                    S.documentTypeListItem('tags').title('Tags').icon(DotIcon),
                    S.documentTypeListItem('collabs').title('Collaborations').icon(DotIcon),
              
                ])
            },
        })
    ],
    schema: {
        types: (previousTypes) => {
            return [project, info, jobs, roles, collabs, tags]
        }
    },

    useCdn: true
})

export default config