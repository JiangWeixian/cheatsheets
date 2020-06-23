import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import useSWR from 'swr'
import { Spinner } from 'styled-cssgg'
import { animated, useTrail } from 'react-spring'

import { api } from '~/api/client'
import { Github } from '~/interface/github'
import Layout from '~/components/Layout'
import { Meta } from '~/components/Meta'
import pkg from 'package.json'
import { Sheet } from '~/components/Sheet'
import { useRouter } from 'next/router'
import { Divider } from '~/components/Divider'
import { GitLabel } from '~/components/GitLabel'
import { useSearchIssue } from '~/hooks/use-search-issue'

const Content = ({
  issues = [],
  labels,
  status,
  highlight,
}: {
  issues?: Github.Issue[]
  labels?: Github.Label[]
  status?: Github.Status
  highlight?: string
}) => {
  const transitions = useTrail<{ opacity: number }>(issues.length, {
    opacity: status === 'loading' ? 0 : 1,
    from: { opacity: 0 },
  })
  if (status === 'loading') {
    return <Spinner />
  }
  return (
    <div className="lg:w-full w-11/12">
      {issues && issues.length !== 0 ? (
        <>
          {transitions.map((props, index) => {
            return (
              <animated.div key={issues[index].id} style={props}>
                <Sheet highlight={highlight} className={'mb-4'} v={issues[index]} />
              </animated.div>
            )
          })}
        </>
      ) : null}
    </div>
  )
}

const IndexPage: NextPage<{ data: Github.Label[] }> = props => {
  const { data } = useSWR(`${pkg.author.name}-${pkg.name}-labels`, api.github.labels, {
    initialData: props.data,
  })
  const defaultKeyword = useRouter().query.q as string
  const { data: issues, status } = useSearchIssue({ defaultKeyword })
  return (
    <Layout>
      <Meta />
      <Content highlight={defaultKeyword} issues={issues} status={status} />
    </Layout>
  )
}

export async function getServerSideProps(_ctx: Parameters<GetServerSideProps>[0]) {
  // const data = await api.github.labels()
  return { props: { data: [] } }
}

export default IndexPage
