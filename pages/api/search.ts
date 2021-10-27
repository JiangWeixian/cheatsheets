import { NextApiResponse } from 'next'
import { NextApiRequest } from '~/interface'
import { withOmcs } from '~/utils/middlewares'

export default withOmcs(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { keyword } = req.query
    const results = await req._omcs.multipleSearch({ query: keyword as string })
    res.status(200).json(results)
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: (err as any).message })
  }
})
