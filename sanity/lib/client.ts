import { createClient } from "@sanity/client"
import { QueryOptions, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn, } from "../env"




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
  const queryOptions: QueryOptions = {
    cache: 'force-cache',
  };
  let maybeRevalidate = revalidate;

  return client.fetch(query, params, {
    ...queryOptions,
    next: {
      revalidate: maybeRevalidate,
      tags,
    },
  });
}