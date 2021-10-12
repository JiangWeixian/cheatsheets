import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '@omcs/request/node'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { keyword } = req.query
    const results = await api.multipleSearch({ query: keyword as string })
    res.status(200).json(results)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: (err as any).message })
  }
}
