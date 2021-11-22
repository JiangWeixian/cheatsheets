/**
 * @fileoverview search cheatsheets and labels
 */
import { NextApiResponse } from 'next'
import { NextApiRequest } from '~/interface'
import { withOmcs, withCors } from '~/utils/middlewares'

export default withCors(
  withOmcs(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { keyword, limit, mode } = req.query
      const results = await req._omcs.multipleSearch({
        query: keyword as string,
        limit: limit as unknown as number,
        mode: mode as string,
      })
      res.status(200).json(results)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: (err as any).message })
    }
  }),
)
