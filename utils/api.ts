import axios from 'axios'
import { checkServer } from './server'

axios.defaults.withCredentials = true

enum HOST {
  MOCK = 'http://localhost:8080/api',
  CLIENT = '/api',
  SERVER = 'http://nextjs-rematch2-template',
}

const getHost = () => {
  if (!checkServer()) {
    return HOST.CLIENT
  }
  return process.env.IS_MOCK ? HOST.MOCK : HOST.SERVER
}

export const get = async <T, Q>(path: string, params?: Q): Promise<T> => {
  return axios.get(`${getHost()}${path}`, { params }).then(res => res.data)
}

export const post = async <T, Q>(path: string, params?: Q): Promise<T> => {
  return axios.post(`${getHost()}${path}`, params).then(res => res.data)
}
