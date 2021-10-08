/**
 * @fileoverview display search results
 */

import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { api } from '@omcs/request/node'
import { useRouter } from 'next/router'
import { animated, useTrail } from '@react-spring/web'
import { Typography } from 'granen'
import styled from 'styled-components'

import { Github } from '~/interface/github'
import Layout from '~/components/Layout'
import { Sheet } from '~/components/Sheet'

const Container = styled.div`
  @apply px-12 py-6;

  [data-role='title'] {
    @apply mt-0;
  }

  .searchItem {
    @apply mb-4 w-full float-left;
  }
`

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
    from: { opacity: 0 },
    to: { opacity: 1 },
  })
  return (
    <Container>
      <Typography.Title h1={true}>Search Results</Typography.Title>
      {issues?.length !== 0
        ? transitions.map((props, index) => {
            return (
              <animated.div key={index} className="searchItem" style={props}>
                <Sheet highlight={highlight} v={issues?.[index]} />
              </animated.div>
            )
          })
        : null}
    </Container>
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
