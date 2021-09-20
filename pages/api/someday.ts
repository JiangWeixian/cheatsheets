import { NextApiRequest, NextApiResponse } from 'next'
import { algolia } from '@omcs/request'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { hits } = await algolia.someday()
    res.status(200).json(hits)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
