import { defineConfig } from "sanity";
import project from "./sanity/schemas/project-schema";
import info from "./sanity/schemas/info";
import tags from "./sanity/schemas/tags";
import roles from "./sanity/schemas/roles";
import jobs from "./sanity/schemas/jobs"
import collabs from "./sanity/schemas/collabs";
import gallery from "./sanity/schemas/opening-gallery";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";

const config = defineConfig({
    projectId: "01jwvji0",
    dataset: "production",
    title: "Heron",
    apiVersion: "2023-12-06",
    basePath: "/admin",
    plugins: [
        structureTool(),
    ],
    schema: {types: [project, gallery, info, jobs, roles, collabs, tags]},
    useCdn: true
})

export default config