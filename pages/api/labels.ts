import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '~/api/server'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const items = await api.github.labels(req.query.page as string)
    res.status(200).json(items)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
