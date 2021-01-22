import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { Spinner } from 'styled-cssgg'
import { animated, useTrail } from 'react-spring'
import { QueryStatus } from 'react-query'

import { Github } from '~/interface/github'
import Layout from '~/components/Layout'
import { Meta } from '~/components/Meta'
import { Sheet } from '~/components/Sheet'
import { useRouter } from 'next/router'
import { useSearchIssue } from '~/hooks/use-search-issue'
import { api as server } from '~/request/server'

const Recent = ({
  issues = [],
  status,
  highlight,
}: {
  issues?: Github.Issue[]
  status?: QueryStatus
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
    <div>
      {issues?.length !== 0 ? (
        <>
          <h3 className="text-2xl text-gray-800 mb-4">Recently</h3>
          {transitions.slice(0, 2).map((props, index) => {
            return (
              <animated.div key={index} className="mb-4 w-full float-left" style={props}>
                <Sheet highlight={highlight} v={issues?.[index]} />
              </animated.div>
            )
          })}
        </>
      ) : null}
    </div>
  )
}

const Someday = ({
  issues = [],
  status,
  highlight,
}: {
  issues?: Github.Issue[]
  status?: QueryStatus
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
    <div>
      {issues?.length !== 0 ? (
        <>
          <h3 className="text-2xl text-gray-800 mb-4">Someday, I learn</h3>
          {transitions.map((props, index) => {
            return (
              <animated.div key={index} className="mb-4 w-full float-left" style={props}>
                <Sheet highlight={highlight} v={issues?.[index]} />
              </animated.div>
            )
          })}
        </>
      ) : null}
    </div>
  )
}

const IndexPage: NextPage<{ recent: Github.Issue[]; someday: Github.Issue[] }> = props => {
  const keyword = useRouter().query.q as string
  const { data: issues, status } = useSearchIssue({ initialIssues: props.recent })
  return (
    <Layout>
      <Meta />
      <div className="p-6 grid grid-cols-none gap-4 sm:grid-cols-2 sm:p-12">
        <Someday issues={props.someday} status={status} />
        <Recent highlight={keyword} issues={issues} status={status} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps(_ctx: Parameters<GetServerSideProps>[0]) {
  const recent = await server.github.search(_ctx.query.q as string)
  const someday = await server.github.someday()
  return { props: { recent, someday } }
}

export default IndexPage
