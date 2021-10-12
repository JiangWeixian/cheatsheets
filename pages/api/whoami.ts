import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '@omcs/request/node'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const results = await api.whoami()
    res.status(200).json(results)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: (err as any).message })
  }
}
