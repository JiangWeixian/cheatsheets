import { create } from '@omcs/request/node'
import { NextApiResponse } from 'next'
import Cors from 'cors'
import axios from 'axios'

import { NextApiRequest } from '~/interface'

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
    methods: ['GET', 'POST'],
  }),
)

export const withCors = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res)
  return handler(req, res)
}

const mid = axios.create()
const whoami = async (token: string): Promise<{ viewer: { login: string } }> => {
  mid.defaults.headers = { authorization: `token ${token}` } as any
  const res: any = await mid.post('https://api.github.com/graphql', {
    query: `
      query {
        viewer {
          login
        }
      }
    `,
  })
  return res.data.data
}

export const withAuthByToken =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')?.[1]
    if (!token) {
      return handler(req, res)
    }
    const login = await whoami(token)
    req._login = login?.viewer?.login
    return handler(req, res)
  }
