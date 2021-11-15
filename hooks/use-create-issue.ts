import { useCallback } from 'react'
import { useRouter } from 'next/router'

import config from '~/.omcsrc'

export const useCreateIssue = () => {
  const router = useRouter()
  const handleCreateIssue = useCallback(() => {
    router.push(`https://www.github.com/${config.owner}/cheatsheets/issues/new`)
  }, [router])
  return {
    handleCreateIssue,
  }
}
