import { createClient} from "next-sanity";


export const client = createClient({
        projectId: "01jwvji0",
        dataset: "production",
        apiVersion: "2023-01-04",
});
