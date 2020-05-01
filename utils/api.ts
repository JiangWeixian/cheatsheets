import axios from 'axios'

const server = axios.create()
const client = axios.create()

server.defaults.headers.authorization = 'token aa3a141257ba091169ae557f5d076aea93e49aaa'

export enum HOST {
  MOCK = 'http://localhost:8080/api',
  CLIENT = 'https://jiangweixian-cheatsheets.now.sh/api',
  SERVER = 'https://api.github.com',
}

const getHost = (host?: HOST) => {
  if (process.env.NODE_ENV === 'development' && host === HOST.CLIENT) {
    return 'http://localhost:3001/api'
  }
  return host
}

export const request = {
  server: {
    get: async <T, Q>(
      path: string,
      { params, data }: { params?: Q; data?: Q } = {},
      { host }: { host?: HOST } = { host: HOST.CLIENT },
    ): Promise<T> => {
      return server.get(`${host}${path}`, { data, params }).then(res => res.data)
    },
    post: async <T, Q>(
      path: string,
      { params }: { params?: Q } = {},
      { host }: { host: HOST } = { host: HOST.CLIENT },
    ): Promise<T> => {
      return server.post(`${host}${path}`, params).then(res => res.data)
    },
  },
  client: {
    get: async <T, Q>(
      path: string,
      { params, data }: { params?: Q; data?: Q } = {},
      { host }: { host?: HOST } = { host: HOST.CLIENT },
    ): Promise<T> => {
      const _host = getHost(host)
      return client.get(`${_host}${path}`, { data, params }).then(res => res.data)
    },
    post: async <T, Q>(
      path: string,
      { params }: { params?: Q } = {},
      { host }: { host: HOST } = { host: HOST.CLIENT },
    ): Promise<T> => {
      const _host = getHost(host)
      console.log(host)
      return client.post(`${_host}${path}`, params).then(res => res.data)
    },
  },
}
