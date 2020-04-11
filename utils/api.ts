import axios from 'axios'
// import { checkServer } from './server'

axios.defaults.headers.authorization = 'token b6e586985c9882b5dd581a195de5d398f67855eb'

enum HOST {
  MOCK = 'http://localhost:8080/api',
  CLIENT = '/api',
  SERVER = 'https://api.github.com',
}

const getHost = () => {
  // if (!checkServer()) {
  //   return HOST.CLIENT
  // }
  // return process.env.IS_MOCK ? HOST.MOCK : HOST.SERVER
  return HOST.SERVER
}

export const get = async <T, Q>(
  path: string,
  { params, data }: { params?: Q; data?: Q } = {},
): Promise<T> => {
  return axios.get(`${getHost()}${path}`, { data, params }).then(res => res.data)
}

export const post = async <T, Q>(path: string, { params }: { params?: Q }): Promise<T> => {
  return axios.post(`${getHost()}${path}`, params).then(res => res.data)
}
