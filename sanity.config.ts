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
              const getContentStructure = () => {
                return S.list()
                 .title('Content')
                 .items([
                    getOrderableDocumentList('project', 'Projects', S, context, OlistIcon),
                    getDocumentTypeListItem('info', 'Info', S, BillIcon),
                    getOrderableDocumentList('jobs', 'Jobs', S, context, OlistIcon),
                    getDocumentTypeListItem('roles', 'Roles', S, DotIcon),
                    getDocumentTypeListItem('tags', 'Tags', S, DotIcon),
                    getDocumentTypeListItem('collabs', 'Collaborations', S, DotIcon),
                  ])
              }
      
          return getContentStructure()
        },
      })
        
      ],
        schema: {
          types: [
            project,
            info,
            jobs,
            roles,
            collabs,
            tags,
          ],
        },

      })
      
      const getOrderableDocumentList = (type:string, title:string, S:any, context:any, icon:any) => {
        return orderableDocumentListDeskItem({ type, title, S, context, icon })
      }
      
      const getDocumentTypeListItem = (type:any, title:any, S:any, icon:any) => {
        return S.documentTypeListItem(type).title(title).icon(icon)
      }



export default config