import { request, HOST } from '~/utils/api'
import pkg from '~/package.json'

export namespace Github {
  export type Label = {
    id: string
    name: string
    description: string
    default: boolean
  }
  export type Issue = {
    url?: string
    body?: string
    title?: string
    created_at: string
    updated_at: string
    html_url: string
    state: 'open' | 'state'
  }
}

export const github = {
  server: {
    async login(): Promise<{ data: any }> {
      return request.server.get('/user', {}, { host: HOST.SERVER })
    },
    async labels(): Promise<Github.Label[]> {
      return request.server.get(
        `/repos/${pkg.author.name}/${pkg.name}/labels`,
        {},
        { host: HOST.SERVER },
      )
    },
    async issues(labels?: string): Promise<Github.Issue[]> {
      return request.server.get(
        `/repos/${pkg.author.name}/${pkg.name}/issues?labels=${labels}`,
        {},
        { host: HOST.SERVER },
      )
    },
  },
  client: {
    async labels(): Promise<Github.Label[]> {
      return request.client.get(`/labels`, {}, { host: HOST.CLIENT })
    },
    async issues(label?: string): Promise<Github.Issue[]> {
      if (label === undefined) {
        return []
      }
      return request.client.get(`/sheet`, { params: { label } }, { host: HOST.CLIENT })
    },
  },
}
