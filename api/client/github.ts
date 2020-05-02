import { HOST } from '~/interface/host'
import { Github } from '~/interface/github'

import axios from 'axios'

const client = axios.create()
client.defaults.baseURL = process.env.NODE_ENV === 'development' ? HOST.DEV_CLIENT : HOST.CLIENT
client.interceptors.response.use(
  async res => {
    return res.data
  },
  (err: any) => Promise.reject(err),
)

export const github = {
  async search(keyword: string): Promise<{ items: Github.Issue[] }> {
    return client.get(`/search`, { params: { keyword } })
  },
  async labels(): Promise<Github.Label[]> {
    return client.get(`/labels`, {})
  },
  async issues(label?: string): Promise<Github.Issue[]> {
    if (label === undefined) {
      return []
    }
    return client.get(`/sheet`, { params: { label } })
  },
}
