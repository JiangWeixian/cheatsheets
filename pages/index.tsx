import * as React from 'react'
import Link from 'next/link'
import Layout from '~/components/Layout'
import { NextPage } from 'next'
import { api } from '~/api'

const IndexPage: NextPage<{ data: any }> = ({ data }) => {
  console.log(data)
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
    </Layout>
  )
}

IndexPage.getInitialProps = async () => {
  const data = await api.github.labels()
  return { data }
}

export default IndexPage
