import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from 'utils/client';

import { allUsersQuery } from 'utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await client.fetch(allUsersQuery());
  
  if(data) {
    res.status(200).json(data);
  } else {
    res.json([]);
  }
}