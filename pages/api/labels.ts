import { NextApiResponse } from 'next'
import { NextApiRequest } from '~/interface'
import { withOmcs } from '~/utils/middlewares'

import { PAGE_SIZE } from '~/utils/constants'

export default withOmcs(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const offset = Number(req.query.offset || 0)
    const results = await req._omcs.listLabels({
      offset,
      length: PAGE_SIZE,
    })
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(results))
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: (err as any).message })
  }
})
