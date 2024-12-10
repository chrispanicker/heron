import { createClient } from "@sanity/client"
import { groq, QueryOptions, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn, } from "../env"
import imageUrlBuilder from '@sanity/image-url';





export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: process.env.SANITY_TOKEN,
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === "preview",
    studioUrl: "/admin",
  },
})

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 3600, // default revalidation time in seconds
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  // const isDraftMode = DraftMode().isEnabled;

  // if (isDraftMode && !token) {
  //   throw new Error("Missing environment variable SANITY_API_READ_TOKEN");
  // }

  const queryOptions: QueryOptions = {};
  let maybeRevalidate = revalidate;

  // if (isDraftMode) {
  //   queryOptions.token = token;
  //   queryOptions.perspective = "previewDrafts";
  //   queryOptions.stega = true;

  //   maybeRevalidate = 0; // Do not cache in Draft Mode
  // } else if (tags.length) {
  //   maybeRevalidate = false; // Cache indefinitely if tags supplied
  // }
  
  return client.fetch(query, params, {
    ...queryOptions,
    next: {
      revalidate: maybeRevalidate,
      tags,
    },
  });
}