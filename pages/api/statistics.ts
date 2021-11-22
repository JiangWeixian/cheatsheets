/**
 * @fileoverview omcs dashboard statistics
 */
import { NextApiResponse } from 'next'
import { NextApiRequest } from '~/interface'
import { withCors, withOmcs } from '~/utils/middlewares'

export default withCors(
  withOmcs(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const data = await req._omcs.statistics()
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: (err as any).message })
    }
  }),
)
