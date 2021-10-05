/**
 * @fileoverview display search results
 */

import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { api } from '@omcs/request/node'
import { useRouter } from 'next/router'
import { animated, useTrail } from '@react-spring/web'
import { Typography } from 'granen'
import { QueryStatus } from 'react-query'

import { Github } from '~/interface/github'
import Layout from '~/components/Layout'
import { Sheet } from '~/components/Sheet'

/**
 * @fixme copy from index.recent
 */
const SearchResults = ({
  issues = [],
  highlight,
}: {
  issues?: Github.Issue[]
  highlight?: string
}) => {
  const transitions = useTrail<{ opacity: number }>(issues.length, {
    opacity: status === 'loading' ? 0 : 1,
    from: { opacity: 0 },
  })
  return (
    <div>
      {issues?.length !== 0 ? (
        <>
          <Typography.Title h1={true}>Recently</Typography.Title>
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

const SearchPage: NextPage<{ hits: Github.Issue[] }> = props => {
  const keyword = useRouter().query.q as string
  return (
    <Layout>
      <SearchResults highlight={keyword} issues={props.hits} />
    </Layout>
  )
}

export async function getServerSideProps(_ctx: Parameters<GetServerSideProps>[0]) {
  const search = await api.search({ content: _ctx.query.q as string })
  return { props: { hits: search.hits } }
}

export default SearchPage
