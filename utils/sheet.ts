import { Github } from '~/interface/github'

export const getId = (value: Github.Issue) => {
  return value.id.toString()
}
