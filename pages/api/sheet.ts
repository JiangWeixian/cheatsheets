import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '@omcs/request/node'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const offset = Number(req.query.offset || 0)
    const results = await api.listIssues({
      offset,
      labelID: req.query.labelID as string,
    })
    res.status(200).json(results)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: (err as any).message })
  }
}
