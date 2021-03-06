import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "utils/client";
import {  postDetailQuery } from "utils/queries";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'GET') {
        const {id} = req.query;

       const query = postDetailQuery(id);

       const data = await client.fetch(query);

       res.status(200).json(data[0])
    }
}