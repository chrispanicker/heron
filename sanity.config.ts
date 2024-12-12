import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import project from "./sanity/schemas/project-schema"
import info from "./sanity/schemas/info"
import tags from "./sanity/schemas/tags"
import roles from "./sanity/schemas/roles"
import jobs from "./sanity/schemas/jobs"
import collabs from "./sanity/schemas/collabs"

const config = defineConfig({
    projectId: "01jwvji0",
  dataset: "production",
  title: "Heron",
  apiVersion: "2023-12-06",
  basePath: "/admin",

  plugins: [
    structureTool({
      structure: (S, context) => 
        import('./sanity/lib/deskStructure')
          .then(({ structure }) => structure(S, context))
    }),
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

export default config

