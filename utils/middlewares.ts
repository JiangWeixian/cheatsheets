import { create } from '@omcs/request/node'
import { NextApiResponse, NextApiRequest } from 'next'

export const api = create(
  process.env.NEXT_PUBLIC_ALGOLIA_APPID!,
  process.env.ALGOLIA_APP_KEY!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!,
  process.env.GITHUB_TOKEN!,
)

export const withOmcs = (handler: any) => (req: NextApiRequest, res: NextApiResponse) => {
  req._omcs = api
  return handler(req, res)
}
