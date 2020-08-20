import axios from 'axios'

import { Github } from '~/interface/github'
import { HOST } from '~/interface/host'
import pkg from '~/package.json'

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const server = axios.create()
server.defaults.headers.authorization = `token ${process.env.GITHUB_KEY}`
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
  async labels(page?: string): Promise<Github.Label[]> {
    return server.get(`/repos/${pkg.author.name}/${pkg.name}/labels?page=${page}`, {})
  },
  /**
   * 可以看看github issues搜索的结构，可以发现搜索是通过encodeURI方式加密的，而不是axios的encodeURIComponent
   * refs:
   * - https://help.github.com/en/github/searching-for-information-on-github/searching-issues-and-pull-requests
   * - https://developer.github.com/v3/search/#search-issues-and-pull-requests
   */
  async search(q: string): Promise<{ items: Github.Issue[] }> {
    return server.get(
      `/search/issues?q=${encodeURI(`${q}+repo:${pkg.author.name}/${pkg.name}`)}`,
      {},
    )
  },
  /**
   * list repo issues
   * refs: https://developer.github.com/v3/issues/#list-repository-issues
   */
  async issues({
    labels,
    sort = 'updated',
  }: {
    labels: string
    sort?: 'updated' | string
  }): Promise<Github.Issue[]> {
    return server.get(`/repos/${pkg.author.name}/${pkg.name}/issues`, { params: { labels, sort } })
  },
}
