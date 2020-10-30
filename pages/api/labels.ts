import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '~/request/server'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const items = await api.github.labels(req.query.page as string)
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(items))
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}
