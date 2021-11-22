/**
 * @fileoverview get random cheatsheet
 */
import { NextApiResponse } from 'next'
import { NextApiRequest } from '~/interface'
import { withOmcs } from '~/utils/middlewares'

export default withOmcs(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { hits } = await req._omcs.someday()
    res.status(200).json(hits)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: (err as any).message })
  }
})
