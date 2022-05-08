/**
 * @fileoverview
 * - update label tree config
 * - get label tree config
 */
import { NextApiResponse } from 'next'
import { NextApiRequest } from '~/interface'
import { withOmcs, withCors, withAuthByToken } from '~/utils/middlewares'

export default withCors(
  withAuthByToken(
    withOmcs(async (req: NextApiRequest, res: NextApiResponse) => {
      try {
        if (req.method === 'POST') {
          if (req._login !== process.env.NEXT_PUBLIC_REPO_OWNER) {
            res.status(401).json({ statusCode: 401, message: 'require auth with github token' })
            return
          }
          const results = await req._omcs.updateOrCreateLabelTree({
            value: req.body.value,
          })
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(results))
        } else {
          const results = await req._omcs.getLabelTree()
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(results))
        }
      } catch (err) {
        res.status(500).json({ statusCode: 500, message: (err as any).message })
      }
    }),
  ),
)
