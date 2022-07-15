import type { NextApiRequest, NextApiResponse } from "next";
import {uuid} from "uuidv4"
import { client } from "utils/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'PUT') {
        const {userId, postId, like} = req.body;
        try {
           const data = like ? client.patch(postId)
                            .setIfMissing({likes: []})
                            .insert('after', 'likes[-1]', [
                                {
                                    _key: uuid(),
                                    _ref: userId
                                }
                            ])
                            .commit()
                            : client.patch(postId)
                                    .unset([`likes[_ref=="${userId}"]`])
                                    .commit();
            res.status(200).json(data)
        } catch(e) {
            console.log(e);
        }
    }
}