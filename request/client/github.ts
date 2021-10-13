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
  async labels(offset?: number): Promise<{ hits: Label[] }> {
    return client.get(`/api/labels`, { params: { offset } })
  },
  async issues({ labels }: { labels?: string }): Promise<Issue[]> {
    return client.get(`/api/sheet`, { params: { labels } })
  },
}
