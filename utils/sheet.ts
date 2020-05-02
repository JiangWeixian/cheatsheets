import { Github } from '~/interface/github'

export const getId = (label: string, value: Github.Issue) => {
  return `${label}-${value.id}`
}
