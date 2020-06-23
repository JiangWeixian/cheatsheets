import axios from 'axios'

import { Github } from '~/interface/github'
import { HOST } from '~/interface/host'
import pkg from '~/package.json'

const server = axios.create()
server.defaults.headers.authorization = 'token aa3a141257ba091169ae557f5d076aea93e49aaa'
server.defaults.baseURL = HOST.SERVER
server.interceptors.response.use(
  async res => {
    return res.data
  },
  (err: any) => Promise.reject(err),
)

export const github = {
  async login(): Promise<{ data: any }> {
    return server.get('/user', {})
  },
  async labels(page?: number): Promise<Github.Label[]> {
    return server.get(`/repos/${pkg.author.name}/${pkg.name}/labels?page=${page}`, {})
  },
  // refs: https://help.github.com/en/github/searching-for-information-on-github/searching-issues-and-pull-requests
  // refs: https://developer.github.com/v3/search/#search-issues-and-pull-requests
  // NOTE: 可以看看github issues搜索的结构，可以发现搜索是通过encodeURI方式加密的，而不是axios的encodeURIComponent
  async search(q: string): Promise<{ items: Github.Issue[] }> {
    return server.get(
      `/search/issues?q=${encodeURI(`${q}+repo:${pkg.author.name}/${pkg.name}`)}`,
      {},
    )
  },
  async issues(labels?: string): Promise<Github.Issue[]> {
    return server.get(`/repos/${pkg.author.name}/${pkg.name}/issues`, { params: { labels } })
  },
}
