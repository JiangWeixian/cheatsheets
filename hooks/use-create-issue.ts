import { useCallback } from 'react'
import { useRouter } from 'next/router'

import pkg from '../package.json'
import config from '~/.omcsrc'

export const useCreateIssue = () => {
  const router = useRouter()
  const handleCreateIssue = useCallback(() => {
    router.push(`https://www.github.com/${config.owner}/${pkg.name}/issues/new`)
  }, [router])
  return {
    handleCreateIssue,
  }
}
