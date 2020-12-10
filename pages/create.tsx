import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import pkg from '../package.json'
import { Meta } from '~/components/Meta'

const Create = () => {
  const router = useRouter()
  useEffect(() => {
    router.push(`https://www.github.com/${pkg.author.name}/${pkg.name}/issues/new`)
  }, [])
  return <Meta title="creating new issue" description="creating new issue" />
}

export default Create
