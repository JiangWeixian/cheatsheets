import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

import { api as client } from '~/request/client'
import { useCallback } from 'react'
import { Github } from '~/interface/github'

export const useSearchIssue = (
  { initialIssues = [] }: { initialIssues: Github.Issue[] } = {
    initialIssues: [],
  },
) => {
  const router = useRouter()
  const { data, status } = useQuery(
    ['issues', router.query.q as string],
    async (_key, keyword: string) => {
      const issues = await client.github.search(keyword)
      return issues
    },
    { initialData: initialIssues },
  )
  const handleSearch = useCallback(value => {
    router.push({ pathname: '/', query: { q: value } })
  }, [])
  return {
    handleSearch,
    data,
    status,
  }
}
