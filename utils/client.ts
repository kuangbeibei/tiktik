import sanityClient from "@sanity/client";

export const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT,
    dataset: 'production',
    token: process.env.SANITY_TOKEN,
    apiVersion: '2022-07-15',
    useCdn: true
})