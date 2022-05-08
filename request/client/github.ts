import { Issue, Label } from '@omcs/request/types'

import axios from 'axios'
import { PAGE_SIZE } from '~/utils/constants'

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
  async labels(offset?: number, length = PAGE_SIZE): Promise<{ hits: Label[] }> {
    return client.get(`/api/labels`, { params: { offset, length } })
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
