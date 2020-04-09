import * as React from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'

import Layout from '~/components/Layout'

const AboutPage: React.FunctionComponent = () => {
  const { increment } = useDispatch<Dispatch>().user
  const user = useSelector((state: RootState) => state.user)
  return (
    <Layout title="About | Next.js + TypeScript Example">
      <h1>About</h1>
      <p>This is the about page</p>
      <p>{user}</p>
      <button onClick={() => increment()}>+1</button>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  )
}

export default AboutPage
