import { useQuery } from 'react-query'

import { api } from '~/api/client'
import { useCallback, useRef } from 'react'
import { Github } from '~/interface/github'

export const useSearchIssue = (
  {
    defaultKeyword,
    initialIssues = [],
  }: { defaultKeyword: string; initialIssues: Github.Issue[] } = {
    defaultKeyword: '',
    initialIssues: [],
  },
) => {
  const keyword = useRef(defaultKeyword)
  const { data, status, refetch } = useQuery(
    'issues',
    async () => {
      if (!keyword.current) {
        const issues = await api.github.issues({ sort: 'updated' })
        return issues
      }
      const issues = await api.github.search(keyword.current)
      return issues.items
    },
    { initialData: initialIssues },
  )
  const handleSearch = useCallback(value => {
    keyword.current = value
    refetch()
  }, [])
  return {
    handleSearch,
    data,
    status,
  }
}
