/**
 * @fileoverview get cheatsheet list by label
 */
import { NextApiResponse } from 'next'
import { NextApiRequest } from '~/interface'
import { withOmcs, withCors } from '~/utils/middlewares'

export default withCors(
  withOmcs(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const offset = Number(req.query.offset || 0)
      const results = await req._omcs.listIssues({
        offset,
        labelID: req.query.labelID as string,
      })
      res.status(200).json(results)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: (err as any).message })
    }
  }),
)
