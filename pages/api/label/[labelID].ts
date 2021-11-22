/**
 * @fileoverview get label detail by label id
 */
import { NextApiResponse } from 'next'
import { NextApiRequest } from '~/interface'
import { withOmcs, withCors } from '~/utils/middlewares'

export default withCors(
  withOmcs(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const results = await req._omcs.getLabel(req.query.labelID as string)
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(results))
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: (err as any).message })
    }
  }),
)
