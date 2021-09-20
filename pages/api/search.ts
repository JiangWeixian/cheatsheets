import { NextApiRequest, NextApiResponse } from 'next'
import { algolia } from '@omcs/request'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { keyword } = req.query
    const { hits } = await algolia.search({ content: keyword as string })
    res.status(200).json(hits)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
