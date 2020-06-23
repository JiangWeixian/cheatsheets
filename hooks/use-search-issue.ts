import { useQuery } from 'react-query'

import { api } from '~/api/client'
import { useState } from 'react'

export const useSearchIssue = ({ defaultKeyword }: { defaultKeyword: string }) => {
  const [keyword, setKeyword] = useState<string>(defaultKeyword)
  const { data, status, refetch } = useQuery(['issues', keyword], async (key, keyword) => {
    const issues = await api.github.search(keyword)
    return issues.items
  })
  return {
    handleSearch: setKeyword,
    data,
    status,
  }
}
