import { NextApiRequest, NextApiResponse } from 'next'
import { api } from '@omcs/request/node'

import { PAGE_SIZE } from '~/utils/constants'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { hits } = await api.listLabels({
      offset: (Number(req.query.page) - 1) * PAGE_SIZE,
      length: PAGE_SIZE,
    })
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(hits))
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: (err as any).message })
  }
}
