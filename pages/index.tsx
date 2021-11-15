import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { Spinner } from 'styled-cssgg'
import { animated, useTrail } from '@react-spring/web'
import { QueryStatus } from 'react-query'
import { api } from '~/utils/middlewares'
import { Issue } from '@omcs/request/types'
import { Typography } from 'granen'
import styled from 'styled-components'

import Layout from '~/components/Layout'
import { Meta } from '~/components/Meta'
import { Sheet } from '~/components/Sheet'
import { useRouter } from 'next/router'
import { CheatSheetSearchBox } from '~/components/CheatSheetSearchBox'

const AnimatedWrapper = styled(animated.div)`
  @apply mb-4 w-full float-left;
`

const Recent = ({
  issues = [],
  status,
  highlight,
}: {
  issues?: Issue[]
  status?: QueryStatus
  highlight?: string
}) => {
  const router = useRouter()
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
          <Typography.Title h1={true}>Recently</Typography.Title>
          {transitions.slice(0, 2).map((props, index) => {
            return (
              <AnimatedWrapper key={index} style={props}>
                <Sheet
                  onClickTitle={(v) => router.push('/sheet/id/[id]', `/sheet/id/${v.id}`)}
                  highlight={highlight}
                  v={issues?.[index]}
                />
              </AnimatedWrapper>
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
  issues?: Issue[]
  status?: QueryStatus
  highlight?: string
}) => {
  const router = useRouter()
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
          <Typography.Title>Someday</Typography.Title>
          {transitions.map((props, index) => {
            return (
              <AnimatedWrapper key={index} style={props}>
                <Sheet
                  onClickTitle={(v) => router.push('/sheet/id/[id]', `/sheet/id/${v.id}`)}
                  highlight={highlight}
                  v={issues?.[index]}
                />
              </AnimatedWrapper>
            )
          })}
        </>
      ) : null}
    </div>
  )
}

const SearchContainer = styled.div`
  @apply mt-48 flex items-center justify-center w-full;

  [data-role='tooltip'] {
    @apply w-3/5 relative;
  }

  [data-role='input'] {
    @apply w-full shadow-2xl;
  }

  [data-role='tooltip-content'] {
    @apply w-full;
  }
`

const EventContainer = styled.div`
  @apply w-4/5 m-auto px-6 pt-6 grid grid-cols-none gap-4 grid-cols-2;
`

const IndexPage: NextPage<{ recent: Issue[]; someday: Issue[] }> = (props) => {
  const keyword = useRouter().query.q as string
  return (
    <Layout>
      <Meta />
      <SearchContainer>
        <CheatSheetSearchBox />
      </SearchContainer>
      <EventContainer>
        <Someday issues={props.someday} />
        <Recent highlight={keyword} issues={props.recent} />
      </EventContainer>
    </Layout>
  )
}

export async function getServerSideProps(ctx: Parameters<GetServerSideProps>[0]) {
  const recent = await api.search({ content: ctx.query.q as string })
  const someday = await api.someday()
  return { props: { recent: recent.hits, someday: someday.hits || [] } }
}

export default IndexPage
