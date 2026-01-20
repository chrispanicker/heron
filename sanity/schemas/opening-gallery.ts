import { Preview } from "sanity";
import OpeningGalleryInput from "./limitedGalleryInput";

const gallery = {
    name: 'gallery',
    title: "Gallery",
    type: 'document',
    __experimental_actions: ['create', 'update', 'publish'],
    description: "Manage the projects that appear in the opening gallery of the site.",
    fields: [
      {
        name: 'projects',
        title: 'Opening Gallery Projects',
        description: "Add and order projects for the opening gallery. Use the slider to set the maximum number of projects allowed.",
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'project' }]
          }
        ],
        components: {
          input: OpeningGalleryInput
        }
      },
    ]
}

export default gallery;