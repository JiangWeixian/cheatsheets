import { Issue, Label, WhoamiResponse } from '@omcs/request/types'

import axios from 'axios'

const client = axios.create()
client.interceptors.response.use(
  async res => {
    return res.data
  },
  (err: any) => {
    Promise.reject(err)
  },
)

export const github = {
  async labels(page?: number): Promise<Label[]> {
    return client.get(`/api/labels?page=${page}`, { method: 'get' })
  },
  async issues({
    labels,
    sort = 'updated',
  }: {
    labels?: string
    sort?: 'updated'
  }): Promise<Issue[]> {
    return client.get(`/api/sheet`, { params: { labels, sort } })
  },
  whoami(): Promise<WhoamiResponse> {
    return client.get(`/api/whoami`)
  },
}
