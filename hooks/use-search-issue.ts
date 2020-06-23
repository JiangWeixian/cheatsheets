import { useQuery } from 'react-query'

import { api } from '~/api/client'
import { useState, useCallback, useRef } from 'react'

export const useSearchIssue = (
  { defaultKeyword }: { defaultKeyword: string } = { defaultKeyword: '' },
) => {
  const keyword = useRef(defaultKeyword)
  const { data, status, refetch } = useQuery(['issues'], async key => {
    if (!keyword.current) {
      const issues = await api.github.issues({ sort: 'updated' })
      return issues
    }
    const issues = await api.github.search(keyword.current)
    return issues.items
  })
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
