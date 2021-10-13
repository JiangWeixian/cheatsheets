import { Issue, Label } from '@omcs/request/types'

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
    return client.get(`/api/labels`, { method: 'get', params: { page } })
  },
  async issues({ labels }: { labels?: string }): Promise<Issue[]> {
    return client.get(`/api/sheet`, { params: { labels } })
  },
}
