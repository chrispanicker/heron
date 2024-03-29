import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import project from "./sanity/schemas/project-schema";
import { colorInput } from "@sanity/color-input";

const config = defineConfig({
    projectId: "01jwvji0",
    dataset: "production",
    title: "Heron",
    apiVersion: "2023-12-06",
    basePath: "/admin",
    plugins: [deskTool(), colorInput()],
    schema: {types: [project]},
    useCdn: true
})

export default config