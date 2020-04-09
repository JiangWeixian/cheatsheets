import { get } from '~/utils/api'
import pkg from '~/package.json'

export namespace Github {
  export type Label = {
    id: string
    name: string
    description: string
  }
}

export const github = {
  async login(): Promise<{ data: any }> {
    return get('/user')
  },
  async labels(): Promise<Github.Label[]> {
    return get(`/repos/${pkg.author.name}/${pkg.name}/labels`)
  },
}
