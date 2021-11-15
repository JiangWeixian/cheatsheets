import { Issue, Label } from '@omcs/request/types'

import axios from 'axios'

const client = axios.create()
client.interceptors.response.use(
  async (res) => {
    return res.data
  },
  (err: any) => {
    Promise.reject(err)
  },
)

export const github = {
  async labels(offset?: number): Promise<{ hits: Label[] }> {
    return client.get(`/api/labels`, { params: { offset } })
  },
  async sheets({
    labelID,
    offset,
  }: {
    labelID?: string
    offset: number
  }): Promise<{ hits: Issue[] }> {
    return client.get(`/api/sheet`, { params: { labelID, offset } })
  },
}
