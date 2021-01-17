import axios from 'axios'
import dayjs from 'dayjs'
import sample from 'lodash.sample'

import { Github } from '~/interface/github'
import { HOST } from '~/interface/host'
import pkg from '~/package.json'

const server = axios.create()
server.defaults.baseURL = HOST.SERVER
server.interceptors.request.use(
  config => {
    return {
      ...config,
      headers: {
        Authorization: `token ${process.env.CHEETSHEETS_KEY}`,
      },
    }
  },
  error => Promise.reject(error),
)
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
  async search(q: string): Promise<Github.Issue[]> {
    if (!q) {
      return server.get(`/repos/${pkg.author.name}/${pkg.name}/issues`, {
        params: { sort: 'updated' },
      })
    }
    const data: any = await server.get(
      `/search/issues?q=${encodeURI(`${q}+repo:${pkg.author.name}/${pkg.name}`)}`,
      {},
    )
    return data?.items
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
  /**
   * some day i learn
   * @see {@link https://developer.github.com/v3/issues/#list-repository-issues}
   */
  async someday(): Promise<Github.Issue[]> {
    const week = dayjs()
      .subtract(1, 'week')
      .format('YYYY-MM-DDTHH:MM:SSZ')
    const month = dayjs()
      .subtract(1, 'month')
      .format('YYYY-MM-DDTHH:MM:SSZ')
    const year = dayjs()
      .subtract(1, 'year')
      .format('YYYY-MM-DDTHH:MM:SSZ')
    const sinces = [week, month, year]
    const directions = ['asc', 'desc']
    const issues = await server.get(`/repos/${pkg.author.name}/${pkg.name}/issues`, {
      params: {
        per_page: 10,
        sort: 'created',
        state: 'open',
        since: sample(sinces),
        direction: sample(directions),
      },
    })
    return [sample(issues)]
  },
}
