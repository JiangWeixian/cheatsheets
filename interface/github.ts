export namespace Github {
  export type Label = {
    id: string
    name: string
    description: string
    default: boolean
    color: string
  }
  export type Issue = {
    id: string
    url?: string
    body?: string
    title?: string
    createdAt: string
    updatedAt: string
    html_url: string
    state: 'open' | 'state'
    labels: Label[]
  }
  export type Status = 'loading' | 'success' | 'error'
}
