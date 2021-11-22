import type { NextApiRequest as _NextApiRequest } from 'next'
import { create } from '@omcs/request/node'

export interface NextApiRequest extends _NextApiRequest {
  _omcs: ReturnType<typeof create>
  _login?: string
}
