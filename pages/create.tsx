import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Meta } from '~/components/Meta'
import { useCreateIssue } from '~/hooks/use-create-issue'

const Create = () => {
  const router = useRouter()
  const { handleCreateIssue } = useCreateIssue()
  useEffect(() => {
    handleCreateIssue()
  }, [])
  return <Meta title="creating new issue" description="creating new issue" />
}

export default Create
