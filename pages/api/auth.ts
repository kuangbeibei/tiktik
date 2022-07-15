import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "utils/client";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'POST') {
        try {
            const data = await client.createIfNotExists(req.body)
            res.status(200).json(data)
        } catch(e) {
            console.log('fetch all posts error: ', e);
        }
    }
}