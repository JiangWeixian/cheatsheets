import React, { useEffect } from 'react'

import { Meta } from '~/components/Meta'
import { useCreateIssue } from '~/hooks/use-create-issue'

const Create = () => {
  const { handleCreateIssue } = useCreateIssue()
  useEffect(() => {
    handleCreateIssue()
  }, [handleCreateIssue])
  return <Meta title="creating new issue" description="creating new issue" />
}

export default Create
