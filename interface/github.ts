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
    created_at: string
    updated_at: string
    html_url: string
    state: 'open' | 'state'
    labels: Label[]
  }
  export type Status = 'loading' | 'success' | 'error'
}
