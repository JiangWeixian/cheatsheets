import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { Spinner } from 'styled-cssgg'
import { animated, useTrail } from 'react-spring'

import { Github } from '~/interface/github'
import Layout from '~/components/Layout'
import { Meta } from '~/components/Meta'
import { Sheet } from '~/components/Sheet'
import { useRouter } from 'next/router'
import { useSearchIssue } from '~/hooks/use-search-issue'
import { api } from '~/api/client'

const Content = ({
  issues = [],
  status,
  highlight,
}: {
  issues?: Github.Issue[]
  status?: Github.Status
  highlight?: string
}) => {
  const transitions = useTrail<{ opacity: number }>(issues.length, {
    opacity: status === 'loading' ? 0 : 1,
    from: { opacity: 0 },
  })
  if (status === 'loading') {
    return <Spinner className="m-auto pt-10" />
  }
  return (
    <div className="w-full p-12 box-border">
      {issues && issues.length !== 0 ? (
        <>
          {transitions.map((props, index) => {
            return (
              <animated.div key={index} className="mb-4 w-full float-left" style={props}>
                <Sheet highlight={highlight} v={issues[index]} />
              </animated.div>
            )
          })}
        </>
      ) : null}
    </div>
  )
}

const IndexPage: NextPage<{ data: Github.Issue[] }> = props => {
  const keyword = useRouter().query.q as string
  const { data: issues, status } = useSearchIssue({ initialIssues: props.data })
  return (
    <Layout>
      <Meta />
      <Content highlight={keyword} issues={issues} status={status} />
    </Layout>
  )
}

export async function getServerSideProps(_ctx: Parameters<GetServerSideProps>[0]) {
  const data = await api.github.search(_ctx.query.q as string)
  return { props: { data } }
}

export default IndexPage
