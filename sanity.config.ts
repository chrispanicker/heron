import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import project from "./sanity/schemas/project-schema";
import { colorInput } from "@sanity/color-input";
import info from "./sanity/schemas/info";
import tags from "./sanity/schemas/tags";
import roles from "./sanity/schemas/roles";
import collabs from "./sanity/schemas/collabs";

const config = defineConfig({
    projectId: "01jwvji0",
    dataset: "production",
    title: "Heron",
    apiVersion: "2023-12-06",
    basePath: "/admin",
    plugins: [deskTool(), colorInput()],
    schema: {types: [project, info, roles, collabs, tags]},
    useCdn: true
})

export default config