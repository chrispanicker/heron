import { defineConfig, ImageInputProps } from "sanity"
import { structureTool } from "sanity/structure"

import info from "./sanity/schemas/info"
import tags from "./sanity/schemas/tags"
import roles from "./sanity/schemas/roles"
import jobs from "./sanity/schemas/jobs"
import collabs from "./sanity/schemas/collabs"
import project from "./sanity/schemas/project-schema"
import { downloadProjectMediaAction } from "./sanity/lib/downloadMedia"

const config = defineConfig({
    projectId: "01jwvji0",
  dataset: "production",
  title: "Heron",
  apiVersion: "2023-12-06",
  basePath: "/admin",
  document: {
    actions: (input, context) => {
      // Only add the action for the "project" type
      if (context.schemaType === "project") {
        return [
          ...input,
          downloadProjectMediaAction,
        ];
      }
      return input;
    },
  },

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
  }
})

export default config

