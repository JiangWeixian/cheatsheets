export namespace Github {
  export type Label = {
    id: string
    name: string
    description: string
    default: boolean
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
}
