import { Github } from '~/api'

export const getId = (label: string, value: Github.Issue) => {
  return `${label}-${value.id}`
}
