import { create } from '@omcs/request/node'
import { NextApiResponse } from 'next'
import { NextApiRequest } from '~/interface'
import Cors from 'cors'

export const api = create(
  process.env.NEXT_PUBLIC_ALGOLIA_APPID!,
  process.env.ALGOLIA_APP_KEY!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
  process.env.GITHUB_TOKEN!,
)

export const withOmcs = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  req._omcs = api
  return handler(req, res)
}

export function initCors(middleware: ReturnType<typeof Cors>) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

const cors = initCors(
  Cors({
    // Only allow requests with GET
    methods: ['GET'],
  }),
)

export const withCors = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res)
  return handler(req, res)
}
