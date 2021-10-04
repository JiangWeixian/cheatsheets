import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '@omcs/request/node'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { hits } = await api.someday()
    res.status(200).json(hits)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: (err as any).message })
  }
}
