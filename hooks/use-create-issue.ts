import { useCallback } from 'react'
import { useRouter } from 'next/router'

import pkg from '../package.json'

export const useCreateIssue = () => {
  const router = useRouter()
  const handleCreateIssue = useCallback(() => {
    router.push(`https://www.github.com/${pkg.author.name}/${pkg.name}/issues/new`)
  }, [])
  return {
    handleCreateIssue,
  }
}
