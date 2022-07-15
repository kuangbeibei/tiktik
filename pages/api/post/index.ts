import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "utils/client";
import { allPostsQuery } from "utils/queries";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'GET') {
        const query = allPostsQuery();

        try {
            const data = await client.fetch(query)
            res.status(200).json(data)
        } catch(e) {
            console.log('fetch all posts error: ', e);
            
        }
       
    }
}