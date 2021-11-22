/**
 * @fileoverview
 * - get all labels
 * - get part of labels
 */
import { NextApiResponse } from 'next'
import { NextApiRequest } from '~/interface'
import { withOmcs, withCors } from '~/utils/middlewares'

export default withCors(
  withOmcs(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const offset = Number(req.query.offset || 0)
      const length = req.query.length ? Number(req.query.length || 0) : undefined
      const results = await req._omcs.listLabels({
        offset,
        length,
      })
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(results))
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: (err as any).message })
    }
  }),
)
